import express from 'express';
import path from 'path';
import fs from 'fs';
import build from '../build-util';

const app = express();

const expiresTime = 1000 * 60 * 10;

app.use(function (req, res, next) {
    setTimeout(() => {
        const filename = req.path.indexOf('.html') >= 0 ? req.path : req.path + 'index.html';

        // get the file's create timestamps
        fs.stat(path.join('./dist', filename), function (err, stats) {
            if (err) {
                console.error(err);
                return;
            }
            if (Date.now() - +stats.mtime > expiresTime) {
                console.log(filename, 'files expired, rebuilding...');
                if (filename === '/index.html') {
                    build('list');
                } else {
                    build('post', path.basename(filename).replace('.html', ''));
                }
            }
        });
    });

    next();
});

app.use(express.static('dist'));

app.listen(4000, () => {
    console.log('Listening on port 4000');
});
