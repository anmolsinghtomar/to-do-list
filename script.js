function updateTaskCount() {
    let totalTasks = document.querySelectorAll(".task-item").length;
    let completedTasks = document.querySelectorAll(".task-item.completed").length;
    document.getElementById("totalTasks").textContent = totalTasks;
    document.getElementById("completedTasks").textContent = completedTasks;
}

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskDate = document.getElementById("taskDate").value;
    let taskText = taskInput.value.trim();

    if (taskText === "") return;

    let formattedDate = taskDate ? new Date(taskDate).toLocaleDateString() : "No date";

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");
    li.className = "list-group-item task-item fade-in";
    li.innerHTML = `<span>${taskText}</span>
                    <span class="task-date">${formattedDate}</span>
                    <div class="task-buttons">
                        <button class="btn btn-success btn-sm" onclick="completeTask(this)">✔</button>
                        <button class="btn btn-danger btn-sm" onclick="removeTask(this)">✖</button>
                    </div>`;
    taskList.appendChild(li);
    taskInput.value = "";
    document.getElementById("taskDate").value = "";
    updateTaskCount();
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        addTask();
    }
}

function removeTask(button) {
    let li = button.closest(".task-item");
    li.style.opacity = "0";
    li.style.transform = "translateY(-10px)";
    setTimeout(() => {
        li.remove();
        updateTaskCount();
    }, 300);
}

function completeTask(button) {
    let li = button.closest(".task-item");
    li.classList.toggle("completed");
    updateTaskCount();
}

function deleteAllTasks() {
    document.getElementById("taskList").innerHTML = "";
    updateTaskCount();
}

function filterTasks(filter) {
    let tasks = document.querySelectorAll(".task-item");
    tasks.forEach(task => {
        switch (filter) {
            case "all":
                task.style.display = "flex";
                break;
            case "completed":
                task.style.display = task.classList.contains("completed") ? "flex" : "none";
                break;
            case "remaining":
                task.style.display = task.classList.contains("completed") ? "none" : "flex";
                break;
        }
    });
}
