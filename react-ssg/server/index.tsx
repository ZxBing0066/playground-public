import express from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';

import App from '../ui/List';

const app = express();

app.get('/', (_: unknown, res: express.Response) => {
    const userName = ['张三', '李四', '王五', '赵六'][(Math.random() * 4) | 0];
    res.send(
        `
<div id="root">${renderToString(<App userName={userName} />)}</div>
<script>
window.__initialState = { userName: '${userName}' };
</script>
<script src="/bundle.js"></script>
`
    );
});

app.use(express.static('static'));

app.listen(4000, () => {
    console.log('Listening on port 4000');
});
