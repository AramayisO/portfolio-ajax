$(document).ready(function() {

    // Add new section IDs here and the rest will be taken care of by the code.
    const sectionIdToPathMap = {
        'hero': '#',
        'about': '#about',
        'portfolio': '#portfolio',
        'contact': '#contact'
    };

    // Cache the DOM elements.
    const sections = Object.keys(sectionIdToPathMap)
        .map(id => document.getElementById(id));

    const navLinks = Object.keys(sectionIdToPathMap)
        .map(id => {
            const path = sectionIdToPathMap[id];
            return document.querySelector(`.nav-link[href="${path}"]`);
        });

    // Get the vertical offset of each section from the top of the document.
    const sectionOffsets = sections.map(section => section.offsetTop);

    // Scroll Spy function.
    let lastActive = 0;

    const scrollSpy = () => {
        const currentActive = sections.length - [...sections].reverse().findIndex(section => window.scrollY >= section.offsetTop - 250) - 1;
        
        if (lastActive !== currentActive) {
            navLinks[lastActive].classList.remove('active');
            navLinks[currentActive].classList.add('active');
            lastActive = currentActive;
        }
    }

    document.addEventListener('scroll', scrollSpy);
});