export const createArticle = (data) => {
  const containerArticles = document.querySelector(".cards");
  const { id, name, ingredients, description, image, time } = data;
  const article = document.createElement("article");
  article.classList.add("relative");
  const imagePlat = document.createElement("img");
  imagePlat.src = `./assets/medias/${image}`;
  imagePlat.classList =
    "w-full h-64 object-cover rounded-tl-3xl rounded-tr-3xl";
  const containerTime = document.createElement("div");

  containerTime.classList.add(
    "absolute",
    "text-xs",
    "bg-yellow-400",
    "pr-3.5",
    "pl-3.5",
    "pt-1",
    "pb-1",
    "rounded-2xl",
    "top-4",
    "right-4"
  );
  const timeTexte = document.createElement("p");
  timeTexte.textContent = `${time}min`;

  const title = document.createElement("p");
  title.textContent = name;
  title.classList.add("title-recipe", "font-anton", "text-lg", "mb-4");

  const containerDescriptionRecette = document.createElement("div");
  containerDescriptionRecette.classList = "p-8";

  const containerRecette = document.createElement("div");
  containerRecette.classList = "mt-4";
  const recette = document.createElement("p");
  recette.textContent = "RECETTE";
  recette.classList = "text-gray-500 mb-2";
  const recetteTexte = document.createElement("p");
  recetteTexte.textContent = description;
  recetteTexte.classList = "recette-texte";

  const containerIngredient = document.createElement("div");
  containerIngredient.classList = "mt-4";
  const ingredient = document.createElement("p");
  ingredient.textContent = "INGRÉDIENTS";
  ingredient.classList = "text-gray-500";

  const ingredientList = document.createElement("ul");
  ingredientList.classList =
    "grid grid-cols-2 gap-6 list-none p-0 m-0 text-base liste-ingredients";

  ingredients.forEach((ingredientData) => {
    const ingredientItem = document.createElement("li");

    const nameSpan = document.createElement("span");
    nameSpan.textContent = ingredientData.ingredient;
    nameSpan.classList = "text-black font-medium";

    const quantityUnitSpan = document.createElement("span");
    const quantityText = ingredientData.quantity || "";
    const unitText = ingredientData.unit || "";
    quantityUnitSpan.textContent = `${quantityText}${unitText}`;
    quantityUnitSpan.classList = "text-gray-500";

    ingredientItem.appendChild(nameSpan);
    ingredientItem.appendChild(quantityUnitSpan);

    ingredientList.appendChild(ingredientItem);
  });

  const ingredientsTexte = document.createElement("p");
  ingredientsTexte.textContent = ingredients.ingredient;

  containerTime.appendChild(timeTexte);

  containerRecette.appendChild(recette);
  containerRecette.appendChild(recetteTexte);

  containerIngredient.appendChild(ingredient);
  containerIngredient.appendChild(ingredientList);

  article.appendChild(containerTime);
  article.appendChild(imagePlat);
  article.appendChild(containerDescriptionRecette);
  containerDescriptionRecette.appendChild(title);
  containerDescriptionRecette.appendChild(containerRecette);
  containerDescriptionRecette.appendChild(containerIngredient);
  containerArticles.appendChild(article);
};
