export default function GuestsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Guests</h1>
      <p className="mt-2 text-gray-600">Manage your hotel guests.</p>
      <div className="mt-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
              <td className="px-6 py-4 whitespace-nowrap">john.doe@example.com</td>
              <td className="px-6 py-4 whitespace-nowrap">555-1234</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
              <td className="px-6 py-4 whitespace-nowrap">jane.smith@example.com</td>
              <td className="px-6 py-4 whitespace-nowrap">555-5678</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
