import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Welcome to StaySync</h1>
      <p className="mt-2 text-gray-600">Your all-in-one hotel management solution.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold">Total Bookings</h2>
          <p className="mt-2 text-3xl font-bold">150</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold">Occupancy Rate</h2>
          <p className="mt-2 text-3xl font-bold">75%</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold">Available Rooms</h2>
          <p className="mt-2 text-3xl font-bold">25</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold">Total Guests</h2>
          <p className="mt-2 text-3xl font-bold">300</p>
        </div>
      </div>
    </div>
  );
}
