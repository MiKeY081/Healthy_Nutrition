import { useState, useEffect } from 'react';
import { Recipe } from '../types';

// Mock data for recipes
const mockRecipes: Recipe[] = [
  {
    id: 1,
    title: "Mediterranean Quinoa Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    category: "vegetarian",
    time: "25 mins",
    calories: 420,
  },
  {
    id: 2,
    title: "Grilled Salmon with Asparagus",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800",
    category: "pescatarian",
    time: "30 mins",
    calories: 380,
  },
];

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRecipes(mockRecipes);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch recipes'));
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return { recipes, loading, error };
}