/* ----Функции-и-события---------------------------------------------- */

function Exit(){
    document.location.href = "/page/level.html"; //Переходим на страницу c игрой в соотвествии с уровнем
}

function SetCut(){
    localStorage.setItem('Mode', true);
    buttons[2].style.border = "0px solid white";
    buttons[1].style.border = "4px solid white";
}

function SetMove(){
    localStorage.setItem('Mode', false);
    buttons[1].style.border = "0px solid white";
    buttons[2].style.border = "4px solid white";
}

/* ----Смена-стилей---------------------------------------------- */

var color = localStorage.getItem('GameColor', color);

var gameRule = document.getElementsByClassName('game__rule');
gameRule[0].style.border = "6px solid " + color;
gameRule[1].style.border = "6px solid " + color;
gameRule[2].style.border = "6px solid " + color;
gameRule[3].style.border = "6px solid " + color;

var canvas = document.getElementsByClassName('canvas__class');
canvas[0].style.border = "6px solid " + color;

var buttons = document.getElementsByClassName('button');
buttons[0].style.backgroundColor = color;
buttons[1].style.backgroundColor = color;
buttons[1].style.border = "4px solid white";
buttons[2].style.backgroundColor = color;

var alertMessage = document.getElementsByClassName('game__popup_box');