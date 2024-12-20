# 🎨Алгоритм создания лабиринта🎨

### Источник: 

1. видео "Уроки по JavaScript. Делаем игру Лабиринт на Джаваскрипт (Часть 1)" https://vk.com/im?sel=19460369&z=video-101965347_456257145%2F3a98a658af8e2e8fd2%2Fpl_post_-11899736_41573
2. видео "Уроки по JavaScript. Делаем игру Лабиринт на Джаваскрипт (Часть 2)" https://vk.com/im?sel=19460369&z=video-101965347_456257146%2Fc77544a46b5d11490b%2Fpl_post_-11899736_41573


![2024-12-12_23-28-30](https://github.com/user-attachments/assets/ad606e25-352e-4c88-abb3-b491a33fe3fc) ![2024-12-12_23-27-23](https://github.com/user-attachments/assets/e0b84889-798f-4b0d-b89b-7cce2031e147)

https://github.com/user-attachments/assets/8a01affb-5ce2-48ec-9f85-1130ef70eae6

1. создаем HTML, CSS, JS документ в программе "WebStorm" для работы с JavaScript (скачать бесплатную версию https://www.jetbrains.com/webstorm/)

2. объявляем Canvas в файле index.html

```html
<canvas id="Canvas"></canvas>
```

3. пишем стиль для Canvas в виде рамочки в файле Maze_CSS.css

```css
canvas{  
    border: 6px double black;  
    background: white;  
}
```

4. загружаем героя 

- в файле index.html

```html
<img id="face" src="face.png">
```

- в файле Maze_CSS.css

```css
img{  
    display: none;  
}
```

5. определяем глобальные переменные для холста и контекста в файле Maze_JS.js

```JavaScript
var canvas;  
var context;
```

6. готовим холст
7. загружаем сам лабиринт - генерация лабиринта (https://mazegenerator.net/)
	- создаем функцию, которая будет рисовать наш лабиринт
	
	```JavaScript
	var x = 0;  
	var y = 0;  
	
	window.onload = function() {  
 	canvas = document.getElementById("Canvas");  
 	context = canvas.getContext("2d");  
 	drawMaze("maze1.png", 274, 5);  
	};  
  
	function drawMaze(mazeFile, startingX, startingY) {
	}
	```
		
	- загружаем изображение лабиринта и изменяем размер холста в соответствии с размером изображения лабиринта
	
	```JavaScript
 	dx = 0;  
        dy = 0;  
	  
        var imgMaze = new Image();  
 	imgMaze.onload = function() {  
        canvas.width = imgMaze.width;  
        canvas.height = imgMaze.height;  
		  
        context.drawImage(imgMaze, 0, 0);  
		  
        x = startingX;  
        y = startingY;  
	
        };  
	```
	
	- рисуем лабиринт и значок
	
	```JavaScript
	var imgFace = document.getElementById("face");  
	        context.drawImage(imgFace, x, y);  
	        context.stroke();  
	imgMaze.src = mazeFile;  
	```
	
	- рисуем следующий кадр через 10 миллисекунд
	
	```JavaScript
	var timer; 
	clearTimeout(timer);  
	timer = setTimeout(redraw, 10);  
	```

8. делаем анимацию значка в файле Maze_JS.js
   
	- задаем начальную скорость перемещения значка
	
	```JavaScript
	var dx = 0;  
	var dy = 0;
	```
	
	- если значок при запуске находится в движении, останавливаем его
	
	```JavaScript
	function processKey(e) {  
 	dx = 0;  
	dy = 0;
 	}
	```
	
	- если нажата стрелка вверх, начинаем двигаться вверх 
		- смотрим "Коды символов и клавиш" на сайте jQuery (https://jquery.page2page.ru/index.php5/Коды_символов_и_клавиш#.D0.9A.D0.BE.D0.B4.D1.8B_.D0.BA.D0.BB.D0.B0.D0.B2.D0.B8.D1.88) 
		- ![2024-12-06_14-37-00](https://github.com/user-attachments/assets/94506065-184e-4c9c-8aad-e0f185bd25c0)
		- стрелка влево - код 37, стрелка вверх - код 38, стрелка вправо - код 39, стрелка вниз - код 40
		
		```JavaScript
		window.onkeydown = processKey;
		
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
		```
		
 9. отображаем изменения на холсте
     
       - обновляем кадр только если значок движется
	
       ```JavaScript
       x += dx;  
       y += dy;
       ```
	
       - закрашиваем перемещение значка желтым цветом
	
       ```JavaScript
       function redraw() {  
           if (dx != 0 || dy != 0) {  
               context.beginPath();  
               context.fillStyle = "rgb(254, 244, 207)";  
               context.rect(x, y, 15, 15);  
               context.fill();
               console.log(y + '-' + canvas.height);  
           }
        }
       ```
	
       - обновляем координаты значка, создавая перемещение
	
       ```JavaScript
       var imgFace = document.getElementById("face");  
       context.drawImage(imgFace, x, y);
	
       timer = setTimeout(redraw, 10);
       ```
	
       - проверка столкновения со стенками лабиринта
         
           - создаем отдельную функцию
		
           ```JavaScript
           function checkCollision() {}
           ```
		
           - перебираем все пикселы и "узнаем" их цвет
		
           ```JavaScript
           var imgData = context.getImageData(x-1, y-1, 15+2, 15+2);  
           var pixels = imgData.data;
           ```
		
           - получаем данные для одного пиксела
		
           ```JavaScript
           for (var i = 0; n=pixels.length, i < n; i+=4) {  
               var red = pixels[i];  
               var green = pixels[i+1];  
               var blue = pixels[i+2];
           }
           ```
		
           - смотрим на наличие черного цвета стены, что указывает на столкновение
		
           ```JavaScript
           if (red == 0 && green == 0 && blue == 0) {  
                   return true;  
           }      
           return false;
           ```

           - если столкновения не было - продолжаем движение
		
           ```JavaScript
           if (checkCollision()){  
           	x -= dx;  
           	y -= dy;  

           	dy = 0;  
           	dx = 0;  
           }
           ```
			
           - перерисовываем значок
             
           ```JavaScript
           var imgFace = document.getElementById("face");
           context.drawImage(imgFace, x, y); //чтобы не создавалось много клонов значка при перемещении
           ```
    
           - проверяем: дошел ли пользователь до финиша
             
           ```JavaScript
           if (y>575) {
           alert("Ты победил! Молодец!");
           y = 5;
           }
           ```
             
# Весь код по файлам:

1. index.html

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Лабиринт</title>
    <link rel="stylesheet" href="Maze_CSS.css">
</head>
<body>
<script src="Maze_JS.js"></script>
<canvas id="Canvas"></canvas>
<img id="face" src="face.png">
</body>
</html>
```

![2024-12-12_23-36-04](https://github.com/user-attachments/assets/3345c1c6-07ff-45a6-ab28-b65ba9a90e63)


2. Maze_CSS.css

```CSS
canvas{
    border: 6px double black;
    background: white;
}
img{
    display: none;
}
```

![2024-12-12_23-36-34](https://github.com/user-attachments/assets/204554b1-566b-438f-ba24-a64c4357847a)


3. Maze_JS.js

```JS
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
```

![2024-12-12_23-36-58](https://github.com/user-attachments/assets/bfef0a61-88c8-42a0-9aa6-3ee760ae91f6)
![2024-12-12_23-37-40](https://github.com/user-attachments/assets/0d6f1aa5-f904-4e33-9c1f-302f2e95e83a)
![2024-12-12_23-38-09](https://github.com/user-attachments/assets/15e8455d-bb53-45a1-af37-f830ad91da45)

