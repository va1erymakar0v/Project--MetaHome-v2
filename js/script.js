const workspaceField = document.querySelector('.main');


// -----------------------------------------------------------------------NOTIFICATIONS


const notificationsList = document.querySelector('.notifications__list');

const notificationTemperature = notificationsList.querySelector('.temperature-update');
const notificationDevices = notificationsList.querySelector('.devices-update');
const notificationElectricity = notificationsList.querySelector('.electricity-update');
const notificationWifi = notificationsList.querySelector('.wifi-update');
const notificationSecurity = notificationsList.querySelector('.security-update');

const notificationsTimeArray = notificationsList.querySelectorAll('.notifications__list__item');

const sortNotifications = () => {
	for (let i = 0; i < notificationsTimeArray.length - 1; i++) {
		for (let j = 0; j < notificationsTimeArray.length - i - 1; j++) {

			if (notificationsTimeArray[j].querySelector('.notification__minutes').innerHTML == '&gt;60') {
				notificationsTimeArray[j].querySelector('.notification__minutes').innerHTML = 60;
			}
			if (notificationsTimeArray[j + 1].querySelector('.notification__minutes').innerHTML == '&gt;60') {
				notificationsTimeArray[j + 1].querySelector('.notification__minutes').innerHTML = 60;
			}

			if (Number(notificationsTimeArray[j].querySelector('.notification__minutes').innerHTML) >= Number(notificationsTimeArray[j + 1].querySelector('.notification__minutes').innerHTML)) {
				let bubblesortBuffer = notificationsTimeArray[j].innerHTML;
				notificationsTimeArray[j].innerHTML = notificationsTimeArray[j + 1].innerHTML;
				notificationsTimeArray[j + 1].innerHTML = bubblesortBuffer;
			}

			if (notificationsTimeArray[j].querySelector('.notification__minutes').innerHTML == '60') {
				notificationsTimeArray[j].querySelector('.notification__minutes').innerHTML = '&gt;60';
			}
			if (notificationsTimeArray[j + 1].querySelector('.notification__minutes').innerHTML == '60') {
				notificationsTimeArray[j + 1].querySelector('.notification__minutes').innerHTML = '&gt;60';
			}
		}
	}
}

sortNotifications();

const dashboardNotifications = document.querySelector('.dash-notifications-card');
const exampleNote = document.querySelector('.dash-notifications__item-example');

const addDashNote = (dashText, dashAlert) => {
	let dashNotesList = document.querySelectorAll('.dash-notifications-card .dash-notifications__item');
	let dashNote = document.querySelector('.dash-notifications__item-example').cloneNode(true);

	if (dashNotesList.length == 5) {
		dashNotesList[4].remove();
	}

	dashNote.querySelector('.dash-notification__text').innerHTML = dashText;
	dashNote.querySelector('.notification__alert').classList.add(dashAlert);

	dashNote.querySelector('.dash-notification__minutes').innerHTML = 0;
	setInterval(() => {
		dashNote.querySelector('.dash-notification__minutes').innerHTML = (Number(dashNote.querySelector('.dash-notification__minutes').innerHTML) + 1); 
	}, 60000);


	exampleNote.after(dashNote);
	dashNote.className = 'dash-notifications__item'
}


// -----------------------------------------------------------------------CURRENT-DATE
const headerTime = document.querySelector('.header__time');
const headerDate = document.querySelector('.header__date');
const headerYear = document.querySelector('.header__year');
const setTime = () => {
	let date = new Date();
	if (date.getMinutes() < 10) {
		headerTime.innerHTML = date.getHours() + ':0' + date.getMinutes();
	} else {
		headerTime.innerHTML = date.getHours() + ':' + date.getMinutes();
	}

	let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

	if (document.documentElement.scrollWidth < 531) {
		headerDate.innerHTML = days[date.getDay()].substr(0, 3) + ', ' + date.getDate() + ' ' + months[date.getMonth()].substr(0, 3);
		headerYear.innerHTML = ', ' + date.getFullYear();
	} else {
		headerDate.innerHTML = days[date.getDay()] + ', ' + date.getDate() + ' ' + months[date.getMonth()];
		headerYear.innerHTML = ', ' + date.getFullYear();
	}
}

setTime();
setInterval(() => { setTime() }, 10000);

// -----------------------------------------------------------------------USERS-MENU

const openUsersMenuButton = document.querySelector('.users__arrow');
const usersActiveUserMenu = document.querySelector('.users__menu__active-user');
const usersHiddenMenu = document.querySelector('.users__menu__hidden-users');

openUsersMenuButton.onclick = function() {
	usersHiddenMenu.classList.toggle('active');
}

usersActiveUserMenu.onclick = function() {
	usersHiddenMenu.classList.toggle('active');
}
workspaceField.onclick = function() {
	if (usersHiddenMenu.classList.contains('active')) {
		usersHiddenMenu.classList.remove('active');
	} 
}




const hiddenUsersList = document.querySelectorAll('.users__menu__hidden-users .users__menu__item');


hiddenUsersList.forEach(user => {

	user.onclick = function() {
		if (user.classList.contains('new-user')) {
		} else {
			let currentUser = document.querySelector('.users__menu__active-user .users__menu__item');
			let swapBuffer = currentUser.innerHTML;
			let userChoose = user.innerHTML;
			user.innerHTML = swapBuffer;
			currentUser.innerHTML = userChoose;
			usersHiddenMenu.classList.toggle('active');
		}
	}
})

// -----------------------------------------------------------------------MAIN-MENU 


const menuPages = document.querySelectorAll('.page');
const menuLinks = document.querySelectorAll('.menu__link');


for (let i = 0; i < menuLinks.length; i++) {
	menuLinks[i].onclick = function() {	
		for (link of menuLinks) {
 		link.classList.remove('active');
		}
		menuLinks[i].classList.add('active');
		for (page of menuPages) {
 		page.classList.remove('active');
		}
		menuPages[i].classList.add('active');
	}
}



// -----------------------------------------------------------------------TEMPERATURE

const temperatureUp = document.querySelector('.dash-temperature__up');
const temperatureDown = document.querySelector('.dash-temperature__down');
const currentDegreesNight = document.querySelector('.dash-description__night');
const currentDegreesDay = document.querySelector('.dash-description__day');
const weatherTemperature = document.querySelector('.dash-description__tempertature-now__value');

const currentDegreesWeather = document.querySelector('.dash-temperature__degrees');


let currentDegrees = document.querySelector('.dash-temperature__degrees').innerHTML;
let weatherSplit = Math.round((Number(currentDegreesDay.innerHTML) - Number(currentDegreesNight.innerHTML) - 1) / 4);
let currentTime = new Date();

const calculateWeather = () => {
	if ((currentTime.getHours() > 0 && currentTime.getHours() <= 3) || (currentTime.getHours() >= 21 && currentTime.getHours() < 0)) {
	weatherTemperature.innerHTML = Number(currentDegreesNight.innerHTML) + weatherSplit;
	} else if ((currentTime.getHours() > 3 && currentTime.getHours() <= 6) || (currentTime.getHours() >= 18 && currentTime.getHours() < 21)) {
		weatherTemperature.innerHTML = Number(currentDegreesNight.innerHTML) + 2*weatherSplit;
	} else if ((currentTime.getHours() > 6 && currentTime.getHours() <= 9) || (currentTime.getHours() >= 15 && currentTime.getHours() <= 18)) {
		weatherTemperature.innerHTML = Number(currentDegreesNight.innerHTML) + 3*weatherSplit;
	} else {
		weatherTemperature.innerHTML = Number(currentDegreesNight.innerHTML) + 4*weatherSplit;
	}
}

