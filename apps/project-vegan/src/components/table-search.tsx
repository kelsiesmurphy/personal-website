import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { Input } from "@repo/ui/components/ui/input";
import { ChevronDown } from "lucide-react";
import React from "react";

export default function TableSearch({
  filterInput,
  setFilterInput,
  table,
}: any) {
  return (
    <div className="flex items-center flex-wrap py-4 gap-4">
      <Input
        placeholder="Filter by name or cuisine..."
        value={filterInput}
        onChange={(event) => setFilterInput(event.target.value)}
        className="md:max-w-sm"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full md:w-fit">
            Columns <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column: any) => column.getCanHide())
            .map((column: any) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
