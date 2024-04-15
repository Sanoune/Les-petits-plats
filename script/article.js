export const createArticle = (data) => {
  const containerArticles = document.querySelector(".cards");
  const { id, name, ingredients, description, image, time } = data;
  const article = document.createElement("article");
  article.classList.add("relative");
  const imagePlat = document.createElement("img");
  imagePlat.src = `./assets/medias/${image}`;
  imagePlat.classList = "article-img";
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
  title.classList.add("title-recipe", "font-anton");

  const containerDescriptionRecette = document.createElement("div");
  containerDescriptionRecette.classList = "container-element-recette";

  const containerRecette = document.createElement("div");
  containerRecette.classList = "container-recette";
  const recette = document.createElement("p");
  recette.textContent = "RECETTE";
  recette.classList = "titre-color";
  const recetteTexte = document.createElement("p");
  recetteTexte.textContent = description;
  recetteTexte.classList = "recette-texte";

  const containerIngredient = document.createElement("div");
  containerIngredient.classList = "container-ingredient";
  const ingredient = document.createElement("p");
  ingredient.textContent = "INGRÉDIENTS";
  ingredient.classList = "titre-color";

  const ingredientList = document.createElement("ul");
  ingredientList.classList = "liste-ingredients";

  ingredients.forEach((ingredientData) => {
    const ingredientItem = document.createElement("li");

    const nameSpan = document.createElement("span");
    nameSpan.textContent = ingredientData.ingredient;
    nameSpan.classList = "span-ingredient";

    const quantityUnitSpan = document.createElement("span");
    const quantityText = ingredientData.quantity || "";
    const unitText = ingredientData.unit || "";
    quantityUnitSpan.textContent = `${quantityText}${unitText}`;
    quantityUnitSpan.classList = "span-quantite-unite";

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
