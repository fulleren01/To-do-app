import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/tasks/';

const app = document.querySelector('#app');
app.innerHTML = `
  <div style="max-width: 400px; margin: 50px auto; font-family: sans-serif;">
    <h2>Görev Listesi</h2>
    <form id="task-form" style="display: flex; gap: 8px; margin-bottom: 20px;">
      <input type="text" id="task-input" placeholder="Yeni görev..." style="flex: 1; padding: 8px;" required />
      <button type="submit" style="padding: 8px 16px;">Ekle</button>
    </form>
    <ul id="task-list" style="list-style: none; padding: 0;"></ul>
  </div>
`;

const taskList = document.querySelector('#task-list');
const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');

// Görevleri Çek ve Listele (GET)
async function fetchTasks() {
  try {
    const res = await axios.get(API_URL);
    taskList.innerHTML = res.data.map(task => `
      <li style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #ccc;">
        <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}; cursor: pointer;" onclick="toggleTask(${task.id}, ${!task.completed})">
          ${task.title}
        </span>
        <button onclick="deleteTask(${task.id})" style="color: red;">Sil</button>
      </li>
    `).join('');
  } catch (err) {
    console.error('Hata:', err);
  }
}

// Yeni Görev Ekle (POST)
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    await axios.post(API_URL, { title: taskInput.value, completed: false });
    taskInput.value = '';
    fetchTasks();
  } catch (err) {
    console.error('Ekleme hatası:', err);
  }
});

// Görevi Sil (DELETE)
window.deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
    fetchTasks();
  } catch (err) {
    console.error('Silme hatası:', err);
  }
};

// Durum Güncelle (PATCH)
window.toggleTask = async (id, completed) => {
  try {
    await axios.patch(`${API_URL}${id}/`, { completed });
    fetchTasks();
  } catch (err) {
    console.error('Güncelleme hatası:', err);
  }
};

fetchTasks();