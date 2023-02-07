const player = document.getElementById('player');
const stage = document.getElementById('stage');
const scoreDOM = document.getElementById('score');

const range = 600,
    playerWidth = 0,
    speed = 20,
    carrotSpeed = 2,
    carrots = new Set();
let score = 0;

const generateCarrot = () => {
    const x = (Math.random() * range) | 0;
    const dom = document.createElement('div');
    dom.className = 'carrot';
    dom.style.left = x + 'px';
    dom.style.top = 0;
    stage.appendChild(dom);
    return dom;
};

const onKeyPress = e => {
    let left = +player.style.left.replace('px', '');
    if (e.keyCode === 97) {
        left = Math.max(0, left - speed);
    } else if (e.keyCode === 100) {
        left = Math.min(range - playerWidth, left + speed);
    }
    player.style.left = left + 'px';
};

document.addEventListener('keypress', onKeyPress, true);

let coldDown = 10;

const clearCarrot = carrot => {
    stage.removeChild(carrot);
    carrots.delete(carrot);
};
const getScore = carrot => {
    clearCarrot(carrot);
    scoreDOM.innerText = score++;
};

const updateCarrots = () => {
    const playerX = +player.style.left.replace('px', '');
    carrots.forEach(carrot => {
        let top = +carrot.style.top.replace('px', '');
        top += carrotSpeed;
        const carrotX = +carrot.style.left.replace('px', '');
        if (top > 360) {
            if (carrotX >= playerX - 10 && carrotX <= playerX + 50) {
                getScore(carrot);
                return;
            }
        }
        if (top > 400) {
            clearCarrot(carrot);
        } else {
            carrot.style.top = top + 'px';
        }
    });
};

const tick = () => {
    if (coldDown <= 0) {
        carrots.add(generateCarrot());
        coldDown = Math.random() * 100 + 60;
    } else {
        coldDown--;
    }
    updateCarrots();
    requestAnimationFrame(tick);
};

tick();
