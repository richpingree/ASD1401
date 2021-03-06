var obj = {
	name : "Rectangle",
	length : 4,
	width : 5,
	area : function() {
		return obj.length * obj.width;
	},
	announce : function() {
		return 'I am a ' + this.name + '.\nMy length is ' + this.length + '.\nMy width is ' + this.width + '.\nAnd I have an area of ' + this.area() + '.';
	}
};

var obj1 = {
	name : "Circle",
	radius : 4,
	area : function() {
		return 3.14 * (obj1.radius * obj1.radius);
	},
	announce : function() {
		return 'I am a ' + this.name + '.\nMy radius is ' + this.radius + '.\nAnd I have an area of ' + this.area() + '.';
	}
};

var obj2 = {
	name : "Triangle",
	base : 6,
	height : 4,
	area : function() {
		return obj2.base * obj2.height;
	},
	announce : function() {
		return 'I am a ' + this.name + '.\nMy base is ' + this.base + '.\nMy height is ' + this.height + '.\nAnd I have an area of ' + this.area() + '.';
	}
};

var obj3 = {
	name : "Square",
	side : 4,
	area : function() {
		return obj3.side * obj3.side;
	},
	announce : function() {
		return 'I am a ' + this.name + '.\nMy side length is ' + this.side + '.\nAnd I have an area of ' + this.area() + '.';
	}
};

var obj4 = {
	name : "Parallelogram",
	base : 6,
	height : 4,
	area : function() {
		return obj4.base * obj4.height;
	},
	announce : function() {
		return 'I am a ' + this.name + '.\nMy base is ' + this.base + '.\nMy height is ' + this.height + '.\nAnd I have an area of ' + this.area() + '.';
	}
};

var obj5 = new Object();
obj5.name = "Trapezoid";
obj5.top = 4;
obj5.bottom = 6;
obj5.height = 3;
obj5.area = function(){
	return ((obj5.top + obj5.bottom)/2) * obj5.height;
};
obj5.announce =function() {
	return 'I am a ' + obj5.name + '.\nMy top length is ' + obj5.top + '.\nMy bottom lenght is ' + obj5.bottom + '.\nMy height is ' + obj5.height + '.\nAnd I have an area of ' + obj5.area() + '.';
};

var obj6 = new Object();
obj6.name = "Ellipse";
obj6.height = 4;
obj6.width = 8;
obj6.area = function(){
	return 3.14 * (obj6.height/2) * (obj6.width/2);
};
obj6.announce =function() {
	return 'I am an' + obj6.name + '.\nMy height is ' + obj6.height + '.\nMy width is ' + obj6.width + '.\nAnd I have an area of ' + obj6.area() + '.';
};

var obj7 = new Object();
obj7.name = "Cube";
obj7.side = 4;
obj7.volume = function(){
	return obj7.side * obj7.side * obj7.side;
};
obj7.announce =function() {
	return 'I am a ' + obj7.name + '.\nMy sides are ' + obj7.side + '.\nAnd I have an volume of ' + obj7.volume() + '.';
};

var obj8 = new Object();
obj8.name = "Cylinder";
obj8.radius = 4;
obj8.height = 6;
obj8.volume = function(){
	return 3.14 * (obj8.radius * obj8.radius) * obj8.height;
};
obj8.announce =function() {
	return 'I am a ' + obj8.name + '.\nMy radius is ' + obj8.radius + '.\nMy height is ' + obj8.height + '.\nAnd I have an volume of ' + obj8.volume() + '.';
};

var obj9 = new Object();
obj9.name = "Pyramid";
obj9.base = 2;
obj9.height = 5;
obj9.volume = function(){
	return (1/3) * (obj9.base * obj9.base) * obj9.height;
};
obj9.announce =function() {
	return 'I am a ' + obj9.name + '.\nMy base is ' + obj9.base + '.\nMy height is ' + obj9.height + '.\nAnd I have an volume of ' + obj9.volume() + '.';
};

var myArray = [obj, obj1, obj2, obj3, obj4, obj5, obj6, obj7, obj8, obj9];

exports.data = myArray;
