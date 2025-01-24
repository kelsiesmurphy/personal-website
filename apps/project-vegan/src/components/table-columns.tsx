import { Restaurant } from "@/content/restaurants_test_data";
import { Button } from "@repo/ui/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Map } from "lucide-react";
import { toast } from "sonner";

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
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "cuisine",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cuisine
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("cuisine")}</div>
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
