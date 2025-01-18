import React from 'react';
import { ChefHat, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: ChefHat,
    title: 'Recipe Database',
    description: 'Explore thousands of healthy recipes filtered by your dietary preferences',
    link: '/recipes'
  },
  {
    icon: Calendar,
    title: 'Meal Planning',
    description: 'Create personalized meal plans and shopping lists',
    link: '/meal-plans'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Connect with others and share your healthy living journey',
    link: '/community'
  }
];

export function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link
              key={feature.title}
              to={feature.link}
              className="group text-center p-6 rounded-lg bg-green-50 hover:bg-green-100 transition duration-300"
            >
              <feature.icon className="w-12 h-12 mx-auto text-green-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}