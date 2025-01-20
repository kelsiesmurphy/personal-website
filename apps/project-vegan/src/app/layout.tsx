import type { Metadata } from "next";
import "@repo/ui/globals.css";
import "leaflet/dist/leaflet.css";
import { Toaster } from "@repo/ui/components/ui/sonner";

export const metadata: Metadata = {
  title: "Glasgow Vegan Map",
  description: "A map of the vegan restaurants in Glasgow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
