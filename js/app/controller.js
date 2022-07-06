'use strict';

function controller (view, model, config) {
    const formSelector = config.form;
    const todoContainerSelector = config.todoContainer;
    const form = document.querySelector(formSelector);
    const todoContainer = document.querySelector(todoContainerSelector);


    model.init(formSelector);
    view.init(form, todoContainer);

    const fetchInputsData = inputs => {
        if (!inputs) throw new Error('Inputs sre empty');

        const data = inputs instanceof Array ? inputs : Array.from(inputs);

        // optionsHandler();

        return data.reduce((acc, input) => {
            acc[input.name] = input.value;
            return acc;
        }, {});

    }

    const submitHandler = event => {
        event.preventDefault();
        event.stopPropagation();


        const inputs = form.querySelectorAll('input, textarea');
        const data = fetchInputsData(inputs);

        const savedData = model.setData(data);
        if (!savedData.success) throw new Error('Data is not provided');

        view.addTodo(savedData.data);
        view.clearForm();
    }

    const loadedHandler = () => {
        const data = model.getData();
        if (!data) return;

        view.renderTodosFromDB(data);
    };

    const removeTodoHandler = event => {
        event.stopPropagation();

        if (event.target.className === 'data-delete-btn') {
            const savedData = model.getData();
            model.removeDataFromDB(savedData);
            view.removeTemplate();
        }
        if(model.getData().length === 0) localStorage.clear();

    }
    const optionsHandler = () => {
        let selectValue = view.getSelectValue();
        model.setSelectData(selectValue);
    }

    const selectStorageChange = () => {
        const todoItem = event.target.parentElement.parentElement.parentElement;
        const todoItemId = todoItem.getAttribute('data-todo-id');

        model.submitSelectValues(todoItemId);
    }
    optionsHandler();


    form.addEventListener('submit', submitHandler);
    window.addEventListener('DOMContentLoaded', loadedHandler);
    todoContainer.addEventListener('click', removeTodoHandler);
    todoContainer.addEventListener('change', selectStorageChange);
}