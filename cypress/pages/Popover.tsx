import { Popover, Text, Button } from '@mantine/core';

function Demo() {
    return (
        <Popover width={200} position='bottom' withArrow shadow='md'>
            <Popover.Target>
                <Button>Toggle popover</Button>
            </Popover.Target>
            <Popover.Dropdown>
                <Text size='sm'>This is uncontrolled popover, it is opened when button is clicked</Text>
            </Popover.Dropdown>
        </Popover>
    );
}

export default Demo;