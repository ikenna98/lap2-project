const login = document.querySelector('.login-box')
const register = document.querySelector('.register-btn');
const newAccount = document.querySelector('.register-page');
const close = document.querySelector('.register-close');
const username = document.getElementById('username');
const password = document.querySelector('.password');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const habit = document.querySelector('.habit');

register.addEventListener('click', (e) => {
    e.preventDefault()
    newAccount.style.display = 'block';

});

close.addEventListener('click', () => {
    newAccount.style.display = 'none';
})
