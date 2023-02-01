const playground = document.querySelector('#playground');

const hz = '汉字';
const ew = 'En';

const multipleStr = (str, count) => new Array(count).fill(str).join('');
const gStr = (length, source) => {
    if (!source) {
        // type mix
        source = hz + ew;
    }
    const count = Math.ceil(length / source.length);
    return multipleStr(source, count).substring(0, length);
};

const list = [];
[
    new Array(3).fill(6),
    new Array(3).fill(20),
    new Array(3).fill(100),
    [1, 1, 100],
    [1, 100, 1],
    [100, 1, 1],
    [0, 0, 100],
    [0, 100, 0],
    [100, 0, 0]
].forEach(counts => {
    list.push(counts.map(c => [c]));
    list.push(counts.map(c => [c, hz]));
    list.push(counts.map(c => [c, ew]));
});

const render = () => {
    const ul = document.createElement('ul');
    ul.className = 'simple';
    list.forEach(([prefix, hl, suffix]) => {
        const container = document.createElement('li');
        container.innerHTML = `<span class='prefix'>${gStr(...prefix)}</span><span class='highlight'>${gStr(
            ...hl
        )}</span><span class='suffix'>${gStr(...suffix)}</span>`;
        ul.appendChild(container);
    });
    playground.appendChild(ul);
};

const renderNew = () => {
    const ul = document.createElement('ul');
    ul.className = 'split-highlight';
    list.forEach(([prefix, hl, suffix]) => {
        const container = document.createElement('li');
        const hlStr = gStr(...hl);
        const hlStrArr =
            hlStr.length > 2
                ? (() => {
                      const i = (hlStr.length / 2) | 0;
                      return [hlStr.substring(0, i), hlStr.substring(i)];
                  })()
                : [hlStr, ''];
        container.innerHTML = `
<span class='prefix'>${gStr(...prefix)}</span>
<span class='highlight'>
    <span class='prefix'>${hlStrArr[0]}</span><span class='suffix'>${hlStrArr[1]}</span>
</span>
<span class='suffix'>${gStr(...suffix)}</span>`;
        ul.appendChild(container);
    });
    playground.appendChild(ul);
};

render();
renderNew();
