import React from 'react';
import { Link } from 'react-router-dom';

export function CallToAction() {
  return (
    <section className="bg-green-600 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Healthy Community Today</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Get access to exclusive recipes, meal plans, and connect with health enthusiasts like you.
        </p>
        <Link 
          to="/recipes"
          className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-medium hover:bg-green-50 transition"
        >
          Browse Recipes
        </Link>
      </div>
    </section>
  );
}