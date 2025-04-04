import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">B2B Wholesale</span>
            </div>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/" className="text-blue-600 font-medium px-3 py-2 text-sm">
                Home
              </Link>
              <Link href="/products" className="text-gray-500 hover:text-gray-700 font-medium px-3 py-2 text-sm">
                Products
              </Link>
              <Link href="/about" className="text-gray-500 hover:text-gray-700 font-medium px-3 py-2 text-sm">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-700 font-medium px-3 py-2 text-sm">
                Contact
              </Link>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="text-gray-500 hover:text-gray-700 font-medium px-3 py-2 text-sm">
                Log In
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl font-bold mb-4">Your Trusted B2B Wholesale Partner</h1>
              <p className="text-xl mb-8">
                Connecting businesses with high-quality products at competitive wholesale prices.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="/products"
                  className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100"
                >
                  Browse Products
                </Link>
                <Link
                  href="/contact"
                  className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-gray-900 text-2xl font-bold mb-6">Sign Up for Wholesale Access</h2>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder="Your Business Name"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Business Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder="you@company.com"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Get Started
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Why Choose Us</h2>
            <p className="text-xl text-gray-600 mb-12">
              We offer comprehensive solutions for your wholesale needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Competitive Pricing</h3>
              <p className="text-gray-600">
                Access wholesale prices that give your business the competitive edge in your market.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Products</h3>
              <p className="text-gray-600">
                Every product in our catalog meets strict quality standards to ensure your satisfaction.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Reliable Support</h3>
              <p className="text-gray-600">
                Our dedicated support team is here to assist you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">B2B Wholesale</h3>
              <p className="text-gray-400">
                Your trusted partner for wholesale products and business solutions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/products" className="text-gray-400 hover:text-white">Products</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white">Login</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>123 Business Street</li>
                <li>City, State 12345</li>
                <li>info@b2bwholesale.com</li>
                <li>(555) 123-4567</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Subscribe</h3>
              <p className="text-gray-400 mb-4">
                Stay updated with our latest products and offers.
              </p>
              <div className="flex">
                <input
                  type="email"
                  className="px-3 py-2 bg-gray-700 text-white rounded-l-md focus:outline-none"
                  placeholder="Your email"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} B2B Wholesale. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
