const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

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

    // Hide input:
    inputContainer.hidden = true;

    // If the countdown had ended, show completion message:
    if (distance < 0) { // (only dates in the past will have a value of < 0)
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
    // If the countdown has not ended, show countdown in progress:
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;

      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
};

// Take values from form input:
function updateCountdown(e) {
  e.preventDefault(); // avoids network request/page refresh on submit
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = { // set global variable
    title: countdownTitle,
    date: countdownDate,
  };

  // Store data to localStorage in JSON string format (can only save strings to
  // web servers; localStorage behaves like a server here):
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));

  // Check for valid date:
  if (countdownDate === '') {
    alert('Please select a date for the countdown.')
  } else {
    // Get number version of current date, update DOM:
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
};

// Reset all values:
function reset() {
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;

  // Stop the countdown:
  clearInterval(countdownActive); // stops setInterval callback

  // Reset values:
  countdownTitle = '';
  countdownDate = '';
  localStorage.removeItem('countdown');
};

function restorePreviousCountdown() {
  // Get countdown from localStorage via established 'countdown' key
  // re: localStorage.setItem:
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
};

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On load, check localStorage:
restorePreviousCountdown();