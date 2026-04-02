import { buildApiUrl, resolveApiResponse } from "../../lib/api-helper";

export const fetchTimeSeries = async (params, signal) => {
  const url = buildApiUrl("/api/time-series", params);
  const resp = await fetch(url, { signal });
  return resolveApiResponse(resp);
};

export const fetchSMA = async (params, signal) => {
  const url = buildApiUrl("/api/sma", params);
  const resp = await fetch(url, { signal });
  return resolveApiResponse(resp);
};