calculateWeather();
setInterval(() => { calculateWeather() }, 3600000);



// -----------------------------------------------------------------------ELECTRICITY

const electricityDaily = document.querySelector('.dash-electricity-daily');
const electricityWeekly = document.querySelector('.dash-electricity-weekly');
const dailyGraphField = document.querySelector('.dash-electricity__graphs__daily');
const weeklyGraphField = document.querySelector('.dash-electricity__graphs__weekly');

electricityDaily.onclick = function() {
	if (electricityWeekly.classList.contains('active')) {
		electricityDaily.classList.toggle('active');
		electricityWeekly.classList.toggle('active');
	}
	weeklyGraphField.style.display = 'none';
	dailyGraphField.style.display = 'block';
}

electricityWeekly.onclick = function() {
	if (electricityDaily.classList.contains('active')) {
		electricityDaily.classList.toggle('active');
		electricityWeekly.classList.toggle('active');
	}
	weeklyGraphField.style.display = 'block';
	dailyGraphField.style.display = 'none';
}



// -----------------------------------------------------------------------MOVIE-PANEL--SLIDER
const moviesSliderNext = document.getElementById('movies-slider-next'), 
	  moviesSliderPrev = document.getElementById('movies-slider-prev'), 
	  slides = document.querySelectorAll('.movies-slider-slide'),
	  dots = document.querySelectorAll('.movies-slider-dot');

let currentSlide = 0;

const activeSlide = n => {
	for (slide of slides) {
		slide.classList.remove('active');
	}
	slides[n].classList.add('active');
}

const activeDot = n => {
	for (dot of dots) {
		dot.classList.remove('active');
	}
	dots[n].classList.add('active');
}

const nextSlide = () => {
	if(currentSlide == slides.length - 1) {
		currentSlide = 0;
		activeSlide(currentSlide); 
		activeDot(currentSlide);
	} else {
		currentSlide++;
		activeSlide(currentSlide);
		activeDot(currentSlide);
	}
}

const prevSlide = () => {
	if(currentSlide == 0) {
		currentSlide = slides.length - 1;
		activeSlide(currentSlide);
		activeDot(currentSlide);
	} else {
		currentSlide--;
		activeSlide(currentSlide);
		activeDot(currentSlide);
	}
}

dots.forEach((item, currentDot) => {
	item.addEventListener('click', () => {
		currentSlide = currentDot;
		activeSlide(currentSlide);
		activeDot(currentSlide);
	})
})

moviesSliderNext.addEventListener('click', nextSlide);
moviesSliderPrev.addEventListener('click', prevSlide);


// -----------------------------------------------------------------------MOVIE-CHOOSE
const deviceTV = document.querySelector('.device__card-TV');

const movieChoose = document.querySelectorAll('.movie__choose');

const deviceTVMovieBlock = document.querySelector('.device__TV__tonights-choice');
const deviceTVMovieNone = document.querySelector('.device__TV__tonights-choice__none');

const deviceTVFilmName = document.querySelector('.chosen-movie__name');
const deviceTVFilmCover = document.querySelector('.film-chosen-img');
const deviceTVFilmClear = document.querySelector('.delete-movie-choice');

const devicesUpdate = document.querySelector('.devices-update .notification__content');
const devicesTimeUpdate = document.querySelector('.devices-update .notification__minutes');

movieChoose.forEach(chooseButton => {
	chooseButton.onclick = function () {
		const movieSlide = document.querySelector('.movies-slider-slide.active');
		const movieName = movieSlide.querySelector('.movie__name');
		const movieCover = movieSlide.querySelector('.movies-slider-img');

		deviceTVFilmName.innerHTML = movieName.innerHTML;
		deviceTVFilmCover.src = movieCover.src;		

		deviceTVMovieBlock.style.display = 'block'
		deviceTVMovieNone.style.display = 'none'

		document.querySelector('.notification__explanation').style.display = 'block';
		document.querySelector('.devices-update__movie').innerHTML = deviceTVFilmName.innerHTML;

		let startTimeDevices = 0;
		document.querySelector('.devices-update .notification__minutes').innerHTML = startTimeDevices;

		sortNotifications();
		setInterval(() => {	
			document.querySelector('.devices-update .notification__minutes').innerHTML = (Number(document.querySelector('.devices-update .notification__minutes').innerHTML) + 1); 
			sortNotifications();
		}, 60000);

		addDashNote('New movie for tonight.');
	}
})

deviceTVFilmClear.onclick = function () {
	deviceTVFilmName.innerHTML = '';
	deviceTVFilmCover.src = '';		

	deviceTVMovieBlock.style.display = 'none'
	deviceTVMovieNone.style.display = 'block'


	document.querySelector('.notification__text').innerHTML = 'You cancelled movie for tonight';
	document.querySelector('.notification__explanation').style.display = 'none';

	let startTimeDevices = 0;
	document.querySelector('.devices-update .notification__minutes').innerHTML = startTimeDevices;

	sortNotifications();
	setInterval(() => {	
		document.querySelector('.devices-update .notification__minutes').innerHTML = (Number(document.querySelector('.devices-update .notification__minutes').innerHTML) + 1); 
		sortNotifications();
	}, 60000);

	addDashNote('Movie cancelled.');
}


const deviceTVStart = document.getElementById('TV__play');
const deviceTVPause = document.getElementById('TV__pause');

deviceTVStart.onclick = function () {
	deviceTVStart.style.display = 'none';
	deviceTVPause.style.display = 'block';

	deviceTV.querySelector('.device__status').style.color = 'var(--good)';
	deviceTV.querySelector('.device__status').innerHTML = 'Turned On';
}

deviceTVPause.onclick = function () {
	deviceTVStart.style.display = 'block';
	deviceTVPause.style.display = 'none';

	deviceTV.querySelector('.device__status').style.color = 'var(--secondary-low)';
	deviceTV.querySelector('.device__status').innerHTML = 'Turned Off';
}




// -----------------------------------------------------------------------PLAYER

const devicePlayer = document.querySelector('.device__card-music');

const devicePlayerStart = document.getElementById('music__play');
const devicePlayerPause = document.getElementById('music__pause');
const devicePlayerPrev = document.getElementById('music__prev');
const devicePlayerNext = document.getElementById('music__next');

const dashboardMusicCheckbox = document.querySelector('.dash-music-quick-checkbox');

const songList = devicePlayer.querySelectorAll('.song');

devicePlayerStart.onclick = function () {
	devicePlayerStart.style.display = 'none';
	devicePlayerPause.style.display = 'block';

	devicePlayer.querySelector('.device__status').style.color = 'var(--good)';
	devicePlayer.querySelector('.device__status').innerHTML = 'Playing now';

	dashboardMusicCheckbox.checked = true;
}

