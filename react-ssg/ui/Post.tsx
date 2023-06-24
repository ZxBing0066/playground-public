import React from 'react';

export default ({
    data
}: {
    data: {
        title: string;
        content: { title: string; content: string }[];
    };
}) => {
    return (
        <div>
            <h1>{data.title}</h1>
            <div>
                {data.content.map(({ title, content }) => (
                    <article key={title}>
                        <h2>{title}</h2>
                        <p>{content}</p>
                    </article>
                ))}
            </div>
        </div>
    );
};
