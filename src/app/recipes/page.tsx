import RecipeCard from '@/components/RecipeCard'
import { fetchRecipes, fetchRecipesByTag, fetchRecipesByMeal } from '@/utils/api'
import { Recipe } from '@/types'

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined } | Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // Tunggu jika searchParams adalah Promise
  const params = await searchParams;

  const tag = typeof params.tag === 'string' ? params.tag : '';
  const meal = typeof params.meal === 'string' ? params.meal : '';

  let recipesData
  if (tag) {
    recipesData = await fetchRecipesByTag(tag)
  } else if (meal) {
    recipesData = await fetchRecipesByMeal(meal)
  } else {
    recipesData = await fetchRecipes()
  }

  // Get unique tags and meal types for filtering
  const allRecipes = await fetchRecipes()
  const tags = [...new Set(allRecipes.recipes.flatMap((recipe: Recipe) => recipe.tags))]
  const mealTypes = [...new Set(allRecipes.recipes.flatMap((recipe: Recipe) => recipe.mealType))]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Recipes</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="flex flex-wrap gap-2">
          <a 
            href="/recipes" 
            className={`px-3 py-1 rounded-full text-sm ${!tag && !meal ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
          >
            All Recipes
          </a>
          
          {tags.map(t => (
            <a 
              key={t} 
              href={`/recipes?tag=${t}`} 
              className={`px-3 py-1 rounded-full text-sm ${tag === t ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
            >
              {t}
            </a>
          ))}
          
          {mealTypes.map(m => (
            <a 
              key={m} 
              href={`/recipes?meal=${m}`} 
              className={`px-3 py-1 rounded-full text-sm ${meal === m ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
            >
              {m}
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipesData.recipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}