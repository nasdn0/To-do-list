// Select Dom Elements
const input = document.getElementById('todo-input');
const addbtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

// Try to load saved todos from localStorage(if any)
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

// Function to render todos
function saveTodos() {
    // Save current todos to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Create a dom node for a todo object and append it to the list
function createTodoElement(todo, index) {
    const li = document.createElement('li');

    // checkbox  to toggle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        saveTodos();
        renderTodos();
    })

    // Text of the todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin ='0 8px'
    if (todo.completed){
        textSpan.style.textDecoration = 'line-through';
    }
        // Add double-click event listener to edit todo 
        textSpan.addEventListener("dbclick", () => {
            const newText = prompt("Edit todo", todo.text);
        if (newText !== null) {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    });

    // Delete Todo Button
    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        renderTodos();
        saveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    return li
}



// Render the whole todo list from the todos array
function renderTodos() {
    list.innerHTML = ''; // Clear the list before rendering


    // Recreate each item 
    todos.forEach((todo, index) => {
        const node = createTodoElement(todo, index);
        console.log(node, todo);
        list.appendChild(node);
    });
}

function addTodo(){
    const text = input.value.trim();
    if (!text) {
        return;
    }

    // push a new todo object 
    todos.push({ text, completed: false});
    input.value='';
    renderTodos()
    saveTodos() 
}

addbtn.addEventListener('click', addTodo);
renderTodos();