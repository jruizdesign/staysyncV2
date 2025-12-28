'use client';

import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">Login</h1>
        <button
          onClick={() => signInWithGoogle()}
          className="flex w-full items-center justify-center rounded-md bg-blue-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-600"
        >
          Sign in with Google
        </button>
        {error && <p className="mt-4 text-center text-red-500">{error.message}</p>}
      </div>
    </div>
  );
}
