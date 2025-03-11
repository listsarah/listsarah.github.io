const descriptions = ["MECHANICAL ENGINEER", "MAKER", "ROBOTICS ENGINEER"];
let index = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 100;
const delay = 2000;

function typeEffect() {
    const descriptionElement = document.getElementById("description");
    const currentText = descriptions[index % descriptions.length];
    if (isDeleting) {
        currText = currentText.substring(0, charIndex--);
        descriptionElement.innerText = currText.length === 0 ? "\u00A0" : currText;
        if (charIndex < 0) {
            isDeleting = false;
            index++;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, speed / 2);
        }
    } else {
        currText = currentText.substring(0, charIndex++);
        descriptionElement.innerText = currText.length === 0 ? "\u00A0" : currText;
        if (charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, delay);
        } else {
            setTimeout(typeEffect, speed);
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeEffect, 500);
});
