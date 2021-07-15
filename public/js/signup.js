const signupFormHandler = async(event) => {
    event.preventDefault();
    console.log('SignUp Handler Fired')

    const name = document.querySelector('#nameSignUp').value;
    const github = document.querySelector('#github').value.trim();
    const username = document.querySelector('#userNameSignUp').value.trim();
    const email = document.querySelector('#emailSignUp').value.trim();
    const password = document.querySelector('#passSignUp').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, github, username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    }
};
// Hide button once they start to avoid confusion
let inputTxt = document.querySelector('input')
let uhohBtn = document.querySelector('#loginBtn')

inputTxt.addEventListener('focus', () => {
    uhohBtn.style.display = 'none'
    showBtn();
})

function showBtn() {
    inputTxt.addEventListener('blur', () => {
        uhohBtn.style.display = 'block'
    })
}

document
    .querySelector('#submitSignUp')
    .addEventListener('click', signupFormHandler);

document
    .querySelector('#submitSignUp').addEventListener('click', () => console.log('button clicked'))