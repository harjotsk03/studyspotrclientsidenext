import { useState } from "react";
import MapView from "../../components/addaspot/mapview.js";
import Layout from "../../components/layouts/Layout";
import NewSpotInfo from "../../components/addaspot/newspotinfo.js";
import AuthLayout from "../../components/layouts/AuthLayout.js";

export default function addaspot() {
  const [selectedSpot, setSelectedSpot] = useState(false);
  return (
    <AuthLayout>
      <div className="w-screen h-screen overflow-hidden">
        <div className="relative h-full w-full">
          <button onClick={() => setSelectedSpot(!selectedSpot)} className="bg-white z-50 fixed top-32 right-3">TEST</button>
          <div
            className={`h-full w-full flex transition-all duration-700 transform`}
          >
            <div
              className={`h-full bg-backgroundLight dark:bg-backgroundDark transition-all duration-1000 ${
                selectedSpot ? "w-full lg:w-1/3" : "w-0 lg:w-1/3"
              }`}
            >
              <NewSpotInfo selectedSpot={selectedSpot} setSelectedSpot={setSelectedSpot}/>
            </div>

            <div
              className={`h-full bg-backgroundLight dark:bg-backgroundDark transition-all duration-1000 ${
                selectedSpot ? "w-0 lg:w-2/3" : "w-full lg:w-2/3"
              }`}
            >
              <MapView
                selectedSpot={selectedSpot}
                setSelectedSpot={setSelectedSpot}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
