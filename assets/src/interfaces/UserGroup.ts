import type { AuditLog } from '@interfaces/AuditLog.ts';

export interface UserGroup {
    id?: number;
    name: string;
    targetIdentifier: string;
    targetType?: string;
    h24: boolean;
    from?: string;
    to?: string;
    logs: AuditLog[] | null;
}

export type UserGroupError = Record<string, string>;
