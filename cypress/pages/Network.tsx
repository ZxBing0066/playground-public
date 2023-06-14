import { Button } from '@mantine/core';
import { useRef } from 'react';

export default function Network() {
    const indexRef = useRef(0);
    return (
        <Button
            data-test-id='test-btn'
            onClick={() =>
                fetch('/api/test', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ index: indexRef.current++ })
                })
            }
        >
            Send A Request
        </Button>
    );
}
