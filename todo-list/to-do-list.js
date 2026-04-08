const todoList = JSON.parse(localStorage.getItem('defaultArray')) || [];

renderTodoList();

document.querySelector('.js-add-button')
    .addEventListener('click',()=>{
        addTodo();
    });

function addTodo () {
    const inputElement = document.querySelector('.js-todo-input');
    const dateElement = document.querySelector('.js-date-selector');
    const todo =  inputElement.value;
    const date = dateElement.value;

    if(todo === "" || date === ""){
        alert('Please enter task or date!');
        return;
    }
    
    todoList.push({todo: todo, date: date});

    console.log(todoList);

    renderTodoList();

    inputElement.value = '';

    localStorage.setItem('defaultArray', JSON.stringify(todoList));
}

function deleteTodo (i) {
    todoList.splice(i,1);

    localStorage.setItem('defaultArray', JSON.stringify(todoList));

    renderTodoList();
}

function renderTodoList() {
    let displayHTML = '';f

    todoList
        .forEach((eachTodo) => {
        const html = `<p>${eachTodo.todo}    ${eachTodo.date}   <button class="js-delete-button">Delete</button></p>`;

        displayHTML+=html;
    });

    const display = document.querySelector('.js-todo-display');
    display.innerHTML = displayHTML;

    
    document.querySelectorAll('.js-delete-button')
        .forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () =>{
                deleteTodo(index);
            });
        });

}









