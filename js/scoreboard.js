/* ----Настройки---------------------------------------------- */

var scoreboard = document.getElementById('scoreboard');

allStorage();

/* ----Функции---------------------------------------------------- */

//Переход на страницу с уровнями
function Exit(){
    document.location.href = "level.html"; 
}

//Получение и добавление информации о результатах игроков
function allStorage() {
    var keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        if(keys[i] != 'GameColor' && keys[i] != 'Mode' && keys[i] != 'CurrentLevel' && keys[i] != 'CurrentPlayer'){
            var playerScore = document.createElement("li");
            var scores = JSON.parse(localStorage.getItem(keys[i]));
            var sumScores = scores.Level1 + scores.Level2 + scores.Level3 + scores.Level4 + scores.Level5 + scores.Level6
                          + scores.Level7 + scores.Level8;
            playerScore.appendChild(document.createTextNode(keys[i] + " " + sumScores.toFixed(2)));
            scoreboard.appendChild(playerScore);
        }
    }
}

/* ----Смена-стилей---------------------------------------------- */

var color = localStorage.getItem('GameColor', color);

var gameName = document.getElementById('game__name');
gameName.style.color = color;

scoreboard.style.border = "7px solid " + color;
scoreboard.style.color = color;

var buttons = document.getElementById('button');
buttons.style.backgroundColor = color;