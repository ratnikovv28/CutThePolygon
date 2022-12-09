/* ----Настройки---------------------------------------------- */

// Получение информации из LocalStorage
var rules = JSON.parse(localStorage.getItem('CurrentLevel')); //правила текущего уровня
var currentPlayer = localStorage.getItem('CurrentPlayer'); //получение текущего игрока
var currentPlayerScores = JSON.parse(localStorage.getItem(currentPlayer)); //счет текущего игрока
var color = localStorage.getItem('GameColor', color);

var currentLevel = rules.level; //Номер текущего уровня
var figure = rules.figure; //Количество углов фигуры
var figures = rules.figures; //Количество фигур на которое нужно разрезать 
var cutsCount = rules.cutsCount; //Количество линий
var timeLimit = rules.timeLimit; //Ограничение по времени

//Отображение информации по уровню
Swal.fire({
            title: "Задание",
            text: "Разрезать фигуру на " + figures + 
            ", используя до " + cutsCount + " линий за " + timeLimit + " секунд",
            confirmButtonColor: '#000000',
            background: color, 
            color: '#000000',
            heightAuto: false
        }); 

//Устанавливается режим Mode = true, что означает разрезание фигур.
//Mode = false - передвижение фигур 
localStorage.setItem('Mode', true);

//Получение элементов со страницы
var gameCuts = document.getElementById('game__cuts');
var gameFigures = document.getElementById('game__figure'); 
var gameTime = document.getElementById('game__time');
var gameBestScore = document.getElementById('game__best_score');

var bestScore = GetBestScore(currentLevel); //лучший результат по уровню

//Получаем середину canvas'а 
var canvas = document.getElementById('gameCanvas'); 
var startPointX = canvas.width / 2;
var startPointY = canvas.height / 2;

var cutsNow, figuresNow, polygon, shapesArray,
    flagCut, flagTimer, intervalId, timer,
    seconds, myPath, mode, segment, path;
var movePath = false;

var hitOptions = {
	stroke: true,
	fill: true,
	tolerance: 5
};

StartGame();

/* ----Функции---------------------------------------------- */

//Установка результата для уровня
function SetScore(level){
    var score;
    switch(level){
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
    return score; 
}

//Установка лучшего результата для уровня
function GetBestScore(level){
    var score;
    switch(level){
        case 1:{
            score = currentPlayerScores.Level1;
        }break
        case 2:{
            score = currentPlayerScores.Level2;
        }break
        case 3:{
            score = currentPlayerScores.Level3;
        }break
        case 4:{
            score = currentPlayerScores.Level4;
        }break
        case 5:{
            score = currentPlayerScores.Level5;
        }break
        case 6:{
            score = currentPlayerScores.Level6;
        }break
        case 7:{
            score = currentPlayerScores.Level7;
        }break
        case 8:{
            score = currentPlayerScores.Level8;
        }break
    }
    return score;
}

//Удаление всех фигур
function RemoveAllFigures() {
    var length = shapesArray.length;
    for(var i = 0; i < length; i++){
        var path = shapesArray.pop();
        path.remove();
    }
}

//Обратный отсчет времени
function startTimer(duration) {
    timer = duration;
    intervalId = setInterval(function () {
        if (--timer < 0) {
            Swal.fire({
                title: "Вы проиграли!",
                text: "Время кончилось",
                icon: "error",
                confirmButtonColor: '#000000',
                background: color, 
                color: '#000000'
            });
            RemoveAllFigures();
            StartGame();
        }
        else{
            seconds = parseInt(timer % 60, 10);
            gameTime.textContent = "Time: " + seconds + "s";
        }
    }, 1000);
}

//Начало игры
function StartGame(){
    //Очистка интервала предыдущего вызова функции
    clearInterval(intervalId);  

    //Установка стартовых значений и настроек
    cutsNow = 0;
    figuresNow = 0;
    flagCut = true;
    flagTimer = true;
    bestScore = GetBestScore(currentLevel);

    //Создание многоугольника
    polygon = new Path.RegularPolygon(new Point(startPointX, startPointY), figure, 150);
    polygon.strokeColor = 'white';
    polygon.strokeWidth = 6;

    //Обнуление массива с фигурами
    shapesArray = [];
    shapesArray.push(polygon);
    figuresNow = shapesArray.length;

    //Установка визуального компонента страницы 
    gameFigures.textContent = "Figures: " + figuresNow + "/" + figures;
    gameBestScore.textContent = "Best score: " + bestScore;
    gameCuts.textContent = "Cuts: " + cutsNow + "/" + cutsCount;
    gameTime.textContent = "Time: " + timeLimit + "s";
}

//Разделение фигур
function splitShape(path1, path2){
    var shapesArrayCopy = path1.slice(0); //дублированный массив с фигурами
    shapesArray = []; //обнуления основного массива с фигурами
    var intersections; //переменная для пересечений
    flagCut = true; //флаг разрезания
    for(var i = 0; i < shapesArrayCopy.length; i++){
        intersections = shapesArrayCopy[i].getIntersections(path2);
        
        //если больше двух пересечений, то линия пересекает фигуру 
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
            shapesArray.push(p1);
            shapesArray.push(p2);
            path2.visible = false;
        }
        else{
            shapesArray.push(shapesArrayCopy[i])
        }
    }

    figuresNow = shapesArray.length;
    gameFigures.textContent = "Figures: " + figuresNow + "/" + figures;

    if(shapesArray.length == figures && cutsNow <= cutsCount){
        bestScore = SetScore(currentLevel);
        Swal.fire({
            title: "Вы выиграли!",
            text: "Количество очков: " + bestScore,
            icon: "success",
            confirmButtonColor: '#000000',
            background: color, 
            color: '#000000',
            heightAuto: false
        });
        RemoveAllFigures();
        StartGame();
    }
    else if(shapesArray.length > figures){
        Swal.fire({
            title: "Вы проиграли!",
            text: "Вы разрезали на большее количество фигур",
            icon: "error",
            confirmButtonColor: '#000000',
            background: color, 
            color: '#000000',
            heightAuto: false
        });
        RemoveAllFigures();
        StartGame();
    }
    else if(cutsNow >= cutsCount){
        Swal.fire({
            title: "Вы проиграли!",
            text: "Количество разрезов кончилось",
            icon: "error",
            confirmButtonColor: '#000000',
            background: color, 
            color: '#000000',
            heightAuto: false
        });
        RemoveAllFigures();
        StartGame();
    }
}

/* ----События---------------------------------------------- */

//Событие нажатия кнопки мыши
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

//Событие перетаскивания
function onMouseDrag(event) {
    mode = JSON.parse(localStorage.getItem('Mode')) //cut or move
    if(mode == true){
        myPath.segments.pop(); 
	    myPath.add(event.point);
    }
    else{
        if(path != null){
            path.position += event.delta;
        }
    }
}

//Событие поднятия кнопки мыши
function onMouseUp() {
    mode = JSON.parse(localStorage.getItem('Mode')) //cut or move
    if(mode == true){
        splitShape(shapesArray, myPath)
        myPath.visible = false;
    }
}

//Событие перемещение мыши
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