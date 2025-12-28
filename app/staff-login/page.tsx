'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import bcrypt from 'bcryptjs';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  pin?: string;
}

export default function StaffLoginPage() {
  const [user] = useAuthState(auth);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const fetchStaff = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const propertyId = userData.propertyId || 'property1'; // Use hardcoded propertyId for now
          const staffQuery = query(collection(db, 'staff'), where('propertyId', '==', propertyId));
          const staffSnapshot = await getDocs(staffQuery);
          const staffList = staffSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StaffMember));
          setStaff(staffList);
        }
      };
      fetchStaff();
    }
  }, [user]);

  const handlePinLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!selectedStaff) {
      setError('Please select a staff member.');
      setLoading(false);
      return;
    }

    try {
      const staffDoc = await getDoc(doc(db, 'staff', selectedStaff.id));
      if (staffDoc.exists()) {
        const staffData = staffDoc.data() as StaffMember;
        if (staffData.pin) {
          const pinMatch = await bcrypt.compare(pin, staffData.pin);
          if (pinMatch) {
            console.log(`Successfully logged in ${selectedStaff.name}`);
            // Redirect to a staff dashboard or other appropriate page
          } else {
            setError('Invalid PIN');
          }
        } else {
          setError('PIN not set for this staff member.');
        }
      } else {
        setError('Staff member not found.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setSelectedStaff(null);
      setPin('');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">Staff Login</h1>
        {selectedStaff ? (
          <form onSubmit={handlePinLogin}>
            <p className="text-center text-lg">Enter PIN for {selectedStaff.name}</p>
            <div className="my-4">
              <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="pin">
                PIN
              </label>
              <input
                id="pin"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <button
                type="button"
                className="text-sm font-bold text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedStaff(null)}
              >
                Cancel
              </button>
            </div>
            {error && <p className="mt-4 text-center text-red-500">{error}</p>}
          </form>
        ) : (
          <div>
            <p className="text-center text-lg">Select your name to log in:</p>
            <div className="mt-4 space-y-2">
              {staff.map(staffMember => (
                <button
                  key={staffMember.id}
                  onClick={() => setSelectedStaff(staffMember)}
                  className="block w-full rounded bg-gray-200 px-4 py-2 text-left text-gray-800 hover:bg-gray-300"
                >
                  {staffMember.name} - {staffMember.role}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
