import { API_BASE } from "./consts";

export const buildUrl = (path, params) => {
  const url = new URL(`${API_BASE}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });
  return url;
};

export const resolveResponse = async (url, signal) => {
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const data = await res.json();
  if (data?.status === "error") {
    throw new Error(data?.message || "Twelve Data error");
  }
  return data;
};
