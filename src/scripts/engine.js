const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values:{
        gameSpeed: 1000,
        hitPosition: 0,
        result:0,
        currentTime: 60,
    },
    actions:{
        timerId: null,
        currentTimeId: setInterval(coutDown, 1000),
    }
};

function sound(nameAudio){
    let audio = new Audio(`./src/audio/${nameAudio}.m4a`);
    audio.volume = 0.2;
    audio.play();
}


function coutDown() {
    state.view.timeLeft.textContent = state.values.currentTime;
    state.values.currentTime--;
    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.currentTimeId);
        clearInterval(state.actions.timerId);
        alert("GAME OVER!" + state.values.result);
    }
}


function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition){
            state.values.result++
            state.view.score.textContent = state.values.result;
            state.values.hitPosition = null;
            sound("hit");
        }
        });
    });
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameSpeed);
}


function main(){
    moveEnemy();
    addListenerHitBox();
}

main();

