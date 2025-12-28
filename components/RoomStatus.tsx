'use client';

import { useState, useEffect } from 'react';

interface Room {
  id: string;
  roomNumber: string;
  status: 'clean' | 'dirty' | 'under-maintenance';
}

// Placeholder data for now
const placeholderRooms: Room[] = [
  { id: '1', roomNumber: '101', status: 'clean' },
  { id: '2', roomNumber: '102', status: 'dirty' },
  { id: '3', roomNumber: '103', status: 'clean' },
  { id: '4', roomNumber: '201', status: 'under-maintenance' },
  { id: '5', roomNumber: '202', status: 'dirty' },
];

export default function RoomStatus() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    // In the future, this will fetch rooms from Firestore
    setRooms(placeholderRooms);
  }, []);

  const handleStatusChange = (roomId: string, newStatus: Room['status']) => {
    setRooms(rooms.map(room => room.id === roomId ? { ...room, status: newStatus } : room));
  };

  return (
    <div style={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: '2rem', borderRadius: '12px' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Room Status</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {rooms.map(room => (
          <li key={room.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', marginBottom: '0.5rem' }}>
            <span>Room {room.roomNumber}</span>
            <select value={room.status} onChange={(e) => handleStatusChange(room.id, e.target.value as Room['status'])} style={selectStyle}>
              <option value="clean">Clean</option>
              <option value="dirty">Dirty</option>
              <option value="under-maintenance">Under Maintenance</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  padding: '0.5rem',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: 'white',
};
