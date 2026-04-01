import { useEffect, useState } from "react";
import "./App.scss";
import IntervalSelector from "./components/IntervalSelector";
import PriceBadge from "./components/PriceBadge";
import PriceChart from "./components/PriceChart";
import SearchBar from "./components/SearchBar";
import SMAPeriodInput from "./components/SMAPeriodInput";
import { useStockData } from "./hooks/useStockData";

const App = () => {
  const [symbol, setSymbol] = useState("AAPL");
  const [interval, setInterval] = useState("1day");
  const [smaPeriod, setSmaPeriod] = useState(20);
  const [theme, setTheme] = useState("light");

  const { data, loading, error, meta } = useStockData({
    symbol,
    interval,
    smaPeriod,
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">Stock Dashboard</p>
          <h1>Price chart with SMA</h1>
        </div>
        <div className="hero__actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            {theme === "light" ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 4.75a.75.75 0 0 1 .75.75V7a.75.75 0 0 1-1.5 0V5.5a.75.75 0 0 1 .75-.75Zm0 11.5a.75.75 0 0 1 .75.75V19a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75Zm7.25-4.25a.75.75 0 0 1-.75.75H17a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75Zm-11.5 0a.75.75 0 0 1-.75.75H5.5a.75.75 0 0 1 0-1.5H7a.75.75 0 0 1 .75.75Zm9.03-4.28a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0Zm-7.47 7.47a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0Zm7.47 1.06a.75.75 0 0 1-1.06 0l-1.06-1.06a.75.75 0 1 1 1.06-1.06l1.06 1.06a.75.75 0 0 1 0 1.06ZM8.31 8.31a.75.75 0 0 1-1.06 0L6.19 7.25a.75.75 0 1 1 1.06-1.06l1.06 1.06a.75.75 0 0 1 0 1.06ZM12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.03 14.42a8.78 8.78 0 0 1-10.45-10.45.75.75 0 0 0-1.02-.84A9.5 9.5 0 1 0 21.9 15.44a.75.75 0 0 0-.87-1.02Z" />
              </svg>
            )}
          </button>
          <PriceBadge symbol={symbol} meta={meta} />
        </div>
      </header>

      <section className="controls">
        <SearchBar value={symbol} onChange={setSymbol} />
        <IntervalSelector value={interval} onChange={setInterval} />
        <SMAPeriodInput value={smaPeriod} onChange={setSmaPeriod} />
      </section>

      {error ? (
        <div className="state-card state-card--error">
          <h3>We hit an issue.</h3>
          <p>{error}</p>
          <p>Try another ticker or wait a moment before retrying.</p>
        </div>
      ) : null}

      {loading ? (
        <div className="state-card state-card--loading">
          <div className="skeleton" />
          <div className="skeleton" />
          <div className="skeleton" />
        </div>
      ) : null}

      {!loading && !error && data.length ? <PriceChart data={data} /> : null}

      {!loading && !error && !data.length ? (
        <div className="state-card">
          <h3>No data returned.</h3>
          <p>Try another interval or ticker.</p>
        </div>
      ) : null}
    </div>
  );
};

export default App;
