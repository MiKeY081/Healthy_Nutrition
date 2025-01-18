export interface Recipe {
  id: number;
  title: string;
  image: string;
  category: string;
  time: string;
  calories: number;
  instructions?: string[];
  ingredients?: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}