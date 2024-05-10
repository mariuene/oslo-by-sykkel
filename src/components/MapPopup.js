import { Popup } from "react-map-gl";

export default function MapPopup({
  selectedStationInfo,
  selectedStationStatus,
  setSelectedStationId,
}) {
  return (
    <Popup
      anchor="top"
      longitude={selectedStationInfo.lon}
      latitude={selectedStationInfo.lat}
      onClose={() => setSelectedStationId(null)}
    >
      <div>
        <p>Station Name: {selectedStationInfo.name}</p>
        <p>Capacity: {selectedStationInfo.capacity}</p>
        <p>Bikes avalible: {selectedStationStatus.num_bikes_available}</p>
        <p>Docs avalible: {selectedStationStatus.num_docks_available}</p>
      </div>
    </Popup>
  );
}
