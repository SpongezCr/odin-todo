

export class ToDo {

    static todoAttributes = ["title", "description", "dueDate", "priority", "notes", "checklist"];

    constructor(title, description, dueDate, priority, notes, checkList) {
        this.id = "id-" +crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checkList = checkList;
    }

    setValues(t, d, dd, p, n, cl) {
        this.title = t;
        this.description = d;
        this.dueDate = dd;
        this.priority = p;
        this.notes = n;
        this.checkList = cl;
    }

    setValuesWithArray(arr) {
        for (let i = 0; i < arr.length; i++) {
            this[ToDo.todoAttributes[i]] = arr[i];
        }
    }

}


class Project {

    constructor(name) {
        this.id = "id-" + crypto.randomUUID();
        this.name = name;
        this.toDos = [new ToDo("title","description",1,1,1,1)];
    }

    addToDo(title, description, dueDate, priority, notes, checkList) {
        this.toDos.push(new ToDo(title, description, dueDate, priority, notes, checkList));
    }

    removeToDo(toDoId) {
        let index = this.toDos.findIndex((todo) => todo.id === toDoId);
        this.toDos.splice(index, 1);
    }
};





export const projectList = (() => {
    const projects = [(new Project("Default"))];

    function importProjects(json) {

    }
    
    function createProject(projectName) {
        projects.push(new Project(projectName));
        return projects.at(-1);
    }

    function deleteProject(projectId) {
        let index = projects.findIndex((project) => project.id === projectId);
        projects.splice(index,1);
    }

    function getProjects() {return projects;}

    return {importProjects, createProject, deleteProject, getProjects};
})();

