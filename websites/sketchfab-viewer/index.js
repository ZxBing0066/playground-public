var iframe = document.getElementById('api-frame');
var uid = '7ab75a9c956340bbb917e5851c714536';

var client = new Sketchfab(iframe);

client.init(uid, {
    success: function onSuccess(api) {
        api.start();
        api.addEventListener('viewerready', function () {
            console.log('Viewer is ready');
        });
    },
    error: function onError() {
        console.log('Viewer error');
    }
});
