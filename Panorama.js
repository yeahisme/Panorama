function Panorama(options){
	this.options = {
			id:"",
			//width of canvas (px), the default value of 800
			canvasWidth:800,
			//height of canvas (px), the default value of 200
			canvasHeight:200,
			//refresh frequency, the default value of 30
			intervalTime:40,
			//Moving speed
			dx:1,
			direction:"ltr",
			//Image zoom, the default value of 1
			imageScale:1,
			//decide the value of cy,Optional:top,middle,bottom,
			verticalAlign:"middle",
		}
		this.control;
		//decide where to draw the picture, the default value of 0
		this.cx=0;
		//decide where to draw the picture, the default value of 0
		this.cy=0;
		//Used to clear canvas
		this.clearX;
		//Used to clear canvas
		this.clearY;
		//CanvasRenderingContext2D of canvas
		this.canvas = document.createElement("canvas")
		//解决 ie6-ie8 创建canvas标签 更正对canvas引用
		if (!document.addEventListener) {
			this.canvas = window.G_vmlCanvasManager.initElement(this.canvas);
		} 
		
		this.ctx = this.canvas.getContext('2d')
		//Combined with user provided options
		this.extend_options(options)
		this.oImg = document.getElementById(this.options.id)
		this.imgW = this.oImg.width*this.options.imageScale;
		this.imgH = this.oImg.height*this.options.imageScale;
		

		
		this.init()	
		
		var that = this
		return function(fn){
			if(that.destroy()){
				if(fn == undefined) return;
				if(that.isFunction(fn)){
					fn()
				}else{
					throw  "TypeError1";
				}
			}
		};	
	}
	Panorama.prototype.extend_options = function(options){
		for (name in options) {
			this.options[name] = options[name];
		}
	}
	Panorama.prototype.init = function(){
		var $this = this
		var alt = false;
		console.log($this)
		switch(this.options.direction){
			case "ltr":
			this.options.dx = Math.abs(this.options.dx);
			break;
			case "alternative":
			yyy($this);
			break;
			default:
			this.options.dx = -Math.abs(this.options.dx);
		}
		
		this.canvas.setAttribute("width",this.options.canvasWidth)
		this.canvas.setAttribute("height",this.options.canvasHeight)
		//this.oImg.parentNode.replaceChild(this.canvas,this.oImg)
		this.oImg.parentNode.appendChild(this.canvas)
		if (this.imgW > this.options.canvasWidth) { 
			this.cx = this.options.canvasWidth-this.imgW; 
		} // image larger than canvas
		if (this.imgW > this.options.canvasWidth) { 
			this.options.clearX = this.imgW; 
		} // image larger than canvas
		else {
			this.options.clearX = this.options.canvasWidth;
			console.log(this.options.clearX)
		}
		if (this.imgH > this.options.canvasHeight) {
			this.options.clearY = this.imgH;
		} // image larger than canvas
		else {
			this.options.clearY = this.options.canvasHeight;
		}
		
		
		
		switch(this.options.verticalAlign){
			case "top":
			this.cy = 0;
			break;
			case "middle":
			this.cy = (this.options.canvasHeight-this.imgH)/2;
			break;
			case "bottom":
			this.cy = (this.options.canvasHeight-this.imgH);
			break;
			default:
			this.cy = (this.options.canvasHeight-this.imgH)/2;
			break;
		}
		
		function yyy($this){
			setInterval(function(){
				$this.draw3()
			}, $this.options.intervalTime);
			alt = true;
		}
		if(alt){
			return;
		}else if(this.options.dx>0){
			setInterval(function(){
				$this.draw()
			}, this.options.intervalTime);
		}else{
			if (this.imgW <= this.options.canvasWidth) this.cx = this.options.canvasWidth-this.imgW;
			if (this.imgW >this.options.canvasWidth) this.cx = 0;
			setInterval(function(){
				$this.draw2()
			}, this.options.intervalTime);
		}
	}
	
	Panorama.prototype.draw = function() {
		//Clear Canvas
		this.ctx.clearRect(0,0,this.options.clearX,this.options.clearY);
		//If image is <= Canvas Size
		if (this.imgW <= this.options.canvasWidth) {
			//reset, start from beginning
			if (this.cx > (this.options.canvasWidth)) { this.cx = 0; }
			//draw aditional image
			
			if (this.cx > (this.options.canvasWidth-this.imgW)) { this.ctx.drawImage(this.oImg,this.cx-this.options.canvasWidth+1,this.cy,this.imgW,this.imgH); }
		}
		//If image is > Canvas Size
		else {
			//reset, start from beginning
			if (this.cx > (this.options.canvasWidth)) { this.cx = this.options.canvasWidth-this.imgW; }
			//draw aditional image
			if (this.cx > (this.options.canvasWidth-this.imgW)) { this.ctx.drawImage(this.oImg,this.cx-this.imgW+1,this.cy,this.imgW,this.imgH); }
			
		}
		
		//draw image
		this.ctx.drawImage(this.oImg,this.cx,this.cy,this.imgW,this.imgH);
		//amount to move
		this.cx += this.options.dx;
	}
	Panorama.prototype.draw2 =function() {
		//Clear Canvas
		this.ctx.clearRect(0,0,this.options.clearX,this.options.clearY);
		//If image is <= Canvas Size
		if (this.imgW <= this.options.canvasWidth) {
			//reset, start from beginning
			if (this.cx < -this.imgW) { this.cx = this.options.canvasWidth-this.imgW; }
			//draw aditional image
			
			if (this.cx <= 0) { this.ctx.drawImage(this.oImg,this.options.canvasWidth+this.imgW+this.cx-1,this.cy,this.imgW,this.imgH); }
		}
		//If image is > Canvas Size
		else {
			//reset, start from beginning
			if (this.cx < -this.imgW) { this.cx = 0 }
			//draw aditional image
			if (this.cx < (this.options.canvasWidth-this.imgW)) { this.ctx.drawImage(this.oImg,this.cx+this.imgW-1,this.cy,this.imgW,this.imgH); }
			
		}
		
		//draw image
		this.ctx.drawImage(this.oImg,this.cx,this.cy,this.imgW,this.imgH);
		//amount to move
		this.cx += this.options.dx;
	}
	Panorama.prototype.draw3 =function() {
		//Clear Canvas
		this.ctx.clearRect(0,0,this.options.clearX,this.options.clearY);
		//If image is <= Canvas Size
		if (this.imgW <= this.options.canvasWidth) {
			//reset, start from beginning
			if (this.cx < -this.imgW) { this.cx = this.options.canvasWidth-this.imgW; }
			//draw aditional image
			
			if (this.cx <= 0) { this.ctx.drawImage(this.oImg,this.options.canvasWidth+this.imgW+this.cx-1,this.cy,this.imgW,this.imgH); }
		}
		//If image is > Canvas Size
		else {
			//reset, start from beginning
			if (this.cx < -this.imgW+this.options.canvasWidth) {this.cx=-this.imgW+this.options.canvasWidth; this.options.dx*= -1 }
			//draw aditional image
			if (this.cx >0 ) {this.cx = 0;this.options.dx*= -1  }
			
		}
		
		//draw image
		this.ctx.drawImage(this.oImg,this.cx,this.cy,this.imgW,this.imgH);
		//amount to move
		this.cx += this.options.dx;
	}
	
	
	
	
	Panorama.prototype.destroy = function(){
		var _parentElement = this.canvas.parentNode;
		if(_parentElement){
			_parentElement.removeChild(this.canvas);
			return true;
         }
		 return false;
	}
	
	Panorama.prototype.isFunction = function(fn) {
		return Object.prototype.toString.call(fn)=== '[object Function]';
	}