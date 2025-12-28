'use client';

import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';

declare const grecaptcha: any;

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute('6LfvIzksAAAAAMVWM11Tqw1sAmCkD8tGW7SLN92a', {action: 'REGISTER'});
      if (token) {
        try {
          const newUser = await createUserWithEmailAndPassword(email, password);
          if (newUser) {
            await setDoc(doc(db, 'users', newUser.user.uid), {
              email: newUser.user.email,
              role: 'manager',
              propertyId: null,
            });
          }
        } catch (err: any) {
          console.error(err);
        }
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-4xl rounded-lg bg-white shadow-lg">
        <div className="hidden w-1/2 lg:block">
          <img
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Hotel"
            className="h-full w-full rounded-l-lg object-cover"
          />
        </div>
        <div className="w-full p-8 lg:w-1/2">
          <h1 className="mb-2 text-4xl font-bold text-gray-800">Create an Account</h1>
          <p className="mb-8 text-gray-600">Join us and manage your property</p>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded-lg border px-3 py-3 text-lg leading-tight text-gray-700 shadow-md focus:outline-none"
                required
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
              <Link href="/login" className="inline-block align-baseline text-sm font-bold text-indigo-500 hover:text-indigo-800">
                Already have an account?
              </Link>
            </div>
            {error && <p className="mt-4 text-center text-red-500">{error.message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
