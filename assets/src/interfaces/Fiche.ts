export interface Fiche {
    id: string;
    idTerme: string;
    description: string | null;
    importation: string | null;
    configuration: string | null;
}

export type FicheError = Record<string, string>;
