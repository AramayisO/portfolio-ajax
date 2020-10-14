$(document).ready(function() {
    // Toggle '.active' class on nav-links when clicked.
    $(".nav-link").on("click", function(){
        $("nav").find(".active").removeClass("active");
        $(this).addClass("active");
    });

    const PortfolioCards = {
        init: function(projects) {
            this.cards = document.querySelector('#portfolio_cards');
            this.parser = new DOMParser();

            projects.forEach((project, index) => {
                let cardStr = this.createCardString(project, index);
                let card = this.parser.parseFromString(cardStr, "text/html").body.querySelector('.col');
                this.cards.appendChild(card);
            });
        },

        createCardString: function(project, projectIndex) {
            return `
                <div class="col mb-4">
                    <div class="card border-0 shadow h-100">
                        <div id="portfolio_carousel_${this.projectIndex}" class="carousel slide" data-ride="carousel">
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
                            <a href="${project.liveUrl}" target="_blank" class="card-link">Live</a>
                            <a href="${project.githubUrl}" target="_blank" class="card-link">GitHub</a>
                        </div>
                    </div>
                </div>
            `;
        }
    };

    fetch('../config.json')
        .then(response => response.json())
        .then(data => {
            PortfolioCards.init(data.projects);
        })
        .catch(error => console.error(error));
});