'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Page Not Found
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link 
        href="/" 
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
