var polygon = new Path.RegularPolygon(new Point(200, 300), 4, 100);
polygon.strokeColor = 'blue';
polygon.fullySelected = true;

var shapesArray = [];
shapesArray.push(polygon);

function splitShape(path1, path2){
    var shapesArrayCopy = path1.slice(0);
    shapesArray = [];
    for(var i = 0; i < shapesArrayCopy.length; i++){
        var intersections = shapesArrayCopy[i].getIntersections(path2);
        if(intersections.length >= 2){
            var p1 = shapesArrayCopy[i].split(shapesArrayCopy[i].getNearestLocation(intersections[0].point));
            var p2 = shapesArrayCopy[i].split(shapesArrayCopy[i].getNearestLocation(intersections[1].point));
            p1.closed = true;
            p2.closed = true;
            console.log(p1.position.x)
            console.log(p1.position.y)
            console.log(p2.position.x)
            console.log(p2.position.y)
            shapesArray.push(Object.assign(p1));
            shapesArray.push(Object.assign(p2));
            path2.visible = false;
        }
        else{
            shapesArray.push(shapesArrayCopy[i])
        }
    }
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