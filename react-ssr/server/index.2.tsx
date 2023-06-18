import express from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';

import App from '../ui/App';

const app = express();

app.get('/', (_: unknown, res: express.Response) => {
    res.send(
        `
<div id="root">${renderToString(<App />)}</div>
<script src="/bundle.js"></script>
`
    );
});

app.use(express.static('static'));

app.listen(4000, () => {
    console.log('Listening on port 4000');
});
