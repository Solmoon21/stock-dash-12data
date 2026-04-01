const INTERVALS = [
  { label: "1 min", value: "1min" },
  { label: "5 min", value: "5min" },
  { label: "1 hour", value: "1h" },
  { label: "1 day", value: "1day" },
];

import "./IntervalSelector.scss";

const IntervalSelector = ({ value, onChange }) => {
  return (
    <div className="interval-selector">
      <span className="interval-selector__label">Interval</span>
      <div className="interval-selector__segments">
        {INTERVALS.map((interval) => (
          <button
            key={interval.value}
            type="button"
            className={`interval-selector__segment ${
              value === interval.value ? "interval-selector__segment--active" : ""
            }`}
            onClick={() => onChange(interval.value)}
          >
            {interval.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IntervalSelector;
