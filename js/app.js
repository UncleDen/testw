var showVideo = document.getElementById('video');

var hls = null;

$(document).ready(function () {
    $("#btnLoad").click(function () {

        if (hls != null) {
            hls.Desrtoy();
        }

        var url = $("#txtURL").val();

        hls = new myHls(showVideo, url);
        hls.Play();
    });
    $("#btnLoad2").click(function () {
        if (hls != null) {
            hls.Desrtoy();
        }

        var url = $("#txtURL2").val();

        hls = new myHls(showVideo, url);
        hls.Play();
    });

});

var myHls = function (VideoControl, Url) {
    var video = VideoControl;
    var urlHls = Url;

    var ifHls= function () {
        var ext = (urlHls.split('.').slice(1).pop() || '');
        return (ext === 'm3u8');
    }

    var obj = null;

    function Play() {

        if (ifHls()) {
            obj = new Hls();

            if (Hls.isSupported()) {
                obj.loadSource(urlHls);
                obj.attachMedia(video);
            }
            
        } else {
            var url = $("#txtURL2").val();
            var player = dashjs.MediaPlayer().create();
            player.initialize(document.querySelector("#video"), url, true);
        }
    }

    function Desrtoy() {
        if (ifHls()) {
            obj.destroy();
        } else if (obj !== null) {
            obj.reset();
        } else {
            Play;
        }
    }

    return {
        Play: Play,
        Desrtoy: Desrtoy
    }
}