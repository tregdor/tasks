class Dropdown{
  constructor(initState,dropdownInput,dropdownBtn,dropdownList) {
    this.state = initState;
    this.dropdownInput = dropdownInput;
    this.dropdownBtn = dropdownBtn;
    this.dropdownList = dropdownList;
    this.isOpen = false;
    this.notes = [];
    this.lastSelect = '';
  }
  start(){
    this.dropdownInput.addEventListener("click", () =>  this.open());
    this.dropdownBtn.addEventListener("click", () =>  this.open());

    this.dropdownInput.addEventListener("input", (e) => this.filterNotes(e));

    window.addEventListener(`resize`, () => this.close());
    document.onscroll = () => this.close();
    document.addEventListener('click', (e) => {
      if(!e.target.closest('.dropdown')){
        this.close()
      }
    })
  }
  open(){
    if(this.isOpen) return;
    this.dropdownInput.focus();
    this.dropdownInput.value = '';
    this.dropdownList.classList.remove("dropdown__items_hidden");

    this.createNotes(this.state);
    this.addNotes(this.notes);

    this.isOpen = true
  }
  close(){
    this.dropdownList.classList.add('dropdown__items_hidden');
    this.dropdownInput.value = this.lastSelect;
    this.isOpen = false;
  }
  createNotes(state){
    this.notes = state.map((data) => {
      let li = document.createElement("li");
      li.innerHTML = `${data.label}`;
      li.setAttribute("id", data.id);
      li.classList.add('dropdown__item');
      li.addEventListener('click',() => this.onChoiceNote(data.label));
      return li;
    });
  }
  filterNotes(event){
    const eValue = event.target.value;
    let notes = this.state.filter(note => note.label.indexOf(eValue) === 0);
    this.createNotes(notes);
    this.addNotes(this.notes)
  }
  addNotes(notes){
    this.clearNotes();
    notes.map((item) => {
      this.dropdownList.append(item);
    });
  }
  clearNotes(){
    this.dropdownList.innerHTML = '';
  }
  onChoiceNote(data){
    this.close();
    this.dropdownInput.value = data;
    this.lastSelect = data
  }
}
const initState=  [
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
const dropdownList = document.querySelector(".dropdown__items");

const dropdown = new Dropdown(initState,dropdownInput,dropdownBtn,dropdownList);

dropdown.start();
