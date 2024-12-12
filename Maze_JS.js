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


    drawMaze("maze1.png", 274, 5);

    window.onkeydown = processKey;

};

function drawMaze (mazeFile, startingX, startingY) {
    clearTimeout(timer);
    dx = 0;
    dy = 0;

    var imgMaze = new Image();
    imgMaze.onload=function () {
        canvas.width = imgMaze.width;
        canvas.height = imgMaze.height;
        context.drawImage(imgMaze, 0, 0);

        x = startingX;
        y = startingY;

        var imgFace = document.getElementById("face");
        context.drawImage (imgFace, x, y);
        context.stroke();

        timer = setTimeout (redraw, 10)


    };
    imgMaze.src = mazeFile;
}


function processKey(e) {
    dx = 0;
    dy = 0;

    context.beginPath();
    context.fillStyle = "rgb(254,244,207)";
    context.rect(x, y, 15, 15);
    context.fill();
    console.log(y + '-' + canvas.height);



    if (e.keyCode === 38) { //стрелка вверх - код 38
        dy = -3;
    }

    if (e.keyCode === 40) { //стрелка вниз - код 40
        dy = 3;
    }

    if (e.keyCode === 37) { //стрелка влево - код 37
        dx = -3;
    }

    if (e.keyCode === 39) { //стрелка вправо - код 39
        dx = 3;
    }
}

function redraw() {

    if (dx != 0 || dy != 0) {
        x += dx;
        y += dy;

        if (checkCollision()) {
            x -= dx;
            y -= dy;
            dx = 0;
            dy = 0;
        }

        var imgFace = document.getElementById("face");
        context.drawImage(imgFace, x, y); //чтобы не создавалось много клонов значка при перемещении
    }
    if (y>575) {
        alert("Ты победил! Молодец!");
        y = 5;
    }


    timer = setTimeout(redraw, 10);
}

function checkCollision() {
    var imgData = context.getImageData (x-1, y-1, 15+2, 15+2);
    var pixels = imgData.data;

    for (var i = 0; n = pixels.length, i < n; i += 4) {
        var red = pixels[i];
        var green = pixels[i+1];
        var blue = pixels[i+2];

        if (red == 0 && green == 0 && blue == 0) {
            return true;
        }
    }
    return false;
}