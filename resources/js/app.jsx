import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

const appName = 'Deixe Doar';

createInertiaApp({
    title: (title) => (title ? `${title} | ${appName}` : `${appName} | Instituto Saúde e Equilíbrio`),
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx');
        return pages[`./Pages/${name}.jsx`]();
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: '#1d3faa',
    },
});
