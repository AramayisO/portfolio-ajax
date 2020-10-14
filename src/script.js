$(document).ready(function() {

    // Toggle '.active' class on nav-links when clicked.
    $(".nav-link").on("click", function(){
        $("nav").find(".active").removeClass("active");
        $(this).addClass("active");
    });

    // Generate the social link icons and add them to the DOM.
    function createSocialLinks(links, parser) {
        const socialLinkWrappers = document.querySelectorAll('.social_links');

        const createLinkString = (link) => `
            <a href="${link.url}" target="_blank" class="d-inline-block h2 mr-5 font_color_primary no_underline grow_on_hover">
                <i class="${link.icon}"></i>
            </a>
        `;

        socialLinkWrappers.forEach(wrapper => {
            links.forEach(link => {
                let linkStr = createLinkString(link);
                let socialLink = parser.parseFromString(linkStr, "text/html").body.querySelector('a');
                wrapper.appendChild(socialLink);
            });
        });
    }

    // Generate the skill cards and add them to the DOM.
    function createSkillCards(skills, parser) {
        const skillCardsWrapper = document.querySelector('#skill_cards');

        const createCardString = (skill) => `
            <div class="col px-0 mb-5">
                <div class="card text-center border-0">
                    <img src="${skill.image.url}" class="card-img-top px-4" alt="${skill.image.alt}">
                    <div class="card-body">
                        <h4 class="card-title font_family_accent font_color_accent">${skill.category}</h4>
                        <p class="card-text">${skill.specifics.join(', ')}</p>
                    </div>
                </div>
            </div>
        `;

        skills.forEach(skill => {
            let cardStr = createCardString(skill);
            let card = parser.parseFromString(cardStr, "text/html").body.querySelector(".col");
            skillCardsWrapper.appendChild(card);
        });
    }

    // Generate the portfolio cards for each project and add them to the DOM.
    function createPortfolioCards(projects, parser) {
        const portfolioCardsWrapper = document.querySelector('#portfolio_cards');

        const createCardString = (project, projectIndex) => `
            <div class="col mb-4">
                <div class="card border-0 shadow h-100">
                    <div id="portfolio_carousel_${projectIndex}" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            ${
                                project.images.map((img, imgIndex) => `
                                        <li data-target="#portfolio_carousel_${projectIndex}" 
                                            data-slide-to="${imgIndex}" ${imgIndex === 0 ? 'class="active"' : ''}></li>
                                `).join('')
                            }
                        </ol>
                        <div class="carousel-inner">
                            ${
                                project.images.map((img, imgIndex) => `
                                    <div class="carousel-item ${imgIndex === 0 ? 'active' : ''}">
                                        <img src="${img.url}" class="d-block w-100" alt="${img.alt}">
                                    </div>
                                `).join('')
                            }
                        </div>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${project.name}</h5>
                        <p class="card-text">${project.description}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-around border-0 bg_transparent">
                        <a href="${project.liveURL}" target="_blank" class="card-link">Live</a>
                        <a href="${project.githubURL}" target="_blank" class="card-link">GitHub</a>
                    </div>
                </div>
            </div>
        `;

        projects.forEach((project, index) => {
            let cardStr = createCardString(project, index);
            let card = parser.parseFromString(cardStr, "text/html").body.querySelector(".col");
            portfolioCardsWrapper.appendChild(card);
        });
    }

    // Read the data in the config.json file and use the data to dynamically 
    // generate parts of the DOM.
    fetch('config.json')
        .then(response => response.json())
        .then(data => {
            let parser = new DOMParser();
            createSocialLinks(data.links, parser);
            createSkillCards(data.skills, parser);
            createPortfolioCards(data.projects, parser);
        })
        .catch(error => console.error(error));
});
