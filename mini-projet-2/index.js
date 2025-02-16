

// document.getElementById("myForm").addEventListener("submit", function(event) {
//     event.preventDefault(); // Prevent form from reloading the page

//     todo = document.getElementById("todo").value;
//     if (todo){
//         todoList = document.getElementById("todoList");
//         todoList.innerHTML += '<li class="list-group-item d-flex justify-content-between align-items-center"> <span> ' + todo + ' </span> <i class="far fa-trash-alt delete" onclick="deleteTodo(this)"></i> </li>'
//         document.getElementById("todo").value = "";
//     }

    
    
// });


// function deleteTodo(todo){
//     todo.parentElement.remove(); // delete parent element which is li representing the todo
// }
// Add todo functionality
document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const todoInput = document.getElementById("todo");
    const todoText = todoInput.value.trim();

    if (todoText) {
        const todoList = document.getElementById("todoList");
        const newTodo = document.createElement("li");
        newTodo.className = "list-group-item d-flex justify-content-between align-items-center";
        newTodo.innerHTML = `
            <span>${todoText}</span>
            <i class="far fa-trash-alt delete" onclick="deleteTodo(this)"></i>
        `;
        todoList.appendChild(newTodo);
        todoInput.value = "";
    }
});

// Delete functionality
function deleteTodo(element) {
    element.closest("li").remove();
}

// Search functionality
document.getElementById("searchInput").addEventListener("input", function(e) {
    const searchTerm = e.target.value.trim().toLowerCase();
    const todos = document.querySelectorAll("#todoList li");

    todos.forEach(todo => {
        const text = todo.querySelector("span").textContent.toLowerCase();
        todo.style.display = text.startsWith(searchTerm) ? "flex" : "none";
    });
});