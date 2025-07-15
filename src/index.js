'use strict';
import "./style.css";
import { projectList } from "./classes/classes";

const left = document.querySelector(".left");
const right = document.querySelector(".right");

document.addEventListener("DOMContentLoaded", displayProjects)

document.addEventListener("DOMContentLoaded", () => {
    const createProjectButton = document.querySelector(".create-project");
    createProjectButton.addEventListener('click', displayCreateProjectForm);
})

function displayCreateProjectForm() {

    const dialog = document.createElement("dialog");
    const form = document.createElement("form")
    form.method = "dialog";

    const name = document.createElement("label");
    name.htmlFor = "title";
    name.textContent = "Name: "

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.setAttribute("required", true);

    const submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "Confirm";

    submit.addEventListener('click', () => {
        console.log(nameInput.value);
        if (!nameInput.value) return;
        dialog.close()
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const projectName = nameInput.value;
        projectList.createProject(projectName);
        displayProjectToList(projectList.getProjects().at(-1));
    })

    form.appendChild(name);
    form.appendChild(nameInput);
    form.appendChild(submit);
    dialog.appendChild(form);
    right.appendChild(dialog);
    dialog.showModal();
}

function displayProjects() {

    const projects = projectList.getProjects();
    projects.forEach(displayProjectToList);

}

function displayProjectToList(project) {
        const div = document.createElement("div");
        div.classList.add("flex");

        const delButton = document.createElement("button");
        delButton.textContent = "x";
        delButton.id = project.id;

        const h3 = document.createElement("h3");
        h3.textContent = project.name;

        div.appendChild(delButton);
        div.appendChild(h3);
    
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
    
        h3.addEventListener('click', () => {
            if (ul.classList.contains("hidden"))
                ul.classList.remove("hidden");
            else 
                ul.classList.add("hidden");
        });
    
        left.appendChild(div);
        left.appendChild(ul);
}

function displayToDo(project, id) {

    right.innerHTML = "";

    let todo = project.toDos.find(todo => id === todo.id);

    const title = document.createElement("div");
    title.textContent = todo.title;
    right.appendChild(title);

    const description = document.createElement("div");
    description.textContent = todo.description;
    right.appendChild(description);

    const dueDate = document.createElement("div");
    dueDate.textContent = todo.dueDate;
    right.appendChild(dueDate);

    const priority = document.createElement("div");
    priority.textContent = todo.priority;
    right.appendChild(priority);

    const notes = document.createElement("div");
    notes.textContent = todo.notes;
    right.appendChild(notes);

    const checkList = document.createElement("div");
    checkList.textContent = todo.checkList;
    right.appendChild(checkList);
}