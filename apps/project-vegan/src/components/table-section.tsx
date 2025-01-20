"use client";

import * as React from "react";
import {
  ColumnDef,
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
import { ArrowUpDown, ChevronDown, Map } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { Input } from "@repo/ui/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { Restaurant } from "@/content/restaurants";

export const columns: ColumnDef<Restaurant>[] = [
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      const address: string = row.getValue("address");

      const handleMapClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        const query = encodeURIComponent(name + ", " + address);
        const mapsUrl = `https://www.google.com/maps?q=${query}`;
        window.open(mapsUrl, "_blank");
      };

      return (
        <Button variant="outline" size="icon" onClick={handleMapClick}>
          <Map />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "cuisine",
    header: "Cuisine",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("cuisine")}</div>
    ),
  },
  {
    accessorKey: "veganOptions",
    header: "Options",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("veganOptions")}</div>
    ),
  },
  {
    accessorKey: "jRating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("jRating")}</div>
    ),
  },
  {
    accessorKey: "cityArea",
    header: "Area",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("cityArea")}</div>
    ),
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("notes")}</div>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div
        onClick={() => {
          navigator.clipboard.writeText(row.getValue("address"));
          toast("Copied address to clipboard!");
        }}
        className="capitalize hover:underline cursor-pointer flex gap-2 items-center"
      >
        {row.getValue("address")}
      </div>
    ),
  },
];

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
  const [rowSelection, setRowSelection] = React.useState({});
  const data = restaurants;

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
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
      <div className="flex items-center py-4 space-x-4">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
                  className={`h-24 ${selectedLocation === row.original ? "bg-popover hover:bg-popover" : ""}`}
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
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
