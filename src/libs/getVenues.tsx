import { VenueJson } from "../../interface";

const endpoints = [
  "https://a08-venue-explorer-backend.vercel.app/api/v1/venues",
  "https://a08-venue-explorer-backend-2.vercel.app/api/v1/venues",
  "https://a08-venue-explorer-backend-3.vercel.app/api/v1/venues",
];

export default async function getVenues(): Promise<VenueJson> {
  let lastError: unknown = null;
  for (const url of endpoints) {
    try {
  const res = await fetch(url);
      if (!res.ok) {
        lastError = new Error(`HTTP ${res.status} from ${url}`);
        continue;
      }
      const json = (await res.json()) as VenueJson;
      return json;
    } catch (err) {
      lastError = err;
      continue;
    }
  }
  throw new Error(`Failed to fetch venues from all endpoints: ${String(lastError)}`);
}
