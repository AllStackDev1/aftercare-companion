import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-medical-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-medical-600 hover:text-medical-700 transition-colors">
            <Heart className="h-8 w-8" />
            <span className="text-2xl font-bold">Myomectomy Care</span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
        </div>
        <div className="bg-white py-8 px-6 shadow-xl rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}