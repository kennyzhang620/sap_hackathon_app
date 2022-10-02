// adapted from https://github.com/portexe/VanillaCalendar/blob/master/script.js

const calendar = document.getElementById('calendar');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const newEventModal = document.getElementById('newEventModal');
document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');

let nav = 0; // which month we're on
let clicked = null; // which day we've clicked on
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []; // grab events or return empty array

function openModal(date) {
	clicked = date;

	const eventForDay = events.find(e => e.date == clicked);

	if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
		deleteEventModal.style.display = 'block';
	}
	else {
		newEventModal.style.display = 'block'
	}
	backDrop.style.display = 'block';
}

function renderCalendar() {
	// intialize calendar value
	const dt = new Date();

	if (nav !== 0) {
		dt.setMonth(new Date().getMonth() + nav);
	}

	const day = dt.getDate();
	const month = dt.getMonth();
	const year = dt.getFullYear();

	const firstDay = new Date(year, month, 1); // first day of the month
	const daysInMonth = new Date(year, month+1, 0).getDate(); // last day of the month

	const dateString = firstDay.toLocaleDateString('en-us', {
		weekday: 'long',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	});

	const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

	document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('en-us', {month: 'long'})} ${year}`;

	calendar.innerHTML = ''; // clears out days before rendering new squares

	// render padding days
	for(let i=1; i<=paddingDays + daysInMonth; i++) {
		const daySquare = document.createElement('div');
		daySquare.classList.add('day');
		const dayString = `${month+1}/${i-paddingDays}/${year}`;

		if (i > paddingDays) {
			daySquare.innerText = i - paddingDays;
			const eventForDay = events.find(e => e.date === dayString);

			if (i-paddingDays === day && nav === 0) {
				daySquare.id = 'currentDay';
			}

			if (eventForDay) {
				const eventDiv = document.createElement('div');
				eventDiv.innerText = eventForDay.title;
				daySquare.appendChild(eventDiv);
			}
			daySquare.addEventListener('click', () => openModal(dayString));
		}
		else {
			daySquare.classList.add('padding');
		}

		calendar.appendChild(daySquare);
	}
}

function closeModal() {
	newEventModal.style.display = 'none';
	deleteEventModal.style.display = 'none';
	backDrop.style.display = 'none';
	eventTitleInput.value = '';
	clicked = null;
}

function saveEvent() {
	if (eventTitleInput.value) {
		eventTitleInput.classList.remove('error');
		events.push({
			date: clicked,
			title: eventTitleInput.value,
		})

		localStorage.setItem('events', JSON.stringify(events));
		closeModal();
	}
	else {
		eventTitleInput.classList.add('error');
	}
}

function deleteEvent() {
	events = events.filter(e => e.date !== clicked);
	localStorage.setItem('events', JSON.stringify(events));
	closeModal();
}

function initButtons() {
	document.getElementById('nextButton').addEventListener('click', () => {
		nav++;
		renderCalendar();
	});
	document.getElementById('backButton').addEventListener('click', () => {
		nav--;
		renderCalendar();
	});

	document.getElementById('saveButton').addEventListener('click', saveEvent);
	document.getElementById('cancelButton').addEventListener('click', closeModal);

	document.getElementById('deleteButton').addEventListener('click', deleteEvent);
	document.getElementById('closeButton').addEventListener('click', closeModal);

}

initButtons();
renderCalendar();
