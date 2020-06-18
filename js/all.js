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

function handleMouseDown(e) {
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();
    // get current mouse position
    ctx.lineWidth=7;
    ctx.strokeStyle=color;
    // points.length=0;
    // in case we have touch we have to use different access to fingers
    var mouseX, mouseY;
    if (e.touches != undefined && e.touches.length > 0) {
	mouseX = parseInt(e.touches[0].clientX-offsetX);
	mouseY = parseInt(e.touches[0].clientY-offsetY);
    } else {
	mouseX=parseInt(e.clientX-offsetX);
	mouseY=parseInt(e.clientY-offsetY);
    }
    l = points.length;
    points.push({p: [{ x:mouseX, y:mouseY }], c:color});
    // Set dragging flag
    isDown=true;
}

function handleMouseUpOut(e){
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();
    // get current mouse position 
    if (e.touches != undefined && e.touches.length > 0) {
	mouseX = parseInt(e.touches[0].clientX-offsetX);
	mouseY = parseInt(e.touches[0].clientY-offsetY);
    } else {
	mouseX=parseInt(e.clientX-offsetX);
	mouseY=parseInt(e.clientY-offsetY);
    }
   
  //mouseX=parseInt(e.clientX-offsetX);
  //mouseY=parseInt(e.clientY-offsetY);
  // Clear dragging flag
  isDown=false;
}

function handleMouseMove(e){
    if(!isDown){return;}
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();
    // get current mouse position
    if (e.touches != undefined && e.touches.length > 0) {
	mouseX = parseInt(e.touches[0].clientX-offsetX);
	mouseY = parseInt(e.touches[0].clientY-offsetY);
    } else {
	mouseX=parseInt(e.clientX-offsetX);
	mouseY=parseInt(e.clientY-offsetY);
    }
    //mouseX=parseInt(e.clientX-offsetX);
    //mouseY=parseInt(e.clientY-offsetY);
    points[points.length-1].p.push({x:mouseX,y:mouseY});
    var n=points[points.length-1].p.length-1;
    lineSegment(points[points.length-1].p[n-1],points[points.length-1].p[n]);
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

var ctx;
var offsetX,offsetY;
jQuery(document).ready(function() {
    console.log("start...");
    //jQuery('#canvas').width(jQuery('#content').width());
    //jQuery('#canvas').height(jQuery('#content').innerHeight);
    jQuery('#canvas')[0].getContext('2d');

    // we have to track mouse movements on the canvas object
    // store them locally and upload once we are done
    var canvas=document.getElementById("canvas");
    ctx=canvas.getContext("2d");
    ctx.lineCap='round';
    var cw=canvas.width;
    var ch=canvas.height;
    function reOffset(){
	var BB=canvas.getBoundingClientRect();
	offsetX=BB.left;
	offsetY=BB.top;        
    }
    reOffset();
    window.onscroll=function(e){ reOffset(); }
    window.onresize=function(e){ reOffset(); }
    
    //$("#canvas").mousedown(function(e){handleMouseDown(e);});
    //$("#canvas").mousemove(function(e){handleMouseMove(e);});
    $("#canvas").mouseup(function(e){handleMouseUpOut(e);});
    $("#canvas").mouseout(function(e){handleMouseUpOut(e);});

    $("#canvas").on("mousedown touchstart", function(e){
	jQuery('#message').children().remove();
	jQuery('#message').append("<span>touchdown</span>");
	handleMouseDown(e);
    });
    $("#canvas").on("mousemove touchmove", function(e){
	jQuery('#message').children().remove();
	jQuery('#message').append("<span>touchmove</span>");
	handleMouseMove(e);
    });
    $("#canvas").on('touchend', function(e){
	jQuery('#message').children().remove();
	jQuery('#message').append("<span>touchend</span>");
	handleMouseUpOut(e);
    });

    
    //$('#fast').on('click',function(){ duration=1000/60; beginRedrawing(); });
    //$('#slow').on('click',function(){ duration=1000/15; beginRedrawing(); });
    
    jQuery(window).on('resize', function() {
	jQuery('#canvas').attr('width', jQuery('#content').width());
	jQuery('#canvas').attr('height',jQuery('#content').height());
	duration=1000/60; beginRedrawing();
    });

    jQuery('a.clear-drawing').on('click', function() {
	// we record everythign in the points array
	points = [];
	var canvas = document.getElementById("canvas");	
	canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    });

    jQuery('a').on('click', function() {
	var c = jQuery(this).attr('color');
	if (c !== undefined) {
	    color = c;
	    jQuery('a').removeClass('active');
	    jQuery(this).addClass('active');
	}
    });

    jQuery("a.save-drawing").on('click', function() {
	jQuery.post('saveDrawing.php', { 'points': JSON.stringify(points) }, function() {
	    console.log('done...');
	    // should clean the display now, or say thanks!
	    alert("Thank you for sumitting your image, we will show all of those on the gallery page!");
	    // we record everythign in the points array
	    points = [];
	    var canvas = document.getElementById("canvas");	
	    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);	    
	});
    });
});
