"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { Restaurant } from "@/content/restaurants_test_data";
import TableSearch from "./table-search";
import { columns } from "./table-columns";
import TableNoResults from "./table-no-results";

export function TableSection({
  restaurants,
  selectedLocation,
  setSelectedLocation,
}: {
  restaurants: Restaurant[];
  selectedLocation: Restaurant | null;
  setSelectedLocation: React.Dispatch<React.SetStateAction<Restaurant | null>>;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "jRating", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection] = React.useState({});
  const [filterInput, setFilterInput] = React.useState<string>("");

  const filteredData = React.useMemo(() => {
    if (!filterInput) return restaurants;

    return restaurants.filter((restaurant) => {
      const name = restaurant.name.toLowerCase();
      const cuisine = restaurant.cuisine.toLowerCase();
      const query = filterInput.toLowerCase();

      return name.includes(query) || cuisine.includes(query);
    });
  }, [filterInput, restaurants]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    manualPagination: true,
  });

  return (
    <div className="w-full px-1 space-y-6">
      <h1 className="text-2xl font-semibold">Vegan options around Glasgow</h1>
      <TableSearch
        filterInput={filterInput}
        setFilterInput={setFilterInput}
        table={table}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => setSelectedLocation(row.original)}
                  className={`h-24 ${
                    selectedLocation === row.original
                      ? "bg-popover hover:bg-popover"
                      : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableNoResults />
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
