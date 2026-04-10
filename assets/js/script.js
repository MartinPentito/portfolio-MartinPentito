const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('header nav a');
const currentPath = window.location.pathname.replace(/\\/g, '/');
const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
const isHomePage = currentPage === 'index.html' || currentPage === '';

const closeMobileMenu = () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

const getLinkTarget = (link) => {
    const href = link.getAttribute('href') || '';
    const normalizedHref = href.replace(/\\/g, '/');
    const [pathPart, hashPart] = normalizedHref.split('#');

    return {
        href: normalizedHref,
        path: pathPart === '.' || pathPart === './' ? 'index.html' : pathPart.replace(/^\.\//, '') || 'index.html',
        hash: hashPart ? `#${hashPart}` : ''
    };
};

const setActiveLink = (matcher) => {
    navLinks.forEach((link) => {
        const shouldActivate = matcher(getLinkTarget(link));
        link.classList.toggle('active', shouldActivate);
    });
};

const setActiveLinkForPage = () => {
    setActiveLink(({ path, hash }) => {
        if (isHomePage && hash === '#home' && currentPage === 'index.html' && window.location.hash === '') {
            return true;
        }

        return path === currentPage && hash === '';
    });
};

const setActiveLinkOnScroll = () => {
    if (!isHomePage) {
        setActiveLinkForPage();
        return;
    }

    const scrollPosition = window.scrollY;
    let activeSectionId = '';

    sections.forEach((section) => {
        const offset = section.offsetTop - 180;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPosition >= offset && scrollPosition < offset + height) {
            activeSectionId = id;
        }
    });

    if (!activeSectionId && sections.length > 0) {
        activeSectionId = sections[0].getAttribute('id');
    }

    setActiveLink(({ hash }) => hash === `#${activeSectionId}`);
};

window.addEventListener('scroll', () => {
    setActiveLinkOnScroll();
    closeMobileMenu();
});

window.addEventListener('hashchange', setActiveLinkOnScroll);

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

navLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
});

setActiveLinkOnScroll();
