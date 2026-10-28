(() => {
    const signupForm = document.querySelector('#signup-form');
    const loginForm = document.querySelector('#login-form');
    const message = document.querySelector('#auth-message');
    let client;

    if (!signupForm && !loginForm) {
        return;
    }

    function showMessage(text, state = 'error') {
        message.textContent = text;
        message.dataset.state = state;
        message.hidden = false;
    }

    function getClient() {
        if (client) {
            return client;
        }

        const config = window.FARMTASTIC_SUPABASE_CONFIG;
        if (!window.supabase?.createClient) {
            throw new Error('The Supabase client could not load. Check your internet connection and reload.');
        }
        if (!config?.url || !config?.publishableKey || config.url.includes('YOUR-PROJECT')) {
            throw new Error('Supabase is not configured yet. Follow the setup steps in README.md.');
        }

        client = window.supabase.createClient(config.url, config.publishableKey);
        return client;
    }

    async function submitForm(form, submitAction) {
        const button = form.querySelector('button[type="submit"]');
        button.disabled = true;
        message.hidden = true;

        try {
            const disableForMs = await submitAction(getClient());
            if (disableForMs) {
                window.setTimeout(() => {
                    button.disabled = false;
                }, disableForMs);
            } else {
                button.disabled = false;
            }
        } catch (error) {
            showMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
            button.disabled = false;
        }
    }

    signupForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = signupForm.elements.username.value.trim();
        const email = signupForm.elements.email.value.trim();
        const password = signupForm.elements.password.value;

        submitForm(signupForm, async (supabaseClient) => {
            const { error } = await supabaseClient.auth.signUp({
                email,
                password,
                options: {
                    data: { username },
                    emailRedirectTo: new URL('login.html', window.location.href).href
                }
            });

            if (error) {
                throw error;
            }

            showMessage('Check your email for a link to confirm your account.', 'success');
            return 60000;
        });
    });

    loginForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = loginForm.elements.email.value.trim();
        const password = loginForm.elements.password.value;

        submitForm(loginForm, async (supabaseClient) => {
            const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
            if (error) {
                throw error;
            }

            showMessage('You are signed in successfully.', 'success');
            await new Promise((resolve) => window.setTimeout(resolve, 1500));
            window.location.href = 'services.html';
        });
    });
})();
