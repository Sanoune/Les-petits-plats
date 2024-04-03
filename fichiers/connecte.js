import { recipes } from "../data/recipes.js";
import { createArticle } from "./article.js";
import { Dropdown } from "./Dropdown.js";

const dropdownIngredients = new Dropdown ("#dropdown-ingredients" )



let allIngredients;
const showRecipes = (filteredRecipes) => {
  filteredRecipes.forEach((recipe) => {
    createArticle(recipe);
  });
};

const updateFilters = (filteredRecipes) => {
  const allIngredients = [];

  filteredRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const normalizedIngredient = ingredient.ingredient.trim().toLowerCase();
      if (!allIngredients.includes(normalizedIngredient)) {
        allIngredients.push(normalizedIngredient);
      }
    });
  });

  dropdownIngredients.list = allIngredients
  dropdownIngredients.updateDOM()
 

  const allRecipients = [];

  filteredRecipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      const normalizedUstensil = ustensil.trim().toLowerCase();
      if (!allRecipients.includes(normalizedUstensil)) {
        allRecipients.push(normalizedUstensil);
      }
    });
  });

  const allAppliances = [];
  filteredRecipes.forEach((recipe) => {
    const normalizedAppliance = recipe.appliance.trim().toLowerCase();
    if (!allAppliances.includes(normalizedAppliance)) {
      allAppliances.push(normalizedAppliance);
    }
  });

};




function main() {
  showRecipes(recipes);
  updateFilters(recipes);

}

main();


// Ecoute input 



