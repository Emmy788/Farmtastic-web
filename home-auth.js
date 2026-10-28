(() => {
    const callsToAction = document.querySelectorAll('[data-auth-cta]');
    const config = window.FARMTASTIC_SUPABASE_CONFIG;

    if (!callsToAction.length || !config?.url || !config?.publishableKey || config.url.includes('YOUR-PROJECT')) {
        return;
    }

    if (!window.supabase?.createClient) {
        console.error('The Supabase client could not load; homepage account links are unchanged.');
        return;
    }

    async function updateCallsToAction() {
        try {
            const supabaseClient = window.supabase.createClient(config.url, config.publishableKey);
            const { data, error } = await supabaseClient.auth.getSession();
            if (error) {
                throw error;
            }

            if (!data.session) {
                return;
            }

            callsToAction.forEach((link) => {
                link.href = 'services.html';
                link.querySelector('span').textContent = 'Explore services';
            });
        } catch (error) {
            console.error('Could not check the signed-in user for homepage account links.', error);
        }
    }

    updateCallsToAction();
})();
