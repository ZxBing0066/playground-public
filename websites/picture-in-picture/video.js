const button = document.getElementById('toggle-button');
const disableButton = document.getElementById('toggle-disable-button');
const autoButton = document.getElementById('toggle-auto');
const video = document.getElementById('video');

const state = {
    _disable: false,
    get disable() {
        return this._disable;
    },
    set disable(state) {
        this._disable = state;
        disableButton.innerText = state ? 'disablePictureInPicture is true' : 'disablePictureInPicture is false';
        video.disablePictureInPicture = state;
    },
    _auto: false,
    get auto() {
        return this._auto;
    },
    set auto(state) {
        this._auto = state;
        autoButton.innerText = state ? 'auto toggle PIP on scroll: on' : 'auto toggle PIP on scroll: off';
    }
};

(function init() {
    state.disable = false;
    state.auto = false;
})();

disableButton.onclick = () => (state.disable = !state.disable);
autoButton.onclick = () => (state.auto = !state.auto);

function onEnterPip(e) {
    console.log('Picture-in-Picture mode activated!', e);
}
function onLeavePip(e) {
    console.log('Picture-in-Picture mode deactivated!', e);
}

document.addEventListener('enterpictureinpicture', onEnterPip);
document.addEventListener('leavepictureinpicture', onLeavePip);

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
    entries.forEach(entry => {
        if (entry.target === video && state.auto) {
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
