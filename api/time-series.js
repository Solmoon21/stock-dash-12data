import { badRequest, buildUrl, clampOutputSize, resolveResponse } from "../lib/api-helper.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { symbol, interval, outputsize } = req.query || {};

  if (!symbol) return badRequest(res, "Missing required param: symbol");
  if (!interval) return badRequest(res, "Missing required param: interval");

  try {
    const url = buildUrl("/time_series", {
      apikey: process.env.TWELVE_DATA_KEY,
      symbol,
      interval,
      outputsize: clampOutputSize(outputsize),
    });
    const data = await resolveResponse(url);
    res.status(200).json(data);
  } catch (err) {
    res.status(502).json({ error: err?.message || "Twelve data request failed" });
  }
}
