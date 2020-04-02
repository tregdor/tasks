const dropdown = {
  state: [
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
  ],
  isOpen: false,
  open(dropdownList,dropdownInput){
    if(this.isOpen) return;
    dropdownInput.focus();
    dropdownInput.value = '';
    dropdownList.classList.remove("dropdown__items_hidden");

    this.createNotes(this.state);
    this.addNotes(this.notes,dropdownList);

    this.isOpen = true
  },
  close(dropdownList){
  },
  createNotes(state){
    this.notes = state.map((data) => {
      let li = document.createElement("li");
      li.innerHTML = `${data.label}`;
      li.setAttribute("id", data.id);
      li.classList.add('dropdown__item');
      li.addEventListener('click',() => this.onChoiceNote(data.label));
      return li;
    });
  },
  filterNotes(event,dropdownList){
    const eValue = event.target.value;
    let notes = this.state.filter(note => note.label.indexOf(eValue) === 0);
    this.createNotes(notes);
    this.addNotes(this.notes,dropdownList)
  },
  addNotes(notes,dropdownList){
    this.clearNotes(dropdownList);
    notes.map((item) => {
      dropdownList.append(item);
    });
  },
  clearNotes(dropdownList){
    dropdownList.innerHTML = '';
  },
  onChoiceNote(){

  }
};


const dropdownInput = document.querySelector(".dropdown__input");
const dropdownBtn = document.querySelector(".dropdown__open-button");
const dropdownList = document.querySelector(".dropdown__items");

dropdownInput.addEventListener("click", () =>  dropdown.open(dropdownList,dropdownInput));
dropdownBtn.addEventListener("click", () =>  dropdown.open(dropdownList,dropdownInput));

dropdownInput.addEventListener("input", (e) => dropdown.filterNotes(e,dropdownList));