import "./PriceBadge.scss";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

const formatPercent = (value) => `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;

const PriceBadge = ({ symbol, meta }) => {
  if (!meta) return null;

  const isUp = meta.change >= 0;

  return (
    <div className="price-badge">
      <div>
        <div className="price-badge__label">{symbol} latest</div>
        <div className="price-badge__value">{formatPrice(meta.last)}</div>
      </div>
      <div
        className={`price-badge__change ${
          isUp ? "price-badge__change--up" : "price-badge__change--down"
        }`}
      >
        {formatPercent(meta.change)}
      </div>
    </div>
  );
};

export default PriceBadge;
