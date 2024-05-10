import { Marker } from "react-map-gl";

function getEmoji(precentage) {
  switch (true) {
    case precentage > 80: {
      return "0x1F7E2";
    }
    case precentage > 40: {
      return "0x1F7E1";
    }
    case precentage > 20: {
      return "0x1F7E0";
    }
    default:
      return "0x1F534";
  }
}

export default function StationMarker({
  stationInfo,
  stationStatus,
  setSelectedStationId,
}) {
  const avalibleBikePrecentage =
    (stationStatus.num_bikes_available / stationInfo.capacity) * 100;
  return (
    <Marker
      longitude={stationInfo.lon}
      latitude={stationInfo.lat}
      key={stationInfo.station_id}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setSelectedStationId(stationInfo.station_id);
        }}
      >
        {String.fromCodePoint(getEmoji(avalibleBikePrecentage))}
      </div>
    </Marker>
  );
}
