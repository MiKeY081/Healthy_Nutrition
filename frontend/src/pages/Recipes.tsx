import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Recipe } from '../types';

const CATEGORIES = ['All', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Pescatarian', 'Keto'];

const DUMMY_RECIPES: Recipe[] = [
  {
    id: 1,
    title: "Mediterranean Quinoa Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    category: "vegetarian",
    time: "25 mins",
    calories: 420,
    instructions: [
      "Cook quinoa according to package instructions",
      "Chop fresh vegetables",
      "Mix olive oil and lemon juice for dressing",
      "Combine all ingredients in a bowl",
      "Top with feta cheese and herbs"
    ],
    ingredients: [
      "1 cup quinoa",
      "2 cups cherry tomatoes",
      "1 cucumber",
      "1/2 red onion",
      "100g feta cheese",
      "Fresh herbs"
    ]
  },
  // ... (previous recipes remain the same)
];

export function Recipes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, [location]);

  const filteredRecipes = DUMMY_RECIPES.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || recipe.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedRecipe ? (
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedRecipe(null)}
            className="mb-6 text-green-600 hover:text-green-700 font-medium flex items-center"
          >
            ← Back to Recipes
          </button>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full h-64 object-cover" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{selectedRecipe.title}</h2>
                <span className="text-sm text-green-600 font-medium capitalize">{selectedRecipe.category}</span>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Instructions</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Healthy Recipes</h1>
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    navigate(`/recipes${e.target.value ? `?search=${encodeURIComponent(e.target.value)}` : ''}`);
                  }}
                  className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map(recipe => (
              <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-green-600 font-medium capitalize">{recipe.category}</span>
                    <span className="text-sm text-gray-500">{recipe.time}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{recipe.calories} calories</span>
                    <button
                      onClick={() => setSelectedRecipe(recipe)}
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      View Recipe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}