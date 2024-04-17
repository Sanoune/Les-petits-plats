import { recipes } from "../data/recipes.js";
import { createArticle } from "./article.js";
import { Dropdown } from "./dropdown.js";

const dropdownIngredients = new Dropdown("#dropdown-ingredients");
const dropdownAppareills = new Dropdown("#dropdown-appareils");
const dropdownUstensils = new Dropdown("#dropdown-ustensils");
const updateNbRecettes = document.querySelector(".nb-recettes");
const containerArticles = document.querySelector(".cards");
const errorMessage = document.querySelector(".error-message");

let allIngredients;
export const showRecipes = (filteredRecipes) => {
  errorMessage.textContent = "";
  updateNbRecettes.textContent = filteredRecipes.length;
  containerArticles.innerHTML = "";
  filteredRecipes.forEach((recipe) => {
    createArticle(recipe);
  });
  if (filteredRecipes.length === 0) {
    const inputSearchBar = document.querySelector(".search-bar");
    const inputValue = inputSearchBar.value.toLowerCase();
    const filterNull = document.createElement("span");
    filterNull.textContent = `Aucune recette ne contient '${inputValue}'.
        Essayer avec des termes similaires comme "tarte aux pommes", "poisson", etc.`;
    errorMessage.appendChild(filterNull);
    return;
  }
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

function closeAllDropDown(dropDown) {
  if (dropDown !== dropdownAppareills) {
    dropdownAppareills.close();
  }
  if (dropDown !== dropdownIngredients) {
    dropdownIngredients.close();
  }
  if (dropDown !== dropdownUstensils) {
    dropdownUstensils.close();
  }
}

function main() {
  dropdownIngredients.buttonElement.addEventListener("click", () => {
    closeAllDropDown(dropdownIngredients);
    dropdownIngredients.open();
  });
  dropdownAppareills.buttonElement.addEventListener("click", () => {
    closeAllDropDown(dropdownAppareills);
    dropdownAppareills.open();
  });
  dropdownUstensils.buttonElement.addEventListener("click", () => {
    closeAllDropDown(dropdownUstensils);
    dropdownUstensils.open();
  });

  showRecipes(recipes);
  updateFilters(recipes);

  const filterFunction = () => {
    const ingredientFilters = dropdownIngredients.filters;
    const ingredientFiltered = recipes.filter((recipe) => {
      return ingredientFilters.every((filter) => {
        return recipe.ingredients.some((ingredient) => {
          return filter === ingredient.ingredient.trim().toLowerCase();
        });
      });
    });

    const appareilFilters = dropdownAppareills.filters;

    const appareilFiltered = ingredientFiltered.filter((recipe) => {
      return appareilFilters.every((filter) => {
        return filter === recipe.appliance.trim().toLowerCase();
      });
    });

    const ustensilFilters = dropdownUstensils.filters;

    const ustensilFiltered = appareilFiltered.filter((recipe) => {
      return ustensilFilters.every((filter) => {
        return recipe.ustensils.some((ustensil) => {
          return filter === ustensil.trim().toLowerCase();
        });
      });
    });

    return ustensilFiltered;
  };
  dropdownIngredients.onChange = () => {
    const newTabFilter = filterFunction();
    showRecipes(newTabFilter);
    updateFilters(newTabFilter);
  };

  dropdownAppareills.onChange = () => {
    const newTabFilter = filterFunction();
    showRecipes(newTabFilter);
    updateFilters(newTabFilter);
  };

  dropdownUstensils.onChange = () => {
    const newTabFilter = filterFunction();
    showRecipes(newTabFilter);
    updateFilters(newTabFilter);
  };
  //version utilisant filter...
  //Ces deux implémentations doivent se focaliser uniquement sur le champ de recherche principal.

  const searchBar = () => {
    const inputSearchBar = document.querySelector(".search-bar");
    const iconeClose = document.querySelector(".icone-close");

    inputSearchBar.addEventListener("input", (event) => {
      event.preventDefault();

      iconeClose.classList.remove("hidden");
      if (inputSearchBar.value === "") {
        iconeClose.classList.add("hidden");
      }
      iconeClose.addEventListener("click", () => {
        inputSearchBar.value = "";
        iconeClose.classList.add("hidden");
        showRecipes(recipes);
        updateFilters(recipes);
      });

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
