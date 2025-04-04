import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin Dashboard | B2B App',
  description: 'Admin dashboard for B2B App',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5">
        <div className="text-2xl font-bold mb-8">B2B Admin</div>
        <nav className="space-y-2">
          <Link
            href="/admin"
            className="block px-4 py-2 hover:bg-gray-800 rounded transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="block px-4 py-2 hover:bg-gray-800 rounded transition-colors"
          >
            Products
          </Link>
          <Link
            href="/admin/customers"
            className="block px-4 py-2 hover:bg-gray-800 rounded transition-colors"
          >
            Customers
          </Link>
          <Link
            href="/admin/orders"
            className="block px-4 py-2 hover:bg-gray-800 rounded transition-colors"
          >
            Orders
          </Link>
          <Link
            href="/admin/users"
            className="block px-4 py-2 hover:bg-gray-800 rounded transition-colors"
          >
            Users
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 bg-gray-50">
        <main>{children}</main>
      </div>
    </div>
  );
} 