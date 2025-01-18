import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../../types';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-green-600 font-medium">{recipe.category}</span>
          <span className="text-sm text-gray-500">{recipe.time}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">{recipe.calories} calories</span>
          <Link 
            to={`/recipes/${recipe.id}`}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
}