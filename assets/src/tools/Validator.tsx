// Alphanumérique strict : a-z, A-Z, 0-9
export const AlphanumericValidator = {
    isValid(input: string, maxLength: number = 32): boolean {
        return /^[a-zA-Z0-9]*$/.test(input) && input.length <= maxLength;
    },

    sanitize(input: string, maxLength: number = 32): string {
        return input.replace(/[^a-zA-Z0-9]/g, '').slice(0, maxLength);
    }
};

// Description : texte libre avec ponctuation courante
export const LargeTextValidator = {
    isValid(input: string, maxLength: number = 255): boolean {
        const regex = /^[a-zA-Z0-9\s.,;:!?'"()\[\]{}\-_/\\@#€%&+=]*$/;
        return regex.test(input) && input.length <= maxLength;
    },

    sanitize(input: string, maxLength: number = 255): string {
        const cleaned = input.replace(/[^a-zA-Z0-9\s.,;:!?'"()\[\]{}\-_/\\@#€%&+=]/g, '');
        return cleaned.slice(0, maxLength);
    }
};
