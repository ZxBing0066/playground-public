import fs from 'fs';
import build from './build-util';

// make sure the dir exists
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}
if (!fs.existsSync('dist/posts')) {
    fs.mkdirSync('dist/posts');
}

// get all the files in posts
const posts = fs.readdirSync('posts');

(async () => {
    for await (const post of posts) {
        await build('post', post.replace('.json', ''));
    }
    await build('list');
})();
