import React from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="bg-gradient-to-b from-green-600 to-green-500 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Your Journey to Healthy Living Starts Here</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join our community of health enthusiasts and discover delicious, nutritious recipes that will transform your life.
        </p>
        <form onSubmit={handleSearch} className="flex justify-center">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </form>
      </div>
    </section>
  );
}