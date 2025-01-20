"use client";

import { TableSection } from "@/components/table-section";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@repo/ui/components/ui/resizable";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { veganRestaurants } from "@/content/restaurants";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { Restaurant } from "@/content/restaurants";

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<Restaurant | null>(
    null
  );
  const Map = useMemo(
    () =>
      dynamic(() => import("../components/map-section"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <main>
      <div className="hidden md:block">
        <ResizablePanelGroup
          direction="horizontal"
          className="flex-1 min-h-screen"
        >
          <ResizablePanel defaultSize={70} minSize={20}>
            <div className="flex h-full items-center justify-center p-6">
              <ScrollArea className="h-[800px] w-full">
                <TableSection
                  restaurants={veganRestaurants}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                />
              </ScrollArea>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={30} minSize={20}>
            <div className="flex h-full bg-gray-200 items-center justify-center">
              <Map
                restaurants={veganRestaurants}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="md:hidden">
        <div className="rounded-2xl overflow-hidden h-80 m-6">
          <Map
            restaurants={veganRestaurants}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </div>
        <div className="p-6">
          <TableSection
            restaurants={veganRestaurants}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </div>
      </div>
    </main>
  );
}
