import fs from 'fs';
import { renderToString } from 'react-dom/server';
import React from 'react';
import Post from './ui/Post';
import List from './ui/List';

// get all the files in posts
const posts = fs.readdirSync('posts');

// make sure the dir exists
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}
if (!fs.existsSync('dist/posts')) {
    fs.mkdirSync('dist/posts');
}

posts.map(post => {
    const postInfo = require('./posts/' + post);
    const fileName = `dist/posts/${post.replace('.json', '.html')}`;
    // make sure file exists
    fs.writeFileSync(fileName, `<div id="root">${renderToString(<Post data={postInfo} />)}</div>`);
});

fs.writeFileSync(
    'dist/index.html',
    `<div id="root">${renderToString(<List list={posts.map(post => ({ ...require('./posts/' + post), key: post.replace('.json', '') }))} />)}</div>`
);
