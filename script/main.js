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
    const newTabFilter = recipes.filter((recipe) => {
      return filters.every((filter) => {
        return recipe.ingredients.some((ingredient) => {
          return filter === ingredient.ingredient.trim().toLowerCase();
        });
      });
    });
    showRecipes(newTabFilter);
    updateFilters(newTabFilter);
  };

  dropdownAppareills.onChange = (filters) => {
    const newTabFilter = recipes.filter((recipe) => {
      return filters.every((filter) => {
        return filter === recipe.appliance.trim().toLowerCase();
      });
    });
    showRecipes(newTabFilter);
    updateFilters(newTabFilter);
  };

  dropdownUstensils.onChange = (filters) => {
    const newTabFilter = recipes.filter((recipe) => {
      return filters.every((filter) => {
        return recipe.ustensils.some((ustensil) => {
          return filter === ustensil.trim().toLowerCase();
        });
      });
    });
    showRecipes(newTabFilter);
    updateFilters(newTabFilter);
  };
//version utilisant filter... 
//Ces deux implémentations doivent se focaliser uniquement sur le champ de recherche principal.



const searchBar = () => {
  const inputSearchBar = document.querySelector(".search-bar");
  inputSearchBar.addEventListener("input", (event) => {
    event.preventDefault();
    const inputValue = inputSearchBar.value.toLowerCase();

    if (inputValue.length < 3) {
      showRecipes(recipes);
      updateFilters(recipes);
      return;
    }

    const recettesCorrespondantes = recipes.filter((recipe) => {
      return (
        recipe.name.toLowerCase().includes(inputValue) ||
        recipe.description.toLowerCase().includes(inputValue) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(inputValue)
        )
      );
    });

    showRecipes(recettesCorrespondantes);
    updateFilters(recettesCorrespondantes);
  });
};



  searchBar();
}

main();

