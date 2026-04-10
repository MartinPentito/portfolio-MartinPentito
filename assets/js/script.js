const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('header nav a');

const closeMobileMenu = () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

const setActiveLinkOnScroll = () => {
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
        const offset = section.offsetTop - 180;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPosition >= offset && scrollPosition < offset + height) {
            navLinks.forEach((link) => link.classList.remove('active'));
            const activeLink = document.querySelector(`header nav a[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
};

window.addEventListener('scroll', () => {
    setActiveLinkOnScroll();
    closeMobileMenu();
});

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

navLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
});

setActiveLinkOnScroll();
