/**
 * Tailwind v4 reads this file through the `@config` directive in resources/css/app.css.
 * Brand tokens land here once a direction from DESIGN_OPTIONS.md is chosen.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
    content: [
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{js,jsx}',
    ],
    theme: {
        extend: {
            screens: {
                xs: '420px',
            },
        },
    },
};
