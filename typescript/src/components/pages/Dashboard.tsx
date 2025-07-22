import { ResumeDashboard } from '@organisms/ResumeDashboard';
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';

import { useState } from 'react';
import styles from './Dashboard.module.scss';

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
    // const { idView } = useParams();
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        state: {
            sorting,
        },
    });

    return (
        <div>
            <ResumeDashboard />

            <table className={styles.table}>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <span>
                                        <span>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </span>
                                        <span>
                                            {header.column.getIsSorted() ===
                                                'asc' && '▲'}
                                            {header.column.getIsSorted() ===
                                                'desc' && '▼'}
                                        </span>
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
