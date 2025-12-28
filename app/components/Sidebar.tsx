import Link from "next/link";
import {
  LayoutDashboard,
  BedDouble,
  Users,
  CalendarCheck2,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Hotel MS
      </div>
      <nav className="flex-1 py-4">
        <ul>
          <li className="px-6 py-3 hover:bg-gray-700 rounded-r-full transition-colors duration-200">
            <Link href="/" className="flex items-center space-x-3">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="px-6 py-3 hover:bg-gray-700 rounded-r-full transition-colors duration-200">
            <Link href="/bookings" className="flex items-center space-x-3">
              <CalendarCheck2 size={20} />
              <span>Bookings</span>
            </Link>
          </li>
          <li className="px-6 py-3 hover:bg-gray-700 rounded-r-full transition-colors duration-200">
            <Link href="/rooms" className="flex items-center space-x-3">
              <BedDouble size={20} />
              <span>Rooms</span>
            </Link>
          </li>
          <li className="px-6 py-3 hover:bg-gray-700 rounded-r-full transition-colors duration-200">
            <Link href="/guests" className="flex items-center space-x-3">
              <Users size={20} />
              <span>Guests</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="px-6 py-4 border-t border-gray-700">
        <ul>
          <li className="px-6 py-3 hover:bg-gray-700 rounded-r-full transition-colors duration-200">
            <Link href="/settings" className="flex items-center space-x-3">
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
