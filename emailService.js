document.addEventListener('DOMContentLoaded', function () {
    emailjs.init('6E7lOa7_aQPwvLe2O'); // Replace this with your actual public key

    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            thesis_title: document.getElementById('thesis-title').value,
            thesis_description: document.getElementById('thesis-description').value,
            word_count: document.getElementById('word-count').value,
            deadline: document.getElementById('deadline').value,
            reply_to: document.getElementById('email').value // Add this line for reply_to
        };

        // Send the form data using EmailJS
        emailjs.send('service_znsz5ef', 'template_x5g135c', formData)
            .then(function (response) {
                alert('Το αίτημά σας έχει καταχωρηθεί!  Σύντομα κάποιος θα επικοινωνήσει μαζί σας');
                form.reset(); // Optional: reset form fields after submission
            }, function (error) {
                alert('Αδυναμία αποστολής μηνύματος. Παρακαλώ χρησιμοποιήστε κάποιο από τα τηλέφωνα επικοινωνίας ή αποστείλετε email απευθείας από την ενότητα της επικοινωνίας.');
            });
    });
});
