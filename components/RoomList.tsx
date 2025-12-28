'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

interface Room {
  id: string;
  roomNumber: string;
  type: string;
  price: number;
  status: string;
}

export default function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'rooms'));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const roomData: Room[] = [];
        if (querySnapshot.empty) {
          console.log('No rooms found.');
        }
        querySnapshot.forEach((doc) => {
          roomData.push({ id: doc.id, ...doc.data() } as Room);
        });
        setRooms(roomData);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching rooms:", err);
        setError('Failed to load rooms. Please try again later.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading rooms...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Rooms</h2>
       {rooms.length === 0 ? (
        <p className="text-gray-600">No rooms found.</p>
      ) : (
      <div className="overflow-x-auto rounded-lg bg-white shadow-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Room Number
              </th>
              <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Type
              </th>
               <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Price
              </th>
               <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <p className="whitespace-no-wrap text-gray-900">{room.roomNumber}</p>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <p className="whitespace-no-wrap text-gray-900">{room.type}</p>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <p className="whitespace-no-wrap text-gray-900">${room.price}</p>
                </td>
                <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                  <span className={`relative inline-block px-3 py-1 font-semibold leading-tight text-green-900`}>
                      <span
                        aria-hidden
                        className={`absolute inset-0 ${room.status === 'Available' ? 'bg-green-200' : 'bg-red-200'} rounded-full opacity-50`}
                      ></span>
                      <span className="relative">{room.status}</span>
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
