'use client';

import { useState, useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

declare const grecaptcha: any;

export default function StaffLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute('6LfvIzksAAAAAMVWM11Tqw1sAmCkD8tGW7SLN92a', {action: 'LOGIN'});
      if (token) {
        signInWithEmailAndPassword(email, password);
      }
    });
  };

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role === 'manager') {
            router.push('/admin/dashboard');
          } else {
            router.push('/staff/dashboard');
          }
        } else {
          // Handle case where user data doesn't exist in Firestore
        }
      };
      fetchUserData();
    }
  }, [user, router]);

  return (
    <div style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: "12px", boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)", backdropFilter: "blur(4px)", border: "1px solid rgba(255, 255, 255, 0.18)", maxWidth: "400px", width: "100%", padding: "2rem" }}>
        <h1 style={{ color: "white", fontSize: "2.5rem", fontWeight: "bold", textAlign: "center", marginBottom: "1rem" }}>Staff Portal</h1>
        <p style={{ color: "#ddd", textAlign: "center", marginBottom: "2rem" }}>Sign in to manage your hotel</p>
        <form onSubmit={handleSignIn}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="email" style={{ display: "block", color: "#ddd", marginBottom: "0.5rem" }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "0.75rem", border: "none", borderRadius: "8px", backgroundColor: "rgba(255, 255, 255, 0.2)", color: "white" }}
              required
            />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="password" style={{ display: "block", color: "#ddd", marginBottom: "0.5rem" }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "0.75rem", border: "none", borderRadius: "8px", backgroundColor: "rgba(255, 255, 255, 0.2)", color: "white" }}
              required
            />
          </div>
          <button
            type="submit"
            style={{ width: "100%", background: "linear-gradient(to right, #ff6f61, #ff9966)", color: "white", padding: "0.75rem", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", marginBottom: "1rem" }}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          <Link href="/register" style={{ color: "#ddd", textAlign: "center", display: "block" }}>
            Create a Staff Account
          </Link>
          {error && <p style={{ marginTop: "1rem", color: "#ff6f61", textAlign: "center" }}>{error.message}</p>}
        </form>
      </div>
    </div>
  );
}
