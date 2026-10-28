(() => {
    const welcome = document.querySelector('#services-welcome');
    const welcomeName = document.querySelector('#services-welcome-name');
    const config = window.FARMTASTIC_SUPABASE_CONFIG;

    if (!welcome || !welcomeName || !config?.url || !config?.publishableKey || config.url.includes('YOUR-PROJECT')) {
        return;
    }

    if (!window.supabase?.createClient) {
        console.error('The Supabase client could not load; the services welcome message is unavailable.');
        return;
    }

    async function showSignedInWelcome() {
        try {
            const supabaseClient = window.supabase.createClient(config.url, config.publishableKey);
            const { data, error } = await supabaseClient.auth.getSession();
            if (error) {
                throw error;
            }

            const user = data.session?.user;
            if (!user) {
                return;
            }

            const rawUsername = user.user_metadata?.username?.trim() || user.email?.split('@')[0] || 'farmer';
            const username = rawUsername.charAt(0).toLocaleUpperCase() + rawUsername.slice(1);
            welcomeName.textContent = `Welcome back, ${username}!`;
            welcome.hidden = false;
        } catch (error) {
            console.error('Could not load the signed-in user for the services welcome message.', error);
            welcomeName.textContent = 'We could not load your welcome message. Please refresh the page.';
            welcome.hidden = false;
        }
    }

    showSignedInWelcome();
})();
