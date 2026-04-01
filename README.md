# Stock Dashboard — Price Chart + SMA

A minimal stock dashboard built with React + Vite and the Twelve Data API. It displays a closing price chart with a simple moving average (SMA) overlay.

## Features

- Ticker dropdown: `AAPL`, `MSFT`, `TSLA`
- Interval selector: `1min`, `5min`, `1h`, `1day`
- SMA period input (default 20)

## Tech Stack

- React + Vite
- Recharts
- SCSS
- Twelve Data REST API

## Setup

1. Install dependencies:

```bash
npm install
```

2. Add your API key:

Update `.env` with your Twelve Data key (defaults to `demo`).

```env
VITE_TWELVE_DATA_KEY=your_key_here
```

3. Run the app:

```bash
npm run dev
```

## Notes

- The free Twelve Data tier is rate-limited, so rapid control changes are debounced.
- If you see errors, try a different interval or ticker.

## Troubleshooting

- **API error or empty chart:** The free tier is rate-limited. Wait a minute and retry, or reduce rapid control changes.
- **Unauthorized / key errors:** Ensure `.env` contains `VITE_TWELVE_DATA_KEY=your_key` and restart `npm run dev`.
- **No data for interval:** Some tickers don’t have intraday data at all intervals. Try `1day` or another ticker.
