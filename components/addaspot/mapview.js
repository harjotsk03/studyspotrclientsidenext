"use client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import useGeolocation from "../../hooks/useGeolocation";
import { useViewContext } from "../../context/viewContext";
import { FaCrosshairs } from "react-icons/fa";

export default function MapView({ selectedSpot }) {
  const { location: userLocation } = useGeolocation();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [theme, setTheme] = useState("light");

  const lightStyle = "mapbox://styles/studyspotr/cm3wa1bm4001m01rc57lp98sh";
  const darkStyle = "mapbox://styles/studyspotr/cm3wi1qqh003201sl9v72escf";

  // Update theme from localStorage or system
  useEffect(() => {
    const getTheme = () =>
      localStorage.theme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(getTheme());
  }, []);

  // Recreate map on location load
  useEffect(() => {
    if (!userLocation || map.current || !mapContainer.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: theme === "dark" ? darkStyle : lightStyle,
      center: [userLocation.lng, userLocation.lat],
      zoom: 14,
    });

    map.current.on("load", () => setMapReady(true));

    const userMarker = document.createElement("div");
    userMarker.style.width = "18px";
    userMarker.style.height = "18px";
    userMarker.style.borderRadius = "50%";
    userMarker.style.backgroundColor = "#000";
    userMarker.style.border = "2px solid white";
    userMarker.style.boxShadow = "0 0 4px rgba(0,0,0,0.5)";
    new mapboxgl.Marker({ element: userMarker })
      .setLngLat([userLocation.lng, userLocation.lat])
      .addTo(map.current);

  }, [userLocation, theme]);

  // Watch for theme change
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
      if (map.current && newTheme !== theme) {
        setTheme(newTheme);
        map.current.setStyle(newTheme === "dark" ? darkStyle : lightStyle);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [theme]);

  const resetMapView = () => {
    if (map.current && userLocation) {
      map.current.resize();
      map.current.flyTo({
        center: [userLocation.lng, userLocation.lat],
        zoom: 16,
        bearing: 0,
        pitch: 0,
        essential: true,
      });
    }
  };

  if (!userLocation) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        Loading map...
      </div>
    );
  }

  return (
    <>
      <div
        id="map"
        className={`
          w-full h-screen transition-all duration-500 ease-in-out
        `}
      >
        <div ref={mapContainer} className="w-full h-full" />
      </div>

      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={resetMapView}
          className="z-50 bg-white text-purple-800 dark:bg-darkBG dark:text-purple-400 p-4 rounded-lg shadow-2xl"
        >
          <FaCrosshairs />
        </button>
      </div>
    </>
  );
}
