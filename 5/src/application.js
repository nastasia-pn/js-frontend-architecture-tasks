import uniqueId from 'lodash/uniqueId.js';

// BEGIN
export default () => {
  const state = {
    lists: [
      { id: 'general', name: 'General' },
    ],
    tasks: {
      general: [],
    },
    currentListId: 'general',
  };

  const listsContainer = document.querySelector('[data-container="lists"]');
  const tasksContainer = document.querySelector('[data-container="tasks"]');
  const newListForm = document.querySelector('[data-container="new-list-form"]');
  const newTaskForm = document.querySelector('[data-container="new-task-form"]');
  const newListInput = newListForm.querySelector('input[name="name"]');
  const newTaskInput = newTaskForm.querySelector('input[name="name"]');

  const renderLists = () => {
    const ul = document.createElement('ul');
    state.lists.forEach((list) => {
      const li = document.createElement('li');
      if (list.id === state.currentListId) {
        const b = document.createElement('b');
        b.textContent = list.name;
        li.appendChild(b);
      } else {
        const a = document.createElement('a');
        a.href = `#${list.id}`;
        a.textContent = list.name;
        a.addEventListener('click', (e) => {
          e.preventDefault();
          state.currentListId = list.id;
          renderLists();
          renderTasks();
        });
        li.appendChild(a);
      }
      ul.appendChild(li);
    });
    listsContainer.innerHTML = '';
    listsContainer.appendChild(ul);
  };

  const renderTasks = () => {
    const tasks = state.tasks[state.currentListId] || [];
    if (tasks.length === 0) {
      tasksContainer.innerHTML = '';
      return;
    }
    const ul = document.createElement('ul');
    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.textContent = task.name;
      ul.appendChild(li);
    });
    tasksContainer.innerHTML = '';
    tasksContainer.appendChild(ul);
  };

  newListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = newListInput.value.trim();
    if (name === '') return;
    const exists = state.lists.some((list) => list.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      newListForm.reset();
      return;
    }
    const id = uniqueId(name.toLowerCase().replace(/\s+/g, ''));
    state.lists.push({ id, name });
    state.tasks[id] = [];
    newListForm.reset();
    renderLists();
  });

  newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = newTaskInput.value.trim();
    if (name === '') return;
    const listId = state.currentListId;
    state.tasks[listId].push({ name });
    newTaskForm.reset();
    renderTasks();
  });

  renderLists();
  renderTasks();
};

// END