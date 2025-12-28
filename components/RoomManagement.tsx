'use client';

import { useState, useEffect } from 'react';

interface Room {
  id: string;
  roomNumber: string;
  type: string; // e.g., 'Single', 'Double', 'Suite'
  status: 'available' | 'occupied' | 'under-maintenance';
}

// Placeholder data for now
const placeholderRooms: Room[] = [
  { id: '1', roomNumber: '101', type: 'Single', status: 'available' },
  { id: '2', roomNumber: '102', type: 'Double', status: 'occupied' },
  { id: '3', roomNumber: '201', type: 'Suite', status: 'available' },
];

export default function RoomManagement() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [newRoomNumber, setNewRoomNumber] = useState('');
  const [newRoomType, setNewRoomType] = useState('Single');

  useEffect(() => {
    // In the future, this will fetch rooms from Firestore
    setRooms(placeholderRooms);
  }, []);

  const handleAddRoom = () => {
    if (newRoomNumber.trim() === '') return;

    const newRoom: Room = {
      id: new Date().toISOString(),
      roomNumber: newRoomNumber,
      type: newRoomType,
      status: 'available'
    };
    setRooms([...rooms, newRoom]);
    setNewRoomNumber('');
  };

  const handleDeleteRoom = (roomId: string) => {
    setRooms(rooms.filter(room => room.id !== roomId));
  };

  return (
    <div style={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: '2rem', borderRadius: '12px' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Room Management</h2>

      {/* Add Room Form */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <input 
          type="text" 
          placeholder="Room Number" 
          value={newRoomNumber} 
          onChange={e => setNewRoomNumber(e.target.value)} 
          style={inputStyle}
        />
        <select value={newRoomType} onChange={e => setNewRoomType(e.target.value)} style={inputStyle}>
          <option>Single</option>
          <option>Double</option>
          <option>Suite</option>
        </select>
        <button onClick={handleAddRoom} style={buttonStyle}>Add Room</button>
      </div>

      {/* Room List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {rooms.map(room => (
          <li key={room.id} style={{ padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>Room {room.roomNumber} ({room.type})</div>
              <div style={{textTransform: 'capitalize'}}>{room.status}</div>
            </div>
            <button onClick={() => handleDeleteRoom(room.id)} style={deleteButtonStyle}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
    padding: '0.5rem',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
};

const buttonStyle: React.CSSProperties = {
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
};

const deleteButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: '#ef4444',
};
