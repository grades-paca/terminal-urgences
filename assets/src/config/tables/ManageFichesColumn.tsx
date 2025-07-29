import type { Fiche } from '@interfaces/Fiche.ts';
import type { Row } from '@tanstack/react-table';
import { ChevronDown, ChevronRight, CornerDownRight } from 'lucide-react';

export type FicheWithChildren = Fiche & { childrens?: Fiche[] };

export const columns = [
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
];
