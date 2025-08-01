import { createTheme } from 'flowbite-react';

export const customTheme = createTheme({
    modal: {
        content: {
            base: 'relative w-full p-2',
        },
        body: {
            base: 'p-4',
        },
        header: {
            base: 'p-4 bg-[var(--color-primary-600)] text-[var(--color-secondary-50)]',
            title: 'bg-[var(--color-primary-600)] text-[var(--color-secondary-50)]',
            close: {
                base:
                    'bg-[var(--color-primary-700)] text-[var(--color-secondary-50)] ' +
                    'hover:bg-[var(--color-primary-800)] hover:text-[var(--color-secondary-50)]',
            },
        },
        footer: {
            base: 'p-4',
        },
    },
});
