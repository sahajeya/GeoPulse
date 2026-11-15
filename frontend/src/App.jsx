
import { useEffect, useState } from "react";
import Papa from "papaparse";
import { Provider } from "react-redux";
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import KeplerGl from "@kepler.gl/components";
import keplerGlReducer, {
  enhanceReduxMiddleware,
} from "@kepler.gl/reducers";
import { addDataToMap } from "@kepler.gl/actions";
import "./App.css";

const reducers = combineReducers({
  keplerGl: keplerGlReducer,
});

const store = createStore(
  reducers,
  {},
  applyMiddleware(...enhanceReduxMiddleware([]))
);

function GeoPulseDashboard() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    Papa.parse("/store_cannibalization.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setStores(results.data);
      },
    });
  }, []);

  useEffect(() => {
    Papa.parse("/mobile_gps_pings.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
         setTimeout(() => {
           const rows = results.data.map((row) => [
              row.DeviceID,
              Number(row.Latitude),
              Number(row.Longitude),
              row.Timestamp,
          ]);

        const fields = [
          {
            name: "DeviceID",
            type: "string",
          },
          {
            name: "Latitude",
            type: "real",
          },
          {
            name: "Longitude",
            type: "real",
          },
          {
            name: "Timestamp",
            type: "timestamp",
          },
        ];

        store.dispatch(
          addDataToMap({
            datasets: {
              info: {
                label: "GeoPulse Mobile GPS Pings",
                id: "mobile_gps_pings",
              },
              data: {
                fields,
                rows,
              },
            },
            options: {
              centerMap: true,
              readOnly: false,
            },
          })
        );
      },500);
    }});
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>GeoPulse</h1>
          <p>Hyper-Local Retail Mobility Analytics</p>
        </div>
      </header>

      <main className="content">
        <section className="hero">
          <h2>Store Cannibalization Analysis</h2>
          <p>
            Identify visitor overlap between nearby retail stores.
          </p>
        </section>

        <section className="table-card">
          <h3>Store Pair Analysis</h3>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Store A</th>
                  <th>Store B</th>
                  <th>Store A Visitors</th>
                  <th>Store B Visitors</th>
                  <th>Shared Visitors</th>
                  <th>Cannibalization</th>
                </tr>
              </thead>

              <tbody>
                {stores.map((row, index) => (
                  <tr key={index}>
                    <td>{row.STORE_A}</td>
                    <td>{row.STORE_B}</td>
                    <td>{row.STORE_A_VISITORS}</td>
                    <td>{row.STORE_B_VISITORS}</td>
                    <td>{row.SHARED_VISITORS}</td>
                    <td>{row.CANNIBALIZATION_PERCENT}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="map-card">
          <div className="map-header">
            <h3>Mobile GPS Footfall Map</h3>
            <p>
              Interactive visualization of anonymized mobile GPS pings.
            </p>
          </div>

          <div className="kepler-map">
            <KeplerGl
              id="geopulse-map"
              mapboxApiAccessToken=""
              width="100%"
              height={600}
              appName="GeoPulse"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <GeoPulseDashboard />
    </Provider>
  );
}

export default App;
