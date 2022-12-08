/* ----Анимация заставки---------------------------------------------- */

var color = localStorage.getItem('GameColor', color); //Цвет игры

// Количество кружков, которое должно быть
var count = 100;

// Создаем элемент(символ), который мы будем использовать для размещения экземпляров позже
var path = new Path.Circle({
	center: [0, 0],
	radius: 10,
	fillColor: color,
	strokeColor: 'black'
});

var symbol = new Symbol(path);

// Создаем экземпляры кружков
for (var i = 0; i < count; i++) {
	// Центральное положение является случайной точкой в ​​представлении
	var center = Point.random() * view.size;
	var placedSymbol = symbol.place(center);
	placedSymbol.scale(i / count);
}

// Функция onFrame вызывается до 60 раз в секунду
function onFrame(event) {
	// Пройтись по списку дочерних элементов активного слоя 
	//и измените положение размещенных символов:
	for (var i = 0; i < count; i++) {
		var item = project.activeLayer.children[i];
		
		// Переместите элемент на 1/20 его ширины вправо. 
		//Таким образом, большие круги движутся быстрее, чем маленькие круги
		item.position.x += item.bounds.width / 20;

		// Если элемент покинул вид справа, переместите его обратно влево
		if (item.bounds.left > view.size.width) {
			item.position.x = -item.bounds.width;
		}
	}
}

/* ----Смена стилей---------------------------------------------- */

localStorage.setItem('GameColor', color);


