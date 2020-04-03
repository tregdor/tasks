class Dropdown {
  constructor(initState, dropdownInput, dropdownBtn) {
    this.state = initState;
    this.dropdownInput = dropdownInput;
    this.dropdownBtn = dropdownBtn;
    this.notesContainer = null;
    this.isOpen = false;
    this.isCreatedContainer = false;
    this.notes = [];
    this.lastSelect = "";
  }

  start() {
    this.dropdownInput.addEventListener("click", () => this.open());
    if (this.dropdownBtn) this.dropdownBtn.addEventListener("click", () => this.open());

    this.dropdownInput.addEventListener("input", (e) => this.filterNotes(e));

    window.addEventListener(`resize`, () => this.close());
    document.onscroll = () => this.close();
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown")) {
        this.close();
      }
    });

    this.createNotesContainer();
    document.body.after(this.notesContainer);
    this.isCreatedContainer = true
  }

  open() {
    if (this.isOpen) return;
    setTimeout(() => this.addStyle(this.notesContainer, {height: `150px`}), 10);
    setTimeout(() => this.addStyle(this.notesContainer, {overflow: `auto`}), 300);
    if (!this.checkDistanceToBottom()){
      const coordinateDropdownInput = this.dropdownInput.getBoundingClientRect();
      this.addStyle(this.notesContainer, {top: `${coordinateDropdownInput.top + 5}px`, left: `${coordinateDropdownInput.left}px`});
    }
    this.createNotes(this.state);
    this.addNotes(this.notes);

    this.dropdownInput.value = "";
    this.dropdownInput.focus();

    this.isOpen = true;
  }

  close() {
    this.dropdownInput.value = this.lastSelect;
    this.isOpen = false;
    this.addStyle(this.notesContainer, {height: '0px', overflow: 'hidden'})
  }

  createNotesContainer() {
    this.notesContainer = document.createElement("ul");
    this.notesContainer.classList.add('dropdown');
    this.addStyle(this.notesContainer, {
      width: `${this.dropdownInput.offsetWidth + (this.dropdownBtn ? this.dropdownBtn.offsetWidth : 0)}px`,
      height: `0`,
      background: "#f3f3f3",
      padding: "0px",
      position: "absolute",
      transition: "height .3s ease",
      listStyleType: "none",
      overflow: "hidden",
    });
  }

  createNotes(state) {
    this.notes = state.map((data) => {
      let li = document.createElement("li");
      li.innerHTML = `${data.label}`;
      li.setAttribute("id", data.id);
      this.addStyle(li, {display: "flex", alignItems: "center", height: "20%", padding: "0 0 0 5px"});
      li.addEventListener("click", () => this.onChoiceNote(data.label));
      return li;
    });
  }

  filterNotes(event) {
    const eValue = event.target.value;
    let notes = this.state.filter((note) => note.label.indexOf(eValue) === 0);
    this.createNotes(notes);
    this.addNotes(this.notes);
  }

  addNotes(notes) {
    this.clearNotes();
    notes.map((item) => {
      this.notesContainer.append(item);
    });
  }

  clearNotes() {
    this.notesContainer.innerHTML = "";
  }

  onChoiceNote(data) {
    this.close();
    this.dropdownInput.value = data;
    this.lastSelect = data;
  }

  checkDistanceToBottom() {
    const coordinateDropdownInput = this.dropdownInput.getBoundingClientRect();
    const clientHeight = document.documentElement.clientHeight;
    console.log(coordinateDropdownInput, clientHeight);
    if (clientHeight - coordinateDropdownInput.top < 150) {
      this.addStyle(this.notesContainer, {top: `${coordinateDropdownInput.top + 5 - 171}px`, left: `${coordinateDropdownInput.left}px`});
      return true
    }
    return false
  }

  addStyle(node, styles) {
    for (let [key, value] of Object.entries(styles)) {
      node.style[key] = value;
    }
  }
}

const initState = [
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
const dropdownInput = document.querySelector(".dropdown__input");
const dropdownBtn = document.querySelector(".dropdown__open-button");
const dropdown = new Dropdown(initState, dropdownInput,dropdownBtn);

dropdown.start();
