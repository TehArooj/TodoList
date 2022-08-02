let tasks = [];

// Get Time and date in the required format  27/07/2022 @ 9:38 pm
const getDateAndTime = () => {
  let date = new Date();
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return (
    dd + "/" + mm + "/" + yyyy + " @ " + hours + ":" + minutes + " " + ampm
  );
};

const getTasks = () => {
  data = localStorage.getItem("tasks");
  if (data !== null) tasks = JSON.parse(data);
  return tasks;
};

// Add New Tasks
const addTasks = () => {
  tasks = getTasks();
  let time = getDateAndTime();
  tasks.push({
    id: tasks.length > 0 ? tasks.length + 1 : 1,
    title: document.getElementById("task").value,
    completed: false,
    time: time,
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById("task").value = "";
  displayTasks();
};

// Edit selected Task
const editTask = (objID) => {
  let titleInput = document.getElementById("title-value" + objID);
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == objID) {
      tasks[i].title = titleInput.value;
      break;
    }
  }
  localStorage.clear();
  localStorage.setItem("tasks", JSON.stringify(tasks));
  titleInput.disabled = true;
  titleInput.style.border = "none";
};
// Mark selected Task as complete and disable edit and check on that Task
const markTaskAsDone = (objID) => {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == objID) {
      tasks[i].completed = true;
      break;
    }
  }
  localStorage.clear();
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
};

// Delete selected Task
const deleteTask = (objID) => {
  tasks = getTasks();
  tasks = tasks.filter((x) => x.id != objID);
  localStorage.clear();
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
};

// Enable edit box of selected Task
const enableEdit = (objID) => {
  let titleInput = document.getElementById("title-value" + objID);
  titleInput.style.border = "1px solid grey";
  titleInput.disabled = false;
};

// DisplayTasks
const displayTasks = () => {
  tasks = getTasks();
  let hr = document.querySelector("hr");
  hr.classList.remove("hidden");
  if (tasks !== "") {
    box.innerHTML = "";
    tasks.map(
      (renderTasks = (obj) => {
        let box = document.getElementById("box");
        let html =
          `
            <div class="list-item-container" id="list-item-container">
                <div class="todo-list-item ${
                  obj.completed ? "overlay" : ""
                }" id="todo-list-item` +
          obj.id +
          `">
                    <div class="title-and-time">
                        <div class="task-title">
                        <i class="fas fa-stream" aria-hidden="true"></i
                        ><input class="title-value" id="title-value` +
          obj.id +
          `" value="${obj.title}" disabled="true"} onfocusout="editTask(` +
          obj.id +
          `)"/>
                        </div>
                        <div class="task-time"><p>${obj.time}</p></div>
                    </div>
                    <div class="task-actions">

                        <button class="action-icon" id="action-icon-edit` +
          obj.id +
          `" onclick="enableEdit(` +
          obj.id +
          `)" ${obj.completed ? 'disabled="true"' : ""}"> 
                        <i class="fas fa-pencil-alt" aria-hidden="true"></i>
                        </button>
                        
                        <button class="action-icon" id="action-icon-mark` +
          obj.id +
          `" onclick="markTaskAsDone(` +
          obj.id +
          `)" ${obj.completed ? 'disabled="true"' : ""} >
                        <i class="fas fa-check" aria-hidden="true"></i>
                        </button>
                        
                        <button class="action-icon" id="action-icon-delete` +
          obj.id +
          `" onclick="deleteTask(` +
          obj.id +
          `)" >
                        <i class="fas fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                </div> 
            </div>
            `;
        box.innerHTML += html;
      })
    );
  }
};

displayTasks();
