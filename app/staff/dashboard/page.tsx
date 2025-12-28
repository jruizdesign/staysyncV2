'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import MyTasks from '@/components/MyTasks';
import RoomStatus from '@/components/RoomStatus';
import BookingManagement from '@/components/BookingManagement';

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState('tasks');
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/'); // Redirect to login page after sign out
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'tasks':
        return <MyTasks />;
      case 'rooms':
        return <RoomStatus />;
      case 'bookings':
        return <BookingManagement />;
      default:
        return <MyTasks />;
    }
  };

  return (
    <div style={{ background: "linear-gradient(to right, #0f766e, #14b8a6)", minHeight: "100vh", color: "white" }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Staff Dashboard</h1>
        <button
          onClick={handleSignOut}
          style={{ background: '#ef4444', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </header>

      <nav style={{ display: 'flex', justifyContent: 'center', padding: '1rem', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
        <button onClick={() => setActiveTab('tasks')} style={{ ...tabStyle, ...(activeTab === 'tasks' && activeTabStyle) }}>My Tasks</button>
        <button onClick={() => setActiveTab('rooms')} style={{ ...tabStyle, ...(activeTab === 'rooms' && activeTabStyle) }}>Room Status</button>
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
  borderBottom: '2px solid #14b8a6',
  fontWeight: 'bold',
};
