import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | B2B App',
  description: 'Admin dashboard for the B2B application',
};

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Dashboard cards */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Products</h2>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Customers</h2>
          <p className="text-3xl font-bold text-green-600">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Orders</h2>
          <p className="text-3xl font-bold text-purple-600">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Revenue</h2>
          <p className="text-3xl font-bold text-yellow-600">$0</p>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
          <div className="text-gray-500 italic">No orders yet</div>
        </div>
        
        {/* Popular products */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular Products</h2>
          <div className="text-gray-500 italic">No products yet</div>
        </div>
      </div>
    </div>
  );
} 