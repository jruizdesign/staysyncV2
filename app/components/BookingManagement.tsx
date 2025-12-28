'use client';

import { useState, useEffect } from 'react';

interface Booking {
  id: string;
  guestName: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  status: 'upcoming' | 'checked-in' | 'completed';
}

// Placeholder data for now
const placeholderBookings: Booking[] = [
  { id: '1', guestName: 'John Doe', roomNumber: '101', checkInDate: '2024-08-15', checkOutDate: '2024-08-20', status: 'upcoming' },
  { id: '2', guestName: 'Jane Smith', roomNumber: '205', checkInDate: '2024-08-16', checkOutDate: '2024-08-18', status: 'checked-in' },
  { id: '3', guestName: 'Peter Jones', roomNumber: '301', checkInDate: '2024-08-17', checkOutDate: '2024-08-22', status: 'upcoming' },
];

export default function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // In the future, this will fetch bookings from Firestore
    setBookings(placeholderBookings);
  }, []);

  const handleCheckIn = (bookingId: string) => {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: 'checked-in' } : b));
  };

  const handleCheckOut = (bookingId: string) => {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: 'completed' } : b));
  };

  return (
    <div style={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: '2rem', borderRadius: '12px' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Booking Management</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {bookings.map(booking => (
          <li key={booking.id} style={{ padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{booking.guestName} - Room {booking.roomNumber}</div>
              <div>Check-in: {booking.checkInDate} | Check-out: {booking.checkOutDate}</div>
              <div style={{ textTransform: 'capitalize', fontWeight: 'bold', color: booking.status === 'completed' ? '#ef4444' : '#14b8a6' }}>{booking.status}</div>
            </div>
            <div>
              {booking.status === 'upcoming' && <button onClick={() => handleCheckIn(booking.id)} style={buttonStyle}>Check In</button>}
              {booking.status === 'checked-in' && <button onClick={() => handleCheckOut(booking.id)} style={buttonStyle}>Check Out</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
    background: 'linear-gradient(to right, #ff6f61, #ff9966)',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginLeft: '1rem'
};
