'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

interface Booking {
  id: string;
  guestName: string;
  roomNumber: string;
  date: string;
  status: string;
}

export default function BookingList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'bookings'));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const bookingData: Booking[] = [];
        if (querySnapshot.empty) {
          console.log('No bookings found.');
        }
        querySnapshot.forEach((doc) => {
          bookingData.push({ id: doc.id, ...doc.data() } as Booking);
        });
        setBookings(bookingData);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching bookings:", err);
        setError('Failed to load bookings. Please try again later.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Bookings</h2>
       {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
      <div className="overflow-x-auto rounded-lg bg-white shadow-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Guest Name
              </th>
              <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Room Number
              </th>
               <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Date
              </th>
               <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <p className="whitespace-no-wrap text-gray-900">{booking.guestName}</p>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <p className="whitespace-no-wrap text-gray-900">{booking.roomNumber}</p>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <p className="whitespace-no-wrap text-gray-900">{booking.date}</p>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <span className={`relative inline-block px-3 py-1 font-semibold leading-tight text-green-900`}>
                      <span
                        aria-hidden
                        className={`absolute inset-0 ${booking.status === 'Confirmed' ? 'bg-green-200' : 'bg-yellow-200'} rounded-full opacity-50`}
                      ></span>
                      <span className="relative">{booking.status}</span>
                    </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}
