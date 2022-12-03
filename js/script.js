var polygon = new Path.RegularPolygon(new Point(200, 300), Math.floor(Math.random()*10), 150);
polygon.strokeColor = 'black';
polygon.fillColor = 'white';

var shapesArray = [];
shapesArray.push(polygon);

var count = document.getElementsByClassName('count');

function splitShape(path1, path2){
    var shapesArrayCopy = path1.slice(0);
    shapesArray = [];
    var dividePath;
    var intersections;
    for(var i = 0; i < shapesArrayCopy.length; i++){
        intersections = shapesArrayCopy[i].getIntersections(path2);
        if(intersections.length >= 2){
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
    vectors(shapesArray);
    count[0].innerHTML = shapesArray.length;
}

var myPath;

function onMouseDown(event) {
	myPath = new Path();
	myPath.strokeColor = 'black';
	myPath.add(event.point);
    myPath.add(event.point);
}

function onMouseDrag(event) {
    myPath.segments.pop(); 
	myPath.add(event.point);
}

function onMouseUp(event) {
    splitShape(shapesArray, myPath)
    myPath.visible = false;
}