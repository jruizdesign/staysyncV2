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
              role: 'staff', // Default role for new accounts is 'staff'
              propertyId: null, // This can be assigned later by a manager
            });
          }
        } catch (err: any) {
          console.error(err);
        }
      }
    });
  };

  return (
    <div style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: "12px", boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)", backdropFilter: "blur(4px)", border: "1px solid rgba(255, 255, 255, 0.18)", maxWidth: "400px", width: "100%", padding: "2rem" }}>
        <h1 style={{ color: "white", fontSize: "2.5rem", fontWeight: "bold", textAlign: "center", marginBottom: "1rem" }}>Create Staff Account</h1>
        <p style={{ color: "#ddd", textAlign: "center", marginBottom: "2rem" }}>Add a new staff member to the system</p>
        <form onSubmit={handleRegister}>
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
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          <Link href="/" style={{ color: "#ddd", textAlign: "center", display: "block" }}>
            Back to Login
          </Link>
          {error && <p style={{ marginTop: "1rem", color: "#ff6f61", textAlign: "center" }}>{error.message}</p>}
        </form>
      </div>
    </div>
  );
}
