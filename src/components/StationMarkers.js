import StationMarker from "./StationMarker";

export default function StationMarkers({
  stationsInfo,
  stationsStatus,
  setSelectedStationId,
}) {
  return stationsInfo.map((info) => {
    const stationStatus = stationsStatus.find(
      (it) => info.station_id === it.station_id
    );
    return (
      <StationMarker
        stationStatus={stationStatus}
        stationInfo={info}
        setSelectedStationId={setSelectedStationId}
      />
    );
  });
}
