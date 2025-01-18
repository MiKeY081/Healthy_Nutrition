import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Recipes } from './pages/Recipes';
import { MealPlans } from './pages/MealPlans';
import { Community } from './pages/Community';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/meal-plans" element={<MealPlans />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">About Us</h1></div>} />
            <Route path="/faq" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">FAQ</h1></div>} />
            <Route path="/contact" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">Contact Us</h1></div>} />
            <Route path="/privacy" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">Privacy Policy</h1></div>} />
            <Route path="/terms" element={<div className="container mx-auto px-4 py-8"><h1 className="text-3xl font-bold">Terms of Service</h1></div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;