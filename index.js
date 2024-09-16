const addMessage = document.querySelector(".message");
const addButton = document.querySelector(".add");
const todo = document.querySelector(".todo");

let todoList = [];

addButton.addEventListener("click", () => {
  let newTodo = {
    todo: addMessage.value,
    checked: false,
    important: false,
  };

  todoList.push(newTodo);
  renderTodoList();
  localStorage.setItem("todo", JSON.stringify(todoList));
});

const renderTodoList = () => {
  let displayMessage = ``;

  todoList.forEach((item, index) => {
    displayMessage += `
        <li>
        <input type="checkbox"  id="item_${index}" ${
      item.checked ? "checked" : ""
    }>
        <label for="item_${index}">${item.todo}</label>
          <button class="delete" data-index="${index}">Delete</button>
        </li>
        `;
  });
  todo.innerHTML = displayMessage;
  console.log(todo);
};

if (localStorage.getItem("todo")) {
  todoList = JSON.parse(localStorage.getItem("todo"));
  renderTodoList();
}

todo.addEventListener("change", (e) => {
  let idInput = e.target.getAttribute("id");
  let forLabel = todo.querySelector(`[for=` + idInput + `]`);
  let valueLabel = forLabel.innerHTML;

  todoList.forEach((item) => {
    if (item.todo === valueLabel) {
      item.checked = !item.checked;
      localStorage.setItem("todo", JSON.stringify(todoList));
    }
  });
});

todo.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    let index = parseInt(e.target.getAttribute("data-index"));

    todoList.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(todoList));
    renderTodoList();
  }
});
