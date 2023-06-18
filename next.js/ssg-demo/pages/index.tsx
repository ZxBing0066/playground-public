import { Inter } from 'next/font/google';
import { useCallback } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const log = useCallback(() => {
        console.log('Hello world');
    }, []);

    return (
        <div>
            <p>react ssr demo</p>
            <button onClick={log}>Click me</button>
        </div>
    );
}

export const getStaticProps = async () => {
    return {
        props: {}
    };
};
