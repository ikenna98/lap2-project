const addHabits = document.querySelector('.add-habit'); //Selecting the form
const habitsList = document.querySelector('.habits')//Selecting the habit list
const habits = JSON.parse(localStorage.getItem('habits')) || []; //where we will add the habit list to
const logOut = document.querySelector('log-out');

//Line 3 = Method on JSON that allows us to convert a string to JSON object that allows us to make habits an array of objects

//add habit
function addHabit(e) {
    e.preventDefault(); //Stops page from refreshing
    //Adding Habit, counts and frequency to the function
    const text = this.querySelector("[name=habit]").value;
    const totalCounts = +this.querySelector("[name=reps]").value;
    const timeframe = this.querySelector("[name=timeframe").value;
//Storing habit into an object
    const habit = {
        text: text,
        reps: 0,
        totalCounts: totalCounts,
        timeframe: timeframe,
        completed: false //by default in case habit is never completed
    }

    habits.push(habit)//add content to the array
    listHabits(habits, habitsList); //Pushes the information to the array
    localStorage.setItem('habits', JSON.stringify(habits))
    this.reset(); //resets all fields on the form

    console.log(habit) //Logs to the console for testing
}

//List the habit

// Function to add Habits to the HTML
function listHabits(habit = [], habitsList) {
    habitsList.innerHTML = habits.map((habit, i) => {
        //What to add onto the HTML
        return `
        <li>
        <input type="checkbox" data-index=${i} id="habit${i}" ${habit.completed ? "checked" : ""
    } />
        <label for="habit${i}">${habit.reps}/${habit.totalCounts} ${
    habit.text}<br>
    ${habit.timeframe}</label>
            <div class="habit-btns">
      <button class="count" data-index=${i}
      id="count${i}">+</button>
      <button class="complete" data-index=${i} id="complete${i}">Mark as Complete</button>
      <button class="delete" data-index=${i} id="delete${i}">Delete</button>
      </div>
        </li>
        `;
    })
}

//Toggle if complete

function countComplete(e){ //Clicking on the checkbox
    if (!e.target.matches('input')) return;
    const el = e.target;
    const index = el.dataset.index;

    if (habits[index].reps === habits[index].totalCounts) {
        habits[index].completed = true;
    } else if (habits[index].reps > habits[index].totalCounts) {
        habits[index].reps = 0;
        habits[index].completed = false;
    }

    listHabits(habits, habitsList);
    localStorage.setItem("habits", JSON.stringify(habits));
    // console.log(e.target)
}
// Count function

function count(e){ //Clicking on the checkbox

    const plus = document.querySelector('count');


    if (!e.target.matches('.count')) return;
    const el = e.target;
    const index = el.dataset.index;
    habits[index].reps += 1;

    if (habits[index].reps === habits[index].totalCounts) {
        habits[index].completed = true;
    } else if (habits[index].reps > habits[index].totalCounts) {
        habits[index].reps = 0;
        habits[index].completed = false;
    }

    listHabits(habits, habitsList);
    localStorage.setItem("habits", JSON.stringify(habits));
    // console.log(e.target)
}


//Delete Habit
function deleteHabit(e) {
    if (!e.target.matches('.delete')) return;
    const el = e.target;
    const index = el.dataset.index;

    habits.splice(index, 1);

    listHabits(habits, habitsList);
    localStorage.setItem("habits", JSON.stringify(habits));
    

}

//Mark as Complete
function markComplete(e){
    if (!e.target.matches('.complete')) return;
    const el = e.target;
    const index = el.dataset.index;

    habits[index].completed = true;

    listHabits(habits, habitsList);
    localStorage.setItem("habits", JSON.stringify(habits));
    
}


//Listen out for a submit, for the function to run
addHabits.addEventListener('submit', addHabit);
habitsList.addEventListener('click', countComplete);
habitsList.addEventListener('click', deleteHabit);
habitsList.addEventListener('click', markComplete);
habitsList.addEventListener('click', count)

listHabits(habits, habitsList);

logOut.addEventListener('click', () => {
    window.location.pathname = ('client/login.html')
})




