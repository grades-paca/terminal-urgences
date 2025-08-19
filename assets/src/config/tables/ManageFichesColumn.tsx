import type { Fiche } from '@interfaces/Fiche.ts';
import type { CellContext, Row } from '@tanstack/react-table';
import {
    ChevronDown,
    ChevronRight,
    CornerDownRight,
    PencilLine,
} from 'lucide-react';
import { ToggleSwitch } from 'flowbite-react';
import type { AuditLog } from '@interfaces/AuditLog.ts';
import { PopoverAuditLogs } from '@molecules/PopoverAuditLogs.tsx';

export type FicheWithChildren = Fiche & { children?: Fiche[] };

export const getColumns = (
    onEditFiche: (fiche: FicheWithChildren) => void,
    onChangeArchiveStatus: (id: string, isChecked: boolean) => void
) => [
    {
        header: 'id',
        accessorKey: 'id',
        enableResizing: false,
        size: 80,
        maxSize: 80,
    },
    {
        header: 'disabled',
        accessorKey: 'disabled',
        size: 80,
        maxSize: 80,
    },
    {
        header: 'ID terme',
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
                data-testid={`cell-id-terme-${row.getValue('idTerme')}`}
            >
                {row.getCanExpand() ? (
                    <button
                        className={`${row.getCanExpand() ? 'cursor-pointer' : ''}`}
                    >
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
        size: 80,
        maxSize: 80,
    },
    {
        header: 'Description',
        accessorKey: 'description',
        size: 80,
        maxSize: 80,
    },
    {
        header: 'Importation',
        accessorKey: 'importation',
        size: 80,
        maxSize: 80,
    },
    {
        header: 'Modifications',
        accessorKey: 'logs',
        cell: ({ row }: { row: Row<FicheWithChildren> }) => {
            const logs = row.getValue('logs') as Array<AuditLog>;

            return <PopoverAuditLogs trigger="hover" logs={logs} />;
        },
        minSize: 160,
        size: 260,
        maxSize: 260,
    },
    {
        id: 'update',
        header: 'Modifier',
        cell: (ctx: CellContext<FicheWithChildren, boolean>) => {
            const disabled: boolean =
                ctx.row.getValue('archived') || ctx.row.getValue('disabled');

            return (
                <button
                    onClick={() => onEditFiche(ctx.row.original)}
                    title="Modifier la fiche"
                    className={`${disabled ? '' : 'cursor-pointer'} text-muted-foreground hover:text-primary`}
                    disabled={disabled}
                >
                    <PencilLine size={16} />
                </button>
            );
        },
        size: 40,
        minSize: 40,
        maxSize: 40,
        enableResizing: false,
    },
    {
        header: 'Archivage',
        accessorKey: 'archived',
        enableSorting: false,
        cell: (ctx: CellContext<FicheWithChildren, boolean>) => (
            <ToggleSwitch
                checked={ctx.getValue()}
                label={`${ctx.getValue() ? 'Archivé' : 'Actif'}`}
                onChange={(isChecked) =>
                    onChangeArchiveStatus(ctx.row.getValue('id'), isChecked)
                }
                disabled={ctx.row.getValue('disabled')}
            />
        ),
        size: 80,
        maxSize: 80,
    },
];
