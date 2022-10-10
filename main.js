import { v4 as uuidv4 } from 'uuid';

let todoList = [];

const list = document.querySelector(".list");

const inp = document.querySelector("input");

const form = document.querySelector("form");

function renderList() {
  const newArr = [];

  todoList = localStorage.getItem("todoList")
    ? JSON.parse(localStorage.getItem("todoList"))
    : [];

  todoList.forEach((item, index) => {
    newArr.push(`
      <div class="todo-item">
        <span>${item.name}</span>
        <span onclick="onEdit(${index})">Edit</span>
        <span onclick="onDelete(${index})">XX</span>
      </div>
    `);
  });

  list.innerHTML = newArr.join("");
}

renderList();

form.addEventListener("submit", function (event) {
  event.preventDefault();
  todoList.push({ id: uuidv4(), name: inp.value });
  inp.value = "";
  localStorage.setItem("todoList", JSON.stringify(todoList));
  renderList();
});

function onDelete(index) {
  todoList.splice(index, 1);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  renderList();
}

let selectedItem = {};

function onEdit(index) {
  selectedItem = todoList[index];
  inp.value = todoList[index].name;
}

function onUpdateTodo() {
  const index = todoList.findIndex(function(item) {
    return item.name === selectedItem.name;
  })

  todoList.splice(index, 1, {name: inp.value});
  localStorage.setItem("todoList", JSON.stringify(todoList));
  inp.value = '';
  renderList();
}
