const nav_btn = document.querySelector(".header__toggle-btn");
const header = document.querySelector(".header");
const nav_container = document.querySelector(".header__nav-list-container");
const body = document.getElementById("body");
const counters = document.querySelectorAll(".statistics__number");
const counter_cards = document.querySelectorAll(".statistics__card");

nav_btn.addEventListener("click", () => {
    nav_container.classList.toggle("nav-active");
    header.classList.toggle("nav-active");
    body.classList.toggle("no-scroll");
});

const counterObserverOptions = {
    rootMargin: "0px",
    threshold: 0.4,
};

const counterObserver = new IntersectionObserver((entries, counterObserver) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        } else {
            console.log(entry.target.children[1]);
            const stats_number_el = entry.target.children[1];
            stats_number_el.innerText = "0";

            const updateStatsNumber = () => {
                const target = +stats_number_el.getAttribute("data-target"); // + symbol converts string to Number
                const text = +stats_number_el.innerText;
                const increment = target / (target - 1);
                if (text < target) {
                    stats_number_el.innerText = `${Math.ceil(text + increment)}`;
                    setTimeout(updateStatsNumber, 1);
                } else {
                    stats_number_el.innerText = target;
                }
            }

            updateStatsNumber();
            counterObserver.unobserve(entry.target);
        }
    });
}, counterObserverOptions);

counter_cards.forEach((card) => {
    counterObserver.observe(card);
});
