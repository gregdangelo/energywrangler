//ener.js
/*General JS Functions*/
Function.prototype.method = function (name, func){
	if(!this.prototype[name]){
		this.prototype[name] = func;
	}
};
/*Raphael extras... ugh this things still looks like poopish*/
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
    var angle = 0-180,
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
                p = sector(cx, cy, r, angle+(Math.floor((angle - angleplus)/-360)*180), (angle - angleplus)+(Math.floor((angle - angleplus)/-360)*180) , {fill: "90-" + bcolor + "-" + color, stroke: stroke, "stroke-width": 3});//,
                console.info("angleplus");
                console.log(angleplus);
                console.log(angle);
                console.log(angle - angleplus);
				console.log(Math.abs(angle - angleplus)>360 ? Math.floor((angle - angleplus)/-360)*360:(angle - angleplus));
                console.log(Math.floor((angle - angleplus)/-360));

                //txt = paper.text(cx + (r + delta + 55) * Math.cos(-popangle * rad), cy + (r + delta + 25) * Math.sin(-popangle * rad), labels[j]).attr({fill: bcolor, stroke: "none", opacity: 0, "font-size": 20});
            p.mouseover(function () {
                p.stop().animate({transform: "s1.1 1.1 " + cx + " " + cy}, ms, "elastic");
                //txt.stop().animate({opacity: 1}, ms, "elastic");
            }).mouseout(function () {
                p.stop().animate({transform: ""}, ms, "elastic");
                //txt.stop().animate({opacity: 0}, ms);
            });
            angle -= angleplus;// +(Math.floor((angle - angleplus)/-360)*180);
            console.log(angle);
            chart.push(p);
            //chart.push(txt);
            start += .1;
        };
    for (var i = 0, ii = values.length; i < ii; i++) {
        total += values[i];
    }
    for (i = 0; i < ii; i++) {
    	if(i>3){//let's strt fixing based on the first segment
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
//tou.init();

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
if(onVals){//ok we have our ontario values now what?
	//just output the values
	console.log(onVals);
	//ok determine what time it is
	//hour(0-23) - month(0-11) - day(1-31) - weekday(0-6)
	var currentDateTime = (function(){
		var d = new Date();
		return {
			'hour':d.getHours()
			,'month':d.getMonth()
			,'day':d.getDate()
			,'weekday':d.getDay()
		}
	})();
	console.log(currentDateTime);
	//now that we know the time determine what season we are in... or maybe check if we are on a holiday
	//ask server... is today a holiday?
	$holiday = false;
	//ask server... is today a weekend?
	$weekend = false;
	//ask server... then what season are we in winter or summer?
	$season = 'winter';// || 'summer'
	var flags = {
		'SEASN':0x8 //Season Rates (1 for Summer, 0 for Winter)
		,'HLDY':0x4 //Holiday Rates
		,'WKND':0x2 //Weekend rates
		,'BLEND':0x1 //blended rate means we ignore everything else
	};
	/*
	bits
		1)flat/blended rate 0001
		2)weekend 0010
		3)holiday 0100
		4)season 1000 (summer)
		0111
		0110
		0100
		0101
		0001
		0011
		0000
		0010
	*/
}