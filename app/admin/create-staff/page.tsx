'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import withAuth from '@/components/withAuth';
import StaffList from '@/components/StaffList';
import Link from 'next/link';

function CreateStaffPage() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPin = await bcrypt.hash(pin, salt);

      await addDoc(collection(db, 'staff'), {
        name,
        role,
        pin: hashedPin,
        propertyId: 'property1', // Hardcoded for now
      });

      setSuccess(true);
      setName('');
      setRole('');
      setPin('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <Link href="/staff-dashboard" className="text-indigo-500 hover:text-indigo-800">
            Go to Staff Dashboard
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-2 text-3xl font-bold text-gray-800">Create Staff Member</h2>
            <p className="mb-8 text-gray-600">Add a new staff member to your property</p>
            <form onSubmit={handleCreateStaff}>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="focus:shadow-outline w-full appearance-none rounded-lg border px-3 py-3 text-lg leading-tight text-gray-700 shadow-md focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="role">
                  Role
                </label>
                <input
                  id="role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="focus:shadow-outline w-full appearance-none rounded-lg border px-3 py-3 text-lg leading-tight text-gray-700 shadow-md focus:outline-none"
                  required
                />
              </div>
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
                  {loading ? 'Creating...' : 'Create Staff'}
                </button>
              </div>
              {error && <p className="mt-4 text-center text-red-500">{error}</p>}
              {success && <p className="mt-4 text-center text-green-500">Staff member created successfully!</p>}
            </form>
          </div>
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <StaffList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(CreateStaffPage, ['manager']);
