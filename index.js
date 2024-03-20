let todoList = [];
let comdoList = [];
let remList = [];
let addButton = document.getElementById("add-button");
let todoInput = document.getElementById("todo-input");
let deleteAllButton = document.getElementById("delete-all");
let allTodos = document.getElementById("all-todos");
let deleteButton = document.getElementById("delete-selected");

//event listener for add and delete
addButton.addEventListener("click", add);
deleteAllButton.addEventListener("click", deleteAll);
deleteButton.addEventListener("click", deleteS);

//Event listeners for filters
document.addEventListener("click", (e) => {
  if (
    e.target.className.split(" ")[0] == "complete" ||
    e.target.className.split(" ")[0] == "ci"
  ) {
    completeTodo(e);
  }
  if (
    e.target.className.split(" ")[0] == "delete" ||
    e.target.className.split(" ")[0] == "di"
  ) {
    deleteTodo(e);
  }
  if (e.target.id == "all") {
    viewAll();
  }
  if (e.target.id == "rem") {
    viewRemaining();
  }
  if (e.target.id == "com") {
    viewCompleted();
  }
});

// Add event listener for enter key
document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    add();
  }
});
// update all the remaining, completed and main list
function update() {
  comdoList = todoList.filter((ele) => {
    return ele.complete;
  });
  remList = todoList.filter((ele) => {
    return !ele.complete;
  });
  document.getElementById("r-count").innerText = todoList.length.toString();
  document.getElementById("c-count").innerText = comdoList.length.toString();
}

// add the task in main list
function add() {
  let value = todoInput.value;
  if (value === "") {
    alert("Task cannot be empty");
    return;
  }
  todoList.push({
    task: value,
    id: Date.now().toString(),
    complete: false,
  });
  todoInput.value = "";
  update();
  addinmain(todoList);
}
// render the main list and views on the main content
function addinmain(todoList) {
  allTodos.innerHTML = "";
}
// render the List and views of the main content
function addinmain(todoList) {
  allTodos.innerHTML = "";
  todoList.forEach((element) => {
    let x = `<li id=${element.id} class="todo-item">
      <p id="task">${
        element.complete ? `<strike>${element.task}</strike>` : element.task
      }</p>
      <div class="todo-actions">
      <button class="complete btn btn-success">
      <i class="ci bx bx-check bx-sm"></i>
      </button>
      <button class="delete btn btn-error">
      <i class="di bx bx-trash bx-sm"></i>
      </button>
      </div>
      </li>`;
    allTodos.innerHTML += x;
  });
}
// detes individual tasks and update all the list
function deleteTodo(e) {
  let deleted = e.target.parentElement.parentElement.getAttribute("id");
  todoList = todoList.filter((ele) => {
    return ele.id != deleted;
  });
  update();
  addinmain(todoList);
}
// complete individual task and updates all the list
function completeTodo(e) {
  let completed = e.target.parentElement.parentElement.getAttribute("id");
  todoList.forEach((obj) => {
    if (obj.id == completed) {
      if (obj.complete == false) {
        obj.complete = true;
        console.log(e.target.parentElement.parentElement);
        e.target.parentElement.parentElement
          .querySelector("#task")
          .classList.add("line");
      } else {
        obj.complete = false;
        e.target.parentElement.parentElement
          .querySelector("#task")
          .classList.remove("line");
      }
    }
  });
  update();
  addinmain(todoList);
}
// delete all tasks
function deleteAll(todo) {
  todoList = [];
  update();
  addinmain(todoList);
}
function deleteS(todo) {
  todoList = todoList.filter((ele) => {
    return !ele.complete;
  });
  update();
  addinmain(todoList);
}
// function for filter
function viewCompleted() {
  addinmain(comdoList);
}
function viewRemaining() {
  addinmain(remList);
}
function viewAll() {
  addinmain(todoList);
}
let toggleThemeButton = document.getElementById("theme-toggle");
toggleThemeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  // Change the button text based on the theme
  if (document.body.classList.contains("dark")) {
    toggleThemeButton.textContent = "🌞";
  } else {
    toggleThemeButton.textContent = "🌜";
  }
});
