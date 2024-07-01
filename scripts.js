document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    loadGoals();
    loadTasks();
    loadNotes();
    loadRatings();
    displayWeekNumber();
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
    const taskPriority = document.getElementById('task-priority').value;
    const taskText = taskInput.value;
    if (taskText === '') return;

    const taskList = document.querySelector('.task-list');
    const newTask = document.createElement('div');
    newTask.textContent = taskText;
    newTask.classList.add('task-item', taskPriority);
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

// وظائف الحفظ والتحميل باستخدام LocalStorage

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
        tasks.push({ text: task.childNodes[0].nodeValue, priority: task.classList[1] });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const taskList = document.querySelector('.task-list');
    tasks.forEach(task => {
        const newTask = document.createElement('div');
        newTask.textContent = task.text;
        newTask.classList.add('task-item', task.priority);
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
    const taskInput = dayElement.querySelector('input[type="text"]');
    const taskPriority = dayElement.querySelector('select').value;
    const taskText = taskInput.value;
    if (taskText === '') return;

    const taskList = dayElement.querySelector('.task-list');
    const newTask = document.createElement('div');
    newTask.textContent = taskText;
    newTask.classList.add('task-item', taskPriority);
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
        tasks.push({ text: task.childNodes[0].nodeValue, priority: task.classList[1] });
    });
    localStorage.setItem(`${day}-tasks`, JSON.stringify(tasks));
}

function loadTasksForDay(day) {
    const tasks = JSON.parse(localStorage.getItem(`${day}-tasks`) || '[]');
    const taskList = document.querySelector(`#${day} .task-list`);
    tasks.forEach(task => {
        const newTask = document.createElement('div');
        newTask.textContent = task.text;
        newTask.classList.add('task-item', task.priority);
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');
        buttonsDiv.appendChild(createEditButton(newTask, () => saveTasksForDay(day)));
        buttonsDiv.appendChild(createDeleteButton(newTask, () => saveTasksForDay(day)));
        newTask.appendChild(buttonsDiv);
        taskList.appendChild(newTask);
    });
}

function rateDay(day) {
    const ratingInput = document.getElementById(`${day}-rating`);
    const ratingValue = ratingInput.value;
    if (ratingValue < 0 || ratingValue > 100) return;

    localStorage.setItem(`${day}-rating`, ratingValue);
    calculateWeeklyRating();
}

function loadDayRating(day) {
    const ratingValue = localStorage.getItem(`${day}-rating`) || '';
    const ratingInput = document.getElementById(`${day}-rating`);
    ratingInput.value = ratingValue;
}

function calculateWeeklyRating() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    let totalRating = 0;
    let count = 0;

    days.forEach(day => {
        const ratingValue = parseInt(localStorage.getItem(`${day}-rating`), 10);
        if (!isNaN(ratingValue)) {
            totalRating += ratingValue;
            count++;
        }
    });

    const weeklyRating = count > 0 ? (totalRating / count).toFixed(2) : 0;
    localStorage.setItem('weekly-rating', weeklyRating);
    document.getElementById('weekly-rating').value = weeklyRating;
}

function loadRatings() {
    const weeklyRatingValue = localStorage.getItem('weekly-rating') || '';
    document.getElementById('weekly-rating').value = weeklyRatingValue;
    calculateWeeklyRating();
}

function saveSettings() {
    const weekStartsOn = document.getElementById('week-starts-on').value;
    localStorage.setItem('week-starts-on', weekStartsOn);
    alert('Settings saved!');
    toggleSettingsPopup();
    generateCalendar(weekStartsOn);
}

function loadSettings() {
    const weekStartsOn = localStorage.getItem('week-starts-on') || 'sunday';
    document.getElementById('week-starts-on').value = weekStartsOn;
    generateCalendar(weekStartsOn);
}

function generateCalendar(weekStartsOn) {
    const calendarView = document.querySelector('.calendar-view');
    calendarView.innerHTML = '';
    const days = weekStartsOn === 'sunday' ? ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] : ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    days.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.id = day;
        dayDiv.innerHTML = `
            <h3>${capitalizeFirstLetter(day)}</h3>
            <div class="task-list" data-day="${day}"></div>
            <input type="text" placeholder="Add task">
            <select id="${day}-priority">
                <option value="must-do">Must Do</option>
                <option value="appointment">Appointment/Meeting</option>
                <option value="low-priority">Low Priority</option>
            </select>
            <button onclick="addTaskToDay('${day}')"><i class="fas fa-plus"></i></button>
            <div class="rating">
                <label for="${day}-rating">Day Rating:</label>
                <input type="number" id="${day}-rating" min="0" max="100" placeholder="Enter %" oninput="rateDay('${day}')">
            </div>
        `;
        calendarView.appendChild(dayDiv);
        loadTasksForDay(day);
        loadDayRating(day);
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayWeekNumber() {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil(days / 7);
    document.getElementById('week-number').innerText = `Current Week Number: ${weekNumber}`;
}

function toggleSettingsPopup() {
    const settingsPopup = document.getElementById('settings-popup');
    settingsPopup.style.display = settingsPopup.style.display === 'flex' ? 'none' : 'flex';
}
