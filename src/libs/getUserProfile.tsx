export type UserProfileResponse = {
  success: boolean;
  data?: {
    _id: string;
    name: string;
    email: string;
    tel?: string;
    role?: string;
    createdAt?: string;
    [key: string]: any;
  };
};

const endpoints = [
  "https://a08-venue-explorer-backend.vercel.app/api/v1/auth/me",
  "https://a08-venue-explorer-backend-2.vercel.app/api/v1/auth/me",
  "https://a08-venue-explorer-backend-3.vercel.app/api/v1/auth/me",
];

export default async function getUserProfile(token: string): Promise<UserProfileResponse> {
  let lastError: unknown = null;
  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) {
        lastError = json;
        continue;
      }
      return json as UserProfileResponse;
    } catch (err) {
      lastError = err;
      continue;
    }
  }
  throw new Error(`Failed to fetch profile: ${String(lastError)}`);
}
