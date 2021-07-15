const loginFormHandler = async(event) => {
    event.preventDefault();

    const email = document.querySelector('#emailLogin').value.trim();
    const password = document.querySelector('#passwordLogin').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in.');
        }
    }
};

// Hide button once they start to avoid confusion
let inputTxt = document.querySelector('input')
let uhohBtn = document.querySelector('#signupBtn')

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
    .querySelector('#loginBtn')
    .addEventListener('click', loginFormHandler);