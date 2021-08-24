const review_texts = [
    "I remember how I stumbled and tried to get a hold on someone for support, it was one of the tour guides. I haven't been able to lay hands off them ever since. Today we're happily married.",
    "How do these people know so much about the history of the places we visit wow. Will definitely try this again later this year. Awesome experience!",
    "Value for your money people! Thats exactly what these guys give you. NO CUP! wait... cup? cap? You get me.",
    "Man the tour guides here definitely beat my history teachers hands down! Learnt a ton!",
    "Oh my God! The thrill of reaching the peak of these glorious mountains and shouting your name woosh! Can't wait to do it again!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam quod vero ab optio pariatur, illo esse reiciendis! Animi, praesentium unde.",
];

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
const client_card = document.querySelectorAll(".clients-reviews__card");
const client_row = document.querySelector(".client-reviews .row");

const no_motion_media_query = window.matchMedia("(prefers-reduced-motion: reduce)");
let rand_review = getRandomReviewText(review_texts);


setTimeout(() => {
    banner_elements.forEach((el) => {
        el.classList.add("appear");
    });
}, 2000);

nav_btn.addEventListener("click", () => {
    nav_container.classList.toggle("nav-active");
    header.classList.toggle("nav-active");
    if (!header.classList.contains("nav-active")) {
        search.value = "";
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
        no_motion_media_query.addEventListener("change", () => {
            // Stop JavaScript-based animations.
            entry.target.children[1].innerText = entry.target.children[1].getAttribute("data-target");
            counterObserver.unobserve(entry.target);
            return;
        });
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

/* Fetching Users For Reviews */
async function getClients() {
    res = await fetch("https://randomuser.me/api?results=3");
    const { results } = await res.json();
    
    client_row.innerHTML = "";
    
    results.forEach(({ picture, name, location }) => {
        let card = document.createElement("article");
        card.classList.add("client-reviews__card");
        card.innerHTML = `<img class="client-reviews__quotes" src="./assets/images/quote-img.png" alt="Bold quotes">
        <p class="client-reviews__review-text">${rand_review.next().value}</p>
                            <div class="client-reviews__img-wrapper">
                            <img class="client-reviews__img" src=${picture.medium} alt="${name.first} ${name.last}">
                            </div>
                            <p class="client-reviews__name">${name.first} ${name.last}</p>
                            <p class="client-reviews__location">${location.city}, ${location.country}</p>`;        
                            
        client_row.appendChild(card);
    });
    nums = nums.splice();
}
getClients();

/* Source: Stackoverflow
https://stackoverflow.com/questions/18806210/generating-non-repeating-random-numbers-in-js
*/
function* getRandomReviewText(){
    let i = review_texts.length;
    
    while (i--) {
        yield review_texts.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    }
}
/* End Fetching Users For Reviews */