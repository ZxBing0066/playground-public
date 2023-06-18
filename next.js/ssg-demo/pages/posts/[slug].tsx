import { GetStaticPaths, GetStaticProps } from 'next';
import { useCallback } from 'react';

export default function Post({ id }: { id: number }) {
    const log = useCallback(() => {
        console.log(id);
    }, [id]);

    return (
        <div>
            <p>This is the {id} post</p>
            <button onClick={log}>Click me</button>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    return {
        props: {
            id: params?.slug
        }
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const allPosts = new Array(10).fill(null).map((v, i) => i);

    return {
        paths: allPosts.map(i => `/posts/${i}`) || [],
        fallback: true
    };
};
