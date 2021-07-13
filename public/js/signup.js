const signupFormHandler = async(event) => {
    event.preventDefault();
    console.log('SignUp Handler Fired')

    const firstName = document.querySelector('#firstNameSignUp').value.trim();
    const lastName = document.querySelector('#lastNameSignUp').value.trim();
    const username = document.querySelector('#userNameSignUp').value.trim();
    const email = document.querySelector('#emailSignUp').value.trim();
    const password = document.querySelector('#passSignUp').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    }
};


document
    .querySelector('#submitSignUp')
    .addEventListener('click', signupFormHandler);

document
    .querySelector('#submitSignUp').addEventListener('click', () => console.log('button clicked'))