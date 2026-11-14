import { useEffect, useState } from "react";
import Papa from "papaparse";
import "./App.css";

function App() {
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
                    <td>
                      {row.CANNIBALIZATION_PERCENT}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;