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
import { KeplerGlSchema } from "@kepler.gl/schemas";
import "./App.css";

const reducers = combineReducers({
  keplerGl: keplerGlReducer,
});

const store = createStore(
  reducers,
  {},
  applyMiddleware(...enhanceReduxMiddleware([]))
);

const geopulseMapConfig = {
  version: "v1",
  config: {
    visState: {
      filters: [
        {
          id: "hour-filter",
          dataId: ["h3_footfall"],
          name: ["HOUR"],
          type: "range",
          value: [0.5, 23.5],
          plotType: {
            type: "histogram",
          },
          animationWindow: "free",
          yAxis: null,
          view: "side",
          speed: 1,
          enabled: true,
        },
      ],

      layers: [
        {
          id: "mobile-gps-layer",
          type: "point",
          config: {
            dataId: "mobile_gps_pings",
            columnMode: "points",
            label: "mobile_gps_pings",
            color: [183, 136, 94],
            highlightColor: [252, 242, 26, 255],
            columns: {
              lat: "Latitude",
              lng: "Longitude",
            },
            isVisible: true,
            visConfig: {
              pulseTrigger: "continuous",
              pulseTimeField: "",
              pulseDurationMs: 1000,
              glowEnabled: false,
              glowExtent: 2,
              glowStrength: 0.5,
              pulseEnabled: false,
              pulseMode: "pulse",
              pulseSpeed: 1,
              pulseExpansion: 2,
              radius: 10,
              fixedRadius: false,
              opacity: 0.8,
              outline: false,
              thickness: 2,
              strokeColor: null,
              colorRange: {
                name: "Global Warming",
                type: "sequential",
                category: "Uber",
                colors: [
                  "#4C0035",
                  "#880030",
                  "#B72F15",
                  "#D6610A",
                  "#EF9100",
                  "#FFC300",
                ],
              },
              strokeColorRange: {
                name: "Global Warming",
                type: "sequential",
                category: "Uber",
                colors: [
                  "#4C0035",
                  "#880030",
                  "#B72F15",
                  "#D6610A",
                  "#EF9100",
                  "#FFC300",
                ],
              },
              radiusRange: [0, 50],
              filled: true,
              billboard: false,
              allowHover: true,
              showNeighborOnHover: false,
              showHighlightColor: true,
            },
            hidden: false,
            textLabel: [
              {
                field: null,
                color: [255, 255, 255],
                size: 18,
                weight: 400,
                offset: [0, 0],
                anchor: "start",
                alignment: "center",
                outlineWidth: 0,
                outlineColor: [255, 0, 0, 255],
                background: false,
                backgroundColor: [0, 0, 200, 255],
                collisionEnabled: false,
              },
            ],
          },
          visualChannels: {
            colorField: null,
            colorScale: "quantile",
            strokeColorField: null,
            strokeColorScale: "quantile",
            sizeField: null,
            sizeScale: "linear",
          },
        },

        {
          id: "h3-footfall-layer",
          type: "hexagonId",
          config: {
            dataId: "h3_footfall",
            label: "h3_footfall",
            color: [114, 12, 157],
            highlightColor: [252, 242, 26, 255],
            columns: {
              hex_id: "H3_INDEX",
            },
            isVisible: true,
            visConfig: {
              colorRange: {
                name: "Global Warming",
                type: "sequential",
                category: "Uber",
                colors: [
                  "#4C0035",
                  "#880030",
                  "#B72F15",
                  "#D6610A",
                  "#EF9100",
                  "#FFC300",
                ],
              },
              filled: true,
              opacity: 0.47,
              outline: false,
              strokeColor: null,
              strokeColorRange: {
                name: "Global Warming",
                type: "sequential",
                category: "Uber",
                colors: [
                  "#4C0035",
                  "#880030",
                  "#B72F15",
                  "#D6610A",
                  "#EF9100",
                  "#FFC300",
                ],
              },
              strokeOpacity: 0.8,
              thickness: 2,
              coverage: 1,
              enable3d: true,
              sizeRange: [0, 500],
              coverageRange: [0, 1],
              elevationScale: 5,
              enableElevationZoomFactor: true,
              fixedHeight: false,
            },
            hidden: false,
            textLabel: [
              {
                field: null,
                color: [255, 255, 255],
                size: 18,
                weight: 400,
                offset: [0, 0],
                anchor: "middle",
                alignment: "center",
                outlineWidth: 0,
                outlineColor: [255, 0, 0, 255],
                background: false,
                backgroundColor: [0, 0, 200, 255],
                collisionEnabled: false,
              },
            ],
          },
          visualChannels: {
            colorField: {
              name: "FOOTFALL",
              type: "integer",
            },
            colorScale: "quantile",
            strokeColorField: null,
            strokeColorScale: "quantile",
            sizeField: {
              name: "FOOTFALL",
              type: "integer",
            },
            sizeScale: "linear",
            coverageField: null,
            coverageScale: "linear",
          },
        },
      ],

      effects: [],
      annotations: [],

      interactionConfig: {
        tooltip: {
          fieldsToShow: {
            mobile_gps_pings: [
              {
                name: "DeviceID",
                format: null,
              },
              {
                name: "Latitude",
                format: null,
              },
              {
                name: "Longitude",
                format: null,
              },
              {
                name: "Timestamp",
                format: "L LTS",
              },
            ],
            h3_footfall: [
              {
                name: "H3_INDEX",
                format: null,
              },
              {
                name: "HOUR",
                format: null,
              },
              {
                name: "LATITUDE",
                format: null,
              },
              {
                name: "LONGITUDE",
                format: null,
              },
              {
                name: "FOOTFALL",
                format: null,
              },
              {
                name: "TOTAL_PINGS",
                format: null,
              },
            ],
          },
          timezone: null,
          compareMode: false,
          compareType: "absolute",
          enabled: true,
        },
        legend: {
          hideInvisibleLayers: false,
          enabled: false,
        },
        brush: {
          size: 2.5,
          enabled: false,
        },
        geocoder: {
          limitSearch: false,
          color: [255, 0, 0],
          enabled: false,
        },
        coordinate: {
          enabled: false,
        },
        annotation: {
          enabled: false,
        },
        zoomOpacity: {
          controllers: [],
          enabled: false,
        },
      },

      layerBlending: "normal",
      overlayBlending: "normal",
      splitMaps: [],
      animationConfig: {
        currentTime: null,
        speed: 1,
        timeFormat: null,
        timezone: null,
      },
      editor: {
        features: [],
        visible: true,
      },
      layerOrder: [
        "mobile-gps-layer",
        "h3-footfall-layer",
      ],
      groupBys: [],
      joins: [],
    },

    mapState: {
      bearing: 24,
      dragRotate: true,
      latitude: 11.061552541042545,
      longitude: 76.94245946868107,
      pitch: 50,
      zoom: 10.11289728450499,
      isSplit: false,
      isViewportSynced: true,
      isZoomLocked: false,
      splitMapViewports: [],
      maxPitch: 60,
      mapSplitMode: "SINGLE_MAP",
      swipeComparePercentage: 50,
      mapViewMode: "MODE_3D",
      globe: {
        enabled: false,
        config: {
          atmosphere: true,
          hugeHalo: true,
          hugeHaloRadius: 3.5,
          hugeHaloOpacity: 0.2,
          azimuth: false,
          azimuthAngle: 45,
          terminator: true,
          terminatorOpacity: 0.35,
          basemap: true,
          labels: false,
          labelsColor: [114.75, 114.75, 114.75],
          adminLines: true,
          adminLinesColor: [40, 63, 93],
          water: true,
          waterColor: [17, 35, 48],
          surface: true,
          surfaceColor: [9, 16, 29],
          backgroundColor: [4, 9, 17],
          stars: true,
        },
      },
    },

    mapStyle: {
      styleType: "dark-matter",
      topLayerGroups: {},
      visibleLayerGroups: {
        label: true,
        road: true,
        border: false,
        building: true,
        water: true,
        land: true,
        "3d building": false,
      },
      threeDBuildingColor: [
        15.035172933000911,
        15.035172933000911,
        15.035172933000911,
      ],
      backgroundColor: [0, 0, 0],
      mapStyles: {},
    },

    uiState: {
      mapControls: {
        mapLegend: {
          active: false,
        },
        chart: {
          active: false,
        },
        cameraBookmarks: {
          show: false,
          settings: {
            position: {
              x: 60,
              y: 20,
              anchorX: "right",
              anchorY: "top",
            },
            contentHeight: -1,
          },
        },
        mapInfo: {
          active: true,
          show: true,
        },
      },
      locale: "en",
      theme: "dark",
    },
  },
};

