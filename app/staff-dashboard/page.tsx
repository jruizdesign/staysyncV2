'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import withAuth from '@/components/withAuth';

function StaffDashboard() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white p-4 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Staff Dashboard</h1>
          {user && (
            <div className="flex items-center">
              <span className="mr-4 text-gray-600">Welcome, {user.displayName || user.email}</span>
              <button
                onClick={handleLogout}
                className="focus:shadow-outline rounded-lg bg-indigo-500 px-4 py-2 font-bold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-indigo-700 focus:outline-none"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1 bg-gray-100 p-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-600">Welcome to the staff dashboard. Here you can manage your tasks and view important information.</p>
        </div>
      </main>
    </div>
  );
}

export default withAuth(StaffDashboard, ['staff', 'manager']);
