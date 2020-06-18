
var isDown=false;
var points=[]; // line segments
var nextTime=0;
var nextN=0;
var duration=1000/60; // playback speed
var color = "orange"; // start color
var totalLength = 0;

function beginRedrawing(){
    totalLength = 0;
    points.map(function(a,b) {
	totalLength += a.p.length;
    });
    if (totalLength<2) {
	return;
    }
    nextN=1;
    ctx.lineWidth=3;
    ctx.strokeStyle=randomColor();
    requestAnimationFrame(redraw);
}

function lineSegment(p0,p1,c) {
    var tmp_c = ctx.strokeStyle;
    if (c != 'undefined') {
	ctx.strokeStyle = c;
    } else {
	ctx.strokeStyle = color;
    }
    ctx.beginPath();
    ctx.moveTo(p0.x,p0.y);
    ctx.lineTo(p1.x,p1.y);
    ctx.stroke();
    ctx.strokeStyle = tmp_c;
}

function redraw(time){
    if (nextN>totalLength){
	return;
    }
    if (time<nextTime) {
	requestAnimationFrame(redraw);
	return;
    }
    // what is the current color?
    c = 0;
    current_line = -1;
    current_point = 0;
    current_color = "orange";
    for (var i = 0; i < points.length; i++) {
	c += points[i].p.length;
	if (nextN < c) {
	    current_line = i;
	    current_color = points[i].c;
	    d = c - points[i].p.length; // undo the addition, find out what the real position is
	    current_point = (nextN - d);
	    if (current_point == 0)
		current_point = 1;
	    break;
	}
    }
    if (current_line == -1) {
	console.log('something went wrong...');
    }
    
    nextTime=time+duration;
    //color = current_color;
    lineSegment(points[current_line].p[current_point-1],points[current_line].p[current_point], current_color);
    nextN++;
    requestAnimationFrame(redraw);
}

function randomColor(){
    return color;
//  return('#'+Math.floor(Math.random()*16777215).toString(16));
}

function startPlayback(file, d) {
    jQuery.getJSON('pullImage.php', { 'image': file }, function(data) {
	points = data;
	beginRedrawing(d);
    });
}

jQuery(document).ready(function() {

    jQuery.getJSON("getListOfImages.php", function(data) {
	// add an entry for each
	for (var i = 0; i < data.length; i++) {
	    jQuery('#content').append("<div class='image' id='" + data[i] + "'></div>");
	    startPlayback(data[i], '#'+data[i]);
	}
    });
    
});
