class Dropdown {
  constructor(listItemsData, dropdownContainer) {
    this.listItemsData = listItemsData;
    this.notesContainer = null;
    this.isOpen = false;
    this.notes = [];
    this.lastSelected = "";
    this.dropdownContainer = dropdownContainer;
    this.init();
  }

  render() {
    this.renderDropdownInput();
    this.renderDropdownButton();
    this.renderListContainer();
  }

  init() {
    this.render();

    this.dropdownInput.addEventListener("click", () => this.openDropdownList());
    this.dropdownBtn.addEventListener("click", () => this.openDropdownList());

    this.dropdownInput.addEventListener("input", (e) => this.filterNotes(e));

    window.addEventListener("resize", () => this.closeDropdownList());
    document.onscroll = () => this.closeDropdownList();
    document.addEventListener("click", ({ target }) => {
      if (!target.closest(".dropdown")) {
        this.closeDropdownList();
      }
    });
  }

  openDropdownList() {
    if (this.isOpen) return;
    if (!this.isPlaceBelow()) {
      this.notesContainer.classList.add("dropdown-list_open-above");
    }

    this.notesContainer.classList.remove("hidden");

    this.renderNotes();

    this.dropdownInput.value = "";
    this.dropdownInput.focus();

    this.isOpen = true;
  }

  closeDropdownList() {
    this.dropdownInput.value = this.lastSelected;
    this.isOpen = false;
    this.notesContainer.classList.add("hidden");
  }

  renderDropdownInput() {
    this.dropdownInput = document.createElement("input");
    this.dropdownInput.type = "text";
    this.dropdownInput.classList.add("dropdown__input");
    this.dropdownContainer.append(this.dropdownInput);
  }

  renderDropdownButton() {
    this.dropdownBtn = document.createElement("button");
    this.dropdownBtn.type = "button";
    this.dropdownBtn.classList.add("dropdown__open-button");
    this.dropdownBtn.textContent = "Открыть";
    this.dropdownContainer.append(this.dropdownBtn);
  }

  renderListContainer() {
    this.notesContainer = document.createElement("ul");
    this.notesContainer.classList.add("dropdown-list");
    this.notesContainer.classList.add("hidden");
    this.dropdownContainer.append(this.notesContainer);
  }


  renderNotes(notes) {
    this.clearNotes();
    const data = notes || this.listItemsData;
    this.notes = data.map((data) => {
      const li = document.createElement("li");
      li.innerHTML = `${data.label}`;
      li.setAttribute("id", data.id);
      li.classList.add("dropdown-list__item");
      li.addEventListener("click", () => this.onSelectedNote(data.label));
      return li;
    });

    this.notes.map((item) => {
      this.notesContainer.append(item);
    });
  }

  filterNotes({ target }) {
    const tValue = target.value;
    const notes = this.listItemsData.filter((note) => note.label.indexOf(tValue) === 0);
    this.renderNotes(notes);
  }

  clearNotes() {
    this.notesContainer.innerHTML = "";
  }

  onSelectedNote(data) {
    this.closeDropdownList();
    this.dropdownInput.value = data;
    this.lastSelected = data;
  }

  isPlaceBelow() {
    const coordinateDropdownInput = this.dropdownInput.getBoundingClientRect();
    const { clientHeight } = document.documentElement;
    console.log(clientHeight - coordinateDropdownInput.top >= 150);
    return clientHeight - coordinateDropdownInput.top >= 150;
  }
}

const listItemsData = [
  {
    label: "Bawcomville",
    id: 0,
  },
  {
    label: "Rushford",
    id: 1,
  },
  {
    label: "Bayview",
    id: 2,
  },
  {
    label: "Pasha",
    id: 3,
  },
  {
    label: "Ilya",
    id: 4,
  },
];
const dropdownContainer = document.querySelector(".dropdown");
const dropdown = new Dropdown(listItemsData, dropdownContainer);
