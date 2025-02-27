const fs = require("fs");
const path = "./test.json";

let loadTask = () => {
  try {
    return JSON.parse(fs.readFileSync(path));
  } catch {
    return [];
  }
};

let saveTasks = (tasks) => {
  fs.writeFileSync(path, JSON.stringify(tasks));
};

let addTask = (task) => {
  let tasks = loadTask();
  tasks.push({ task, completed: false });
  saveTasks(tasks);
  console.log("task added successfully");
};

let listTask = () => {
  let tasks = loadTask();
  if (tasks.length == 0) {
    console.log("There is no tasks");
  } else {
    console.log("Your tasks :");
    tasks.forEach((element, index) => {
      console.log(
        `${index + 1}- ${element.task}, statues: ${element.completed ? "✅ done" : "⌛ pending"}`
      );
    });
  }
};

let completeTask = (index) => {
  let tasks = loadTask();
  if (index == null) return; 
  index = Number(index);
  if (index > tasks.length) {
    console.log("your task's number is higher than task's list");
    console.log("please choose correct number");
    return;
  }
    tasks[index -1].completed = true;
    saveTasks(tasks);
};

let deleteTask = (index) => {
  
  let tasks = loadTask();
  if(index == null) return ;
  index = Number(index);
  if (index > tasks.length) {
    console.log("your task's number is higher than task's list");
    console.log("please choose correct number");
    return;
  }
  tasks = tasks.slice(0, index).concat(tasks.slice(index + 1));
  saveTasks(tasks);
};

let deleteAll = () => {
  fs.writeFileSync(path, "");
}

const command = process.argv[2];
const argument = process.argv[3];

switch(command) {
  case 'commands': 
    showCommand();
  break;
  case 'list': 
    listTask();
  break;
  case 'add': 
    addTask(argument);
  break;
  case 'complete': 
    completeTask(argument);
  break;
  case 'delete': 
    deleteTask(argument);
  break;
  case 'deleteAll': 
    deleteAll(argument);
  break;
  default: 
    console.log(`there's no such command like ${command}`);
    showCommand();

}
function showCommand() {
  console.log(
    `commands are: 
    1- commands 
    2- list 
    3- add
    4- complete
    5- delete
    6- deleteAll`
  )
}