devicePlayerPause.onclick = function () {
	devicePlayerStart.style.display = 'block';
	devicePlayerPause.style.display = 'none';

	devicePlayer.querySelector('.device__status').style.color = 'var(--secondary-low)';
	devicePlayer.querySelector('.device__status').innerHTML = 'On pause now';

	dashboardMusicCheckbox.checked = false;
}

let currentSongIndex = 0;
let incomingSongIndex = 1;

const refreshSongs = () => { 
	for (i = 0; i < songList.length; i++) {
		if (i == currentSongIndex) {
			songList[i].className = 'song';
			songList[i].classList.add('device__current-song');
		} else if (i == incomingSongIndex) {
			songList[i].className = 'song';
			songList[i].classList.add('device__incoming-song');
		} else {
			songList[i].className = 'song';
			songList[i].classList.add('device__hidden-song');
		}
	}
	if (currentSongIndex == 0) {
		devicePlayerPrev.style.display = 'none'
	} else {
		devicePlayerPrev.style.display = 'block'
	}
	if (incomingSongIndex == songList.length - 1) {
		devicePlayerNext.style.display = 'none'
	} else {
		devicePlayerNext.style.display = 'block'
	}
}

refreshSongs();

devicePlayerNext.onclick = function () {
	currentSongIndex++;
	incomingSongIndex++;
	refreshSongs();
}

devicePlayerPrev.onclick = function () {
	currentSongIndex--;
	incomingSongIndex--;
	refreshSongs();
}

const devicePlayerVolume = document.getElementById('music__volume');

const songVolume = document.querySelector('.device__current-volume');

devicePlayerVolume.oninput = function () {
	songVolume.innerHTML = devicePlayerVolume.value;
}

dashboardMusicCheckbox.onchange = function() {
	if (dashboardMusicCheckbox.checked) {
		devicePlayerStart.style.display = 'none';
		devicePlayerPause.style.display = 'block';

		devicePlayer.querySelector('.device__status').style.color = 'var(--good)';
		devicePlayer.querySelector('.device__status').innerHTML = 'Playing now';
	} else {
		devicePlayerStart.style.display = 'block';
		devicePlayerPause.style.display = 'none';

		devicePlayer.querySelector('.device__status').style.color = 'var(--secondary-low)';
		devicePlayer.querySelector('.device__status').innerHTML = 'On pause now';
	}
}

// -----------------------------------------------------------------------LIGHTS

const livingroomLights = document.querySelectorAll('.living-room__lights .lights__bulb');
const hallLights = document.querySelectorAll('.hall__lights .lights__bulb');
const kitchenLights = document.querySelectorAll('.kitchen__lights .lights__bulb');
const bathroomLights = document.querySelectorAll('.bathroom__lights .lights__bulb');

const bulbs = document.querySelectorAll('.lights__bulb');
const rooms = document.querySelectorAll('.room__heading');
const roomsAlerts = document.querySelectorAll('.room__warning');
const lightRegimesCard = document.querySelector('.light-regimes');

const dashboardLightsCheckbox = document.querySelector('.dash-lights-quick-checkbox');
const leavingRegimeCheckbox = document.querySelector('.leaving-regime-checkbox');
const cookingRegimeCheckbox = document.querySelector('.cooking-regime-checkbox');
const dinnerRegimeCheckbox = document.querySelector('.dinner-regime-checkbox');
const meetingRegimeCheckbox = document.querySelector('.meeting-regime-checkbox');


const allCheckboxOff = () => {
	dashboardLightsCheckbox.checked = false;
	leavingRegimeCheckbox.checked = false;
	cookingRegimeCheckbox.checked = false;
	dinnerRegimeCheckbox.checked = false;
	meetingRegimeCheckbox.checked = false;
}

const checkboxOff = (currentCheckbox) => {
	dashboardLightsCheckbox.checked = false;
	leavingRegimeCheckbox.checked = false;
	cookingRegimeCheckbox.checked = false;
	dinnerRegimeCheckbox.checked = false;
	meetingRegimeCheckbox.checked = false;
	currentCheckbox.checked = true;
}

// bulbs onclick
bulbs.forEach(bulb => {
	bulb.onclick = function () {
		allCheckboxOff();
		let activeBulb = bulb.querySelector('.active');
		if (activeBulb.classList.contains('lightsoff')) {
			let unactiveBulb = bulb.querySelector('.lightson');

			activeBulb.classList.toggle('active');
			unactiveBulb.classList.toggle('active');

			activeBulb.style.display = 'none';
			unactiveBulb.style.display = 'block';
		} 
		if (activeBulb.classList.contains('lightson')) {
			let unactiveBulb = bulb.querySelector('.lightsoff');

			activeBulb.style.display = 'none';
			unactiveBulb.style.display = 'block';

			activeBulb.classList.toggle('active');
			unactiveBulb.classList.toggle('active');
		}

	}
})

// on and off
const bulbOff = (bulb) => {
	let activeBulb = bulb.querySelector('.active');
		if (activeBulb.classList.contains('lightson')) {
			let unactiveBulb = bulb.querySelector('.lightsoff');

			activeBulb.classList.toggle('active');
			unactiveBulb.classList.toggle('active');

			activeBulb.style.display = 'none';
			unactiveBulb.style.display = 'block';
		}
}

const bulbOn = (bulb) => {
	let activeBulb = bulb.querySelector('.active');
		if (activeBulb.classList.contains('lightsoff')) {
			let unactiveBulb = bulb.querySelector('.lightson');

			activeBulb.style.display = 'none';
			unactiveBulb.style.display = 'block';

			activeBulb.classList.toggle('active');
			unactiveBulb.classList.toggle('active');
		}
}


dashboardLightsCheckbox.onchange = function() {
	if (dashboardLightsCheckbox.checked) {
		for (var i = 0; i < bulbs.length; i++) {
		 	bulbOn(bulbs[i]);	
		}
		allCheckboxOff();
		dashboardLightsCheckbox.checked = true;
	} else {
		for (var i = 0; i < bulbs.length; i++) {
			bulbOff(bulbs[i]);	
		}
		allCheckboxOff();
	}
}

// leaving regime

leavingRegimeCheckbox.onchange = function() {
	if (leavingRegimeCheckbox.checked) {
		for (var i = 0; i < bulbs.length; i++) {
		 	bulbOff(bulbs[i]);	
		}
		bulbOn(hallLights[0]);
		bulbOn(hallLights[1]);
		checkboxOff(leavingRegimeCheckbox);
	} 
}

// cooking regime

cookingRegimeCheckbox.onchange = function() {
	if (cookingRegimeCheckbox.checked) {
		for (var i = 0; i < bulbs.length; i++) {
		 	bulbOff(bulbs[i]);	
		}
		for (var i = 0; i < kitchenLights.length; i++) {
		 	bulbOn(kitchenLights[i]);	
		}
		bulbOn(livingroomLights[4]);
		checkboxOff(cookingRegimeCheckbox);
	} 
}

// dinner regime

