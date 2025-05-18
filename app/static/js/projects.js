project_data = ""

async function get_projects(){
    const url = `/projects/retreive`;
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    projects = json["projects"]
    projects.sort((a, b) => -1*completion_date_to_decimal(a["completion_date"]) + completion_date_to_decimal(b["completion_date"]));
    project_data = projects
    projects.forEach(project => {
        add_project(project)
    })
}

function completion_date_to_decimal(date){
    elements = date.split(" ")
    months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return months.indexOf(elements[0]) / 12 + parseFloat(elements[1])
}

async function add_filters(){
    if(project_data === ""){
        await get_projects()
    }
    filters = []
    project_data.forEach(project => {
        project["skills"].forEach(skill=>{
            if(!filters.includes(skill.toUpperCase())) filters.push(skill.toUpperCase())
        })
    })
    filters.sort();
    filters_container = document.getElementById("filter_container")
    filters_dropdown_items = document.createElement("div");
    filters_dropdown_items.id = "filters_dropdown_items"
    filters_dropdown_items.classList = "filters_dropdown_items"

    filters.forEach(filter => {
        const filter_item = document.createElement("div")
        filter_item.classList = "filter_item"
        filter_item.id = filter
        filter_item.innerText = filter.toUpperCase()
        filters_dropdown_items.appendChild(filter_item)
        filter_item.addEventListener("click", () => add_filter(filter_item))
    })
    filters_container.appendChild(filters_dropdown_items)
}

function refresh_projects(){
    filters = get_active_filters()
    remove_all_projects()
    project_data.forEach(project => {
        if(filters.length !== 0){
            project["skills"].forEach(skill => {
                if(filters.includes(skill.toUpperCase())){
                    add_project(project)
                }
            })
        } else add_project(project)
    });
}

function remove_all_projects(){
    const all_projects = document.getElementById("all_projects");
    all_projects.innerHTML = ""
}

function project_snake_case(title){
    title = title.split(" ")
    snake_case_title = ""
    title.forEach(word => {
        snake_case_title += "_" + word.toLowerCase()
    })
    return snake_case_title.substring(1);
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
        skill_div.innerText = skill.toUpperCase()
        skill_box.appendChild(skill_div)
    })

    main_box.appendChild(skill_box)

    const description = document.createElement("div");
    description.classList = "project_description"
    description.innerText = project["description"]

    main_box.appendChild(description)

    const learn_more_container = document.createElement("div")
    learn_more_container.classList = "learn_more_container"

    const learn_more_text = document.createElement("div")
    learn_more_text.classList = "learn_more_text"
    learn_more_text.innerText = "LEARN MORE"

    const learn_more_arrows = document.createElement("div")
    learn_more_arrows.classList = "learn_more_arrows"
    learn_more_arrows.innerText = ">>"

    learn_more_arrows.addEventListener("click", () => {
        console.log("/projects/" + project_snake_case(project["title"]))
        window.location.href = "/projects/" + project_snake_case(project["title"])
    })

    learn_more_container.appendChild(learn_more_text)
    learn_more_container.appendChild(learn_more_arrows)

    main_box.appendChild(learn_more_container)

    all_projects.appendChild(main_box)
}

function toggle_dropdown(visible){
    dropdown_items = document.getElementById("filters_dropdown_items")
    visible ? dropdown_items.style.visibility = "visible" : dropdown_items.style.visibility = "hidden" 
}

function add_filter(filter){
    if(check_filter_existance(filter)) return

    filters = document.getElementById("filters")
    new_filter = document.createElement("div")
    new_filter.id = filter.id + "_filter"
    new_filter.classList = "skill_filters"

    filter_name = document.createElement("div")
    filter_name.innerText = filter.id

    close_btn = document.createElement("div")
    close_btn.innerText = 'X'
    close_btn.classList = "close_btn"

    close_btn.addEventListener("click", ()=>remove_filter(filter.id + "_filter"))

    new_filter.appendChild(filter_name)
    new_filter.appendChild(close_btn)

    filters.appendChild(new_filter) 

    refresh_projects()
}

function check_filter_existance(filter){
    return (get_active_filters().includes(filter.innerText.split("\n")[0].toUpperCase())) ? true : false
}

function get_active_filters(){
    filters = []
    filter_divs = Array.from(document.getElementsByClassName("skill_filters"))
    if(filter_divs.length != 0){
        filter_divs.forEach(filter => {
            filters.push(filter.innerText.split('\n')[0]);
        })
    }
    return filters
}

function remove_filter(filter_name){
    filter = document.getElementById(filter_name)
    filter.remove()
    refresh_projects()
}

document.addEventListener("DOMContentLoaded", add_filters)
document.getElementById("filter_container").addEventListener("mouseover", () => toggle_dropdown(true))
document.getElementById("filter_container").addEventListener("click", () => toggle_dropdown(false))
document.addEventListener('click', function(event) {if (!document.getElementById("filter_container").contains(event.target)) {toggle_dropdown(false)}});