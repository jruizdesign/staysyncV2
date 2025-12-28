export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="mt-2 text-gray-600">Manage your hotel settings.</p>

      <div className="mt-8 space-y-8">
        <div>
          <h2 className="text-xl font-semibold">General</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="hotel-name" className="block text-sm font-medium text-gray-700">
                Hotel Name
              </label>
              <input
                type="text"
                id="hotel-name"
                defaultValue="StaySync"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="hotel-email" className="block text-sm font-medium text-gray-700">
                Hotel Email
              </label>
              <input
                type="email"
                id="hotel-email"
                defaultValue="contact@staysync.com"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Notifications</h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <input
                id="email-notifications"
                name="email-notifications"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-900">
                Email notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="sms-notifications"
                name="sms-notifications"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="sms-notifications" className="ml-2 block text-sm text-gray-900">
                SMS notifications
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
