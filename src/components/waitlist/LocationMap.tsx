"use client";

import dynamic from "next/dynamic";

// Leaflet touches window, so load the actual map client-side only.
const MapInner = dynamic(() => import("./MapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-night">
      <span className="t-small text-muted-foreground">Loading map...</span>
    </div>
  ),
});

export function LocationMap() {
  return <MapInner />;
}
