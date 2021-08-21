const nav_btn = document.querySelector(".header__toggle-btn");
const header = document.querySelector(".header")
const nav_container = document.querySelector(".header__nav-list-container");
nav_btn.addEventListener("click", () => {
    nav_container.classList.toggle("active");
    header.classList.toggle("active");
})