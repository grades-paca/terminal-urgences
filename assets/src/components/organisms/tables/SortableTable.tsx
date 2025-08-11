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
    columnVisibility?: Record<string, boolean>;
}

export function SortableTable<T>({
    data,
    columns,
    getSubRows,
    columnVisibility = {},
}: SortableTableProps<T>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [expanded, setExpanded] = useState({});

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            expanded,
            columnVisibility: columnVisibility,
        },
        onSortingChange: setSorting,
        onExpandedChange: setExpanded,
        getSubRows,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    });

    return (
        <div className="relative shadow-md sm:rounded-lg rounded-xl border-1 border-black">
            <Table className="w-full table-fixed" hoverable>
                <colgroup>
                    {table.getFlatHeaders().map((h) => (
                        <col key={h.id} style={{ width: h.getSize() }} />
                    ))}
                </colgroup>

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
                                            ? 'rounded-tl-xl sm:rounded-tl-lg'
                                            : isFirstRow && isLastCell
                                              ? 'rounded-tr-xl sm:rounded-tr-lg'
                                              : '';

                                    return (
                                        <TableHeadCell
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler?.()}
                                            style={{ width: header.getSize() }}
                                            className={`cursor-pointer select-none bg-[var(--color-primary-600)] text-[var(--color-secondary-50)] ${roundedClass} px-2 py-2`}
                                        >
                                            {!header.isPlaceholder && (
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
                                            )}
                                        </TableHeadCell>
                                    );
                                }
                            )}
                        </TableRow>
                    ))}
                </TableHead>

                <TableBody>
                    {table.getRowModel().rows.map((row, rowIdx) => {
                        const isLastRow =
                            rowIdx === table.getRowModel().rows.length - 1;

                        return (
                            <TableRow
                                key={row.id}
                                className={`
                                  ${isLastRow ? '' : 'border-b border-gray-200'}
                                  ${styles.stripedRow} group
                                  text-[var(--color-secondary-900)]
                                  ${(row.original as { disabled?: boolean })?.disabled ? styles.disabledRow : ''}
                                `}
                            >
                                {row
                                    .getVisibleCells()
                                    .map((cell, cellIdx, cellArray) => {
                                        const isFirstCell = cellIdx === 0;
                                        const isLastCell =
                                            cellIdx === cellArray.length - 1;

                                        const bottomRoundedClass =
                                            isLastRow && isFirstCell
                                                ? 'rounded-bl-xl sm:rounded-bl-lg'
                                                : isLastRow && isLastCell
                                                  ? 'rounded-br-xl sm:rounded-br-lg'
                                                  : '';

                                        return (
                                            <TableCell
                                                key={cell.id}
                                                style={{
                                                    width: cell.column.getSize(),
                                                }}
                                                className={`px-2 py-2 ${bottomRoundedClass}`}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        );
                                    })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
