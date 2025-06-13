import { Product, Recipe } from '@/types'

export const fetchProducts = async (): Promise<{ products: Product[] }> => {
  const res = await fetch('https://dummyjson.com/products');
  return res.json();
};

export const fetchCarts = async () => {
  const res = await fetch('https://dummyjson.com/carts')
  return res.json()
}

export const fetchRecipes = async (): Promise<{ recipes: Recipe[]; total: number }> => {
  const res = await fetch('https://dummyjson.com/recipes')
  return res.json()
}
export const fetchPosts = async () => {
  const res = await fetch('https://dummyjson.com/posts')
  return res.json()
}

export const fetchProductsBySearch = async (query: string) => {
  const res = await fetch(`https://dummyjson.com/products/search?q=${query}`)
  return res.json()
}

export const fetchRecipesByTag = async (tag: string): Promise<{ recipes: Recipe[]; total: number }> => {
  const res = await fetch(`https://dummyjson.com/recipes/tag/${tag}`)
  return res.json()
}


export const fetchRecipesByMeal = async (meal: string): Promise<{ recipes: Recipe[]; total: number }> => {
  const res = await fetch(`https://dummyjson.com/recipes/meal-type/${meal}`)
  return res.json()
}