import React from 'react';
import { Link } from 'react-router-dom';
import { NewsletterForm } from '../forms/NewsletterForm';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">HeathWealth</h3>
            <p className="text-gray-400">Your journey to a healthier lifestyle starts here.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/recipes" className="hover:text-white transition">Recipes</Link></li>
              <li><Link to="/meal-plans" className="hover:text-white transition">Meal Plans</Link></li>
              <li><Link to="/community" className="hover:text-white transition">Community</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to get healthy recipes and tips.</p>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </footer>
  );
}