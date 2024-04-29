const addButton = document.getElementById('addButton');
addButton.addEventListener('click', () => {
  addTask();
});

document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});

const addTask = () => {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.id = 'task' + Date.now(); // 고유한 id 부여
    taskItem.appendChild(checkbox);

    const textLabel = document.createElement('label');
    textLabel.textContent = taskText;
    textLabel.setAttribute('for', checkbox.id); // 체크박스와 레이블 연결
    taskItem.appendChild(textLabel);

    const editButton = document.createElement('button');
    editButton.textContent = ':';
    editButton.className = 'button';
    taskItem.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '-';
    deleteButton.className = 'button';
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
    taskInput.value = '';

    saveTasks();

    checkbox.addEventListener('change', () => {
      toggleTask(checkbox);
      toggleCheckboxStyle(checkbox); // 체크박스 스타일 변경
    });

    editButton.addEventListener('click', () => {
      editTask(textLabel);
    });

    deleteButton.addEventListener('click', () => {
      deleteTask(taskItem);
    });
  }
};

const toggleCheckboxStyle = (checkbox) => {
  const label = checkbox.nextElementSibling; // 체크박스 다음에 위치한 레이블 요소 찾기
  if (checkbox.checked) {
    label.classList.add('checked');
  } else {
    label.classList.remove('checked');
  }
};

const toggleTask = (checkbox) => {
  const listItem = checkbox.parentElement;
  listItem.classList.toggle('completed');
  saveTasks();
};

const editTask = (textLabel) => {
  const newText = prompt('수정할 내용을 입력하세요.', textLabel.textContent);
  if (newText !== null && newText.trim() !== '') {
    textLabel.textContent = newText;
    saveTasks();
  }
};

const deleteTask = (taskItem) => {
  if (confirm('정말로 삭제 하시겠습니까?')) {
    taskItem.remove();
    saveTasks();
  }
};

const saveTasks = () => {
  const tasks = [];
  const taskItems = document.querySelectorAll('#taskList li');
  taskItems.forEach(item => {
    tasks.push({
      text: item.querySelector('label').textContent, // label 태그의 텍스트 내용
      completed: item.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasks = () => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    tasks.forEach(task => {
      const taskList = document.getElementById('taskList');
      const taskItem = document.createElement('li');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'checkbox';
      checkbox.id = 'task' + Date.now(); // 고유한 id 부여
      taskItem.appendChild(checkbox);

      const textLabel = document.createElement('label');
      textLabel.textContent = task.text;
      textLabel.setAttribute('for', checkbox.id); // 체크박스와 레이블 연결
      taskItem.appendChild(textLabel);

      const editButton = document.createElement('button');
      editButton.textContent = ':';
      editButton.className = 'button';
      taskItem.appendChild(editButton);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = '-';
      deleteButton.className = 'button';
      taskItem.appendChild(deleteButton);

      if (task.completed) {
        taskItem.classList.add('completed');
        checkbox.checked = true;
      }

      taskList.appendChild(taskItem);

      checkbox.addEventListener('change', () => {
        toggleTask(checkbox);
        toggleCheckboxStyle(checkbox); // 체크박스 스타일 변경
      });

      editButton.addEventListener('click', () => {
        editTask(textLabel);
      });

      deleteButton.addEventListener('click', () => {
        deleteTask(taskItem);
      });
    });
  }
};
