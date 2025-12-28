'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import StaffManagement from '@/components/StaffManagement';
import RoomManagement from '@/components/RoomManagement';

// Placeholder component for other sections
const BookingManagement = () => <div style={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: '2rem', borderRadius: '12px' }}>Booking Management Section</div>;

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('staff');
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/'); // Redirect to login page after sign out
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'staff':
        return <StaffManagement />;
      case 'rooms':
        return <RoomManagement />;
      case 'bookings':
        return <BookingManagement />;
      default:
        return <StaffManagement />;
    }
  };

  return (
    <div style={{ background: "linear-gradient(to right, #1e3a8a, #3b82f6)", minHeight: "100vh", color: "white" }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Admin Dashboard</h1>
        <button
          onClick={handleSignOut}
          style={{ background: '#ef4444', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </header>

      <nav style={{ display: 'flex', justifyContent: 'center', padding: '1rem', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
        <button onClick={() => setActiveTab('staff')} style={{ ...tabStyle, ...(activeTab === 'staff' && activeTabStyle) }}>Staff</button>
        <button onClick={() => setActiveTab('rooms')} style={{ ...tabStyle, ...(activeTab === 'rooms' && activeTabStyle) }}>Rooms</button>
        <button onClick={() => setActiveTab('bookings')} style={{ ...tabStyle, ...(activeTab === 'bookings' && activeTabStyle) }}>Bookings</button>
      </nav>

      <main style={{ padding: '2rem' }}>
        {renderContent()}
      </main>
    </div>
  );
}

const tabStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'white',
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  cursor: 'pointer',
  borderBottom: '2px solid transparent',
};

const activeTabStyle: React.CSSProperties = {
  borderBottom: '2px solid #3b82f6',
  fontWeight: 'bold',
};
