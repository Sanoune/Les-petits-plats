import { showRecipes } from "./main.js";

export class Dropdown {
  constructor(id) {
    this.id = id;
    this.list = [];
    this.filter = "";
    this.opened = false;
    this.buttonElement = document.querySelector(id + " .dropdown-button");
    this.contentElement = document.querySelector(id + " .dropdown-content");
    this.buttonElement.addEventListener("click", () => this.open());
    this.listElement = document.querySelector(id + " .dropdown-list");
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
    } else {
      this.contentElement.style.display = "block";
      this.opened = true;
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
      listItem.addEventListener("click", () => {
        this.selectFilter(listItem.textContent);
      });
      listItem.textContent = ingredient;
      this.listElement.appendChild(listItem);
    });
  }

  filterChange() {
    this.filter = this.inputElement.value.trim().toLowerCase();
    this.updateDOM();
  }

  selectFilter(element) {
    this.filters.push(element);
   this.onChange(this.filters);
  }
};
