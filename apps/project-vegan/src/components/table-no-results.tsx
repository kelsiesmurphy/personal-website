import { TableRow, TableCell } from "@repo/ui/components/ui/table";
import React from "react";
import { columns } from "./table-columns";

export default function TableNoResults() {
  return (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        No results.
      </TableCell>
    </TableRow>
  );
}
