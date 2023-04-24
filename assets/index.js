import dadosSPF from './dadosSPF.json' assert { type: "json" };

(() => {
    const progressTable = document.querySelector('.table-progress');
    const updateDate = document.querySelector('.placar h1 + p');
    const secondsWrapper = document.querySelector('#segundos');
    const minutesWrapper = document.querySelector('#minutos');
    const hoursWrapper = document.querySelector('#horas');
    const daysWrapper = document.querySelector('#dias');
    const eventDate = new Date ('2023-05-04 07:30:00');
    const today = Date.now();

    updateDate.innerText = `Atualizado pela última vez no dia ${dadosSPF.dataAtualizacao} às ${dadosSPF.horaAtualizacao}.`

    const updateChart = percentage => {

    }

    dadosSPF.dados.forEach(e => {
        const formattedPoints = new Intl.NumberFormat('pt-br').format(+e.pontos);
        const container = document.createElement('div');
        const turma = document.createElement('h4');
        const progressBar = document.createElement('div');
        const pontos = document.createElement('p');

        const percentageProgressBar = +e.pontos/100;
        progressBar.style.width = `${percentageProgressBar}%`;
        pontos.innerText = `${formattedPoints} pontos`;
        turma.innerText = e.turma;
        progressBar.className = 'progress-bar';

        [turma, progressBar, pontos].forEach(e => container.appendChild(e));
        progressTable.appendChild(container);
    });
    
    const formatDigit = (digit) => String(digit).padStart(2, '0');
    let timeLeft = Math.floor((eventDate - today) / 1000);
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

    const interval = setInterval(() => {
        if (timeLeft === 0) stopCount();
        updateTimeleft(timeLeft);
        timeLeft--;
    }, 1000);


})();