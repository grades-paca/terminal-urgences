export interface AuditLog {
    '@id': string;
    '@type': string;
    id: string;
    action: 'create' | 'update' | 'delete';
    entityClass: string;
    entityId: string;
    timestamp: string;
    user: {
        id: number;
        username: string;
    } | null;
    changes: {
        [key: string]: [string, string];
    } | null;
}
