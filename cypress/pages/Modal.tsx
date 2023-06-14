import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';

function Demo() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                size='30%'
                title='Authentication'
            >
                <div style={{ height: '40vh' }}></div>
            </Modal>

            <Group position='center'>
                <Button onClick={open}>Open modal</Button>
            </Group>
        </>
    );
}

export default Demo;
