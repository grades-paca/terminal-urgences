import type { Fiche } from '@interfaces/Fiche.ts';
import type { Row } from '@tanstack/react-table';
import {
    ChevronDown,
    ChevronRight,
    CornerDownRight,
    PencilLine,
} from 'lucide-react';
import { Popover } from 'flowbite-react';
import type { AuditLog } from '@interfaces/AuditLog.ts';

export type FicheWithChildren = Fiche & { childrens?: Fiche[] };

export const getColumns = (onEditFiche: (fiche: FicheWithChildren) => void) => [
    {
        header: 'idTerme',
        accessorKey: 'idTerme',
        cell: ({ row }: { row: Row<FicheWithChildren> }) => (
            <div
                className={`flex items-center gap-2 ${row.getCanExpand() ? 'cursor-pointer' : ''}`}
                style={{ paddingLeft: `${row.depth * 1.5}rem` }}
                onClick={
                    row.getCanExpand()
                        ? row.getToggleExpandedHandler()
                        : undefined
                }
            >
                {row.getCanExpand() ? (
                    <button>
                        {row.getIsExpanded() ? (
                            <ChevronDown size={16} />
                        ) : (
                            <ChevronRight size={16} />
                        )}
                    </button>
                ) : row.depth > 0 ? (
                    <CornerDownRight
                        size={14}
                        className="text-muted-foreground"
                    />
                ) : null}
                {row.original.idTerme}
            </div>
        ),
    },
    {
        header: 'Description',
        accessorKey: 'description',
    },
    {
        header: 'Importation',
        accessorKey: 'importation',
    },
    {
        header: 'Modifications',
        accessorKey: 'logs',
        cell: ({ row }: { row: Row<FicheWithChildren> }) => {
            const logs = row.getValue('logs') as Array<AuditLog>;

            if (!logs || logs.length === 0) return '—';

            const latest = logs[0];
            const date = new Date(latest.timestamp).toLocaleString('fr-FR');
            const user = latest.user?.username ?? 'inconnu';
            const label = `${latest.action === 'create' ? 'Créé' : 'Modifié'} le ${date} par ${user}`;

            return (
                <Popover
                    content={
                        <div className="w-72 text-sm text-gray-700 dark:text-gray-300">
                            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    {latest.action === 'create'
                                        ? 'Créé'
                                        : 'Modifié'}
                                </h3>
                            </div>
                            <div className="px-3 py-2">
                                {logs.map((log, i) => (
                                    <div
                                        key={i}
                                        className="mb-3 border-b pb-2 last:border-0 last:pb-0"
                                    >
                                        <div className="font-medium">
                                            {new Date(
                                                log.timestamp
                                            ).toLocaleString('fr-FR')}
                                        </div>
                                        <div>
                                            Par :{' '}
                                            {log.user?.username ?? 'inconnu'}
                                        </div>
                                        {log.changes && (
                                            <div className="mt-1">
                                                <div className="font-semibold">
                                                    Changements :
                                                </div>
                                                <ul className="ml-4 list-disc">
                                                    {Object.entries(
                                                        log.changes
                                                    ).map(
                                                        ([
                                                            key,
                                                            [before, after],
                                                        ]) => (
                                                            <li key={key}>
                                                                <span className="italic">
                                                                    {key}
                                                                </span>{' '}
                                                                : «{' '}
                                                                {before ?? '—'}{' '}
                                                                » → «{' '}
                                                                {after ?? '—'} »
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                >
                    <div>{label}</div>
                </Popover>
            );
        },
    },
    {
        header: 'Modifier',
        id: 'edit',
        cell: ({ row }: { row: Row<FicheWithChildren> }) => (
            <button
                onClick={() => onEditFiche(row.original)}
                title="Modifier la fiche"
                className="cursor-pointer text-muted-foreground hover:text-primary"
            >
                <PencilLine size={16} />
            </button>
        ),
    },
];