dinnerRegimeCheckbox.onchange = function() {
	if (dinnerRegimeCheckbox.checked) {
		for (var i = 0; i < bulbs.length; i++) {
		 	bulbOff(bulbs[i]);	
		}
		for (var i = 0; i < livingroomLights.length; i++) {
		 	bulbOn(livingroomLights[i]);	
		}
		bulbOn(kitchenLights[0]);
		bulbOn(kitchenLights[2]);
		checkboxOff(dinnerRegimeCheckbox);
	} 
}

// meeting regime

meetingRegimeCheckbox.onchange = function() {
	if (meetingRegimeCheckbox.checked) {
		for (var i = 0; i < bulbs.length; i++) {
		 	bulbOff(bulbs[i]);	
		}
		for (var i = 0; i < hallLights.length; i++) {
		 	bulbOn(hallLights[i]);	
		}
		bulbOn(kitchenLights[1]);
		bulbOn(bathroomLights[2]);
		bulbOn(livingroomLights[1]);
		bulbOn(livingroomLights[2]);
		checkboxOff(meetingRegimeCheckbox);
	} 
}


// -----------------------------------------------------------------------TEMPERATURE

const mainTemperature = document.querySelector('.temperature__value');
const mainDegreesSign = document.querySelector('.temperature__degrees .degrees__sign');
const mainTemperatureBorder = document.querySelector('.temperature__degrees');

const mainHeaterTemperature = document.querySelector('.heat-sources__source1 .heat-sources__temperature__value');
const mainHeaterUp = document.querySelector('.source1__temperature__up');
const mainHeaterDown = document.querySelector('.source1__temperature__down');

const secondHeaterTemperature = document.querySelector('.heat-sources__source2 .heat-sources__temperature__value');
const secondHeaterUp = document.querySelector('.source2__temperature__up');
const secondHeaterDown = document.querySelector('.source2__temperature__down');

const weatherHeaterTemperature = document.querySelector('.heat-sources__weather .heat-sources__temperature__value');
const weatherHeaterNight = document.querySelector('.heat-sources__weather .heat-sources__weather__night');
const weatherHeaterDay = document.querySelector('.heat-sources__weather .heat-sources__weather__day');


const livingroomTimer = document.querySelector('.living-room__temp .temperature__ready__timer');
const livingroomTimerHeading = document.querySelector('.living-room__temp .temperature__ready__heading');

const bathTimer = document.querySelector('.bath__temp .temperature__ready__timer');
const bathTimerHeading = document.querySelector('.bath__temp .temperature__ready__heading');

const autoTimer = document.querySelector('.auto__temp .temperature__ready__timer');
const autoTimerHeading = document.querySelector('.auto__temp .temperature__ready__heading');

const calculateTime = (a, b) => {
	return Math.abs(Math.round((a - b)*7)) + 's';
}

const setTemperatureLivingroom = document.querySelector('.set-temperature__living-room');
setTemperatureLivingroom.disabled = true;


let weatherTemperatureCurrent = Number(weatherTemperature.innerHTML);
let mainHeaterTemperatureCurrent = Number(mainHeaterTemperature.innerHTML);
let secondHeaterTemperatureCurrent = Number(secondHeaterTemperature.innerHTML);

const calculateTemperature = () => {
 	let mainTemperatureResult = (mainHeaterTemperatureCurrent + secondHeaterTemperatureCurrent + weatherTemperatureCurrent*1.8) / 3;
 	mainTemperature.innerHTML = Math.round(mainTemperatureResult * 10) / 10;

 	weatherHeaterTemperature.innerHTML = weatherTemperatureCurrent;
 	weatherHeaterNight.innerHTML = currentDegreesNight.innerHTML;
 	weatherHeaterDay.innerHTML = currentDegreesDay.innerHTML;

}

calculateTemperature();
currentDegreesWeather.innerHTML = mainTemperature.innerHTML;

let currentTemperatureLivingroom = Number(mainTemperature.innerHTML);

const colorTemperatureChanges = () => {
	if (currentTemperatureLivingroom > mainTemperature.innerHTML) {
			mainDegreesSign.style.color = 'var(--cold)';
			mainTemperature.style.color = 'var(--cold)';
			mainTemperatureBorder.style.border = '2px solid var(--cold)';
			livingroomTimerHeading.style.visibility = 'visible';
			livingroomTimer.innerHTML = calculateTime(currentTemperatureLivingroom, mainTemperature.innerHTML);
		} else if (currentTemperatureLivingroom < mainTemperature.innerHTML) {
			mainDegreesSign.style.color = 'var(--hot)';
			mainTemperature.style.color = 'var(--hot)';
			mainTemperatureBorder.style.border = '2px solid var(--hot)';
			livingroomTimerHeading.style.visibility = 'visible';
			livingroomTimer.innerHTML = calculateTime(mainTemperature.innerHTML, currentTemperatureLivingroom);
		} else {
			mainDegreesSign.style.color = 'inherit';
			mainTemperature.style.color = 'inherit';
			mainTemperatureBorder.style.border = '2px solid var(--half-secondary)';
		}
	setTemperatureLivingroom.disabled = false;
}


mainHeaterDown.onclick = function() {
	if (mainHeaterTemperatureCurrent > 13) {
		mainHeaterUp.disabled = false;
		 mainHeaterTemperatureCurrent = mainHeaterTemperatureCurrent - 1;
		 mainHeaterTemperature.innerHTML = mainHeaterTemperatureCurrent;
		 if (mainHeaterTemperatureCurrent == 13) {
		 	mainHeaterDown.disabled = true;
		 }
	}
	calculateTemperature();
	colorTemperatureChanges(); 
	colorAutoChanges();	
}

mainHeaterUp.onclick = function() {
	if (mainHeaterTemperatureCurrent < 29) {
		mainHeaterDown.disabled = false;
		 mainHeaterTemperatureCurrent = mainHeaterTemperatureCurrent + 1;
		 mainHeaterTemperature.innerHTML = mainHeaterTemperatureCurrent;
		 if (mainHeaterTemperatureCurrent == 29) {
		 	mainHeaterUp.disabled = true;
		 }
	} 
	calculateTemperature();
	colorTemperatureChanges();
	colorAutoChanges();	 
}


secondHeaterDown.onclick = function() {
	if (secondHeaterTemperatureCurrent > 13) {
		secondHeaterUp.disabled = false;
		 secondHeaterTemperatureCurrent = secondHeaterTemperatureCurrent - 1;
		 secondHeaterTemperature.innerHTML = secondHeaterTemperatureCurrent;
		 if (secondHeaterTemperatureCurrent == 13) {
		 	secondHeaterDown.disabled = true;
		 }
	} 
	calculateTemperature();
	colorTemperatureChanges(); 
	colorAutoChanges();	
}

secondHeaterUp.onclick = function() {
	if (secondHeaterTemperatureCurrent < 29) {
		secondHeaterDown.disabled = false;
		 secondHeaterTemperatureCurrent = secondHeaterTemperatureCurrent + 1;
		 secondHeaterTemperature.innerHTML = secondHeaterTemperatureCurrent;
		 if (secondHeaterTemperatureCurrent == 29) {
		 	secondHeaterUp.disabled = true;
		 }
	} 
	calculateTemperature();
	colorTemperatureChanges();
	colorAutoChanges();	 
}


