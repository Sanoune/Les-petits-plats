import { recipes } from "../data/recipes.js";
import { createArticle } from "./article.js";
import { Dropdown } from "./dropdown.js";

const dropdownIngredients = new Dropdown("#dropdown-ingredients");
const dropdownAppareills = new Dropdown("#dropdown-appareils");
const dropdownUstensils = new Dropdown("#dropdown-ustensils");

let allIngredients;
export const showRecipes = (filteredRecipes) => {
  const containerArticles = document.querySelector(".cards");
  containerArticles.innerHTML = "";
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

  dropdownIngredients.list = allIngredients;
  dropdownIngredients.updateDOM();

  const allRecipients = [];

  filteredRecipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      const normalizedUstensil = ustensil.trim().toLowerCase();
      if (!allRecipients.includes(normalizedUstensil)) {
        allRecipients.push(normalizedUstensil);
      }
    });
  });
  dropdownUstensils.list = allRecipients;
  dropdownUstensils.updateDOM();

  const allAppliances = [];
  filteredRecipes.forEach((recipe) => {
    const normalizedAppliance = recipe.appliance.trim().toLowerCase();
    if (!allAppliances.includes(normalizedAppliance)) {
      allAppliances.push(normalizedAppliance);
    }
  });
  dropdownAppareills.list = allAppliances;
  dropdownAppareills.updateDOM();
};

function main() {
  showRecipes(recipes);
  updateFilters(recipes);

  dropdownIngredients.onChange = (filters) => {
    const lol = [];
    for (let i = 0; i < recipes.length; i++) {
      recipes[i].ingredients;
      let resultatAllFilters = true;
      for (let x = 0; x < filters.length; x++) {
        let resultatfilters = false;
        for (let y = 0; y < recipes[i].ingredients.length; y++) {
          if (
            filters[x] ===
            recipes[i].ingredients[y].ingredient.trim().toLowerCase()
          ) {
            resultatfilters = true;
            console.log(resultatfilters);
          }
        }
        if (!resultatfilters) {
          resultatAllFilters = false;
        }
      }
      if (resultatAllFilters) {
        lol.push(recipes[i]);
      }
    }
    showRecipes(lol);
    updateFilters(lol);
  };

  const searchBar = () => {
    const inputSearchBar = document.querySelector(".search-bar");
    inputSearchBar.addEventListener("input", (event) => {
      event.preventDefault;
      let recettesCorrespondantesSet = new Set();
      if (inputSearchBar.value.length < 3) {
        showRecipes(recipes);
      }
      if (inputSearchBar.value.length >= 3) {
        const searchValue = inputSearchBar.value.toLowerCase().trim();
        recipes.forEach((recipe) => {
          if (recipe.name.toLocaleLowerCase().trim().includes(searchValue)) {
            recettesCorrespondantesSet.add(recipe);
          }
          if (
            recipe.description.toLocaleLowerCase().trim().includes(searchValue)
          ) {
            recettesCorrespondantesSet.add(recipe);
          }

          recipe.ingredients.forEach((ingredient) => {
            if (
              ingredient.ingredient.toLocaleLowerCase().trim().includes(searchValue)
            ) {
              recettesCorrespondantesSet.add(recipe);
            }
          })
          
        });
        const recettesCorrespondantes = Array.from(recettesCorrespondantesSet);
        showRecipes(recettesCorrespondantes);
      }
    });
  };

  searchBar();
}

main();

