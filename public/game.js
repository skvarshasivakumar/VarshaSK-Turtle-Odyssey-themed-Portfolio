var ismobile = navigator.userAgent.match(/(iPhone)|(iPod)|(android)|(webOS)|(BlackBerry)/i);
var scroll_x = $(window).width() / 2;
var floor_x = 0;
var turtle_x = 0;
var direction = false;
var music_play = false;
var interval_left = false;
var interval_right = false;

if (ismobile) scroll_x -= 170;
else scroll_x -= 240;

$('#scroll').css('left', scroll_x + 'px');


function moveTo(pos) {
    diff = ismobile ? 10 : 15;

    if (pos == 'left') {

        if (!direction) {
            direction = 'left';
            $('#turtle').css('-webkit-transform', 'scaleX(-1)');
        }
        floor_x += diff;
        scroll_x += diff;
        turtle_x -= 65;
        if (turtle_x == -195) turtle_x = 0;

    } else if (pos == 'right') {

        if (!direction) {
            direction = 'right';
            $('#turtle').css('-webkit-transform', 'scaleX(1)');
        }
        floor_x -= diff;
        scroll_x -= diff;
        turtle_x -= 65;
        if (turtle_x == -195) turtle_x = 0;

    } else {
        direction = false;
    }

    // reach end
    if (scroll_x < (parseInt($('#scroll').css('width')) * -1)) {
        scroll_x = $(window).width();

        // reach start
    } else if (scroll_x > $(window).width()) {
        scroll_x = parseInt($('#scroll').css('width')) * -1;
    }

    $('#scroll').css('left', scroll_x + 'px');
    $('#floor').css('background-position-x', floor_x + 'px');
    $('#turtle').css('background-position-x', turtle_x + 'px');
}

function playMusic() {
    if (!music_play) {
        document.getElementById("bg_music").play();
        music_play = true;
    }
}

function moveLeft() {
    playMusic();

    direction = false;
    if (!interval_left) {
        interval_left = setInterval(function () {
            moveTo('left');
        }, 100);
    }
}

function moveRight() {
    playMusic();

    direction = false;
    if (!interval_right) {
        interval_right = setInterval(function () {
            moveTo('right');
        }, 100);
    }
}

function stopMove() {
    clearInterval(interval_left);
    clearInterval(interval_right);
    interval_left = false;
    interval_right = false;
}

$(function () {

    $("body, #scroll").click(function () {
        playMusic();
    });

    $("body").keydown(function (e) {
        if (e.keyCode == 37) {
            moveLeft();
        } else if (e.keyCode == 39) {
            moveRight();
        }
    });

    $("body").keyup(function (e) {
        stopMove();
    });

    $('#btn_left').on('mousedown touchstart', function () {
        moveLeft();
    });

    $('#btn_right').on('mousedown touchstart', function () {
        moveRight();
    });

    $('#btn_left, #btn_right').on('mouseup touchend', function (event) {
        stopMove();
    });

});