setTemperatureLivingroom.onclick = function() {
	if (currentDegreesWeather.innerHTML > mainTemperature.innerHTML) {
		document.querySelector('.temperature-update__change').innerHTML = ' down ';
	} else if (currentDegreesWeather.innerHTML < mainTemperature.innerHTML) {
		document.querySelector('.temperature-update__change').innerHTML = ' up ';
	} 
	document.querySelector('.temperature-update__place').innerHTML = ' Living Room ';
	document.querySelector('.temperature-update__way').innerHTML = ' manually. ';
	document.querySelector('.temperature-update__from').innerHTML = currentDegreesWeather.innerHTML + '&degC';
	document.querySelector('.temperature-update__to').innerHTML = mainTemperature.innerHTML + '&degC';
	let startTimeTemp = 0;
	document.querySelector('.temperature-update .notification__minutes').innerHTML = startTimeTemp;

	sortNotifications();
	setInterval(() => {
		document.querySelector('.temperature-update .notification__minutes').innerHTML = (Number(document.querySelector('.temperature-update .notification__minutes').innerHTML) + 1); 
		sortNotifications();
	}, 60000);

	addDashNote('Temperature setup ready.', 'red')


	currentDegreesWeather.innerHTML = mainTemperature.innerHTML;
	currentTemperatureLivingroom = Number(mainTemperature.innerHTML);
	livingroomTimer.innerHTML = '';
	livingroomTimerHeading.style.visibility = 'hidden';
	colorTemperatureChanges(); 
}



const bathTemperature = document.querySelector('.bath__temp .heat-sources__temperature__value');
const bathDegreesSign = document.querySelector('.bath__temp .degrees__sign');
const bathTemperatureUp = document.querySelector('.bath__temperature__up');
const bathTemperatureDown = document.querySelector('.bath__temperature__down');

let bathTemperatureStart = Number(bathTemperature.innerHTML);
let bathTemperatureCurrent = Number(bathTemperature.innerHTML);

const setTemperatureBathroom = document.querySelector('.set-temperature__bath');
setTemperatureBathroom.disabled = true;

const colorBathChanges = () => {
	if (bathTemperatureCurrent < bathTemperatureStart) {
			bathTemperature.style.color = 'var(--cold)';
			bathDegreesSign.style.color = 'var(--cold)';
			bathTimerHeading.style.visibility = 'visible';
			bathTimer.innerHTML = calculateTime(bathTemperatureStart, bathTemperatureCurrent);
		} else if (bathTemperatureCurrent > bathTemperatureStart) {
			bathTemperature.style.color = 'var(--hot)';
			bathDegreesSign.style.color = 'var(--hot)';
			bathTimerHeading.style.visibility = 'visible';
			bathTimer.innerHTML = calculateTime(bathTemperatureCurrent, bathTemperatureStart);
		} else {
			bathTemperature.style.color = 'inherit';
			bathDegreesSign.style.color = 'inherit';
		}
	setTemperatureBathroom.disabled = false;
}

bathTemperatureDown.onclick = function() {
	if (bathTemperatureCurrent > 13) {
		bathTemperatureUp.disabled = false;
		 bathTemperatureCurrent = bathTemperatureCurrent - 1;
		 bathTemperature.innerHTML = bathTemperatureCurrent;
		 if (bathTemperatureCurrent == 13) {
		 	bathTemperatureDown.disabled = true;
		 }
	}
	colorBathChanges();
}

bathTemperatureUp.onclick = function() {
	if (bathTemperatureCurrent < 29) {
		bathTemperature.disabled = false;
		 bathTemperatureCurrent = bathTemperatureCurrent + 1;
		 bathTemperature.innerHTML = bathTemperatureCurrent;
		 if (bathTemperatureCurrent == 29) {
		 	bathTemperatureUp.disabled = true;
		 }
	}
	colorBathChanges(); 
}

setTemperatureBathroom.onclick = function() {
	if (bathTemperatureStart > bathTemperature.innerHTML) {
		document.querySelector('.temperature-update__change').innerHTML = ' down ';
	} else if (bathTemperatureStart < bathTemperature.innerHTML) {
		document.querySelector('.temperature-update__change').innerHTML = ' up ';
	} 
	document.querySelector('.temperature-update__place').innerHTML = ' Bathroom ';
	document.querySelector('.temperature-update__way').innerHTML = ' manually. ';
	document.querySelector('.temperature-update__from').innerHTML = bathTemperatureStart + '&degC';
	document.querySelector('.temperature-update__to').innerHTML = bathTemperature.innerHTML + '&degC';
	let startTimeTemp = 0;
	document.querySelector('.temperature-update .notification__minutes').innerHTML = startTimeTemp;

	sortNotifications();
	setInterval(() => {
				document.querySelector('.temperature-update .notification__minutes').innerHTML = (Number(document.querySelector('.temperature-update .notification__minutes').innerHTML) + 1); 

		sortNotifications();
	}, 60000);

	addDashNote('Temperature setup ready.', 'red')

	bathTemperatureCurrent.innerHTML = bathTemperature.innerHTML;
	bathTemperatureStart = Number(bathTemperature.innerHTML);
	bathTimerHeading.style.visibility = 'hidden';
	bathTimer.innerHTML = '';
	colorBathChanges(); 
	setTemperatureBathroom.disabled = true;
}



const recommendedTemperature = document.querySelector('.auto__temp__advice__value');
const recommendedTemperatureDegrees = document.querySelector('.auto__temperature .degrees__sign');
const recommendedTemperatureAround = document.querySelector('.auto__temperature .around__sign');
const stayinghomeOption = document.querySelector('.auto__temp__stayinghome-checkbox');
const windowOption = document.querySelector('.auto__temp__window-checkbox');

let autoTempBalancing = 0;

const setTemperatureAuto = document.querySelector('.set-temperature__auto');


const calculateRecommendedTemperature = () => {
	if (weatherTemperatureCurrent <= 10) {
		recommendedTemperature.innerHTML = 21;
	} else if (weatherTemperatureCurrent > 10 && weatherTemperatureCurrent < 17) {
		recommendedTemperature.innerHTML = 20;
	} else {
		recommendedTemperature.innerHTML = 19;
	}
}	


const colorAutoChanges = () => {
	if (recommendedTemperature.innerHTML < Number(mainTemperature.innerHTML) - 0.5) {
			recommendedTemperature.style.color = 'var(--cold)';
			recommendedTemperatureDegrees.style.color = 'var(--cold)';
			recommendedTemperatureAround.style.color = 'var(--cold)';
			autoTimerHeading.style.visibility = 'visible';
			autoTimer.innerHTML = calculateTime(recommendedTemperature.innerHTML, Number(mainTemperature.innerHTML));
		} else if (recommendedTemperature.innerHTML > Number(mainTemperature.innerHTML) + 0.5) {
			recommendedTemperature.style.color = 'var(--hot)';
			recommendedTemperatureDegrees.style.color = 'var(--hot)';
			recommendedTemperatureAround.style.color = 'var(--hot)';
			autoTimerHeading.style.visibility = 'visible';
			autoTimer.innerHTML = calculateTime(recommendedTemperature.innerHTML, Number(mainTemperature.innerHTML));
		} else {
			recommendedTemperature.style.color = 'inherit';
			recommendedTemperatureDegrees.style.color = 'inherit';
			recommendedTemperatureAround.style.color = 'inherit';
		}
	setTemperatureAuto.disabled = false;
}

