import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface MapPin {
  lat: number;
  lng: number;
  label: string;
}

interface FakeMapProps {
  pins?: MapPin[];
  center?: [number, number];
  zoom?: number;
  className?: string;
}

const defaultPins: MapPin[] = [
  { lat: 52.3676, lng: 4.9041, label: "Legal aid" },
  { lat: 52.3784, lng: 4.8900, label: "Buddy programme" },
  { lat: 52.3550, lng: 4.9200, label: "Dutch lessons" },
  { lat: 52.3850, lng: 4.8700, label: "Grocery help" },
  { lat: 52.3950, lng: 4.9150, label: "Youth mentorship" },
];

const FakeMap = ({
  pins = defaultPins,
  center = [52.3676, 4.9041],
  zoom = 13,
  className = "h-48",
}: FakeMapProps) => {
  return (
    <div className={`rounded-xl overflow-hidden border ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
        attributionControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {pins.map((pin, i) => (
          <Marker key={i} position={[pin.lat, pin.lng]}>
            <Popup>{pin.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default FakeMap;
