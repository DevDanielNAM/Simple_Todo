const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskBoard = document.getElementById("task-board");
const tabs = document.querySelectorAll(".task-tabs div");
const underLine = document.getElementById("under-line");

let taskList = [];
let filterList = [];
let mode = "all";

taskInput.addEventListener("focus", () => (taskInput.value = ""));
addButton.addEventListener("click", addTask);

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", (event) => {
    filter(event);
  });
}

function addTask() {
  let task = {
    id: randomIDGenerator(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  if (taskInput.value === "") {
    alert("해야할 일을 입력하세요");
    return;
  }
  taskList.push(task);
  render();
}

function render() {
  let resultHTML = "";
  let list = [];

  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete === true) {
      resultHTML += `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
          <button class="btn btn-success" onclick="toggleComplete('${list[i].id}')">다했다</button>
          <button class="btn btn-danger" onclick="deleteTask('${list[i].id}')">지우기</button>
        </div>
      </div>`;
    } else {
      resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
              <button class="btn btn-success"  onclick="toggleComplete('${list[i].id}')">다했다</button>
              <button class="btn btn-danger" onclick="deleteTask('${list[i].id}')">지우기</button>
            </div>
          </div>`;
    }
  }

  taskBoard.innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];

  underLine.style.width = event.target.offsetWidth + "px";
  underLine.style.left = event.target.offsetLeft + "px";
  underLine.style.top =
    event.target.offsetTop + event.target.offsetHeight + "px";

  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomIDGenerator() {
  return "_" + Math.random().toString(36).substring(2, 9);
}
