var scoreboard = document.getElementsByClassName('scoreboard')[0];

console.log('Test')
allStorage();


/* ----Функции-и-события---------------------------------------------- */

function Exit(){
    document.location.href = "/page/level.html"; //Переходим на страницу заставки
}

function allStorage() {

    var archive = {}, 
        keys = Object.keys(localStorage),
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

    return archive;
}

/* ----Смена-стилей---------------------------------------------- */

var color = localStorage.getItem('GameColor', color);

var gameName = document.getElementsByClassName('game__name');
gameName[0].style.color = color;

scoreboard.style.border = "7px solid " + color;
scoreboard.style.color = color;

var buttons = document.getElementsByClassName('button');
buttons[0].style.backgroundColor = color;