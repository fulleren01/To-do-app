const form= document.getElementById('todoForm');
const input= document.getElementById('todoInput');
const list= document.getElementById('taskList');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const text= input.value.trim();
    if (text !== '') return;
    const li = document.createElement('li');
    li.textContent = text;

    taskList.appendChild(li);
    input.value = '';
    input.focus();
});