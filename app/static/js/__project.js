project_data = ""
picture_index = 1

async function get_project(){
    const url = window.location.href + "/retrieve";
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    project_data = json["project"]
    update_text()
}

function update_text(){
    what_it_does = document.getElementById("what_it_does_text")
    what_it_does.innerText = project_data["what_it_does"]

    title = document.getElementById("title")
    title.innerText = project_data["title"].toUpperCase()

    technical_details_text = document.getElementById("technical_details_text")
    technical_details_text.innerText = project_data["technical_details"]

    completion_date = document.getElementById("completion_date")
    completion_date.innerText = project_data["completion_date"]

    project_details = document.getElementById("project_details")

    update_media()

}

function update_media(){
    project_details = document.getElementById("project_details")

    project_details.innerHTML = ""

    media_slide_container = document.createElement("div")
    media_slide_container.classList = "media_slide_container"
    media_slide_container.id = "media_slide_container"

    image_container = document.createElement("div")
    image_container.classList = "image_container"
    image_container.id = "image_container"
    if(project_data["media_links"][picture_index].includes(".mp4")){
        curr_img = document.createElement("video")
        curr_img.setAttribute("controls","controls")
        curr_img.innerHTML = "<source src='" + project_data["media_links"][picture_index] +  "' type='video/mp4'>"
    } else {
        curr_img = document.createElement("img")
        curr_img.src = project_data["media_links"][picture_index]
    }

    image_container.appendChild(curr_img)

    if(project_data["media_links"].length>1){
        navigate_btn = document.createElement("div")
        navigate_btn.classList = "navigate_btn"
        navigate_btn.id = "navigate_btn"
        navigate_btn.innerText = ">>"
        navigate_btn.addEventListener("click", () => {
            picture_index += 1
            if(picture_index >= project_data["media_links"].length) picture_index = 0;
            update_media()
        })
        image_container.appendChild(navigate_btn)
    }

    media_slide_container.appendChild(image_container)

    img_description = document.createElement("div")
    img_description.classList = "img_description"
    img_description.innerText = project_data["media_descriptions"][picture_index]

    media_slide_container.appendChild(img_description)

    project_details.appendChild(media_slide_container)

    if(project_data["collaborators"]){
        collaborators_container = document.createElement("div")
        collaborators_container.classList = "collaborators_container"

        collaborators_title = document.createElement("div")
        collaborators_title.classList = "subsection_title"
        collaborators_title.innerText = "COLLABORATORS"

        collaborators_container.appendChild(collaborators_title)

        project_data["collaborators"].forEach(person_name => {
            person = document.createElement("div")
            person.classList = "person"
            person.innerText = person_name.toUpperCase()
            collaborators_container.appendChild(person)
        });
        project_details.appendChild(collaborators_container)
    }

    if(project_data["paper_link"]){
        paper_link_container = document.createElement("div")
        paper_link_container.classList = "paper_link_container"

        paper_link_title = document.createElement("div")
        paper_link_title.classList = "subsection_title"
        paper_link_title.innerText = "PAPER"

        paper_link_container.appendChild(paper_link_title)

        download_link = document.createElement("a")
        download_link.classList = "person"
        download_link.innerText = "DOWNLOAD PDF"
        download_link.href = project_data["paper_link"];
        download_link.download = "paper.pdf"
        paper_link_container.appendChild(download_link)

        project_details.appendChild(paper_link_container)
    }

    if(project_data["code_link"]){
        code_link_container = document.createElement("div")
        code_link_container.classList = "code_link_container"

        code_link_title = document.createElement("div")
        code_link_title.classList = "subsection_title"
        code_link_title.innerText = "CODE"

        code_link_container.appendChild(code_link_title)

        code_link = document.createElement("a")
        code_link.classList = "person"
        code_link.innerText = "LINK"
        code_link.href = project_data["code_link"];
        code_link_container.appendChild(code_link)

        project_details.appendChild(code_link_container)
    }
}

document.addEventListener("DOMContentLoaded", get_project)