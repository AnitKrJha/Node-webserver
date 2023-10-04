import { UUID, randomUUID } from "crypto";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
export type Todo = {
    id: UUID
    todo: string,
    status: 'Pending' | 'Complete',
}

// Use the '__dirname' equivalent in ESM
const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);

export function addTodo(todo: string) {
    const newId = randomUUID();
    const newTodo: Todo = { id: newId, todo: todo, status: 'Pending' };
    TODOS = [...TODOS, newTodo];
}

export function delTodo(id: string) {
    TODOS = TODOS.filter((todo) => todo.id != id);
}

export function toggleStatus(id: string) {
    const todo: Todo = TODOS.find(todo => todo.id === id);
    if (todo) {
        const newStatus = todo.status === 'Complete' ? 'Pending' : 'Complete';
        Object.assign(todo, { status: newStatus });
    } else {
        throw new Error("The todo with the given id does not exist")
    }
}
export let TODOS: Todo[] = [
    {
        id: "a6b548e0-7b7a-4f6f-8423-89e834b5c85e",
        todo: "Work on coding project",
        status: "Pending"
    },
    {
        id: "c2f2d8b5-3bfa-4f23-a859-abc465e76f37",
        todo: "Review web server architecture",
        status: "Complete"
    },
    {
        id: "e9a1c786-f6ef-4d4e-9d90-98454aa15c29",
        todo: "Learn Rust programming language",
        status: "Pending"
    },
    {
        id: "2b3f87d3-2e3a-47f9-9c91-4fca04f907f0",
        todo: "Explore Go (Golang) development",
        status: "Complete"
    },
    {
        id: "75d1f452-8f14-4b02-832b-5b4cfe5c20b3",
        todo: "Complete technical blog post",
        status: "Pending"
    }
];

export function generateHtml(todos: Todo[], error: string) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App</title>
    <link rel="shortcut icon"  href="./favicon.svg" >

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Onest:400,700&display=swap">
    <!-- Add Sakura CSS for positioning -->
   <link rel="stylesheet" href="https://unpkg.com/sakura.css/css/sakura.css" type="text/css">
    <style>
        * {
            font-family: 'Onest', sans-serif !important;
        }
        body{
            height:100dvh;
            
           background:linear-gradient(to right, rgb(219, 39, 119), rgb(103, 232, 249), rgb(5, 150, 105))
        }
	.error{
        background:rgba(255,0,0,0.1);
        border-radius:5px;
        padding-inline:5px;
        padding-block:1px;
        text-transform:capitalize;
	    color:red;
        display:flex;
        gap:4px;
        align-items:center;
        font-size:0.9em;
}

        .todo-container {
            width: 400px;
            margin: 20px auto;
            padding: 20px;
            border-radius: 5px;
            background:white;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .todo-form {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .todo-input {
            flex-grow: 1;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-right: 10px;
        }

        .todo-button-submit {
            padding: 10px 20px;
            display:block;
            margin-bottom:10px;
            cursor: pointer;
            background:rgb(98,184,212)
        }

        .todo-list {
            margin-top: 20px;
        }

        .todo-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .todo-item-button-Pending{
            background:blue;
        }
        .todo-item-button-Complete{
            text-decoration:line-through;
        }
        .todo-item-buttons {
            display: flex;
            gap: 10px;
        }

        .todo-item-button {
            padding: 5px 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .todo-item-button-delete{
            background:rgb(255,53,153);
        }
    </style>
</head>
<body>
    <div class="todo-container">
        <h1>Todo App</h1>
        <form action="/create" method="post" class="todo-form">
        <input class="todo-input" type="text" placeholder="Add a new todo" name="todo">
        <button class="todo-button-submit">Create</button>
        </form>
        ${error && `<div class="error"> ${errorSvg} ${error}</div>`}
        <div class="todo-list">
           ${todos.map((todo: Todo) => generateHtmlTodoItem(todo)).join('')}        </div>
    </div>
</body>
</html>
`
    return html;
}

export function generateHtmlTodoItem(todo: Todo) {

    const todoItem = `<div class="todo-item">
                <span>${todo.todo}</span>
                <div class="todo-item-buttons">
                <form action="/delete/${todo.id}" method="post">
                <button type="submit" class="todo-item-button-delete">Delete</button>
                
                </form>
                <form action="/toggle/${todo.id}" method="post">
                <button class="todo-item-button-${todo.status}">${todo.status}</button>
                </form>
                </div>
            </div>`
    return todoItem;
}

const errorSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 100 100">
<circle cx="50" cy="50" r="40" fill="#FF0000" />
<line x1="30" y1="30" x2="70" y2="70" stroke="#FFFFFF" stroke-width="6" />
<line x1="70" y1="30" x2="30" y2="70" stroke="#FFFFFF" stroke-width="6" />
</svg>
`