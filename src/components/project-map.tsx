"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import Link from "next/link";
import { locations } from "@/data/locations";

const pin = divIcon({
  className: "",
  html: '<span style="display:block;width:14px;height:14px;border-radius:9999px;background:#c2632f;border:2px solid #f3ede2;box-shadow:0 0 0 4px rgba(194,99,47,0.25)"></span>',
  iconSize: [14, 14],
  iconAnchor: [7, 7]
});

export function ProjectMap() {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-[20px] border border-line">
      <MapContainer
        center={[27, 40]}
        zoom={4}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", background: "#14120f" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {locations.map((loc) => (
          <Marker key={loc.label} position={[loc.lat, loc.lng]} icon={pin}>
            <Popup>
              <Link href={`/projects/${loc.slug}`} className="text-sm font-medium">
                {loc.label}
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
