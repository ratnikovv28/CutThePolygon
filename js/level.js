/* ----Функции----------------------------------------------------- */

//Переход на страницу с заставкой
function Exit(){
    document.location.href = "../index.html"; //Переходим на страницу заставки
}

//Переход на страницу с результатами
function Scoreboard(){
    document.location.href = "scoreboard.html"; //Переходим на страницу заставки
}

//Переход на уровень
function GoToLevel(value){
    document.location.href = "game.html"; //Переходим на страницу c игрой в соотвествии с уровнем
    localStorage.setItem('CurrentLevel', JSON.stringify(config[value - 1])) //Устанавливется текущий уровень в LocalStorage
}

/* ----Смена-стилей---------------------------------------------- */

var color = localStorage.getItem('GameColor', color);

var gameName = document.getElementById('game__name');
gameName.style.color = color;

var levels = document.getElementById('levels');
levels.style.border = "10px solid " + color;

var buttons = document.getElementsByClassName('button');
buttons[0].style.backgroundColor = color;
buttons[1].style.backgroundColor = color;

var level = document.getElementsByClassName('level');
for(var i = 0; i < level.length; i++){
    level[i].style.border = "5px solid " + color;
}

var levelNumber = document.getElementsByClassName('level__number');
for(var i = 0; i < levelNumber.length; i++){
    levelNumber[i].style.color = color;
}

