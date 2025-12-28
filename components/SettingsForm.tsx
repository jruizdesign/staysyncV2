'use client';

import { useState } from 'react';

export default function SettingsForm() {
  const [hotelName, setHotelName] = useState('My Hotel');
  const [notifications, setNotifications] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Save settings to Firebase
    console.log('Settings saved!');
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-6">
        <label htmlFor="hotelName" className="mb-2 block text-sm font-bold text-gray-700">
          Hotel Name
        </label>
        <input
          type="text"
          id="hotelName"
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
      </div>
      <div className="mb-6">
        <label className="mb-2 block text-sm font-bold text-gray-700">Notifications</label>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="notifications"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="mr-2 leading-tight"
          />
          <label htmlFor="notifications" className="text-sm text-gray-700">
            Enable email notifications
          </label>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          Save Settings
        </button>
      </div>
    </form>
  );
}
