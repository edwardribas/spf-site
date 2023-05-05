import dadosSPF from './dadosSPF.json' assert { type: "json" };

(() => {
    const arrowIcon = document.querySelector('.arrow-icon');
    const placarSection = document.querySelector('section.placar')
    const progressTable = document.querySelector('.table-progress');
    const updateDate = document.querySelector('.placar h1 + p');
    const countdownWrapper = document.querySelector('.countdown');

    const eventDate = new Date ('2023-05-04 07:30:00');
    const today = Date.now();

    const formatter = new Intl.NumberFormat('pt-br');
    let timeLeft = Math.floor((eventDate - today) / 1000);
    
    const formatDigit = (digit) => String(digit).padStart(2, '0');

    const pointsArray = dadosSPF.dados.map(e => e.pontos);
    const higherPointsAmount = Math.max(...pointsArray);
    const dadosOrdenados = dadosSPF.dados.sort((a, b) => b.pontos - a.pontos);

    const generateScoreContent = () => {
        updateDate.innerText = `Última contagem realizada no dia ${dadosSPF.dataAtualizacao} às ${dadosSPF.horaAtualizacao}.`;

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
        const minutes = formatDigit(Math.floor((time % (60 * 60)) / 60));
        const hours = formatDigit(Math.floor((time % (60 * 60 * 24)) / (60 * 60)));
        const days = formatDigit(Math.floor(time / (60 * 60 * 24)));

        countdownWrapper.innerHTML = `
            <div>
                <h2>${days}</h2>
                <p>Dias</p>
            </div>
            <div>
                <h2>${hours}</h2>
                <p>Horas</p>
            </div>
            <div>
                <h2>${minutes}</h2>
                <p>Minutos</p>
            </div>
            <div>
                <h2>${seconds}</h2>
                <p>Segundos</p>
            </div>
        `;
    }

    const interval = setInterval(() => {
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
        generateScoreContent();
        if (timeLeft <= 0) {
            const now = new Date();
            const day = now.getDate();
            const month = now.getMonth()+1;
            const year = new Date().getFullYear();

            if ((day === 4 || day === 5) && month === 5 && year === 2023)
                countdownWrapper.innerHTML = "<h2>O evento já está acontecendo! Acompanhe tudo pelo nosso <a href=\"https://www.instagram.com/mcm_spf/\" target=\"_blank\">instagram</a>.</h2>"
            else
                countdownWrapper.innerHTML = "<h2>A SPF de 2023 já terminou, veja tudo que rolou no nosso <a href=\"https://www.instagram.com/mcm_spf/\" target=\"_blank\">instagram</a>!</h2>"
            
            clearInterval(interval);
            return;
        };
        updateTimeleft(timeLeft);
    }
})();