import type { CellContext, Row } from '@tanstack/react-table';
import type { AuditLog } from '@interfaces/AuditLog.ts';
import { PopoverAuditLogs } from '@molecules/PopoverAuditLogs.tsx';
import { PencilLine, ScanEye } from 'lucide-react';
import type { UserGroup } from '@interfaces/UserGroup.ts';
import { Popover } from 'flowbite-react';

export const getColumns = (onEditUserGroup: (userGroup: UserGroup) => void) => [
    {
        header: 'id',
        accessorKey: 'id',
        enableResizing: false,
        size: 80,
        maxSize: 80,
        visible: false,
    },
    {
        header: 'Nom du group',
        accessorKey: 'name',
        enableResizing: false,
        size: 80,
        maxSize: 80,
        cell: (ctx: CellContext<UserGroup, string>) => {
            return (
                <div>
                    {ctx.getValue()} -{' '}
                    <span>
                        {ctx.row.original.h24
                            ? 'Actif H24'
                            : 'Actif de ' +
                              ctx.row.original.from +
                              ' à ' +
                              ctx.row.original.to}
                    </span>
                    <div>
                        <Popover
                            trigger="hover"
                            content={
                                <div className="flex flex-col space-y-1 text-[var(--color-secondary-900)] p-2">
                                    <span>
                                        Vous pouvez vous attribuer un groupe
                                        temporairement afin de tester la
                                        configuration.
                                    </span>
                                    <span>
                                        Note : vous conserverez dans tous les
                                        cas l'accès au menu 'Gestion des
                                        groupes'.
                                    </span>
                                </div>
                            }
                        >
                            <ScanEye className={'icon-button'} />
                        </Popover>
                    </div>
                </div>
            );
        },
    },
    {
        header: 'cible',
        accessorKey: 'targetIdentifier',
        enableResizing: false,
        size: 80,
        maxSize: 80,
    },
    {
        header: "Nombre d'utilisateurs",
        accessorKey: 'users',
        enableResizing: false,
        size: 80,
        maxSize: 80,
        cell: (ctx: CellContext<UserGroup, string>) => {
            return (
                <div>
                    {ctx.row.getValue('name') === 'Administrateur'
                        ? 'Juste moi, je ne partage pas'
                        : "Trop d'utilisateurs pour être comptés, il me faut une calculette"}
                </div>
            );
        },
    },
    {
        header: 'Nombre de droits',
        accessorKey: 'users',
        enableResizing: false,
        size: 80,
        maxSize: 80,
        cell: (ctx: CellContext<UserGroup, string>) => {
            return (
                <div>
                    {ctx.row.getValue('name') === 'Administrateur'
                        ? 'TROP DE POUVOIR'
                        : 'RIEN, TU ES PUNI'}
                </div>
            );
        },
    },
    {
        header: 'Modifications',
        accessorKey: 'logs',
        cell: ({ row }: { row: Row<UserGroup> }) => {
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
        cell: (ctx: CellContext<UserGroup, boolean>) => {
            const disabled: boolean =
                ctx.row.getValue('archived') || ctx.row.getValue('disabled');

            return (
                <button
                    onClick={() => onEditUserGroup(ctx.row.original)}
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
];
