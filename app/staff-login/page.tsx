'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';

export default function StaffLoginPage() {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const staffQuery = query(collection(db, 'staff'), where('pin', '==', pin));
      const staffDocs = await getDocs(staffQuery);

      if (staffDocs.empty) {
        setError('Invalid PIN');
        setLoading(false);
        return;
      }

      const staffData = staffDocs.docs[0].data();
      const storedPin = staffData.pin;
      const isMatch = await bcrypt.compare(pin, storedPin);

      if (isMatch) {
        router.push('/staff-dashboard');
      } else {
        setError('Invalid PIN');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-4xl font-bold text-gray-800">Staff Login</h1>
        <p className="mb-8 text-gray-600">Enter your PIN to access the dashboard</p>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="pin">
              PIN
            </label>
            <input
              id="pin"
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="focus:shadow-outline mb-3 w-full appearance-none rounded-lg border px-3 py-3 text-lg leading-tight text-gray-700 shadow-md focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="focus:shadow-outline rounded-lg bg-indigo-500 px-6 py-3 font-bold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-indigo-700 focus:outline-none"
              disabled={loading}
            >
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </div>
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
