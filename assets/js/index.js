import dadosSPF from './dadosSPF.json' assert { type: "json" };

(() => {
    const arrowIcon = document.querySelector('.arrow-icon');
    const placarSection = document.querySelector('section.placar')
    const progressTable = document.querySelector('.table-progress');
    const updateDate = document.querySelector('.placar h1 + p');
    const secondsWrapper = document.querySelector('#segundos');
    const minutesWrapper = document.querySelector('#minutos');
    const hoursWrapper = document.querySelector('#horas');
    const daysWrapper = document.querySelector('#dias');

    const eventDate = new Date ('2023-05-04 07:30:00');
    const today = Date.now();

    const formatter = new Intl.NumberFormat('pt-br');
    let timeLeft = Math.floor((eventDate - today) / 1000);
    
    const formatDigit = (digit) => String(digit).padStart(2, '0');

    const pointsArray = dadosSPF.dados.map(e => e.pontos);
    const higherPointsAmount = Math.max(...pointsArray);
    const dadosOrdenados = dadosSPF.dados.sort((a, b) => b.pontos - a.pontos);

    const generateScoreContent = () => {
        updateDate.innerText = `Atualizado pela última vez no dia ${dadosSPF.dataAtualizacao} às ${dadosSPF.horaAtualizacao}.`;

        dadosOrdenados.forEach((equipe, i, equipes) => {
            const {pontos, turma} = equipe;
            const progressBar = document.createElement('div');
            const dadosWrapper = document.createElement('div');
            const turmaWrapper = document.createElement('h4');
            const pontosWrapper = document.createElement('p');

            const pointsToFirstPlace = (higherPointsAmount - +pontos) + 1;
            const formattedPoints = formatter.format(+pontos);
            const formattedPointsToFirstPlace = formatter.format(pointsToFirstPlace);

            const messageData = i === 0
                ? `O ${turma} está em primeiro lugar.`
                : pontos === higherPointsAmount
                    ? `O ${turma} está empatado com o ${equipes[0].turma}.`
                    : `O ${turma} precisa de mais ${formattedPointsToFirstPlace} ponto${pointsToFirstPlace > 1 ? 's' : ''} para ficar em primeiro lugar.`;

            progressBar.setAttribute('data-message', messageData);
            const percentageBar = +pontos*100/higherPointsAmount;
    
            progressBar.style.width = `${percentageBar}%`;
            pontosWrapper.innerText = `${formattedPoints} pontos`;
            turmaWrapper.innerText = turma;
            progressBar.className = 'progress-bar';
    
            [turmaWrapper, progressBar, pontosWrapper].forEach(e => dadosWrapper.appendChild(e));
            progressTable.appendChild(dadosWrapper);
        });
    }
    
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
        if (timeLeft === 0) clearInterval(interval);
        timeLeft--;
        updateTimeleft(timeLeft);
    }, 1000);

    arrowIcon.onclick = () => {
        window.scrollTo({
            top: placarSection.offsetTop,
            behavior: "smooth"
        });
    }
    
    window.onload = () => {
        updateTimeleft(timeLeft);
        generateScoreContent();
    }
})();