const parsedGeoPulseConfig =
  KeplerGlSchema.parseSavedConfig(geopulseMapConfig);

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
              centerMap: false,
              readOnly: false,
            },
          })
        );
      },
    });
  }, []);

  useEffect(() => {
    Papa.parse("/h3_footfall.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data.map((row) => [
          row.H3_INDEX,
          Number(row.HOUR),
          Number(row.LATITUDE),
          Number(row.LONGITUDE),
          Number(row.FOOTFALL),
          Number(row.TOTAL_PINGS),
        ]);

        const fields = [
          {
            name: "H3_INDEX",
            type: "string",
          },
          {
            name: "HOUR",
            type: "integer",
          },
          {
            name: "LATITUDE",
            type: "real",
          },
          {
            name: "LONGITUDE",
            type: "real",
          },
          {
            name: "FOOTFALL",
            type: "integer",
          },
          {
            name: "TOTAL_PINGS",
            type: "integer",
          },
        ];

        store.dispatch(
          addDataToMap({
            datasets: {
              info: {
                label: "GeoPulse H3 Footfall",
                id: "h3_footfall",
              },
              data: {
                fields,
                rows,
              },
            },
            options: {
              centerMap: false,
              readOnly: false,
            },
            config: parsedGeoPulseConfig,
          })
        );
      },
    });
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
              Interactive visualization of anonymized mobile GPS pings and
              hourly H3 footfall.
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