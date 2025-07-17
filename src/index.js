'use strict';
import "./style.css";
import { projectList, ToDo } from "./classes/classes";

const left = document.querySelector(".left");
const right = document.querySelector(".right");

document.addEventListener("DOMContentLoaded", displayProjects)

document.addEventListener("DOMContentLoaded", () => {
    const createProjectButton = document.querySelector(".create-project");
    createProjectButton.addEventListener('click', displayCreateProjectForm);
})

function clearRight() {
    right.innerHTML = "";
}

function displayCreateProjectForm() {

    const form = document.createElement("form")

    const name = document.createElement("label");
    name.htmlFor = "title";
    name.textContent = "Name: ";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.setAttribute("required", true);

    const submit = document.createElement("button");
    submit.textContent = "Confirm";
    submit.style["margin-top"] = "10px";
    submit.style.display = "block";
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const projectName = nameInput.value;
        const project = projectList.createProject(projectName);
        displayProjectToList(project);
        clearRight();
    })

    form.appendChild(name);
    form.appendChild(nameInput);
    form.appendChild(submit);

    clearRight();
    right.appendChild(form);

}

function displayProjects() {
    const projects = projectList.getProjects();
    projects.forEach(displayProjectToList);
}

function displayProjectToList(project) {

    const projectContainer = document.createElement("div");
    projectContainer.id = project.id;

    const div = document.createElement("div");
    div.classList.add("flex");

    const h3 = document.createElement("h3");
    h3.textContent = project.name;

    const delButton = document.createElement("button");
    delButton.textContent = "x";
    delButton.id = project.id;

    div.appendChild(h3);
    div.appendChild(delButton);

    const ul = document.createElement("ul");
    ul.classList.add("hidden");
        
    project.toDos.forEach((todo) => {
        const li = document.createElement("li");
        li.textContent = `${todo.title}, due ${todo.dueDate}`;
        li.classList.add("todo");
        li.id = todo.id;
        li.addEventListener('click', () => displayToDo(project, li.id));
        ul.appendChild(li);
    })

    projectContainer.appendChild(div);
    projectContainer.appendChild(ul);
    
    h3.addEventListener('click', toggleHidden);

    delButton.addEventListener('click', e => deleteProject(e.target.id));
    
    left.appendChild(projectContainer);

    function toggleHidden() {
        if (ul.classList.contains("hidden"))
            ul.classList.remove("hidden");
        else 
            ul.classList.add("hidden");
    }

}



function deleteProject(projectId) {

    projectList.deleteProject(projectId);
    const toDelete = left.querySelector(`#${projectId}`);
    console.log(toDelete);
    left.removeChild(toDelete);
    
}
      


function displayToDo(project, id) {

    clearRight();

    let todo = project.toDos.find(todo => id === todo.id);

    const todoDiv = document.createElement("div");
    todoDiv.id = "todo-div";

    ToDo.todoAttributes.forEach((attribute) => {
        const div = document.createElement("div");

        const label = document.createElement("label");
        label.textContent = attribute + ": ";

        const span = document.createElement("span");
        span.textContent = todo[attribute];
        
        div.appendChild(label);
        div.appendChild(span);

        todoDiv.appendChild(div);
    });

    right.appendChild(todoDiv);

    const editButtonDiv = document.createElement("div");
    const editButton = document.createElement("button");
    editButton.textContent = "Edit Todo";
    editButtonDiv.classList.add("last");
    editButtonDiv.id = id;
    editButtonDiv.appendChild(editButton);
    right.appendChild(editButtonDiv);

    editButton.addEventListener('click', () => displayEditTodoForm(project, id))
}

function displayEditTodoForm(project, id) {
    const todo = project.toDos.find((todo) => todo.id === id);

    const todoDiv = document.querySelector("#todo-div");
    const divsToChange = todoDiv.querySelectorAll("div");

    divsToChange.forEach((div) => {
        const span = div.querySelector("span");
        const input = document.createElement("input");
        input.value = span.textContent;

        div.removeChild(span);
        div.appendChild(input);
    })

    const buttonDiv = right.querySelector(".last");
    const button = buttonDiv.querySelector("button");
    buttonDiv.removeChild(button);
    
    const submitButton = document.createElement("button");
    submitButton.textContent = "Confirm changes";
    buttonDiv.appendChild(submitButton);

    submitButton.addEventListener('click', () => {
        const inputBoxes = todoDiv.querySelectorAll("input");
        const inputValues = Array.from(inputBoxes).map((inputBox) => inputBox.value);
        todo.setValuesWithArray(inputValues);
        displayToDo(project, id);
    })
    
}