import axios from 'axios';

const routes = {
  tasksPath: () => '/api/tasks',
};

// BEGIN
export default async () => {
  const form = document.querySelector('form');
  const input = form.querySelector('input[name="name"]');
  const tasksList = document.getElementById('tasks');

  let tasks = [];

  const render = () => {
    tasksList.innerHTML = '';
    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = task.name;
      li.setAttribute('role', 'listitem');
      tasksList.appendChild(li);
    });
  };

  try {
    const response = await axios.get(routes.tasksPath());
    // Создаем новый массив из ответа сервера
    tasks = [...response.data.items];
    render();
  } catch (e) {
    // Можно добавить обработку ошибок, если нужно
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = input.value.trim();
    if (name === '') {
      return;
    }
    try {
      const response = await axios.post(routes.tasksPath(), { name });
      if (response.status === 201) {
        // Добавляем новую задачу в начало массива, как на сервере
        tasks.unshift({ name });
        render();
        form.reset();
        input.focus();
      }
    } catch (err) {
      // Можно добавить обработку ошибок, если нужно
    }
  });
};
// END