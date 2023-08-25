const button = document.querySelector('.toggle-button');
const video = document.querySelector('video');

function onEnterPip(e) {
    console.log('Picture-in-Picture mode activated!', e);
}
function onLeavePip(e) {
    console.log('Picture-in-Picture mode deactivated!', e);
}

video.addEventListener('enterpictureinpicture', onEnterPip);
video.addEventListener('leavepictureinpicture', onLeavePip);

async function enterPictureInPicture() {
    const pictureInPictureWindow = await video.requestPictureInPicture();

    function onPipWindowResize(e) {
        console.log(e, pictureInPictureWindow);
    }
    pictureInPictureWindow.addEventListener('resize', onPipWindowResize);
}

function togglePictureInPicture() {
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
    } else {
        enterPictureInPicture();
    }
}

button.onclick = togglePictureInPicture;
