document.addEventListener('DOMContentLoaded', () => {
    loadGoals();
    loadTasks();
    loadNotes();
    ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].forEach(day => {
        loadTasksForDay(day);
    });
});

function addGoal() {
    const goalInput = document.getElementById('goal-input');
    const goalText = goalInput.value;
    if (goalText === '') return;

    const goalList = document.querySelector('.goal-list');
    const newGoal = document.createElement('div');
    newGoal.textContent = goalText;
    newGoal.classList.add('goal-item');
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');
    buttonsDiv.appendChild(createEditButton(newGoal, saveGoals));
    buttonsDiv.appendChild(createDeleteButton(newGoal, saveGoals));
    newGoal.appendChild(buttonsDiv);
    goalList.appendChild(newGoal);

    saveGoals();
    goalInput.value = '';
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value;
    if (taskText === '') return;

    const taskList = document.querySelector('.task-list');
    const newTask = document.createElement('div');
    newTask.textContent = taskText;
    newTask.classList.add('task-item');
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');
    buttonsDiv.appendChild(createEditButton(newTask, saveTasks));
    buttonsDiv.appendChild(createDeleteButton(newTask, saveTasks));
    newTask.appendChild(buttonsDiv);
    taskList.appendChild(newTask);

    saveTasks();
    taskInput.value = '';
}

function addNote() {
    const noteInput = document.getElementById('note-input');
    const noteText = noteInput.value;
    if (noteText === '') return;

    const notesList = document.querySelector('.notes-list');
    const newNote = document.createElement('div');
    newNote.textContent = noteText;
    newNote.classList.add('note-item');
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');
    buttonsDiv.appendChild(createEditButton(newNote, saveNotes));
    buttonsDiv.appendChild(createDeleteButton(newNote, saveNotes));
    newNote.appendChild(buttonsDiv);
    notesList.appendChild(newNote);

    saveNotes();
    noteInput.value = '';
}

function createEditButton(element, saveFunction) {
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.onclick = () => {
        const newText = prompt('Edit text:', element.childNodes[0].nodeValue);
        if (newText) {
            element.childNodes[0].nodeValue = newText;
            saveFunction();
        }
    };
    return editButton;
}

function createDeleteButton(element, saveFunction) {
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.onclick = () => {
        element.remove();
        saveFunction();
    };
    return deleteButton;
}

function saveGoals() {
    const goalList = document.querySelector('.goal-list');
    const goals = [];
    goalList.querySelectorAll('.goal-item').forEach(goal => {
        goals.push(goal.childNodes[0].nodeValue);
    });
    localStorage.setItem('goals', JSON.stringify(goals));
}

function loadGoals() {
    const goals = JSON.parse(localStorage.getItem('goals') || '[]');
    const goalList = document.querySelector('.goal-list');
    goals.forEach(goalText => {
        const newGoal = document.createElement('div');
        newGoal.textContent = goalText;
        newGoal.classList.add('goal-item');
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');
        buttonsDiv.appendChild(createEditButton(newGoal, saveGoals));
        buttonsDiv.appendChild(createDeleteButton(newGoal, saveGoals));
        newGoal.appendChild(buttonsDiv);
        goalList.appendChild(newGoal);
    });
}

function saveTasks() {
    const taskList = document.querySelector('.task-list');
    const tasks = [];
    taskList.querySelectorAll('.task-item').forEach(task => {
        tasks.push(task.childNodes[0].nodeValue);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const taskList = document.querySelector('.task-list');
    tasks.forEach(taskText => {
        const newTask = document.createElement('div');
        newTask.textContent = taskText;
        newTask.classList.add('task-item');
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');
        buttonsDiv.appendChild(createEditButton(newTask, saveTasks));
        buttonsDiv.appendChild(createDeleteButton(newTask, saveTasks));
        newTask.appendChild(buttonsDiv);
        taskList.appendChild(newTask);
    });
}

function saveNotes() {
    const notesList = document.querySelector('.notes-list');
    const notes = [];
    notesList.querySelectorAll('.note-item').forEach(note => {
        notes.push(note.childNodes[0].nodeValue);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const notesList = document.querySelector('.notes-list');
    notes.forEach(noteText => {
        const newNote = document.createElement('div');
        newNote.textContent = noteText;
        newNote.classList.add('note-item');
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');
        buttonsDiv.appendChild(createEditButton(newNote, saveNotes));
        buttonsDiv.appendChild(createDeleteButton(newNote, saveNotes));
        newNote.appendChild(buttonsDiv);
        notesList.appendChild(newNote);
    });
}

function addTaskToDay(day) {
    const dayElement = document.getElementById(day);
    const taskInput = dayElement.querySelector('input');
    const taskText = taskInput.value;
    if (taskText === '') return;

    const taskList = dayElement.querySelector('.task-list');
    const newTask = document.createElement('div');
    newTask.textContent = taskText;
    newTask.classList.add('task-item');
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');
    buttonsDiv.appendChild(createEditButton(newTask, () => saveTasksForDay(day)));
    buttonsDiv.appendChild(createDeleteButton(newTask, () => saveTasksForDay(day)));
    newTask.appendChild(buttonsDiv);
    taskList.appendChild(newTask);

    saveTasksForDay(day);
    taskInput.value = '';
}

function saveTasksForDay(day) {
    const dayElement = document.getElementById(day);
    const taskList = dayElement.querySelector('.task-list');
    const tasks = [];
    taskList.querySelectorAll('.task-item').forEach(task => {
        tasks.push(task.childNodes[0].nodeValue);
    });
    localStorage.setItem(`${day}-tasks`, JSON.stringify(tasks));
}

function loadTasksForDay(day) {
    const tasks = JSON.parse(localStorage.getItem(`${day}-tasks`) || '[]');
    const taskList = document.querySelector(`#${day} .task-list`);
    tasks.forEach(taskText => {
        const newTask = document.createElement('div');
        newTask.textContent = taskText;
        newTask.classList.add('task-item');
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');
        buttonsDiv.appendChild(createEditButton(newTask, () => saveTasksForDay(day)));
        buttonsDiv.appendChild(createDeleteButton(newTask, () => saveTasksForDay(day)));
        newTask.appendChild(buttonsDiv);
        taskList.appendChild(newTask);
    });
}
