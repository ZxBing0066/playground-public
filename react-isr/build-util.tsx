import fs from 'fs/promises';
import { renderToString } from 'react-dom/server';
import React from 'react';
import Post from './ui/Post';
import List from './ui/List';

async function build(type: 'list'): Promise<void>;
async function build(type: 'post', name: string): Promise<void>;
async function build(type: 'list' | 'post', name?: string) {
    if (type === 'list') {
        const posts = await fs.readdir('posts');
        await fs.writeFile(
            'dist/index.html',
            `<div id="root">${renderToString(
                <List
                    list={posts.map(post => {
                        delete require.cache['posts/' + post];
                        return { ...require('./posts/' + post), key: post.replace('.json', '') };
                    })}
                />
            )}</div>`
        );
    } else {
        delete require.cache['posts/' + name];
        const postInfo = require('./posts/' + name);
        const fileName = `dist/posts/${name}.html`;
        await fs.writeFile(fileName, `<div id="root">${renderToString(<Post data={postInfo} />)}</div>`);
    }
}

export default build;
