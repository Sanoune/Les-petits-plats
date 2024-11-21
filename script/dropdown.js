export class Dropdown {
  // Initialise les variables de la classe avec les valeurs par défaut et récupère les éléments du DOM
  constructor(id) {
    this.id = id;
    this.list = [];
    this.filter = "";
    this.opened = false;
    this.buttonElement = document.querySelector(`${id} .dropdown-button`);
    this.contentElement = document.querySelector(`${id} .dropdown-content`);
    this.arrowDownIcon = document.querySelector(`${id} .arrow-dropDown`);
    this.arrowUpIcon = document.querySelector(`${id} .arrow-dropUp`);
    this.listElement = document.querySelector(`${id} .dropdown-list`);
    this.closeElement = document.querySelector(`${id} .close`);
    this.inputElement = document.querySelector(`${id} .dropdown-input`);
    // Ajoute un écouteur d'événements pour détecter les changements dans l'input de recherche
    this.inputElement.addEventListener("input", (event) => {
      event.preventDefault;
      this.filterChange();
    });
    this.onChange = () => {};
    this.filters = [];
  }

  // Méthode pour ouvrir ou fermer le dropdown
  open() {
    if (this.opened) {
      this.contentElement.style.display = "none";
      this.opened = false;
      this.arrowDropDown();
    } else {
      this.contentElement.style.display = "flex";
      this.opened = true;
      this.arrowDropDown();
    }
  }

  // Méthode pour fermer le dropdown
  close() {
    this.contentElement.style.display = "none";
    this.opened = false;
    this.arrowDropDown();
  }

  // Méthode pour changer l'icône de la flèche en haut ou en bas
  arrowDropDown() {
    if (!this.opened) {
      this.arrowDownIcon.classList.remove("hidden");
      this.arrowUpIcon.classList.add("hidden");
    } else {
      this.arrowDownIcon.classList.add("hidden");
      this.arrowUpIcon.classList.remove("hidden");
    }
  }
  // Méthode pour mettre à jour le contenu du dropdown en fonction du filtre de recherche
  updateDOM() {
    this.listElement.innerHTML = "";
    let list = this.list;
    if (this.filter != "") {
      list = this.list.filter((item) => item.includes(this.filter));
    }

    //création éléments liste
    list.forEach((ingredient) => {
      const listItem = document.createElement("li");
      const span = document.createElement("span");

      listItem.classList.add(
        "custom-list-item",
        "flex",
        "justify-between",
        "hover:bg-yellow-400",
        "cursor-pointer"
      );

      listItem.appendChild(span);

      const isActive = this.filters.includes(ingredient);

      if (isActive) {
        const img = document.createElement("img");
        img.src = "./icones/x-circle.svg";
        img.classList.add("w-6", "h-6");
        listItem.classList.add("bg-yellow-400");
        listItem.appendChild(img);
      }
      // Ajoute un écouteur d'événements pour sélectionner ou désélectionner un filtre
      listItem.addEventListener("click", () => {
        if (isActive) {
          this.unSelectFilter(ingredient);
        } else {
          this.selectFilter(ingredient);
        }
      });
      span.textContent = ingredient;
      this.listElement.appendChild(listItem);
    });
  }

  // Méthode appelée lorsqu'il y a un changement dans l'input de recherche
  filterChange() {
    this.filter = this.inputElement.value.trim().toLowerCase();
    this.closeElement.classList.remove("hidden");
    if (this.inputElement.value === "") {
      this.closeElement.classList.add("hidden");
    }
    this.closeElement.addEventListener("click", () => {
      this.inputElement.value = "";
      this.filter = "";
      this.closeElement.classList.add("hidden");
      this.updateDOM();
    });

    this.updateDOM();
  }

  // Méthode pour liste d'élements séléctionnées
  selectFilter(element) {
    this.filters.push(element);
    const newfiltre = document.createElement("li");
    newfiltre.classList.add(
      "flex",
      "bg-yellow-400",
      "list-none",
      "w-40",
      "items-center",
      "justify-between",
      "rounded-xl",
      "p-2"
    );
    const span = document.createElement("span");
    const icone = document.createElement("img");
    icone.classList.add("w-6", "h-6");
    icone.src = "./icones/x-mark.svg";
    span.textContent = element;
    span.classList.add();
    newfiltre.onclick = () => {
      this.unSelectFilter(element);
    };
    const filtersSelect = document.querySelector(".filters-select");
    newfiltre.appendChild(span);
    newfiltre.appendChild(icone);
    filtersSelect.appendChild(newfiltre);
    this.onChange(this.filters);
  }

  // Méthode pour désélectionner élements séléctionnées
  unSelectFilter(element) {
    this.filters = this.filters.filter((filter) => filter !== element);

    this.updateDOM();

    const filtersSelect = document.querySelector(".filters-select");
    const selectedFilterElements = filtersSelect.querySelectorAll("li");
    selectedFilterElements.forEach((selectedFilterElement) => {
      if (selectedFilterElement.textContent === element) {
        selectedFilterElement.remove();
      }
    });
    this.onChange();
  }
}
