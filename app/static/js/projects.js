async function get_projects(){
    const url = `/projects/retreive`;
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    projects = json["projects"]
    projects.forEach(project => {
        add_project(project)
    })
}

function add_project(project){
    const all_projects = document.getElementById("all_projects");
    const main_box = document.createElement("div");
    main_box.classList = "main_box"

    const title_box = document.createElement("div")
    title_box.classList = "title_box"

    const title = document.createElement("div");
    title.classList = "project_title"
    title.innerText = project["title"].toUpperCase();

    const line = document.createElement("hr")
    line.classList = "project_line"

    title_box.appendChild(title)
    title_box.appendChild(line)

    main_box.appendChild(title_box)

    const skill_box = document.createElement("div");
    skill_box.classList = "skill_box"
    
    project["skills"].forEach(skill => {
        const skill_div = document.createElement("div");
        skill_div.classList = "skill"
        skill_div.innerText = skill
        skill_box.appendChild(skill_div)
    })

    main_box.appendChild(skill_box)

    const description = document.createElement("div");
    description.classList = "project_description"
    description.innerText = project["description"]

    main_box.appendChild(description)
    
    all_projects.appendChild(main_box)
}

document.addEventListener("DOMContentLoaded", get_projects)