'use strict';

function view () {
    const generateTodoTemplate = (data) => {
        const wrapper = document.createElement('div');

        wrapper.classList.add('col-4');
        wrapper.setAttribute('data-todo-id', data.id);
        wrapper.classList.add('data-todo-item');

        wrapper.innerHTML = `<div class="taskWrapper">
            <div class="data-inner-task-wrapper">
                <div class="taskHeading">${data.title}</div>
                <div class="taskDescription">${data.description}</div>
            <select class="todo-options" name="select">
                <option value="No status" id="option-nostatus">No status</option>
                <option value="Pending" id="option-pending">Pending</option>
                <option value="Completed" id="option-completed">Completed</option>
            </select>
            </div>
            <button id="${data.id}" class="data-delete-btn"></button>
           </div>`;
        return wrapper;
    };

    const generateTodoTemplateFromDB = (data) => {
        const wrapper = document.createElement('div');

        wrapper.classList.add('col-4');
        wrapper.setAttribute('data-todo-id', data.id);
        wrapper.classList.add('data-todo-item');

        wrapper.innerHTML = `<div class="taskWrapper">
            <div class="data-inner-task-wrapper">
                <div class="taskHeading">${data.title}</div>
                <div class="taskDescription">${data.description}</div>
            <select class="todo-options" name="select">
                <option value="No status" id="option-nostatus">${data.option}</option>
                <option value="Pending" id="option-pending">${data.option}</option>
                <option value="Completed" id="option-completed">${data.option}</option>
            </select>
            </div>
            <button id="${data.id}" class="data-delete-btn"></button>
           </div>`;
        return wrapper;
    };



    return {
        form: null,
        todoContainer: null,

        clearForm() {
            this.form.reset();
        },

        addTodo(data) {
            const todoTemplate = generateTodoTemplate(data);
            this.todoContainer.append(todoTemplate);
        },
        
        addTodos(data) {
            data.forEach(item => this.addTodo(item));
        },

        addTodoWithSelects(data) {
            const todoTemplate = generateTodoTemplateFromDB(data);
            this.todoContainer.append(todoTemplate);
        },
        
        renderTodosFromDB(data) {
            data.forEach(item => this.addTodoWithSelects(item));
        },

        removeTemplate() {
            event.stopPropagation();
            const todoItem = this.todoContainer.querySelector('.data-todo-item');

            todoItem.remove();
        },

        validateTodoTemplate() {
            const todos = this.todoContainer.querySelectorAll('.taskWrapper');
            return todos.length > 0;
        },

        getSelectValue () {
            if (!this.validateTodoTemplate()) return 'No status';
            if (this.validateTodoTemplate()) return document.querySelector('#todo-select').value;
        },

        init(form, todoContainer) {
            this.form = form;
            this.todoContainer = todoContainer;
        },



    }
}