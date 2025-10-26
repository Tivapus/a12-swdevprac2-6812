"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn('credentials', { redirect: false, email, password });
    setLoading(false);
    if (res && (res as any).ok) {
      router.push('/');
    } else {
      setError('Sign in failed. Check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screren min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col shadow-md rounded-lg p-6 gap-8 bg-white w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-black">Sign in to Venue Explorer</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2 text-black" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2 text-black" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex items-center justify-between text-gray-700">
            <button disabled={loading} type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-60">{loading ? 'Signing in...' : 'Sign In'}</button>
            <a href="#" className="text-sm">Forgot password?</a>
          </div>
        </form>
        <div className="mt-4 text-sm text-gray-600">Use the backend test account to sign in.</div>
      </div>
    </div>
  );
}
