async function get_projects(){
    const url = `/projects/retreive`;
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    const all_projects = document.getElementById("all_projects");
    
    projects = json["projects"]
    projects.forEach(project => {
        const title = document.createElement("div");
        title.classList = "project_title"
        title.innerText = project["title"]

        all_projects.appendChild(title)
    })
}

document.addEventListener("DOMContentLoaded", get_projects)