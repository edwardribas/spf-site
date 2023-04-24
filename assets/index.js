(() => {
    const secondsWrapper = document.getElementById('segundos');
    const minutesWrapper = document.getElementById('minutos');
    const hoursWrapper = document.getElementById('horas');
    const daysWrapper = document.getElementById('dias');
    const eventDate = new Date ('2023-05-04 07:30:00');
    const today = Date.now();
    const formatDigit = (digit) => String(digit).padStart(2, '0');

    let timeLeft = Math.floor((eventDate - today) / 1000);

    const interval = setInterval(() => {
        if (timeLeft === 0) stopCount();
        updateTimeleft(timeLeft);
        timeLeft--;
    }, 1000);

    const stopCount = () => clearInterval(interval);

    const updateTimeleft = (time) => {
        const seconds = time % 60;
        const minutes = Math.floor((time % (60 * 60)) / 60);
        const hours = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
        const days = Math.floor(time / (60 * 60 * 24));
    
        secondsWrapper.textContent = formatDigit(seconds);
        minutesWrapper.textContent = formatDigit(minutes);
        hoursWrapper.textContent = formatDigit(hours);
        daysWrapper.textContent = formatDigit(days);
    }
})();