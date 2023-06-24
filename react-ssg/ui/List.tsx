import React from 'react';

export default ({ list }: { list: { title: string; key: string }[] }) => {
    return (
        <div>
            <ul>
                {list.map(({ title, key }) => (
                    <li key={title}>
                        <a href={`/posts/${key}.html`}>{title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
