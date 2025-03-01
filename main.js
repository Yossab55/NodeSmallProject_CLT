const fs = require("fs");
const { collectionConnection, closeDB } = require("./db");
// const path = "./test.json";
let loadTask = async () => {
  try {
    let collection = await collectionConnection("tododList");
    let tasks = await collection.find({}).toArray();
    await closeDB();
    return tasks;
  } catch {
    return [];
  }
};

let saveTasks = async (tasks) => {
  let collection = await collectionConnection("tododList");
  collection.insertMany(tasks);
  await closeDB();
};

let addTask = async (task) => {
  await saveTasks([{ task, completed: false }]);
  console.log("task added successfully");
  await closeDB();
};

let listTask = async () => {
  let tasks = await loadTask();
  if (tasks.length == 0) {
    console.log("There is no tasks");
  } else {
    console.log("Your tasks :");
    tasks.forEach((element, index) => {
      console.log(
        `${index + 1}- ${element.task}, statues: ${
          element.completed ? "✅ done" : "⌛ pending"
        }`
      );
    });
  }
};

let completeTask = async (index) => {
  if (index == null) return;
  let tasks = await loadTask();
  index = Number(index);
  if (index > tasks.length) {
    console.log("your task's number is higher than task's list");
    console.log("please choose correct number");
    return;
  }
  tasks[index - 1].completed = true;
  await saveTasks(tasks);
  console.log("task updated successfully");
};

let deleteTask = async (index) => {
  if (index == null) return;
  let tasks = await loadTask();
  index = Number(index);
  if (index > tasks.length) {
    console.log("your task's number is higher than task's list");
    console.log("please choose correct number");
    return;
  }
  tasks = tasks.slice(0, index).concat(tasks.slice(index + 1));
  await saveTasks(tasks);
  console.log("task are deleted");
};

let deleteAll = async () => {
  let collection = collectionConnection("tododList");
  await collection.deleteMany({});
  console.log("all records are deleted successfully");
};

const command = process.argv[2];
const argument = process.argv[3];

switch (command) {
  case "commands":
    showCommand();
    break;
  case "list":
    listTask();
    break;
  case "add":
    addTask(argument);
    break;
  case "complete":
    completeTask(argument);
    break;
  case "delete":
    deleteTask(argument);
    break;
  case "deleteAll":
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
  );
}
