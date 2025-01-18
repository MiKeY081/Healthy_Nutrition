import React from 'react';
import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { FeaturedRecipes } from '../components/recipes/FeaturedRecipes';
import { CallToAction } from '../components/home/CallToAction';

export function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedRecipes />
      <CallToAction />
    </>
  );
}