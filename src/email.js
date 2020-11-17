$(document).ready(function() {

    const spinner = document.querySelector('#spinner');
    const contactForm = document.querySelector('#contact-form')

    emailjs.init('user_lw6bWWw5xpHJF3IBatJQN');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Turn on the spinner
        spinner.classList.remove('d-none');

        // these IDs from the previous steps
        emailjs.sendForm('contact_service', 'contact_form', this)
            .then(function() {
                // Turn on the spinner
                spinner.classList.add('d-none');
                console.log('SUCCESS!');
            }, function(error) {
                // Turn on the spinner
                spinner.classList.add('d-none');
                console.log('FAILED...', error);
            });
    });

});