import { useEffect, useMemo, useState } from "react";
import { fetchSMA, fetchTimeSeries } from "../api/twelvedata";

const useDebouncedValue = (value, delayMs) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(handle);
  }, [value, delayMs]);

  return debounced;
};

const toAscending = (values = []) => {
  return values.reverse();
};

const normalizeTimeSeries = (values = []) => {
  return values.map((item) => ({
    datetime: item.datetime,
    close: Number(item.close),
  }));
};

const normalizeSmaSeries = (values = []) => {
  return values.map((item) => ({
    datetime: item.datetime,
    sma: item.sma ? Number(item.sma) : undefined,
  }));
};

export const useStockData = ({ symbol, interval, smaPeriod }) => {
  const debouncedInterval = useDebouncedValue(interval, 500);
  const debouncedSmaPeriod = useDebouncedValue(smaPeriod, 500);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!symbol) return;

    const controller = new AbortController();

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const [priceRes, smaRes] = await Promise.all([
          fetchTimeSeries(
            {
              symbol,
              interval: debouncedInterval,
            },
            controller.signal
          ),
          fetchSMA(
            {
              symbol,
              interval: debouncedInterval,
              time_period: debouncedSmaPeriod,
            },
            controller.signal
          ),
        ]);

        const priceSeries = toAscending(normalizeTimeSeries(priceRes?.values));
        const smaSeries = toAscending(normalizeSmaSeries(smaRes?.values));

        const smaByDatetime = new Map(smaSeries.map((item) => [item.datetime, item.sma]));

        const merged = priceSeries.map((item) => ({
          datetime: item.datetime,
          close: item.close,
          sma: smaByDatetime.get(item.datetime) ?? null,
        }));

        setData(merged);
      } catch (err) {
        if (err?.name === "AbortError") return;
        setError(err?.message || "Failed to load data.");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => controller.abort();
  }, [symbol, debouncedInterval, debouncedSmaPeriod]);

  const meta = useMemo(() => {
    if (!data.length) return null;
    const first = data[0].close;
    const last = data[data.length - 1].close;
    const change = ((last - first) / first) * 100;
    return {
      last,
      change,
    };
  }, [data]);

  return {
    data,
    loading,
    error,
    meta,
  };
};
