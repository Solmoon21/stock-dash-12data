import { API_BASE, DEFAULT_OUTPUT_SIZE, MAX_OUTPUT_SIZE } from "./consts.js";

export const buildQuery = (params = {}) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  });
  const query = search.toString();
  return query ? `?${query}` : "";
};

export const buildApiUrl = (path, params) => {
  return `${path}${buildQuery(params)}`;
};

export const buildUrl = (path, params) => {
  return `${API_BASE}${path}${buildQuery(params)}`;
};

export const clampOutputSize = (value) => {
  if (value === undefined || value === null || value === "") return DEFAULT_OUTPUT_SIZE;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_OUTPUT_SIZE;
  return Math.min(Math.floor(parsed), MAX_OUTPUT_SIZE);
};

export const badRequest = (res, message) => {
  res.status(400).json({ error: message });
};

export const resolveApiResponse = async (res) => {
  if (!res.ok) {
    let body = "";
    try {
      body = await res.text();
    } catch (err) {
      body = "";
    }
    const suffix = body ? ` - ${body}` : "";
    throw new Error(`HTTP ${res.status}${suffix}`);
  }
  const data = await res.json();
  if (data?.status === "error") {
    throw new Error(data?.message || "Twelve Data error");
  }
  if (data?.error) {
    throw new Error(data.error);
  }
  return data;
};

export const resolveResponse = async (url, signal) => {
  const res = await fetch(url, { signal });
  return resolveApiResponse(res);
};
