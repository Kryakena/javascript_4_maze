var canvas;
var context;

var x = 0;
var y = 0;

var timer;

window.onload = function() {
    canvas = document.getElementById("Canvas");
    context = canvas.getContext("2d");
    drawMaze("maze1.jpg", 265, 5)

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