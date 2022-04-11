const login = document.querySelector('.login-box')
const register = document.querySelector('.register-btn');
const newAccount = document.querySelector('.new-account');
const close = document.querySelector('.popup-close');

const username = document.getElementById('username');
const password = document.querySelector('.password');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const habit = document.querySelector('.habit');

register.addEventListener('click', (e) => {
    e.preventDefault()
    newAccount.style.display = 'block'
});

close.addEventListener('click', () => {
    newAccount.style.display = 'none'
})


const addHabits = document.querySelector('.add-habit'); //Selecting the form
const habitsList = document.querySelector('.habits')//Selecting the habit list
const habits = []; //where we will add the habit list to

//add habit
function addHabit(e) {
    e.preventDefault();
    const text = this.querySelector("[name=habit]").value;
    console.log(text)

}

//List the habit

//Toggle if complete

//Delete Habit



addHabits.addEventListener('submit', addHabit);
