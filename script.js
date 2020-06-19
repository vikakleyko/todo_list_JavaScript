"use strict";

const todoControl = document.querySelector(".todo-control"),
  headerInput = document.querySelector(".header-input"),
  todoList = document.querySelector(".todo-list"),
  todoCompleted = document.querySelector(".todo-completed");

let todoData = [];

const render = () => {
  todoList.textContent = "";
  todoCompleted.textContent = "";

  todoData.forEach((item) => {
    const todo = document.createElement("li");
    todo.classList.add("todo-item");
    todo.innerHTML =
      '<span class="text-todo">' +
      item.value +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";
    if (item.completed) {
      todoCompleted.appendChild(todo);
    } else {
      todoList.append(todo);
    }

    const btnCompleted = todo.querySelector(".todo-complete");
    btnCompleted.addEventListener("click", () => {
      item.completed = !item.completed;
      render();
    });

    const btnRemove = todo.querySelector(".todo-remove");
    btnRemove.addEventListener("click", () => {
      todoData = todoData.filter((el) => el.value !== item.value);
      render();
    });
  });
  localStorage.setItem("todos", JSON.stringify(todoData));
};

todoControl.addEventListener("submit", (event) => {
  event.preventDefault();

  const newTodo = {
    value: headerInput.value,
    completed: false,
  };
  if (newTodo.value !== "") {
    todoData.push(newTodo);
    render();
    headerInput.value = "";
  }
});

const getData = () => {
  if (!localStorage.getItem("todos")) {
    let todos = [
      {
        value: "Make coffee",
        completed: false,
      },
      {
        value: "Wash dishes",
        completed: true,
      },
    ];
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  todoData = JSON.parse(localStorage.getItem("todos"));
};

getData();
render();
