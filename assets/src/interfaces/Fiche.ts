import type { AuditLog } from '@interfaces/AuditLog.ts';

export interface Fiche {
    archived: boolean;
    id: string;
    idTerme: string;
    description: string | null;
    importation: string | null;
    configuration: string | null;
    logs: AuditLog[] | null;
}

export type FicheError = Record<string, string>;
