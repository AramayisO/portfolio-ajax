$(document).ready(function() {

    const spinner = document.querySelector('#spinner');
    const contactForm = document.querySelector('#contact-form')
    const contactFormAlert = document.querySelector('#contact-form-alert')

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
                // Show success message
                contactFormAlert.innerHTML = '<strong>Success!</strong> Your email was sent.';
                contactFormAlert.classList.add('alert-success');
                contactFormAlert.classList.add('show');
                contactFormAlert.classList.remove('d-none');
                setTimeout(() => {
                    contactFormAlert.classList.remove('show');
                    contactFormAlert.classList.add('d-none');
                }, 5000);
                contactForm.reset();
            }, function(error) {
                // Turn on the spinner
                spinner.classList.add('d-none');
                // Show error message
                contactFormAlert.innerHTML = '<strong>Oh no!</strong> Something went wrong.';
                contactFormAlert.classList.add('alert-danger');
                contactFormAlert.classList.add('show');
                contactFormAlert.classList.remove('d-none');
                setTimeout(() => {
                    contactFormAlert.classList.remove('show');
                    contactFormAlert.classList.add('d-none');
                }, 5000);
            });
    });

});