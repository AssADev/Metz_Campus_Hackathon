// Nav Bar :
window.addEventListener("scroll", () => {
    let nav = document.querySelector("nav");
    let chatbox = document.querySelector(".chatbox");
    nav.classList.toggle("sticky", window.scrollY > 0);
    chatbox.classList.toggle("display", window.scrollY > 0);
});

// Mobile Navbar :
let link_mobile = document.querySelectorAll("li#mobile");

link_mobile.forEach((link) => link.addEventListener("click", () => link.classList.toggle("mobile_on")));

// Card Hover effect :
$(document).ready(function () {
    $(".card").on("mouseenter", function (e) {
        (x = e.pageX - $(this).offset().left), (y = e.pageY - $(this).offset().top);
        $(this).find("span").css({ top: y, left: x });
    });
});

$(document).ready(function () {
    $(".card").on("mouseout", function (e) {
        (x = e.pageX - $(this).offset().left), (y = e.pageY - $(this).offset().top);
        $(this).find("span").css({ top: y, left: x });
    });
});

// Link Formation Hover effect :
$(document).ready(function () {
    $(".link_formation").on("mouseenter", function (e) {
        (x = e.pageX - $(this).offset().left), (y = e.pageY - $(this).offset().top);
        $(this).find("span").css({ top: y, left: x });
    });
});

$(document).ready(function () {
    $(".link_formation").on("mouseout", function (e) {
        (x = e.pageX - $(this).offset().left), (y = e.pageY - $(this).offset().top);
        $(this).find("span").css({ top: y, left: x });
    });
});

// Chatbox :
let chatbox_btn = document.querySelector(".chatbox_btn_toggle");
let chatbox_close = document.querySelector(".close");
let chatbox_content = document.querySelector(".chatbox_content");

chatbox_btn.addEventListener("click", () => chatbox_content.classList.add("active"));
chatbox_close.addEventListener("click", () => chatbox_content.classList.remove("active"));
