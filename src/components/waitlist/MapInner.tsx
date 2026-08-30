"use client";

import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { site } from "@/lib/content";

const pin = L.divIcon({
  className: "",
  html: `<span style="display:block;width:18px;height:18px;border-radius:9999px;background:#b81d1d;box-shadow:0 0 0 5px rgba(184,29,29,0.22),0 0 0 1.5px rgba(255,255,255,0.65);"></span>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

export default function MapInner() {
  const { lat, lng } = site.coords;
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={16}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ background: "#0a0a0a" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        maxZoom={20}
      />
      <Marker position={[lat, lng]} icon={pin}>
        <Tooltip permanent direction="top" offset={[0, -12]} className="lastlap-tip">
          LastLap
        </Tooltip>
      </Marker>
    </MapContainer>
  );
}
