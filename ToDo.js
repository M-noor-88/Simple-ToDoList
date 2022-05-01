
let input = document.querySelector("[type = 'text']");
let submit = document.querySelector("[type = 'submit']");
let tasksDiv = document.querySelector(".tasks");

// Empty Array to store Tasks
let arrayOfTasks = [];

// Check if there data in local storage set them in arrayOfTasks
if(localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}


// Trigger Get data from local storage function
getDataFromLocal();


// ? Add Task
submit.onclick = function () {
// if input not empty
    if(input.value !== "") {
        addTaskToArray(input.value); // Add Task to Array of Tasks
        input.value = ""; // Empty the input
    }   
}

// ? Click on task Element (DELETE)
tasksDiv.addEventListener("click" , (e) => {
    // Delete Button
    if(e.target.classList.contains("delete")) {
        // Remove Task from local storage (id)
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // Remove element From Page
        e.target.parentElement.remove();
    }
    // Task Element
    if (e.target.classList.contains("task")) {
        // Toggle completed for the task
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        // Toggle done class
        e.target.classList.toggle("done");
    }
})



// ?  To Add Task to Array
function addTaskToArray(TaskName) {

    // Task data
    const task = {
        id: Date.now(),  // Id is the date of enter Task
        title: TaskName , 
        completed: false,
    };

    // push Task to arraytasks
    arrayOfTasks.push(task);

    // Add Tasks To Page
    addElementToPageFrom(arrayOfTasks);

    // Add Task To local  Storage 
    addDataToLocalStorageFrom(arrayOfTasks);
}



// ? Add Element To Page From array Of Tasks
function addElementToPageFrom(arrayOfTasks) {
    // Empty The task Div For no repeat tasks
    tasksDiv.innerHTML = "";

    // Looping on Array of Tasks
    arrayOfTasks.forEach((task) => {

        // Create Main Div Of Task
        let div = document.createElement("div");
        div.className = "task";
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));

        // Check if Task Done !
        if(task.completed) {
            div.className = "task done";
        }

        // Add Delete Button to Main Div
        let span = document.createElement("span");
        span.className = "delete";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);

        // Add Task Div to container Div
        tasksDiv.appendChild(div);
    });
}



// ? Add Task To Local sotrage
function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks)); //stringify : Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
}


// ? Get Data form local storage
function getDataFromLocal() {
    let data = window.localStorage.getItem("tasks");
    if(data) {
        // tasks | : it is the Array which have data in local storage
        let tasks = JSON.parse(data); // parse : Converts a JavaScript Object Notation (JSON) string into an object.

        addElementToPageFrom(tasks);
    }
}


// ? Delete Task From Local sotrage (id)
function deleteTaskWith(taskId) {
    // Loopin on arrayOfTasks And return all id withot taskId (Deleted)
    arrayOfTasks = arrayOfTasks.filter((task) => {
    return  task.id != taskId ; 
    });
    // Update Array in Local storage
    addDataToLocalStorageFrom(arrayOfTasks);
}

// ? Update Status (completed) for task (id)
function toggleStatusTaskWith(taskId) {
    for(let i=0; i< arrayOfTasks.length ; i++)
    {
        if(arrayOfTasks[i].id == taskId)
        {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false); 
        }
    }
    // Update Local Storage
    addDataToLocalStorageFrom(arrayOfTasks);
}

// ? Reset Button
let btn = document.querySelector(".delete-all");
btn.onclick = function () {
    tasksDiv.innerHTML = "";
    window.localStorage.clear();
    arrayOfTasks = [];
}






























// window.localStorage.clear()
// let submit = document.querySelector("[type='submit']");


// submit.addEventListener("click", function (e) {
//     let TaskName = document.querySelector("[type='text']").value;

//     //  If Input Not Null
//     if (TaskName !== "") {
//         AddTask(TaskName);
//         //  Clear Input After Add Task
//         document.querySelector("[type='text']").value = '';
//     }
//     // Stop Event 
//     else {
//         e.preventDefault();
//     }

// });











// // let alltasks = [];
// // * Function To Add Task
// function AddTask(TaskName) {

//     // creat Div
//     let div = document.createElement("div");
//     div.style.cssText = ` display:flex; align-items:center; justify-content:space-between;
//     gap:20px;  background-color:#fff; font-size:16px; color: darkorange; width:400px; padding:10px; `;


//     // Set Task Name to text
//     let text = document.createTextNode(TaskName);
//     div.append(text);

//     // Add created Div (Task) To container div .tasks 
//     let divTask = document.querySelector(".tasks");
//     divTask.append(div);

//     // Add Task To Array Tasks
//     let newTask = {
//         id: Math.floor(Math.random() * 100),
//         title: TaskName,
//     };
    
//     // alltasks.push(newTask);
//     // Add The Task to local Storage specific  TaskName + counter
//     window.localStorage.setItem("Task", obuj);
//     DeleteButton(div, obj)
// }  


// // function for Add delete button to the task
// function DeleteButton(div, key) {
//     let btn = document.createElement("button");

//     btn.innerHTML = "Delete";

//     btn.style.cssText = "background-color: red; color:#fff; width:fit-content; padding:10px";
//     div.append(btn);


//     btn.addEventListener("click", () => {

//         window.localStorage.removeItem(key);
//         div.remove();
//     })
// }

