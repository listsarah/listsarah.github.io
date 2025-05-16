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

    const title = document.createElement("div");
    title.classList = "project_title"
    title.innerText = project["title"]

    main_box.appendChild(title)
    
    project["skills"].forEach(skill => {
        const skill_div = document.createElement("div");
        skill_div.classList = "skill"
        skill_div.innerText = skill
        main_box.appendChild(skill_div)
    })

    const description = document.createElement("div");
    description.classList = "project_description"
    description.innerText = project["description"]

    main_box.appendChild(description)
    
    all_projects.appendChild(main_box)
}

document.addEventListener("DOMContentLoaded", get_projects)