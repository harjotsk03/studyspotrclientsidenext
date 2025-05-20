import ListView from "../../components/findaspot/listview.js";
import MapView from "../../components/findaspot/mapview.js";
import Layout from "../../components/layouts/Layout";
import {useViewContext} from '../../context/viewContext.js';

export default function findaspot() {
  const { view } = useViewContext();
  return (
    <Layout>
      <div className="w-screen h-screen overflow-hidden">
        <div className="relative h-full w-full">
          <div
            className={`h-full w-full flex transition-all duration-700 transform`}
          >
            <div
              className={`h-full bg-backgroundLight dark:bg-backgroundDark z-30 transition-all duration-700 ${
                view === "list" ? "w-full lg:w-1/3" : "w-0"
              }`}
            >
              <ListView />
            </div>

            <div
              className={`h-full bg-backgroundLight dark:bg-backgroundDark transition-all duration-700 ${
                view === "list" ? "w-0 lg:w-2/3" : "w-full"
              }`}
            >
              <MapView />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
