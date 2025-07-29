import { useState } from 'react';
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getExpandedRowModel,
    useReactTable,
    type ColumnDef,
    type SortingState,
} from '@tanstack/react-table';
import {
    Table,
    TableHead,
    TableRow,
    TableHeadCell,
    TableBody,
    TableCell,
} from 'flowbite-react';

import styles from './SortableTable.module.scss';

interface SortableTableProps<T> {
    data: T[];
    columns: ColumnDef<T, T[keyof T]>[];
    getSubRows?: (row: T) => T[] | undefined;
}

export function SortableTable<T>({
    data,
    columns,
    getSubRows,
}: SortableTableProps<T>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [expanded, setExpanded] = useState({});

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            expanded,
        },
        onSortingChange: setSorting,
        onExpandedChange: setExpanded,
        getSubRows,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    });

    return (
        <div className="overflow-hidden rounded-xl border-1 border-black">
            <Table hoverable>
                <TableHead>
                    {table.getHeaderGroups().map((headerGroup, groupIdx) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(
                                (header, headerIdx, array) => {
                                    const isFirstRow = groupIdx === 0;
                                    const isFirstCell = headerIdx === 0;
                                    const isLastCell =
                                        headerIdx === array.length - 1;

                                    const roundedClass =
                                        isFirstRow && isFirstCell
                                            ? 'rounded-tl-lg'
                                            : isFirstRow && isLastCell
                                              ? 'rounded-tr-lg'
                                              : '';

                                    return (
                                        <TableHeadCell
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                            className={`cursor-pointer select-none bg-[var(--color-primary-600)] text-[var(--color-secondary-50)] ${roundedClass}`}
                                        >
                                            <div className="flex items-center justify-between w-full">
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {header.column.getIsSorted() ===
                                                    'asc' && '▲'}
                                                {header.column.getIsSorted() ===
                                                    'desc' && '▼'}
                                            </div>
                                        </TableHeadCell>
                                    );
                                }
                            )}
                        </TableRow>
                    ))}
                </TableHead>

                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            className={`border-b border-gray-200 ${styles.stripedRow} group
                                text-[var(--color-secondary-900)]`}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="px-3 py-2">
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
    );
}
