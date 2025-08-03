import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl shadow-teal-100/50 border border-cyan-100 text-center">
        <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600">
          Ticket Management System
        </h1>
        
        <p className="text-cyan-700/80 mb-8 font-medium">
          Welcome to the ticket management system. Choose your role to continue.
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/user" 
            className="block w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-md shadow-cyan-200 hover:shadow-lg hover:shadow-cyan-300/50 transform hover:-translate-y-0.5"
          >
            User Portal
          </Link>
          
          <Link 
            href="/admin" 
            className="block w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-md shadow-teal-200 hover:shadow-lg hover:shadow-teal-300/50 transform hover:-translate-y-0.5"
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;