import { VenueJson, VenueItem } from "../../interface";

const endpoints = [
  "https://a08-venue-explorer-backend.vercel.app/api/v1/venues",
  "https://a08-venue-explorer-backend-2.vercel.app/api/v1/venues",
  "https://a08-venue-explorer-backend-3.vercel.app/api/v1/venues",
];

export default async function getVenue(vid: string): Promise<VenueJson | VenueItem> {
  let lastError: unknown = null;
  for (const base of endpoints) {
    const url = `${base}/${encodeURIComponent(vid)}`;
    try {
  const res = await fetch(url);
      if (!res.ok) {
        lastError = new Error(`HTTP ${res.status} from ${url}`);
        continue;
      }
      const json = (await res.json()) as any;
      // If the response contains `data`, return the full response (tests expect `.data`).
      if (json && (json.data !== undefined)) {
        return json as VenueJson;
      }
      // API may sometimes return an array or single item directly — normalize to VenueJson shape
      if (Array.isArray(json) && json.length > 0) {
        return { success: true, count: json.length, pagination: {}, data: json } as VenueJson;
      }
      if (json && (json as any)._id) {
        return { success: true, count: 1, pagination: {}, data: [json] } as VenueJson;
      }
    } catch (err) {
      lastError = err;
      continue;
    }
  }
  throw new Error(`Failed to fetch venue ${vid} from all endpoints: ${String(lastError)}`);
}
