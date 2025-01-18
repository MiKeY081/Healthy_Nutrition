import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-green-600 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition">
            <Heart className="h-8 w-8" />
            <h1 className="text-2xl font-bold">HeathWealth</h1>
          </Link>
          <nav className="flex space-x-6">
            <Link to="/" className="hover:text-green-200 transition">Home</Link>
            <Link to="/recipes" className="hover:text-green-200 transition">Recipes</Link>
            <Link to="/meal-plans" className="hover:text-green-200 transition">Meal Plans</Link>
            <Link to="/community" className="hover:text-green-200 transition">Community</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}