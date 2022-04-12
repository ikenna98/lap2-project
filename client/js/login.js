const auth = require('./auth')

const login = document.querySelector('.login-box')
const register = document.querySelector('.register-btn');
const registerForm = document.querySelector('#register-form')
const loginForm = document.querySelector('#login-form');
const newAccount = document.querySelector('.register-page');
const closer = document.querySelector('.register-close');
const logOut = document.querySelector('#logout');
const username = document.getElementById('username');
const password = document.querySelector('.password');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const habit = document.querySelector('.habit');

register.addEventListener('click', (e) => {
    e.preventDefault()
    newAccount.style.display = 'block';

});

closer.addEventListener('click', () => {
    newAccount.style.display = 'none';
})

loginForm.addEventListener('submit', auth.requestLogin);
registerForm.addEventListener('submit', auth.requestRegistration);
logOut.addEventListener('click', auth.logout);