calculateRecommendedTemperature();
colorAutoChanges();	

stayinghomeOption.onchange = function() {
	if (stayinghomeOption.checked) {
		recommendedTemperature.innerHTML = Number(recommendedTemperature.innerHTML) + 1;
	} else {
		recommendedTemperature.innerHTML = Number(recommendedTemperature.innerHTML) - 1;
	}
	colorAutoChanges();	
}

windowOption.onchange = function() {
	if (windowOption.checked) {
		recommendedTemperature.innerHTML = Number(recommendedTemperature.innerHTML) + 1;
	} else {
		recommendedTemperature.innerHTML = Number(recommendedTemperature.innerHTML) - 1;
	}
	colorAutoChanges();	
}

setTemperatureAuto.onclick = function() {
	if (Number(recommendedTemperature.innerHTML) < Number(mainTemperature.innerHTML)) {
		while ((Number(recommendedTemperature.innerHTML) < Number(mainTemperature.innerHTML) - 0.5) &&  (Number(recommendedTemperature.innerHTML) < Number(mainTemperature.innerHTML) + 0.5)) {	
			mainHeaterDown.click();
			secondHeaterDown.click();
		}
	}
	if (Number(recommendedTemperature.innerHTML) > Number(mainTemperature.innerHTML)) {
		while ((Number(recommendedTemperature.innerHTML) > Number(mainTemperature.innerHTML) - 0.5) &&  (Number(recommendedTemperature.innerHTML) > Number(mainTemperature.innerHTML) + 0.5)) {			
			mainHeaterUp.click();
			secondHeaterUp.click();
		}
	}

	if (currentDegreesWeather.innerHTML > mainTemperature.innerHTML) {
		document.querySelector('.temperature-update__change').innerHTML = ' down ';
	} else if (currentDegreesWeather.innerHTML < mainTemperature.innerHTML) {
		document.querySelector('.temperature-update__change').innerHTML = ' up ';
	} 
	document.querySelector('.temperature-update__place').innerHTML = ' Living Room ';
	document.querySelector('.temperature-update__way').innerHTML = ' automatically. ';
	document.querySelector('.temperature-update__from').innerHTML = currentDegreesWeather.innerHTML + '&degC';
	document.querySelector('.temperature-update__to').innerHTML = mainTemperature.innerHTML + '&degC';
	let startTimeTemp = 0;
	document.querySelector('.temperature-update .notification__minutes').innerHTML = startTimeTemp;

	sortNotifications();
	setInterval(() => {
				document.querySelector('.temperature-update .notification__minutes').innerHTML = (Number(document.querySelector('.temperature-update .notification__minutes').innerHTML) + 1); 

		sortNotifications();
	}, 60000);

	addDashNote('Temperature setup ready.', 'red')
	


	currentDegreesWeather.innerHTML = mainTemperature.innerHTML;
	currentTemperatureLivingroom = Number(mainTemperature.innerHTML);
	livingroomTimer.innerHTML = '';
	livingroomTimerHeading.style.visibility = 'hidden';
	colorTemperatureChanges(); 
	autoTimerHeading.style.visibility = 'hidden';
	autoTimer.innerHTML = '';
	colorAutoChanges();	

	setTemperatureAuto.disabled = true;
}


const dashboardAutoTempCheckbox = document.querySelector('.dash-auto-temp');

dashboardAutoTempCheckbox.onchange = function() {
	if (dashboardAutoTempCheckbox.checked && setTemperatureAuto.disabled == false) {
		setTemperatureAuto.onclick();
	}
}



// -----------------------------------------------------------------------ELECTRICITY
const energyPlotCard = document.querySelector('.energy-graph');

const energyPlot = document.querySelector('.energy__plot');
let ctx = energyPlot.getContext('2d');

let canvasHeight = energyPlot.height - 20;
let canvasWidth = energyPlot.width;


const energySpentData = document.querySelectorAll('.last-energy-spent__day');
let minEnergySpent = 6;
let maxEnergySpent = 2;
let maxEnergySpentPos = 0;
for (i = 0; i < 5; i++) {
	if (Number(energySpentData[i].innerHTML) > maxEnergySpent) {
		maxEnergySpent = Number(energySpentData[i].innerHTML);
		maxEnergySpentPos = i;
	}
	if (Number(energySpentData[i].innerHTML) < minEnergySpent) {
		minEnergySpent = Number(energySpentData[i].innerHTML);
	}
}

let energyRange = maxEnergySpent - minEnergySpent;

let calculationEnergyArray = [];
for (i = 0; i < 5; i++) {
	calculationEnergyArray.push(Number(energySpentData[i].innerHTML) - minEnergySpent);
}
let energyCalculateRange = calculationEnergyArray[maxEnergySpentPos];
for (i = 0; i < 5; i++) {
	calculationEnergyArray[i] = 1 - calculationEnergyArray[i] / energyCalculateRange;
}

let firstDayConsumption = calculationEnergyArray[0] * canvasHeight;
let secondDayConsumption = calculationEnergyArray[1] * canvasHeight;
let thirdDayConsumption = calculationEnergyArray[2] * canvasHeight;
let fourthDayConsumption = calculationEnergyArray[3] * canvasHeight;
let fifthDayConsumption = calculationEnergyArray[4] * canvasHeight;

let normalDayConsumption = (1 - (4 - minEnergySpent) / energyCalculateRange) * canvasHeight;



ctx.beginPath();
ctx.lineWidth = 5;
ctx.strokeStyle = '#ffbe2c';
ctx.moveTo(0, firstDayConsumption);
ctx.lineTo(162, secondDayConsumption);
ctx.lineTo(324, thirdDayConsumption);
ctx.lineTo(486, fourthDayConsumption);
ctx.lineTo(650, fifthDayConsumption);
ctx.stroke();

ctx.beginPath();
ctx.setLineDash([15, 15]);
ctx.moveTo(0, normalDayConsumption);
ctx.lineTo(650, normalDayConsumption);
ctx.strokeStyle = '#516F91';
ctx.stroke();


const energyPlotHeadingD = document.querySelector('.energy__plot__heading-desktop');
let ctxH = energyPlotHeadingD.getContext('2d');

ctxH.fillStyle = "#ffbe2c";
ctxH.font = "20pt Arial";
ctxH.fillText('___', 20, 70);
ctxH.font = "14pt Arial";
ctxH.fillText('Last 5 days', 80, 80);

ctxH.fillStyle = "#516F91";
ctxH.font = "20pt Arial";
ctxH.fillText('- - -', 230, 80);
ctxH.font = "14pt Arial";
ctxH.fillText('Normal', 285, 80);



const energyPlotHeadingM = document.querySelector('.energy__plot__heading-mobile');
let ctxM = energyPlotHeadingM.getContext('2d');

ctxM.fillStyle = "#ffbe2c";
ctxM.font = "20pt Arial";
ctxM.fillText('___', 20, 30);
ctxM.font = "14pt Arial";
ctxM.fillText('Last 5 days', 90, 40);

