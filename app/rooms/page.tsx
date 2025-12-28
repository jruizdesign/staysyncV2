export default function RoomsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Rooms</h1>
      <p className="mt-2 text-gray-600">Manage your hotel rooms.</p>
      <div className="mt-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">101</td>
              <td className="px-6 py-4 whitespace-nowrap">Single</td>
              <td className="px-6 py-4 whitespace-nowrap">$100</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Available
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">202</td>
              <td className="px-6 py-4 whitespace-nowrap">Double</td>
              <td className="px-6 py-4 whitespace-nowrap">$150</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  Occupied
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
