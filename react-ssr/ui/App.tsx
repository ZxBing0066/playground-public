import React, { useCallback } from 'react';

export default ({ userName = 'unknown' }: { userName?: string }) => {
    const log = useCallback(() => {
        console.log('Hello world');
    }, []);

    return (
        <div>
            <p>react ssr demo</p>
            <p>{userName}</p>
            <button onClick={log}>Click me</button>
        </div>
    );
};
