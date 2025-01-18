import React, { useState } from 'react';
import { Calendar, Clock, ChefHat, X } from 'lucide-react';

interface MealPlan {
  id: number;
  title: string;
  duration: string;
  meals: number;
  calories: string;
  image: string;
  schedule?: {
    [key: string]: {
      breakfast: string;
      lunch: string;
      dinner: string;
      snacks: string[];
    };
  };
}

const MEAL_PLANS: MealPlan[] = [
  {
    id: 1,
    title: "Weight Loss Plan",
    duration: "7 days",
    meals: 21,
    calories: "1500-1800",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800",
    schedule: {
      "Monday": {
        breakfast: "Oatmeal with berries and nuts",
        lunch: "Grilled chicken salad",
        dinner: "Baked salmon with vegetables",
        snacks: ["Apple with almond butter", "Greek yogurt"]
      },
      "Tuesday": {
        breakfast: "Smoothie bowl",
        lunch: "Quinoa Buddha bowl",
        dinner: "Turkey and vegetable stir-fry",
        snacks: ["Carrot sticks with hummus", "Mixed nuts"]
      },
      // Add more days as needed
    }
  },
  // ... (previous meal plans remain the same)
];

export function MealPlans() {
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedPlan ? (
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setSelectedPlan(null)}
              className="text-green-600 hover:text-green-700 font-medium flex items-center"
            >
              ← Back to Meal Plans
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={selectedPlan.image} alt={selectedPlan.title} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{selectedPlan.title}</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{selectedPlan.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <ChefHat className="w-5 h-5 mr-2" />
                  <span>{selectedPlan.meals} meals</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{selectedPlan.calories} calories/day</span>
                </div>
              </div>
              {selectedPlan.schedule && (
                <div className="space-y-6">
                  {Object.entries(selectedPlan.schedule).map(([day, meals]) => (
                    <div key={day} className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-3">{day}</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium">Breakfast:</span> {meals.breakfast}
                        </div>
                        <div>
                          <span className="font-medium">Lunch:</span> {meals.lunch}
                        </div>
                        <div>
                          <span className="font-medium">Dinner:</span> {meals.dinner}
                        </div>
                        <div>
                          <span className="font-medium">Snacks:</span>
                          <ul className="list-disc list-inside ml-4">
                            {meals.snacks.map((snack, index) => (
                              <li key={index}>{snack}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Meal Plans</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully crafted meal plans designed to help you reach your health goals.
              Each plan includes detailed recipes, shopping lists, and nutritional information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MEAL_PLANS.map(plan => (
              <div key={plan.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img src={plan.image} alt={plan.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{plan.title}</h3>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>{plan.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <ChefHat className="w-5 h-5 mr-2" />
                      <span>{plan.meals} meals</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2" />
                      <span>{plan.calories} calories/day</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPlan(plan)}
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    View Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}