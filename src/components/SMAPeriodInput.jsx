import "./SMAPeriodInput.scss";

const SMAPeriodInput = ({ value, onChange }) => {
  return (
    <div className="sma-input">
      <label className="sma-input__label" htmlFor="smaPeriod">
        SMA Period
      </label>
      <input
        id="smaPeriod"
        className="sma-input__field"
        type="number"
        min={2}
        max={200}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
};

export default SMAPeriodInput;
