import { showRecipes } from "./main.js";

export class Dropdown {
  constructor(id) {
    this.id = id;
    this.list = [];
    this.filter = "";
    this.opened = false;
    this.buttonElement = document.querySelector(id + " .dropdown-button");
    this.contentElement = document.querySelector(id + " .dropdown-content");
    this.arrowDownIcon = document.querySelector(`${id} .arrow-dropDown`);
    this.arrowUpIcon = document.querySelector(`${id} .arrow-dropUp`);
    this.buttonElement.addEventListener("click", () => this.open());
    this.listElement = document.querySelector(id + " .dropdown-list");
    this.close = document.querySelector( `${id} .close`);
    this.inputElement = document.querySelector(id + " .dropdown-input");
    this.inputElement.addEventListener("input", (event) => {
      event.preventDefault;
      this.filterChange();
    });
    this.onChange = () => {};
    this.filters = [];
  }

  open() {
    if (this.opened) {
      this.contentElement.style.display = "none";
      this.opened = false;
      this.arrowDropDown();
    } else {
      this.contentElement.style.display = "block";
      this.opened = true;
      this.arrowDropDown();
    }
  }

  arrowDropDown() {
    if (this.arrowDownIcon.classList.contains("hidden")) {
      this.arrowDownIcon.classList.remove("hidden");
      this.arrowUpIcon.classList.add("hidden");
    } else {
      this.arrowDownIcon.classList.add("hidden");
      this.arrowUpIcon.classList.remove("hidden");
    }
  }
  


  updateDOM() {
    this.listElement.innerHTML = "";
    let list = this.list;
    if (this.filter != "") {
      list = this.list.filter((item) => item.includes(this.filter));
    }

    list.forEach((ingredient) => {
      const listItem = document.createElement("li");
      const span = document.createElement("span");

      listItem.classList.add("custom-list-item" , "flex" , "justify-between");

      listItem.appendChild(span);

      const isActive = this.filters.includes(ingredient);

      if (isActive) {
        const img = document.createElement("img");
        img.src = "./assets/icones/x-icon.svg"
        img.classList.add("w-6", "h-6");
        
        
      
        listItem.appendChild(img);
      }
      

      listItem.addEventListener("click", () => {
        if (isActive) {
          this.unSelectFilter(ingredient);
        } else {
          this.selectFilter(ingredient);
          const newfiltre = document.createElement("li");
          newfiltre.textContent = ingredient;
          const filtersSelect = document.querySelector(".filters-select");
          filtersSelect.appendChild(newfiltre);
        }
      });
      span.textContent = ingredient;
      this.listElement.appendChild(listItem);
    });
  }

  filterChange() {
    this.filter = this.inputElement.value.trim().toLowerCase();
    this.close.classList.remove("hidden");
    if (this.inputElement.value === ""){
      this.close.classList.add("hidden");
    }
    this.close.addEventListener("click", () => {
      this.inputElement.value = ""; 
      this.close.classList.add("hidden"); 
    });
    
    this.updateDOM();
  }


  selectFilter(element) {
    this.filters.push(element);
    this.onChange(this.filters);
  }

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
    this.onChange(this.filters);
  }
}
