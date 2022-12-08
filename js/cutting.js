/* ----Settings---------------------------------------------- */

var rules = JSON.parse(localStorage.getItem('CurrentLevel'));
var currentLevel = rules.level;
var figure = rules.figure;
var figures = rules.figures;
var cutsCount = rules.cutsCount;
var timeLimit = rules.timeLimit;

swal("Задание", "Разрезать фигуру на " + figures + ", используя до " + cutsCount + " линий");

localStorage.setItem('Mode', true);

var cutsNow;
var figuresNow;

var gameCuts = document.getElementsByClassName('game__cuts')[0];
var gameFigures = document.getElementsByClassName('game__figure')[0]; 
var gameTime = document.getElementsByClassName('game__time')[0];
var gameBestScore = document.getElementsByClassName('game__best_score')[0];

var currentPlayer = localStorage.getItem('CurrentPlayer');
var currentPlayerScores = JSON.parse(localStorage.getItem(currentPlayer));
var bestScore;

switch(currentLevel){
    case 1:{
        bestScore = currentPlayerScores.Level1;
    }break
    case 2:{
        bestScore = currentPlayerScores.Level2;
    }break
    case 3:{
        bestScore = currentPlayerScores.Level3;
    }break
    case 4:{
        bestScore = currentPlayerScores.Level4;
    }break
    case 5:{
        bestScore = currentPlayerScores.Level5;
    }break
    case 6:{
        bestScore = currentPlayerScores.Level6;
    }break
    case 7:{
        bestScore = currentPlayerScores.Level7;
    }break
    case 8:{
        bestScore = currentPlayerScores.Level8;
    }break
}

/* ----Main-code---------------------------------------------- */

//Получаем середину canvas'а 
var canvas = document.getElementById('gameCanvas'); 
var startPointX = canvas.width / 2;
var startPointY = canvas.height / 2;

var polygon;
var shapesArray;
var flagCut;
var flagTimer;

function StartGame(){
    clearInterval(intervalId);
    cutsNow = 0;
    figuresNow = 0;
    flagCut = true;
    flagTimer = true;
    gameBestScore.textContent = "Best score: " + bestScore;
    gameCuts.textContent = "Cuts: " + cutsNow + "/" + cutsCount;
    gameTime.textContent = "Time: " + timeLimit + "s";
    //Создаем многоугольник
    polygon = new Path.RegularPolygon(new Point(startPointX, startPointY), figure, 150);
    polygon.strokeColor = 'white';
    polygon.strokeWidth = 6;
    shapesArray = [];
    shapesArray.push(polygon);
    figuresNow = shapesArray.length;
    gameFigures.textContent = "Figures: " + figuresNow + "/" + figures;
}

StartGame();

function splitShape(path1, path2){
    var shapesArrayCopy = path1.slice(0);
    shapesArray = [];
    var intersections;
    flagCut = true;
    for(var i = 0; i < shapesArrayCopy.length; i++){
        intersections = shapesArrayCopy[i].getIntersections(path2);
        if(intersections.length >= 2){
            if(flagCut == true){
                cutsNow += 1;
                gameCuts.textContent = "Cuts: " + cutsNow + "/" + cutsCount;
                flagCut = false;
            }
            if(flagTimer == true){
                startTimer(timeLimit);
                flagTimer = false;
            }
            var p1 = shapesArrayCopy[i].split(shapesArrayCopy[i].getNearestLocation(intersections[0].point));
            var p2 = shapesArrayCopy[i].split(shapesArrayCopy[i].getNearestLocation(intersections[1].point));
            
            p1.closed = true;
            p2.closed = true;
            p1.fillColor = "#" + Math.floor(Math.random()*16777215).toString(16);
            p2.fillColor = "#" + Math.floor(Math.random()*16777215).toString(16);
            shapesArray.push(Object.assign(p1));
            shapesArray.push(Object.assign(p2));
            path2.visible = false;
        }
        else{
            shapesArray.push(shapesArrayCopy[i])
        }
    }
    figuresNow = shapesArray.length;
    gameFigures.textContent = "Figures: " + figuresNow + "/" + figures;
    if(shapesArray.length == figures && cutsNow <= cutsCount){
        var score = SetScore();
        swal("Вы выиграли!", "Количество очков: " + score, "success");
        RemoveAllFigures();
        StartGame();
    }
    else if(shapesArray.length > figures){
        swal("Вы проиграли!", "Вы разрезали на большее количество фигур", "error");
        RemoveAllFigures();
        StartGame();
    }
    else if(cutsNow >= cutsCount){
        swal("Вы проиграли!", "Количество разрезов кончилось", "error");
        RemoveAllFigures();
        StartGame();
    }
}

