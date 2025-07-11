

class ToDo {

    constructor(title, description, dueDate, priority, notes, checkList) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checkList = checkList;
    }

}

class Project {

    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.toDos = [new ToDo(1,1,1,1,1,1)];
    }

    addToDo(title, description, dueDate, priority, notes, checkList) {
        this.toDos.push(new ToDo(title, description, dueDate, priority, notes, checkList));
    }

    RemoveToDo(toDoId) {
        let index = this.toDos.findIndex((todo) => todo.id === toDoId);
        this.toDos.splice(index, 1);
    }
};

export const projectList = (() => {
    const projects = [(new Project("Default"))];

    function importProjects(json) {

    }
    
    function createProject(projectName) {
        _projects.push(new Project(projectName));
    }

    function deleteProject(projectId) {
        let index = projects.findIndex((project) => project.id === projectId);
        _projects.splice(index,1);
    }

    function getProjects() {return projects;}

    return {importProjects, createProject, deleteProject, getProjects};
})();