ctxM.fillStyle = "#516F91";
ctxM.font = "20pt Arial";
ctxM.fillText('- - -', 20, 80);
ctxM.font = "14pt Arial";
ctxM.fillText('Normal', 90, 80);


const lightsSwitch = document.querySelector('.electric-board__switch-checkbox.inside-lights');

lightsSwitch.onchange = function() {
	if (lightsSwitch.checked == false) {
		for (i = 0; i < bulbs.length; i++) {
			bulbs[i].style.display = 'none';
		}
		for (i = 0; i < roomsAlerts.length; i++) {
			roomsAlerts[i].style.display = 'block';
			rooms[i].style.display = 'none';
		}
		lightRegimesCard.style.border = '2px solid var(--bad)';
		dashboardLightsCheckbox.disabled = true;
		leavingRegimeCheckbox.disabled = true;
		cookingRegimeCheckbox.disabled = true;
		dinnerRegimeCheckbox.disabled = true;
		meetingRegimeCheckbox.disabled = true;
	} else {
		for (i = 0; i < bulbs.length; i++) {
			bulbs[i].style.display = 'block';
		}
		for (i = 0; i < roomsAlerts.length; i++) {
			roomsAlerts[i].style.display = 'none';
			rooms[i].style.display = 'block';
		}
		lightRegimesCard.style.border = 'none';
		dashboardLightsCheckbox.disabled = false;
		leavingRegimeCheckbox.disabled = false;
		cookingRegimeCheckbox.disabled = false;
		dinnerRegimeCheckbox.disabled = false;
		meetingRegimeCheckbox.disabled = false;
	}
}


const fiveDaysData = document.querySelector('.last-energy-spent__data');

const currentEnergy = document.querySelector('.energy__current');
const currentEnergyDash = document.querySelector('.dash-electricity__graphs__daily');

if (Number(currentEnergy.innerHTML) < 4) {
	currentEnergy.style.color = 'var(--good)';
} else if (Number(currentEnergy.innerHTML) > 4) {
	currentEnergy.style.color = 'var(--bad)';
}

weeklyGraphField.innerHTML = fiveDaysData.innerHTML;
dailyGraphField.innerHTML = currentEnergy.innerHTML;

if (Number(currentEnergyDash.innerHTML) < 4) {
	currentEnergyDash.style.color = 'var(--good)';
} else if (Number(currentEnergyDash.innerHTML) > 4) {
	currentEnergyDash.style.color = 'var(--bad)';
}



const electricityUpdate = () => {
	document.querySelector('.electricity-update__spent').innerHTML = currentEnergy.innerHTML;
	if (Number(currentEnergy.innerHTML) > 4) {
		document.querySelector('.electricity-update__change').innerHTML = Math.round((Number(currentEnergy.innerHTML) / 4 - 1) * 100) + '%';
		document.querySelector('.electricity-update__change-way').innerHTML = ' more then ';
	} else if (Number(currentEnergy.innerHTML) < 4) {
		document.querySelector('.electricity-update__change').innerHTML = Math.round(1 - (Number(currentEnergy.innerHTML) / 4) * 100) + '%';
		document.querySelector('.electricity-update__change-way').innerHTML = ' less then ';
	} else {
		document.querySelector('.electricity-update__change').innerHTML = '';
		document.querySelector('.electricity-update__change-way').innerHTML = ' equal to the ';
	}


	let startTimeElec = 0;
	document.querySelector('.electricity-update .notification__minutes').innerHTML = startTimeElec;

	sortNotifications();

	setInterval(() => {
		document.querySelector('.electricity-update .notification__minutes').innerHTML = (Number(document.querySelector('.electricity-update .notification__minutes').innerHTML) + 1); 
		sortNotifications();
	}, 60000);

	addDashNote('Power consumption upd.')
}

electricityUpdate();


// ---------------------------------------------------------------------WIFI

const usersList = document.querySelector('.wifi-users__list');

const disconnectButtons = document.querySelectorAll('.disconnect-user');
const blockButtons = document.querySelectorAll('.block-user');
const unblockButtons = document.querySelectorAll('.unblock-user');

const connectedUsers = document.querySelector('.connected');
const offlineUsers = document.querySelector('.offline');
const blockedUsers = document.querySelector('.blocked');

const dashWifiSent = document.querySelector('.dash-wifi__gb-send');
const wifiSent = document.querySelector('.wifi-sent__value');

const wifiTrafficList = document.querySelectorAll('.wifi-user__traffic__value');
let wifiTraffic = 0;

for (i = 0; i < wifiTrafficList.length; i++) {
	wifiTraffic += Number(wifiTrafficList[i].innerHTML);
}

dashWifiSent.innerHTML =  wifiTraffic.toFixed(1);
wifiSent.innerHTML = wifiTraffic.toFixed(1) + ' GB';

const updateDashWifi = () => {
	let connectedUsersList = document.querySelectorAll('.connected .wifi-user');
	document.querySelector('.dash-wifi__number-of-devices').innerHTML = connectedUsersList.length;
}

updateDashWifi();

const dashboardWifiCheckbox = document.querySelector('.dash-wifi-quick-checkbox');

dashboardWifiCheckbox.onchange = function() {
	usersList.classList.toggle('wifi-on');
	usersList.classList.toggle('wifi-off');
}

disconnectButtons.forEach(disconnectButton => {
	disconnectButton.onclick = function() {
		disconnectButton.parentNode.parentNode.classList.remove('user-connected');
		disconnectButton.parentNode.parentNode.classList.add('user-offline');
		disconnectButton.parentNode.parentNode.querySelector('.wifi-user__connection').innerHTML = 'offline';

		disconnectButton.parentNode.parentNode.parentNode.parentNode.removeChild(disconnectButton.parentNode.parentNode.parentNode);
		offlineUsers.prepend(disconnectButton.parentNode.parentNode.parentNode);

		updateDashWifi();
	}
})

blockButtons.forEach(blockButton => {
	blockButton.onclick = function() {
		blockButton.parentNode.parentNode.classList.remove('user-connected');
		blockButton.parentNode.parentNode.classList.add('user-blocked');
		blockButton.parentNode.parentNode.querySelector('.wifi-user__connection').innerHTML = 'blocked';

		blockButton.parentNode.parentNode.parentNode.parentNode.removeChild(blockButton.parentNode.parentNode.parentNode);
		blockedUsers.prepend(blockButton.parentNode.parentNode.parentNode);

		updateDashWifi();

		document.querySelector('.wifi-update__user').innerHTML = blockButton.parentNode.parentNode.querySelector('.wifi-user__name').innerHTML;
		document.querySelector('.wifi-update__change').innerHTML = 'blocked';

		let blockedUsersList = document.querySelectorAll('.blocked .wifi-user');
		document.querySelector('.wifi-update__blocked-users').innerHTML = blockedUsersList.length;

		let startTimeWifi = 0;
		document.querySelector('.wifi-update .notification__minutes').innerHTML = startTimeWifi;

		sortNotifications();

		setInterval(() => {
			document.querySelector('.wifi-update .notification__minutes').innerHTML = (Number(document.querySelector('.wifi-update .notification__minutes').innerHTML) + 1); 
			sortNotifications();
		}, 60000);

		addDashNote('You changed a block-list.');
	}
})

