/* ----Настройки---------------------------------------------- */

var color = generateRandomColorHex();
localStorage.setItem('GameColor', color);

var nickName = document.getElementById('game__nickname');

/* ----Функции-------------------------------------------------- */

//Генерация случайного цвета
function generateRandomColorHex() {
	return "#" + ("00000" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6);
}

//Запуск игры
function StartGame(){
    // localStorage.clear()
    var nicknameText = nickName.value; //Имя пользователя из поля

    if(isEmpty(nicknameText)){
        Swal.fire({
            title:"Нужно ввести имя!",
            confirmButtonColor: '#000000',
            background: color, 
            color: '#000000',
            heightAuto: false,
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

//Проверка на пустую строку
function isEmpty(str) { 
    return str.trim() == '';
}

/* ----События--------------------------------------------------- */

//Событие нажатия кнопки "Enter"
nickName.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      StartGame();
    }
});

/* ----Смена стилей---------------------------------------------- */

var gameTitle = document.getElementById('game__title');
gameTitle.style.border = "10px solid " + color;

var gameName = document.getElementById('game__name');
gameName.style.color = color;

var startButton = document.getElementById('start_game__button');
startButton.style.backgroundColor = color;

nickName.style.border = "3px solid " + color;
nickName.style.color = color;