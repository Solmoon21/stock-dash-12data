import { API_KEY } from "./consts";
import { buildUrl, resolveResponse } from "./utils";

export const fetchTimeSeries = (params, signal) => {
  const url = buildUrl("/time_series", {
    apikey: API_KEY,
    outputsize: 120,
    ...params,
  });
  return resolveResponse(url, signal);
};

export const fetchSMA = (params, signal) => {
  const url = buildUrl("/sma", {
    apikey: API_KEY,
    ...params,
  });
  return resolveResponse(url, signal);
};
