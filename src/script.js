const nav_btn = document.querySelector(".header__toggle-btn");
const header = document.querySelector(".header");
const nav_container = document.querySelector(".header__nav-list-container");
const body = document.getElementById("body");
const counters = document.querySelectorAll(".statistics__number");
const counter_cards = document.querySelectorAll(".statistics__card");
const faders = document.querySelectorAll(".fade");
const back_to_top = document.querySelector(".back-to-top-btn");
const banner_elements = document.querySelectorAll(".banner");
const search = document.querySelector(".header__search");

setTimeout(() => {
    banner_elements.forEach((el) => {
        el.classList.add("appear");
    });
}, 2000);

nav_btn.addEventListener("click", () => {
    nav_container.classList.toggle("nav-active");
    header.classList.toggle("nav-active");
    if (!header.classList.contains("nav-active")){
        search.value = '';
    }
    body.classList.toggle("no-scroll");
});

/* Observer for fading elements */
const fadeObserverOptions = {
    rootMargin: "0px",
    threshold: 0.3,
};

const fadeObserver = new IntersectionObserver((entries, fadeObserver) => {
    entries.forEach((entry) => {
        if (entry.target.classList[0].includes("header__")) {
            setTimeout(() => {
                entry.target.classList.add("appear");
            }, 2000);
            console.log(entry.target.classList);
        }
        if (!entry.isIntersecting) {
            entry.target.classList.remove("appear");
        } else {
            entry.target.classList.add("appear");
            fadeObserver.unobserve(entry.target);
        }
    });
}, fadeObserverOptions);

faders.forEach((fader) => {
    fadeObserver.observe(fader);
});
/* End Observer for fading elements */

/* Observer for Counters */
const counterObserverOptions = {
    rootMargin: "0px",
    threshold: 0.5,
};

const counterObserver = new IntersectionObserver((entries, counterObserver) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        } else {
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
            };

            updateStatsNumber();
            counterObserver.unobserve(entry.target);
        }
    });
}, counterObserverOptions);

counter_cards.forEach((card) => {
    counterObserver.observe(card);
});
/* End Observer for Counters */

/* Observer for Back To Top button */
const BackToTopObserverOptions = {
    rootMargin: "0px",
    threshold: 0,
};

const BackToTopObserver = new IntersectionObserver((entries, BackToTopObserver) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            back_to_top.classList.add("active");
        } else {
            back_to_top.classList.remove("active");
        }
    });
}, BackToTopObserverOptions);

BackToTopObserver.observe(header);
/* End Observer for Back To Top button */
