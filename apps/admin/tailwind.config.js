const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const { PrimaryColors } = require('./src/assets/css/primaryColors');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
        ...createGlobPatternsForDependencies(__dirname),
        join(__dirname, '../../libs/admin/feature-admin/src/**/!(*.stories|*.spec).{ts,html}'),
    ],
    theme: {
        extend: {
            colors: {
                primary: PrimaryColors,
            },
        },
    },
    plugins: [],
};
