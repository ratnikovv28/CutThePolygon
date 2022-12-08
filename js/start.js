/* ----Функции и события---------------------------------------------- */

function generateRandomColorHex() {
	return "#" + ("00000" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6);
}

var color = generateRandomColorHex();
localStorage.setItem('GameColor', color);

//Запуск игры
function StartGame(){
    // localStorage.clear()
    var nicknameText = document.getElementsByClassName('game__nickname')[0].value; //Имя пользователя из поля
    if(isEmpty(nicknameText)){
        swal({
            title:"Нужно ввести имя!"
        });
    }
    else{
        var playerData = localStorage.getItem(nicknameText); //Получение данных пользователя из LocalStorage
        if(playerData == null){ //Если данных нет, то создается стандартный шаблон уровней для пользователя
            var playerScore = {
                'Level1': 0,
                'Level2': 0,
                'Level3': 0,
                'Level4': 0,
                'Level5': 0,
                'Level6': 0,
                'Level7': 0,
                'Level8': 0
            };
            localStorage.setItem(nicknameText, JSON.stringify(playerScore)); //Загрузка данных о пользователе в LocalStorage
        }
        localStorage.setItem('CurrentPlayer', nicknameText);
        document.location.href = "/page/level.html"; //Переходим на страницу с выбором уровня
    }
}

//Событие нажатия кнопки "Enter"
var nickNameInput = document.getElementsByClassName('game__nickname')[0];
nickNameInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      StartGame();
    }
  });

//Проверяет пустая строка или нет
function isEmpty(str) { 
    return str.trim() == '';
}

/* ----Смена стилей---------------------------------------------- */


var gameTitle = document.getElementsByClassName('game__title');
gameTitle[0].style.border = "10px solid " + color;
var gameName = document.getElementsByClassName('game__name');
gameName[0].style.color = color;
var startButton = document.getElementsByClassName('start_game__button');
startButton[0].style.backgroundColor = color;
var nickname = document.getElementsByClassName('game__nickname');
nickname[0].style.border = "3px solid " + color;
nickname[0].style.color = color;