var myPath;
var mode;
var segment, path;
var movePath = false;

var hitOptions = {
	segments: true,
	stroke: true,
	fill: true,
	tolerance: 5
};

function onMouseDown(event) {
    mode = JSON.parse(localStorage.getItem('Mode')) //cut or move
    if(mode === true){
        myPath = new Path();
        myPath.strokeColor = 'white';
        myPath.strokeWidth = 5;
        myPath.add(event.point);
        myPath.add(event.point);
    }
    else{
        segment = path = null;
        var hitResult = project.hitTest(event.point, hitOptions);
        if (!hitResult)
            return;

        if (hitResult) {
            path = hitResult.item;
        }
        movePath = hitResult.type == 'fill';
        if (movePath)
            project.activeLayer.addChild(hitResult.item);
        }
}

function onMouseDrag(event) {
    mode = JSON.parse(localStorage.getItem('Mode')) //cut or move
    if(mode == true){
        myPath.segments.pop(); 
	    myPath.add(event.point);
    }
    else{
        path.position += event.delta;
    }
}

function onMouseUp() {
    mode = JSON.parse(localStorage.getItem('Mode')) //cut or move
    if(mode == true){
        splitShape(shapesArray, myPath)
        myPath.visible = false;
    }
}

function onMouseMove(event) {
    mode = JSON.parse(localStorage.getItem('Mode')) //cut or move
    if(mode == true){

    }
    else{
        project.activeLayer.selected = false;
	    if (event.item)
		    event.item.selected = true;
    }
}

//Обратный отсчет времени
var intervalId;
var timer, seconds;
function startTimer(duration) {
    timer = duration;
    intervalId = setInterval(function () {
        if (--timer < 0) {
            swal("Вы проиграли!", "Время кончилось", "error");
            RemoveAllFigures();
            StartGame();
        }
        else{
            seconds = parseInt(timer % 60, 10);
            gameTime.textContent = "Time: " + seconds + "s";
        }
    }, 1000);
}

//Удаление всех сделанных фигур
function RemoveAllFigures() {
    var length = shapesArray.length;
    for(var i = 0; i < length; i++){
        var path = shapesArray.pop();
        path.remove();
    }
}

function SetScore(){
    var score;
    switch(currentLevel){
        case 1:{
            score = 50 - 12 * (timeLimit - timer) - 3.9 * cutsNow;
            currentPlayerScores.Level1 = score > currentPlayerScores.Level1 ? score : currentPlayerScores.Level1;
        }break
        case 2:{
            score = 50 - 4 * (timeLimit - timer) - 3.1 * cutsNow;
            currentPlayerScores.Level2 = score > currentPlayerScores.Level2 ? score : currentPlayerScores.Level2;
        }break
        case 3:{
            score = 50 - 1 * (timeLimit - timer) - 2.8 * cutsNow;
            currentPlayerScores.Level3 = score > currentPlayerScores.Level3 ? score : currentPlayerScores.Level3;
        }break
        case 4:{
            score = 50 - 3 * (timeLimit - timer) - 2.9 * cutsNow;
            currentPlayerScores.Level4 = score > currentPlayerScores.Level4 ? score : currentPlayerScores.Level4;
        }break
        case 5:{
            score = 50 - 2 * (timeLimit - timer) - 1.7 * cutsNow;
            currentPlayerScores.Level5 = score > currentPlayerScores.Level5 ? score : currentPlayerScores.Level5;
        }break
        case 6:{
            score = 50 - 0.5 * (timeLimit - timer) - 2.6 * cutsNow;
            currentPlayerScores.Level6 = score > currentPlayerScores.Level6 ? score : currentPlayerScores.Level6;
        }break
        case 7:{
            score = 50 - 3 * cutsNow;
            currentPlayerScores.Level7 = score > currentPlayerScores.Level7 ? score : currentPlayerScores.Level7;
        }break
        case 8:{
            score = 50 - 4.5 * cutsNow;
            currentPlayerScores.Level8 = score > currentPlayerScores.Level8 ? score : currentPlayerScores.Level8;
        }break
    }
    localStorage.setItem(currentPlayer, JSON.stringify(currentPlayerScores))
    console.log(timeLimit - timer)  
    return score; 
}

