import { useState, useEffect, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 4.6097,
  lng: -74.0817,
};

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

interface MapComponentProps {
  pickupLocation?: google.maps.LatLngLiteral;
  deliveryLocation?: google.maps.LatLngLiteral;
  showDirections?: boolean;
}

export default function MapComponent({ pickupLocation, deliveryLocation, showDirections }: MapComponentProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState(defaultCenter);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(pos);
          setUserLocation(pos);
          if (map) {
            map.panTo(pos);
          }
        },
        () => {
          console.log("Error getting location");
        }
      );
    }
  }, [map]);

  useEffect(() => {
    if (showDirections && pickupLocation && deliveryLocation && isLoaded && window.google) {
      const directionsService = new window.google.maps.DirectionsService();
      
      const request: google.maps.DirectionsRequest = {
        origin: userLocation || pickupLocation,
        destination: deliveryLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      if (userLocation) {
        request.waypoints = [{ location: pickupLocation, stopover: true }];
      }

      directionsService.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      });
    } else {
      setDirections(null);
    }
  }, [showDirections, pickupLocation, deliveryLocation, userLocation, isLoaded]);

  if (!isLoaded) {
    return <div className="w-full h-full bg-gray-200 animate-pulse rounded-2xl" />;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      {userLocation && <Marker position={userLocation} title="Tu ubicación" />}
      {pickupLocation && (
        <Marker
          position={pickupLocation}
          title="Punto de Recogida"
          icon="https://maps.google.com/mapfiles/ms/icons/orange-dot.png"
        />
      )}
      {deliveryLocation && (
        <Marker
          position={deliveryLocation}
          title="Punto de Entrega"
          icon="https://maps.google.com/mapfiles/ms/icons/green-dot.png"
        />
      )}
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: "#FF3C00", // Brand color for the route
              strokeWeight: 5,
            },
          }}
        />
      )}
    </GoogleMap>
  );
}
