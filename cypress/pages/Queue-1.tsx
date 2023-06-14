import { Button } from '@mantine/core';
import { useState } from 'react';

export default function Queue() {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <Button data-test-id='test-btn' onClick={() => setVisible(!visible)}>
                Button
            </Button>
            {visible && (
                <ul data-test-id='test-ul'>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                </ul>
            )}
        </>
    );
}
