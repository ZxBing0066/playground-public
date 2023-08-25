const button = document.getElementById('toggle-button1');
const button2 = document.getElementById('toggle-button2');
const video1 = document.getElementById('video1');
const video2 = document.getElementById('video2');

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
    console.log(pictureInPictureWindow);
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

function onIntersection(entries) {
    console.log(entries);
    entries.forEach(entry => {
        if (entry.target === video) {
            if (entry.intersectionRatio < 0.5) {
                if (!document.pictureInPictureElement) {
                    togglePictureInPicture();
                }
            } else {
                if (document.pictureInPictureElement) {
                    togglePictureInPicture();
                }
            }
        }
    });
}

const observer = new IntersectionObserver(onIntersection, { threshold: 0.5 });
observer.observe(video);

button.onclick = togglePictureInPicture;
