import { ResumeDashboard } from '@organisms/ResumeDashboard';
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
} from '@tanstack/react-table';

import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from 'flowbite-react';

const data = [
    {
        id: 'ORS0',
        age: '22 ans',
        arrivee: '14/04/2025 à 00:00',
        soignants: 'Dr DOS RAMOS Emmanuel',
        salle: 'Salle A1 (Secteur A)',
        gravite: 'Gravité 3A',
        destSouhaitee: '--',
        destConfirmee: '--',
        statut: 'stable',
    },
    {
        id: 'ORS1',
        age: '67 ans',
        arrivee: '14/04/2025 à 00:10',
        soignants: 'Dr LEGRAND Sophie',
        salle: 'Salle A2 (Secteur A)',
        gravite: 'Gravité 2B',
        destSouhaitee: 'UHCD',
        destConfirmee: 'UHCD',
        statut: 'critique',
    },
    {
        id: 'ORS2',
        age: '45 ans',
        arrivee: '14/04/2025 à 00:20',
        soignants: 'Dr MULLER Jean',
        salle: 'Salle A3 (Secteur B)',
        gravite: 'Gravité 1A',
        destSouhaitee: 'Urgences',
        destConfirmee: '--',
        statut: 'en_attente',
    },
];

const columns = [
    {
        header: 'Patient',
        accessorKey: 'id',
    },
    {
        header: 'Age',
        accessorKey: 'age',
    },
    {
        header: 'Arrivée',
        accessorKey: 'arrivee',
    },
    {
        header: 'Soignants',
        accessorKey: 'soignants',
    },
    {
        header: 'Salle',
        accessorKey: 'salle',
    },
    {
        header: 'Motif / Code',
        accessorKey: 'gravite',
    },
    {
        header: 'Dest. Souhait.',
        accessorKey: 'destSouhaitee',
    },
    {
        header: 'Dest. Confirmée',
        accessorKey: 'destConfirmee',
    },
];

export const Dashboard = () => {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="space-y-4">
            <ResumeDashboard />

            <div className="overflow-x-auto">
                <Table hoverable>
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHeadCell
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="cursor-pointer select-none"
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {header.column.getIsSorted() ===
                                                'asc' && '▲'}
                                            {header.column.getIsSorted() ===
                                                'desc' && '▼'}
                                        </div>
                                    </TableHeadCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>

                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className="px-3 py-2"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
