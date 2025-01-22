"use client";

import { TableSection } from "@/components/table-section";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@repo/ui/components/ui/resizable";
import dynamic from "next/dynamic";
import { useMemo, useState, useEffect } from "react";
import { veganRestaurants as testRestaurants } from "@/content/restaurants";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { Restaurant } from "@/content/restaurants";

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<Restaurant | null>(
    null
  );
  const [restaurants, setRestaurants] = useState<Restaurant[]>(testRestaurants); 

  const Map = useMemo(
    () =>
      dynamic(() => import("../components/map-section"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (process.env.NEXT_PUBLIC_USE_LIVE_DATA === "true") {
        const allRecords = [];
        let offset = null;

        try {
          do {
            const url = new URL(
              "https://api.airtable.com/v0/appSjNQb6RypjOwtE/tblCOINQTsnWRQXiW"
            );
            url.searchParams.append("pageSize", "100");
            if (offset) url.searchParams.append("offset", offset);

            const response = await fetch(url.toString(), {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`,
              },
            });

            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }

            const data = await response.json();
            allRecords.push(...data.records);
            offset = data.offset;
          } while (offset);

          const formattedData = allRecords.map((record) => ({
            id: record.id,
            name: record.fields.name,
            address: record.fields.address,
            cityArea: record.fields.cityArea,
            cuisine: record.fields.cuisine,
            veganOptions: record.fields.veganOptions,
            jRating: record.fields.jRating,
            notes: record.fields.notes,
          }));

          console.log(formattedData);

          setRestaurants(formattedData);
        } catch (error) {
          console.error("Error fetching live data:", error);
        }
      }
    };

    fetchRestaurants();
  }, []);

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
                  restaurants={restaurants}
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
                restaurants={restaurants}
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
            restaurants={restaurants}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </div>
        <div className="p-6">
          <TableSection
            restaurants={restaurants}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </div>
      </div>
    </main>
  );
}
