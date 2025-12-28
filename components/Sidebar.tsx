'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/bookings', label: 'Bookings' },
  { href: '/rooms', label: 'Rooms' },
  { href: '/guests', label: 'Guests' },
  { href: '/settings', label: 'Settings' },
  { href: '/admin/create-staff', label: 'Create Staff' },
  { href: '/staff-dashboard', label: 'Staff Dashboard' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-gray-800 p-4 text-white">
      <h2 className="mb-8 text-2xl font-bold">StaySync</h2>
      <nav>
        <ul>
          {links.map(({ href, label }) => (
            <li key={href} className="mb-4">
              <Link
                href={href}
                className={`block rounded-lg px-4 py-2 transition-colors hover:bg-gray-700 ${pathname === href ? 'bg-gray-900' : ''}`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
