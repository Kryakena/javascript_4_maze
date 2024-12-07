var canvas;
var context;

var x = 0;
var y = 0;

var dx = 0;
var dy = 0;

var timer;

window.onload = function() {
    canvas = document.getElementById("Canvas");
    context = canvas.getContext("2d");
    drawMaze("maze1.png", 148, 3);

    window.onkeydown = processKey;

};

function drawMaze(mazeFile, startingX, startingY) {
    clearTimeout(timer);

    dx = 0;
    dy = 0;

    var imgMaze = new Image();
    imgMaze.onload = function() {
        canvas.width = imgMaze.width;
        canvas.height = imgMaze.height;

        context.drawImage(imgMaze, 0, 0);

        x = startingX;
        y = startingY;

        var imgFace = document.getElementById("face");
        context.drawImage(imgFace, x, y);
        context.stroke();

        timer = setTimeout("drawMaze()", 10);
    };
    imgMaze.src = mazeFile;
}

function processKey(e) {
    dx = 0;
    dy = 0;

    if (e.keyCode == 50) { //стрелка вверх - код 38
        dy = -1;
    }
    if (e.keyCode == 53) { //стрелка вниз - код 40
        dy = 1;
    }
    if (e.keyCode == 56) { //стрелка влево - код 37
        dx = -1;
    }
    if (e.keyCode == 59) { //стрелка вправо - код 39
        dx = 1;
    }
}

function redraw() {
    if (dx != 0 || dy != 0) {
        context.beginPath();
        context.fillStyle = "rgb(254, 244, 207)";
        context.rect(x, y, 15, 15);
        context.fill();

        x += dx;
        y += dy;

        if (checkCollisions()){
            x -= dy;
            y -= dy;
            dy = 0;
            dx = 0;
        }

        var imgFace = document.getElementById("face");
        context.drawImage(imgFace, x, y); //чтобы не создавалось много клонов значка при перемещении
    }
    timer = setTimeout("redraw()", 10);
}

function checkCollisions() {
    var imgData = context.getImageData(x-1, y-1, 15+2, 15+2);
    var pixels = imgData.data;

    for (var i = 0; n = pixels.length, i < n; i += 4) {
        var red = pixels[i];
        var green = pixels[i+1];
        var blue = pixels[i+2];

        if (red == 0 && green == 0 && blue == 0) {
            return true;
        }

        if (red == 170 && green == 170 && blue == 170) {
            return true;
        }
    }
    return false;
}