unblockButtons.forEach(unblockButton => {
	unblockButton.onclick = function() {
		unblockButton.parentNode.parentNode.classList.remove('user-blocked');
		unblockButton.parentNode.parentNode.classList.add('user-offline');
		unblockButton.parentNode.parentNode.querySelector('.wifi-user__connection').innerHTML = 'offline';

		unblockButton.parentNode.parentNode.parentNode.parentNode.removeChild(unblockButton.parentNode.parentNode.parentNode);
		offlineUsers.prepend(unblockButton.parentNode.parentNode.parentNode);

		updateDashWifi();

		document.querySelector('.wifi-update__user').innerHTML = unblockButton.parentNode.parentNode.querySelector('.wifi-user__name').innerHTML;
		document.querySelector('.wifi-update__change').innerHTML = 'unblocked';

		let blockedUsersList = document.querySelectorAll('.blocked .wifi-user');
		document.querySelector('.wifi-update__blocked-users').innerHTML = blockedUsersList.length;

		let startTimeWifi = 0;
		document.querySelector('.wifi-update .notification__minutes').innerHTML = startTimeWifi;

		sortNotifications();

		setInterval(() => {
			document.querySelector('.wifi-update .notification__minutes').innerHTML = (Number(document.querySelector('.wifi-update .notification__minutes').innerHTML) + 1); 
			sortNotifications();
		}, 60000);

		addDashNote('You changed your block-list.');
	}
})


// ---------------------------------------------------------------------SECURITY

const systemSwitches = document.querySelectorAll('.system .security-option-checkbox');
const statusSwitches = document.querySelectorAll('.status .security-option-checkbox');

systemSwitches.forEach(switchbox => {
	switchbox.onchange = function() {
		if (switchbox.checked) {
			switchbox.parentNode.parentNode.querySelector('.security-status__status-value').innerHTML = 'ON';
			switchbox.parentNode.parentNode.querySelector('.security-status__status-value').classList.toggle('status-positive');
			switchbox.parentNode.parentNode.querySelector('.security-status__status-value').classList.toggle('status-negative');
		} else {
			switchbox.parentNode.parentNode.querySelector('.security-status__status-value').innerHTML = 'OFF';
			switchbox.parentNode.parentNode.querySelector('.security-status__status-value').classList.toggle('status-positive');
			switchbox.parentNode.parentNode.querySelector('.security-status__status-value').classList.toggle('status-negative');

			document.querySelector('.security-update__change').innerHTML = 'system was turned OFF';
			document.querySelector('.security-update__place').innerHTML = switchbox.parentNode.parentNode.querySelector('.security-status__name').innerHTML;

			let securityTime = new Date();
			if (securityTime.getMinutes() < 10) {
				document.querySelector('.security-update__time').innerHTML = securityTime.getHours() + ':0' + securityTime.getMinutes();
			} else {
				document.querySelector('.security-update__time').innerHTML = securityTime.getHours() + ':' + securityTime.getMinutes();
			}

			let startTimeSecurity = 0;
			document.querySelector('.security-update .notification__minutes').innerHTML = startTimeSecurity;

			sortNotifications();

			setInterval(() => {
				document.querySelector('.security-update .notification__minutes').innerHTML = (Number(document.querySelector('.security-update .notification__minutes').innerHTML) + 1); 
				sortNotifications();
			}, 60000);

			addDashNote('Security system alert!', 'red');
		}
	}
})

statusSwitches.forEach(switchbox => {
	switchbox.onchange = function() {
		if (switchbox.checked) {
			switchbox.parentNode.parentNode.querySelector('.security-status__option-value').innerHTML = 'Locked';
			switchbox.parentNode.parentNode.querySelector('.security-status__option-value').classList.toggle('status-positive');
			switchbox.parentNode.parentNode.querySelector('.security-status__option-value').classList.toggle('status-negative');
		} else {
			switchbox.parentNode.parentNode.querySelector('.security-status__option-value').innerHTML = 'Unlocked';
			switchbox.parentNode.parentNode.querySelector('.security-status__option-value').classList.toggle('status-positive');
			switchbox.parentNode.parentNode.querySelector('.security-status__option-value').classList.toggle('status-negative');

			document.querySelector('.security-update__change').innerHTML = 'was UNLOCKED';
			document.querySelector('.security-update__place').innerHTML = switchbox.parentNode.parentNode.querySelector('.security-status__name').innerHTML;

			let securityTime = new Date();
			if (securityTime.getMinutes() < 10) {
				document.querySelector('.security-update__time').innerHTML = securityTime.getHours() + ':0' + securityTime.getMinutes();
			} else {
				document.querySelector('.security-update__time').innerHTML = securityTime.getHours() + ':' + securityTime.getMinutes();
			}

			let startTimeSecurity = 0;
			document.querySelector('.security-update .notification__minutes').innerHTML = startTimeSecurity;

			sortNotifications();

			setInterval(() => {
				document.querySelector('.security-update .notification__minutes').innerHTML = (Number(document.querySelector('.security-update .notification__minutes').innerHTML) + 1); 
				sortNotifications();
			}, 60000);

			addDashNote('Security system alert!', 'red');
		}
	}
})

const dashboardDoorCheckbox = document.querySelector('.dash-door-quick-checkbox');

statusSwitches[0].onclick = function() {
	dashboardDoorCheckbox.click();
}


dashboardDoorCheckbox.onchange = function() {
	statusSwitches[0].click();
}


const dashboardССTVCheckbox = document.querySelector('.dash-cctv-quick-checkbox');

const cctvPicture = document.querySelectorAll('.CCTV-picture');
const cctvStatus = document.querySelectorAll('.CCTV__status');

dashboardССTVCheckbox.onchange = function() {
	for (i = 0; i < cctvPicture.length; i++) {
		cctvPicture[i].classList.toggle('picture-on');
		cctvPicture[i].classList.toggle('picture-off');
	}

	for (i = 0; i < cctvStatus.length; i++) {
		cctvStatus[i].classList.toggle('status-negative');
		cctvStatus[i].classList.toggle('status-positive');
	}

	if (dashboardССTVCheckbox.checked) {
		for (i = 0; i < cctvStatus.length; i++) {
			cctvStatus[i].innerHTML = 'ON';
		}
	} else {
		for (i = 0; i < cctvStatus.length; i++) {
			cctvStatus[i].innerHTML = 'OFF';
		}
	}
}




// ------------------------------SETTINGS

const lightTheme = document.querySelector('.card.light-theme');
const darkTheme = document.querySelector('.card.dark-theme');

const container = document.querySelector('.container-1440');

darkTheme.onclick = function() {
	if (container.classList.contains('dark-theme')) {
	} else {
		lightTheme.classList.toggle('clicked');
		darkTheme.classList.toggle('clicked');
		container.classList.toggle('dark-theme');
	}
}

lightTheme.onclick = function() {
	if (container.classList.contains('dark-theme')) {
		lightTheme.classList.toggle('clicked');
		darkTheme.classList.toggle('clicked');
		container.classList.toggle('dark-theme');
	}
}
