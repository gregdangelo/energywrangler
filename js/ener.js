//ener.js
/*General JS Functions*/
Function.prototype.method = function (name, func){
	if(!this.prototype[name]){
		this.prototype[name] = func;
	}
};
/*Raphael extras*/
Raphael.fn.pieChart = function (cx, cy, r, values, labels, stroke) {
    var paper = this,
        rad = Math.PI / 180,
        chart = this.set();
    function sector(cx, cy, r, startAngle, endAngle, params) {
    //startAngle *= -1;
        console.log("startAngle:"+startAngle+",endAngle:"+ endAngle+",r:"+ r);
        /*
        endAngle = (endAngle+startAngle);
        console.log("startAngle:"+startAngle+",endAngle:"+ endAngle);
		*/
        console.log(params.fill);
        var x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);
            console.log("x1:"+x1+",y1:"+y1+",x2:"+x2+",y2:"+y2+",cx:"+cx+",cy:"+cy);
            console.log(+(endAngle - startAngle > 180));
        return paper.path(["M", cx, cy, "L",x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
    }
    var angle = 0,
        total = 0,
        start = 0,
        //TEXT removed becuase I don't want to tackle it yet
        process = function (j) {//I want to reverse my drawing direction and specifiy the starting point (this part can be done by specifiying Angle from the beginning
            var value = values[j],
                angleplus = 360 * value / total,
                popangle = angle + (angleplus / 2),
                color = Raphael.hsb(start, .75, 1),
                ms = 500,
                delta = 30,
                bcolor = Raphael.hsb(start, 1, 1),
                p = sector(cx, cy, r, angle, angle + angleplus, {fill: "90-" + bcolor + "-" + color, stroke: stroke, "stroke-width": 3});//,
                //txt = paper.text(cx + (r + delta + 55) * Math.cos(-popangle * rad), cy + (r + delta + 25) * Math.sin(-popangle * rad), labels[j]).attr({fill: bcolor, stroke: "none", opacity: 0, "font-size": 20});
            p.mouseover(function () {
                p.stop().animate({transform: "s1.1 1.1 " + cx + " " + cy}, ms, "elastic");
                //txt.stop().animate({opacity: 1}, ms, "elastic");
            }).mouseout(function () {
                p.stop().animate({transform: ""}, ms, "elastic");
                //txt.stop().animate({opacity: 0}, ms);
            });
            angle += angleplus;
            chart.push(p);
            //chart.push(txt);
            start += .1;
        };
    for (var i = 0, ii = values.length; i < ii; i++) {
        total += values[i];
    }
    for (i = 0; i < ii; i++) {
    	if(i>0){//let's strt fixing based on the first segment
    		console.info(i);
    		continue;
    	}
        process(i);
    }
    return chart;
};
/*
//Raphael extras -- Original
Raphael.fn.pieChart = function (cx, cy, r, values, labels, stroke) {
    var paper = this,
        rad = Math.PI / 180,
        chart = this.set();
    function sector(cx, cy, r, startAngle, endAngle, params) {
        console.log(params.fill);
        var x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);
        return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
    }
    var angle = 0,
        total = 0,
        start = 0,
        process = function (j) {
            var value = values[j],
                angleplus = 360 * value / total,
                popangle = angle + (angleplus / 2),
                color = Raphael.hsb(start, .75, 1),
                ms = 500,
                delta = 30,
                bcolor = Raphael.hsb(start, 1, 1),
                p = sector(cx, cy, r, angle, angle + angleplus, {fill: "90-" + bcolor + "-" + color, stroke: stroke, "stroke-width": 3}),
                txt = paper.text(cx + (r + delta + 55) * Math.cos(-popangle * rad), cy + (r + delta + 25) * Math.sin(-popangle * rad), labels[j]).attr({fill: bcolor, stroke: "none", opacity: 0, "font-size": 20});
            p.mouseover(function () {
                p.stop().animate({transform: "s1.1 1.1 " + cx + " " + cy}, ms, "elastic");
                txt.stop().animate({opacity: 1}, ms, "elastic");
            }).mouseout(function () {
                p.stop().animate({transform: ""}, ms, "elastic");
                txt.stop().animate({opacity: 0}, ms);
            });
            angle += angleplus;
            chart.push(p);
            chart.push(txt);
            start += .1;
        };
    for (var i = 0, ii = values.length; i < ii; i++) {
        total += values[i];
    }
    for (i = 0; i < ii; i++) {
        process(i);
    }
    return chart;
};
*/

/*Time of Use Circle thingy... this will be split into a model and view*/
var TimeOfUse = function(options){
	var that = {},r;
	function draw(){
		//initializeCanvas();
		if(Raphael){
			Raphael("holder", 700, 700).pieChart(350, 350, 200, values, labels, "#fff");
		}
		return that;
	}
	function setup(){
		values = [12,25,12,51];
		labels = ['midpeak1','peak','midpeak2','offpeak'];
	}
	function initializeCanvas(){
		r = Raphael(that.options.id,610,800);
	}
	that.init = function(){
		//Don't bother doing ANYTHING if Raphael doesn't exist
		if(!typeof Raphael === 'function'){
			return null;
		}
		//initialize();
		setup();
		draw();
		return this;
	};
	return that;
};
var tou = new TimeOfUse();
tou.init();

/*GEO*/
/*We will want to check the user's location to see if we have data available to them*/
if (window.navigator.geolocation) {
	// do some geolocation stuff
	console.log('Geo available');
	var successCallback = console.info;
	var errorCallback = console.warn;
	var options = {};
	// gets and logs geo
	navigator.geolocation.getCurrentPosition(successCallback, errorCallback,options);
} else {
	// the browser does not natively support geolocation
	console.log('Geo NOT available');
}
/*MVC*/
/*Models*/
/*
	Time of use aka energy rate
	Calculator	<- this could become pretty complex
	Appliances <- maybe this is just data
*/
/*Views*/
/*
	the Raphael bit needs to come down hither
*/
/*Controllers*/
/*
	what do I actually need here?  Lets build out our Models and Views first and then we'll have a better understanding
*/