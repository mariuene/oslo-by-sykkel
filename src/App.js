import * as React from "react";
import { useState, useEffect } from "react";
import Map from "react-map-gl";
import StationMarkers from "./components/StationMarkers";
import MapPopup from "./components/MapPopup";

const token = ""; // get token from https://www.mapbox.com/

export default function App() {
  const [stationsInfo, setStationsInfo] = useState(null);
  const [stationsStatus, setStationsStatus] = useState(null);
  const [selectedStationId, setSelectedStationId] = useState(null);
  const fetchData = async (url, setFunction) => {
    const bikedata = await (await fetch(url)).json();
    setFunction(bikedata.data.stations);
  };

  useEffect(() => {
    fetchData(
      "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json",
      setStationsInfo
    );
    fetchData(
      "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json",
      setStationsStatus
    );
  }, []);

  const selectedStationStatus = !!selectedStationId
    ? stationsStatus.find((it) => selectedStationId === it.station_id)
    : null;

  const selectedStationInfo = !!selectedStationId
    ? stationsInfo.find((it) => selectedStationId === it.station_id)
    : null;

  return (
    <Map
      mapLib={import("mapbox-gl")}
      mapboxAccessToken={token}
      initialViewState={{
        longitude: 10.745554465095147,
        latitude: 59.91358429853196,
        zoom: 13,
      }}
      style={{ width: "100%", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {!!stationsInfo && !!stationsStatus && (
        <StationMarkers
          stationsStatus={stationsStatus}
          stationsInfo={stationsInfo}
          selectedStation={selectedStationId}
          setSelectedStationId={setSelectedStationId}
        />
      )}
      {!!selectedStationStatus && !!selectedStationInfo && (
        <MapPopup
          selectedStationStatus={selectedStationStatus}
          selectedStationInfo={selectedStationInfo}
          setSelectedStationId={setSelectedStationId}
        />
      )}
    </Map>
  );
}
