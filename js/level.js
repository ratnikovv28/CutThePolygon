/* ----Функции-и-события---------------------------------------------- */

function Exit(){
    document.location.href = "/index.html"; //Переходим на страницу заставки
}

function Scoreboard(){
    document.location.href = "/page/scoreboard.html"; //Переходим на страницу заставки
}

function GoToLevel1(){
    document.location.href = "/page/game.html"; //Переходим на страницу c игрой в соотвествии с уровнем
    localStorage.setItem('CurrentLevel', JSON.stringify(config[0]))
}

function GoToLevel2(){
    document.location.href = "/page/game.html"; //Переходим на страницу c игрой в соотвествии с уровнем
    localStorage.setItem('CurrentLevel', JSON.stringify(config[1]))
}

function GoToLevel3(){
    document.location.href = "/page/game.html"; //Переходим на страницу c игрой в соотвествии с уровнем
    localStorage.setItem('CurrentLevel', JSON.stringify(config[2]))
}

function GoToLevel4(){
    document.location.href = "/page/game.html"; //Переходим на страницу c игрой в соотвествии с уровнем
    localStorage.setItem('CurrentLevel', JSON.stringify(config[3]))
}

function GoToLevel5(){
    document.location.href = "/page/game.html"; //Переходим на страницу c игрой в соотвествии с уровнем
    localStorage.setItem('CurrentLevel', JSON.stringify(config[4]))
}

function GoToLevel6(){
    document.location.href = "/page/game.html"; //Переходим на страницу c игрой в соотвествии с уровнем
    localStorage.setItem('CurrentLevel', JSON.stringify(config[5]))
}

function GoToLevel7(){
    document.location.href = "/page/game.html"; //Переходим на страницу c игрой в соотвествии с уровнем
    localStorage.setItem('CurrentLevel', JSON.stringify(config[6]))
}

function GoToLevel8(){
    document.location.href = "/page/game.html"; //Переходим на страницу c игрой в соотвествии с уровнем
    localStorage.setItem('CurrentLevel', JSON.stringify(config[7]))
}

/* ----Смена-стилей---------------------------------------------- */

var color = localStorage.getItem('GameColor', color);

var gameName = document.getElementsByClassName('game__name');
gameName[0].style.color = color;
var levels = document.getElementsByClassName('levels');
levels[0].style.border = "10px solid " + color;
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

