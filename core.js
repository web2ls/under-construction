window.onload = function() {
	const slidesList = ['slide1.jpg', 'slide2.jpg', 'slide3.jpg', 'slide4.jpg', 'slide5.jpg', 'slide6.jpg', 'slide7.jpg', 'slide8.jpg', 'slide9.jpg'];
	const imgElements = document.querySelectorAll('.bg-container img');
	const daysElem = document.querySelector('.days span');
	const hoursElem = document.querySelector('.hours span');
	const minutesElem = document.querySelector('.minutes span');
	const secondsElem = document.querySelector('.seconds span');

  const differenceDeg = 0.004;
	const differenceScale = 0.0002;
	const currentDate = new Date().getTime();
	const startDate = new Date('2018-11-27').getTime();
	let diffTime = startDate - currentDate;
  let initialDeg = 0;
	let initialScale = 1;
  let counter = 0;
  let rotateDirection = true;
  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  function setTimerValue() {
		diffTime -= 1000;
		const computedDays = diffTime / 86400000;
		days = Math.floor(computedDays);

		hours = new Date(diffTime).getHours();
		minutes = new Date(diffTime).getMinutes();
		seconds = new Date(diffTime).getSeconds();

		daysElem.textContent = days.toString().length < 2 ? '0' + days.toString() : days;
		hoursElem.textContent = hours.toString().length < 2 ? '0' + hours.toString() : hours;
		minutesElem.textContent = minutes.toString().length < 2 ? '0' + minutes.toString() : minutes;
		secondsElem.textContent = seconds.toString().length < 2 ? '0' + seconds.toString() : seconds;
  }
  
  setInterval(() => {
    const currentActiveEl = document.querySelector('.bg-container img.active');
		if (initialDeg > 15) {
			initialDeg = 0;
			initialScale = 1;
			rotateDirection = !rotateDirection;
      ++counter;
      if (counter > 7)
        counter = 0;
			currentActiveEl.style.transform = `rotate(${rotateDirection ? '' : '-'}${initialDeg}deg) scale(${initialScale})`;
      imgElements.forEach((item, index) => {
        if (index === counter)
          item.classList.add('active', 'fadeIn');
        else
          item.classList.remove('active', 'fadeIn');
      })
		}
    
		initialDeg += differenceDeg;
		initialScale += differenceScale;
		currentActiveEl.style.transform = `rotate(${rotateDirection ? '' : '-'}${initialDeg}deg) scale(${initialScale})`;
	}, 10)

	setTimerValue();

  setInterval(() => {
  	setTimerValue();
  }, 1000);

}
