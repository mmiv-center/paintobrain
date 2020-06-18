// returns a function that calculates lanczos weight
function lanczosCreate(lobes) {
    return function(x) {
        if (x > lobes)
            return 0;
        x *= Math.PI;
        if (Math.abs(x) < 1e-16)
            return 1;
        var xx = x / lobes;
        return Math.sin(x) * Math.sin(xx) / x / xx;
    };
}

// elem: canvas element, img: image element, sx: scaled width, lobes: kernel radius
function thumbnailer(elem, img, sx, lobes) {
    this.canvas = elem;
    elem.width = img.width;
    elem.height = img.height;
    elem.style.display = "none";
    this.ctx = elem.getContext("2d");
    this.ctx.drawImage(img, 0, 0);
    this.img = img;
    this.src = this.ctx.getImageData(0, 0, img.width, img.height);
    this.dest = {
        width : sx,
        height : Math.round(img.height * sx / img.width),
    };
    this.dest.data = new Array(this.dest.width * this.dest.height * 3);
    this.lanczos = lanczosCreate(lobes);
    this.ratio = img.width / sx;
    this.rcp_ratio = 2 / this.ratio;
    this.range2 = Math.ceil(this.ratio * lobes / 2);
    this.cacheLanc = {};
    this.center = {};
    this.icenter = {};
    setTimeout(this.process1, 0, this, 0);
}

thumbnailer.prototype.process1 = function(self, u) {
    self.center.x = (u + 0.5) * self.ratio;
    self.icenter.x = Math.floor(self.center.x);
    for (var v = 0; v < self.dest.height; v++) {
        self.center.y = (v + 0.5) * self.ratio;
        self.icenter.y = Math.floor(self.center.y);
        var a, r, g, b;
        a = r = g = b = 0;
        for (var i = self.icenter.x - self.range2; i <= self.icenter.x + self.range2; i++) {
            if (i < 0 || i >= self.src.width)
                continue;
            var f_x = Math.floor(1000 * Math.abs(i - self.center.x));
            if (!self.cacheLanc[f_x])
                self.cacheLanc[f_x] = {};
            for (var j = self.icenter.y - self.range2; j <= self.icenter.y + self.range2; j++) {
                if (j < 0 || j >= self.src.height)
                    continue;
                var f_y = Math.floor(1000 * Math.abs(j - self.center.y));
                if (self.cacheLanc[f_x][f_y] == undefined)
                    self.cacheLanc[f_x][f_y] = self.lanczos(Math.sqrt(Math.pow(f_x * self.rcp_ratio, 2)
                            + Math.pow(f_y * self.rcp_ratio, 2)) / 1000);
                weight = self.cacheLanc[f_x][f_y];
                if (weight > 0) {
                    var idx = (j * self.src.width + i) * 4;
                    a += weight;
                    r += weight * self.src.data[idx];
                    g += weight * self.src.data[idx + 1];
                    b += weight * self.src.data[idx + 2];
                }
            }
        }
        var idx = (v * self.dest.width + u) * 3;
        self.dest.data[idx] = r / a;
        self.dest.data[idx + 1] = g / a;
        self.dest.data[idx + 2] = b / a;
    }

    if (++u < self.dest.width)
        setTimeout(self.process1, 0, self, u);
    else
        setTimeout(self.process2, 0, self);
};
thumbnailer.prototype.process2 = function(self) {
    self.canvas.width = self.dest.width;
    self.canvas.height = self.dest.height;
    self.ctx.drawImage(self.img, 0, 0, self.dest.width, self.dest.height);
    self.src = self.ctx.getImageData(0, 0, self.dest.width, self.dest.height);
    var idx, idx2;
    for (var i = 0; i < self.dest.width; i++) {
        for (var j = 0; j < self.dest.height; j++) {
            idx = (j * self.dest.width + i) * 3;
            idx2 = (j * self.dest.width + i) * 4;
            self.src.data[idx2] = self.dest.data[idx];
            self.src.data[idx2 + 1] = self.dest.data[idx + 1];
            self.src.data[idx2 + 2] = self.dest.data[idx + 2];
        }
    }
    self.ctx.putImageData(self.src, 0, 0);
    self.canvas.style.display = "block";
};









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
	// we should save a png as well to be able to load the image faster
	var canvas = document.getElementById("canvas");	
	var canvasData = canvas.toDataURL("image/png");
	
	jQuery.post('saveDrawing.php', { 'points': JSON.stringify(points), 'image': canvasData }, function() {
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
