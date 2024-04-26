const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set date input minimum with today's date:
// ISO - International Organization for Standardization (date formatting)
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate countdown & complete UI:
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    console.log(days, hours, minutes, seconds);

    // Populate countdown:
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    // Hide input fields/container:
    inputContainer.hidden = true;

    // Show countdown:
    countdownEl.hidden = false;
  }, second);
};

// Take values from form input:
function updateCountdown(e) {
  e.preventDefault(); // avoids network request/page refresh on submit
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  // Get number version of current date, update DOM:
  countdownValue = new Date(countdownDate).getTime();
  updateDOM();
};

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);