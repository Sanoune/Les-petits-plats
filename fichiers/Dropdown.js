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
    this.list.forEach((ingredient) => {
      const listItem = document.createElement("li");
      listItem.textContent = ingredient;
      this.listElement.appendChild(listItem);
    });
  }

  filterChange() {
    const filterValue = this.inputElement.value.toLowerCase();
    const listItems = this.listElement.querySelectorAll("li");
    listItems.forEach((item) => {
      const itemText = item.textContent.toLowerCase();
      const isVisible = itemText.includes(filterValue);
      item.style.display = isVisible ? "block" : "none";
    });
  }
}
