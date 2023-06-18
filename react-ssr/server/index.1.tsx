import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import App from '../ui/App';

const app = express();

app.get('/', (_: unknown, res: express.Response) => {
    res.send(renderToString(<App />));
});

app.listen(4000, () => {
    console.log('Listening on port 4000');
});
