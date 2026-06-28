const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container")

function addTask() {
    if(inputBox.value === '') {
      //
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

inputBox.addEventListener("keypress", function(event){
    if(event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});

const quote = document.getElementById("quote")
const author = document.getElementById("author")
const api_url = "https://motivational-spark-api.vercel.app/api/quotes/random";

async function getquote(url) {
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    quote.innerHTML = data.quote;
    author.innerHTML = data.author;
}

getquote(api_url)

let allMode = document.querySelector(".pomodoro .mode button");
let focus = document.querySelector(".pomodoro .mode .focus");
let short = document.querySelector(".pomodoro .mode .short");
let long = document.querySelector(".pomodoro .mode .long");

let addmin = document.querySelector(".pomodoro .buttons .addmin");
let minusmin = document.querySelector(".pomodoro .buttons .minusmin");

let start = document.querySelector(".pomodoro .buttons .start");
let pause = document.querySelector(".pomodoro .buttons .pause");
let reset = document.querySelector(".pomodoro .buttons .reset");
let timer = document.querySelector(".pomodoro .timer");

let setIn;
let paused = true;
let minCount = 24;
let count = 59;

timer.innerHTML = `${minCount + 1}:00`;

let appendZero =(value) => {
    value = value < 10 ? "0" + value : value;
    return value; 
}

short.addEventListener("click", () => {
    pauseTimer();
    count = 59;
    minCount = 4;
    timer.innerHTML = `${minCount + 1}:00`;
    clearInterval(setIn);
})

long.addEventListener("click", () => {
    pauseTimer();
    count = 59;
    minCount = 14;
    timer.innerHTML = `${minCount + 1}:00`;
    clearInterval(setIn);
})

focus.addEventListener("click", () => {
    pauseTimer();
    count = 59;
    minCount = 24;
    timer.innerHTML = `${minCount + 1}:00`;
    clearInterval(setIn);
})

reset.addEventListener("click", () => {
    pauseTimer();
    count = 59;
    timer.innerHTML = `${minCount + 1}:00`;
    clearInterval(setIn);
})

pause.addEventListener("click", (pauseTimer = () => {
    paused = true;
    clearInterval(setIn);
    pause.style.display = "none";
    reset.style.display = "none";
    start.style.display = "block";
    addmin.style.display = "block";
    minusmin.style.display = "block";

}));

start.addEventListener("click", () =>{
    pause.style.display = "block";
    reset.style.display = "block";
    start.style.display = "none";
    addmin.style.display = "none";
    minusmin.style.display = "none";

    if(paused) {
        paused = false;
        timer.innerHTML = `${appendZero(minCount)}:${appendZero(count)}`

       setIn = setInterval(() =>{
            count--;
             timer.innerHTML = `${appendZero(minCount)}:${appendZero(count)}`

             if(count == 0) {
                if(minCount != 0) {
                    minCount--;
                    count = 60;
                }else {
                    clearInterval(setIn);
                }
             }
        }, 1000);
    }
})

addmin.addEventListener("click", () => {
   timer.innerHTML = `${minCount ++}:00`
})

minusmin.addEventListener("click", () => {
    timer.innerHTML = `${minCount --}:00`
})

const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const renderCalendar = () => {
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let liTag = "";

    for (let i = 1; i <= lastDateofMonth; i++) {
       liTag += `<li>${i}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag; 
}
renderCalendar();