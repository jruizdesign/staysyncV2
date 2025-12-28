'use client';

import withAuth from '@/components/withAuth';
import SettingsForm from '@/components/SettingsForm';

function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white p-4 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        </div>
      </header>
      <main className="flex-1 bg-gray-100 p-8">
        <div className="mx-auto max-w-7xl">
          <SettingsForm />
        </div>
      </main>
    </div>
  );
}

export default withAuth(SettingsPage, ['manager']);
