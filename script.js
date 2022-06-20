const numberList = [];
const numberCardList = [];
const playerCard = [];
const pkList = [];
let btnStart = document.querySelector('.btn-start');
let bingo = document.querySelector('.btn-bingo');
let btnRestart = document.querySelector('.btn-restart');
let interval;
let bingoInterval;
let idPokemon;
let url = 'https://pokeapi.co/api/v2/pokemon/';

const generateCard = () => {
    while(numberCardList.length < 16){
        let randNumber = Math.round(Math.random() * 150 + 1);
        if(numberCardList.indexOf(randNumber) == -1){
            numberCardList.push(randNumber);
            return randNumber;
        }
    }
}

const getRandNumber = () => {
    while(numberList.length < 150){
        let randNumber = Math.round(Math.random() * 150 + 1);
        if(numberList.indexOf(randNumber) == -1){
            numberList.push(randNumber);
            return randNumber;
        }
    }
    stop();
}

const loadCard = () => {
    for(let i = 0; i < 16; i++){
        idPokemon = generateCard();
        console.log(idPokemon);
        fetch(url + idPokemon)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let pkCard = document.querySelector('.card');
                let pkDiv = document.createElement('div');
                teste = pkDiv;
                pkDiv.classList.add('card-item');
                pkDiv.id = data.id;
                let pk = document.createElement('img');
                let img = data.sprites.front_default;
                pk.setAttribute('src', img);
                pkDiv.appendChild(pk);
                pkCard.appendChild(pkDiv);
                pkDiv.addEventListener('click', () => {
                    console.log(pkDiv.id);
                    pkDiv.classList.toggle('selected');
                    if(pkDiv.classList[1] == 'selected'){
                        playerCard.push(pkDiv.id);
                        console.log(playerCard);
                    }else{
                        playerCard.splice(playerCard.indexOf(pkDiv.id), 1);
                        console.log(playerCard);
                    }
                })
            })
    }
}

const loadRandPk = () => {
    let pkImg = document.querySelector('.rand-pk-img');
    let randId = getRandNumber();
    pkList.push(randId);
    fetch(url + randId)
        .then(response => response.json())
        .then(data => {
            let img = data.sprites.front_default;
            pkImg.setAttribute('src', img);
            pkImg.setAttribute('width', '120px');
            pkImg.setAttribute('height', '120px');
        })  
}

const verifyCard = () => {
    let counter = 0;
    for(let item of pkList){
        for(let i = 0; i < playerCard.length; i++){
            if(playerCard[i] == item){
                console.log(item);
                counter++;
                console.log('Contador: ' + counter);
            }
        }
    }
    if(counter == 16){
        alert('BINGOOOOO!!!');
        stop();
        clearInterval(bingoInterval);
        bingo.style.display = 'none';
        btnRestart.style.display = 'inline';
        return;
    }else{
        alert('CARTELA NÃO FOI PREENCHIDA CORRETAMENTE!');
        return;
    }
}

const showBingoButton = () => {
    if(playerCard.length == 16){
        bingo.style.display = 'inline';
    }else{
        bingo.style.display = 'none';
    }
}

const meuTimer = () => {
    clearInterval(interval);
    interval = setInterval(meuTimer, 5000);
    loadRandPk();
}

const stop = () => {
    clearInterval(interval);
}

const start = () => {
    btnStart.style.display = 'none';
    bingoInterval = setInterval(showBingoButton, 500);
    loadCard();
    meuTimer();
}

const clearAll = () => {
    for(let i = 0; i < playerCard.length; i++){
        let pkDiv = document.getElementById(playerCard[i]);
        pkDiv.remove();
    }
    numberCardList.length = 0;
    numberList.length = 0;
    pkList.length = 0;
    playerCard.length = 0;
    counter = 0;
    btnRestart.style.display = 'none';
}

const restart = () => {
    clearAll();
    start();
}

bingo.addEventListener('click', verifyCard);
btnStart.addEventListener('click', start);
btnRestart.addEventListener('click', restart);