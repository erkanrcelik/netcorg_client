"use client";

import * as React from "react";
import {useEffect, useState} from "react";
import {ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useSearchParams} from "next/navigation";
import {SearchProcessRequest} from "@/services/types/search";
import {useSearchProcess} from "@/services/api/search";
import {epochToDate, formatDuration} from "@/utils/time";

interface DataType {
  aname: string;
  title: string;
  pname: string;
  totalDuration: string;
  start_time: string;
  end_time: string;
}


export function DataTableDemo() {
  const searchParams = useSearchParams();

  const filter = searchParams.get("filter");
  const searchTerm = searchParams.get("searchTerm");

  const initialFilters: SearchProcessRequest = {
    limit: 10,
    offset: 0,
    aname: filter === 'aname' ? searchTerm : undefined,
    pname: filter === 'pname' ? searchTerm : undefined,
    title: filter === 'title' ? searchTerm : undefined,
  };

  useEffect(
    () => {
      const filter = searchParams.get('filter');
      const searchTerm = searchParams.get('searchTerm');
      setFilters({
        ...filters,
        aname: filter === 'aname' ? searchTerm : undefined,
        pname: filter === 'pname' ? searchTerm : undefined,
        title: filter === 'title' ? searchTerm : undefined,
      });
      refetch()
    },
    [searchParams]
  )


  const [filters, setFilters] = React.useState<SearchProcessRequest>(initialFilters)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const {data: fetchedData, isLoading, refetch} = useSearchProcess({...filters, offset: pagination.pageIndex, limit: pagination.pageSize});

  const columns: ColumnDef<DataType>[] = [
    {
      accessorKey: "aname",
      header: "Application Name",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "pname",
      header: "Process Name",
    },
    {
      accessorKey: "start_time",
      header: "Start Date",
      cell: ({ row }) => {
        const start_time = row.original.start_time;
        return epochToDate(parseInt(start_time))
      },
    },
    {
      accessorKey: "end_time",
      header: "End Date",
      cell: ({ row }) => {
        const endTime = row.original.end_time;
        return endTime ? epochToDate(parseInt(endTime)) : <span className="text-green-400">Active Process</span>;
      },
    },
    {
      accessorKey: "totalDuration",
      header: "Duration (s)",
      cell: ({ row }) => {
        const duration = parseInt(row.original.totalDuration);
        return duration ? formatDuration(duration) : <span className="text-green-400">Active Process</span>;
      },
    },

  ];

  const table = useReactTable({
    data: fetchedData?.items || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    state: {
      pagination
    },
    pageCount: Math.ceil((fetchedData?.total) / fetchedData?.limit)
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {`Showing ${pagination.pageIndex + 1} of ${table.getPageCount()} - ${table.getRowModel().rows.length} row(s) displayed.`}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
