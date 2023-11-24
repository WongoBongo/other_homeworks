const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

const todoData = [];

const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    todoData.forEach(function (item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed;
            render();
        });

        li.querySelector('.todo-remove').addEventListener('click', function () {
            // Ищем родителя с классом todo-item
            const listItem = this.closest('.todo-item');
            if (listItem) {
                listItem.remove();
                todoData.splice(todoData.indexOf(item), 1); // Удаляем элемент из массива
                localStorage.setItem('todoData', JSON.stringify(todoData));
                render();
            }
        });
    });
};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    if (headerInput.value.trim() !== '') {
        const newToDo = {
            text: headerInput.value,
            completed: false
        };

        todoData.push(newToDo);
        localStorage.setItem('todoData', JSON.stringify(todoData));
        headerInput.value = '';

        render();
    }
});

const todoCreate = {
    checkFields() {
        return headerInput.value.trim() !== '';
    }
};