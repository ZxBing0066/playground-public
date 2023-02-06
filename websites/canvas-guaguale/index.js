const canvas = document.querySelector('#canvas');
const text = document.querySelector('#text');
const ctx = canvas.getContext('2d');

const sentances = ['兔然暴富', '兔年大吉', '兔飞猛进', '钱兔似锦', '大展宏兔', '扬眉兔气'];

text.innerText = sentances[(Math.random() * sentances.length) | 0];

canvas.width = 300;
canvas.height = 150;

ctx.fillStyle = '#eeddcc';
ctx.fillRect(0, 0, 300, 150);

let brushing = false;

canvas.addEventListener('mousedown', e => {
    brushing = true;
});

document.addEventListener('mouseup', e => {
    brushing = false;
    if (map.size > 50) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = '#eeddcc';
        ctx.fillRect(0, 0, 300, 150);
    }
});

const map = new Map();

canvas.addEventListener('mousemove', e => {
    if (!brushing) return;

    let x = e.x - canvas.offsetLeft;
    let y = e.y - canvas.offsetTop;

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fill();
    ctx.closePath();
    map.set(`${x}|${y}`, 1);
});
