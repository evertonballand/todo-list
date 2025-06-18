const buttonAdicionar = document.getElementById('criar-tarefa');
const inputTarefa = document.getElementById('texto-tarefa');
const listaTarefa = document.querySelector('#lista-tarefas');
const btnClearTasks = document.getElementById('apaga-tudo');
const btnClearComplete = document.getElementById('remover-finalizados');
const btnSaveTaskList = document.getElementById('salvar-tarefas');
const btnUp = document.querySelector('#mover-cima');
const btnDown = document.querySelector('#mover-baixo');
const btnRemoveSelected = document.querySelector('#remover-selecionado');

// Salvar tarefas no armazenamento local
const saveLocalStorage = () => {
  const tarefas = Array.from(listaTarefa.children).map((tarefa) => ({
    texto: tarefa.innerText,
    completa: tarefa.classList.contains('completed'),
  }));
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
};

// Lidar com a seleção de tarefas
const itemSelecionado = (event) => {
  Array.from(listaTarefa.children).forEach((tarefa) => {
    tarefa.classList.remove('tarefa-selecionada');
  });
  event.target.classList.add('tarefa-selecionada');
};

// Lidar com a conclusão de tarefas
const handleChangeComplete = (event) => {
  event.target.classList.toggle('completed');
};

// Carregar tarefas do armazenamento local
const loadLocalStorage = () => {
  const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefasSalvas.forEach((tarefa) => {
    const novaTarefa = document.createElement('li');
    novaTarefa.innerText = tarefa.texto;
    if (tarefa.completa) {
      novaTarefa.classList.add('completed');
    }
    novaTarefa.addEventListener('click', itemSelecionado);
    novaTarefa.addEventListener('dblclick', handleChangeComplete);
    listaTarefa.appendChild(novaTarefa);
  });
};

// Adicionar novas tarefas
const addTarefa = () => {
  buttonAdicionar.addEventListener('click', () => {
    const inputText = inputTarefa.value;
    if (inputText !== '') {
      const novaTarefa = document.createElement('li');
      novaTarefa.innerText = inputText;
      novaTarefa.addEventListener('click', itemSelecionado);
      novaTarefa.addEventListener('dblclick', handleChangeComplete);
      listaTarefa.appendChild(novaTarefa);
      inputTarefa.value = '';
    } else {
      alert('Por favor, insira uma tarefa válida.');
    }
  });
};

// Lidar com o modo escuro
const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};

// Limpar lista de tarefas
const clearList = () => {
  listaTarefa.innerHTML = '';
  saveLocalStorage();
};
btnClearTasks.addEventListener('click', clearList);

// Limpar tarefas concluídas
const clearCompleteTasks = () => {
  const tarefas = Array.from(listaTarefa.children);
  tarefas.forEach((tarefa) => {
    if (tarefa.classList.contains('completed')) {
      listaTarefa.removeChild(tarefa);
    }
  });
  saveLocalStorage();
};
btnClearComplete.addEventListener('click', clearCompleteTasks);

// Salvar lista no localstorage
const saveList = () => {
  saveLocalStorage();
  console.log('função chamada!');
};
btnSaveTaskList.addEventListener('click', saveList);

const getSelectedTask = () => listaTarefa.querySelector('.tarefa-selecionada');

const moveItemUp = () => {
  const taskSelected = getSelectedTask();
  if (taskSelected) {
    const previous = taskSelected.previousElementSibling;
    if (previous) {
      listaTarefa.insertBefore(taskSelected, previous);
    }
  }
};

const moveItemDown = () => {
  const taskSelected = getSelectedTask();
  if (taskSelected) {
    const next = taskSelected.nextElementSibling;
    if (next) {
      listaTarefa.insertBefore(next, taskSelected);
    }
  }
};

btnUp.addEventListener('click', moveItemUp);
btnDown.addEventListener('click', moveItemDown);

const removeSelected = () => {
  const taskSelected = getSelectedTask();
  if (taskSelected) {
    taskSelected.remove();
  }
};
btnRemoveSelected.addEventListener('click', removeSelected);
// Inicialização
// loadLocalStorage();
// addTarefa();

// Modo escuro inicial
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

// Evento do botão de modo escuro
document.getElementById('toggle-dark-mode').addEventListener('click', toggleDarkMode);

window.onload = () => {
  loadLocalStorage();
  addTarefa();
};
