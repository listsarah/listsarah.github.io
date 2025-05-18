function update_year(){
    year = document.getElementById("year_contact")
    year.innerText = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", update_year)