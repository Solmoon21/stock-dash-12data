const TICKERS = ["AAPL", "MSFT", "TSLA"];

import "./SearchBar.scss";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <label className="search-bar__label" htmlFor="ticker">
        Ticker
      </label>
      <select
        id="ticker"
        className="search-bar__select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {TICKERS.map((ticker) => (
          <option key={ticker} value={ticker}>
            {ticker}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
