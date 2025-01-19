import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";

export function TableSection({
  restaurants,
  selectedLocation,
  setSelectedLocation,
}: any) {
  return (
    <ScrollArea className="h-[800px] w-full">
      <Table>
        <TableCaption>
          A list of vegan-friendly restaurants in Glasgow City Centre.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Vegan Options</TableHead>
            <TableHead>Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {restaurants.map((restaurant: any) => (
            <TableRow
              key={restaurant.name}
              className={`h-24 ${selectedLocation === restaurant ? "bg-secondary hover:bg-secondary" : ""}`}
              onClick={() => setSelectedLocation(restaurant)}
            >
              <TableCell className="font-medium">{restaurant.name}</TableCell>
              <TableCell>{restaurant.address}</TableCell>
              <TableCell>{restaurant.veganOptions}</TableCell>
              <TableCell>{restaurant.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
