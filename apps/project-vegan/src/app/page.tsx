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

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState(null);
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
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 min-h-screen"
      >
        <ResizablePanel minSize={20} defaultSize={40}>
          <div className="flex h-full items-center justify-center p-6">
            <TableSection
              restaurants={veganRestaurants}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={60} minSize={20}>
          <div className="flex h-full bg-gray-200 items-center justify-center">
            <Map
              restaurants={veganRestaurants}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
