document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('skillExchangeForm');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const offeredSkill = document.getElementById('offeredSkill').value;
        const wantedSkill = document.getElementById('wantedSkill').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (offeredSkill === '' || wantedSkill === '' || message.trim() === '') {
            alert('Please fill in all fields before submitting.');
            return;
        }

        // In a real application, you would send this data to a server
        console.log('Form submitted!');
        console.log('Offered Skill:', offeredSkill);
        console.log('Wanted Skill:', wantedSkill);
        console.log('Message:', message);

        alert('Form submitted successfully! (Check console for data)');

        // Optionally, reset the form
        form.reset();
    });
});
