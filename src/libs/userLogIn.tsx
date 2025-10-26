export type LoginResponse = {
  success: boolean;
  token?: string;
  data?: any;
  message?: string;
};

const endpoints = [
  "https://a08-venue-explorer-backend.vercel.app/api/v1/auth/login",
  "https://a08-venue-explorer-backend-2.vercel.app/api/v1/auth/login",
  "https://a08-venue-explorer-backend-3.vercel.app/api/v1/auth/login",
];

export default async function userLogIn(userEmail: string, userPassword: string): Promise<LoginResponse> {
  const body = JSON.stringify({ email: userEmail, password: userPassword });
  let lastError: unknown = null;
  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      const json = await res.json();
      if (!res.ok) {
        lastError = json;
        continue;
      }
      return json as LoginResponse;
    } catch (err) {
      lastError = err;
      continue;
    }
  }
  throw new Error(`Failed to login: ${String(lastError)}`);
}
