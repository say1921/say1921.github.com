function initPage()   //首页加载
{   
	 var oLoad = document.getElementById('loading');
  		 
} 

window.onload = function(){
	initPage();
	var oPage_wrap = getByClass(document,'page_wrap')[0];
	var oPage = document.getElementsByClassName('page')
	var oLogo_menu = getByClass(document,'logo_menu')[0];
	var oLogo_menu_Btn = getByClass(oLogo_menu,'btn')[0];
	var oMenu = getByClass(document,'menu')[0];
	var oMain_container = getByClass(document,'main_container')[0];
	var oClose_menu = getByClass(document,'close_menu')[0];
	var oMenu_ali = oMenu.getElementsByTagName('li');
	var oAbout = getByClass(document,'p_about')[0];
	var aitem = getByClass(oAbout,'item');
	var aitem1 = getByClass(oAbout,'item1');
	var clientH = document.documentElement.clientHeight|| document.body.clientHeight;
	var about_more = document.getElementById('about_more');
	var about_big = document.getElementById('about_big');
	var about_close = document.getElementById('about-close')
	var timer = null;
	var cur = 0;
	var bClick = false; 
	
	
	//menu 显示隐藏//从左侧菜单移出时消失
	/*oMenu.onmouseout = function(e){
		var oEvt  = e||event;
		oTo = oEvt.toElement || oEvt.relatedTarget;
		if(oMenu.contains(oTo)) return
		move(oMenu,{right:-100},{easing:Tween.Expo.easeOut,duration:700})	
		move(oMain_container,{left:0},{easing:Tween.Expo.easeOut,duration:600})	
		bClick = false	;	
	}*/
	
	document.onclick = function(e){
		move(oMenu,{right:-100},{easing:Tween.Expo.easeOut,duration:700});	
		move(oMain_container,{left:0},{easing:Tween.Expo.easeOut,duration:600});
		bClick = false	;	
	}
	//右侧菜单的关闭效果
	oClose_menu.onclick = oLogo_menu_Btn.onclick = function(e){
		var oEvt  = e||event;
		oEvt.cancelBubble =  true;
		if(!bClick){
			move(oMenu,{right:0},{easing:Tween.Expo.easeOut,duration:700})
			move(oMain_container,{left:-oMenu.offsetWidth},{easing:Tween.Expo.easeOut,duration:600})
			bClick = true;	
		}else{
			move(oMenu,{right:-100},{easing:Tween.Expo.easeOut,duration:700})	
			move(oMain_container,{left:0},{easing:Tween.Expo.easeOut,duration:600})	
			bClick = false	;
		}	
	};
	
	/////
	for(var i = 0; i< aitem.length ; i++){
		if(aitem[i].getAttribute('class')  == 'item avatar'  || 
		   aitem[i].getAttribute('class')  == 'item on') continue;
		lagou(aitem[i])	;	
	}
	
	//menu内部li点击
	for(var i = 0 ; i<oPage.length ; i++){
		move(oPage[i],{height: Math.floor(clientH *  0.75)},{easing:Tween.Quint.easeIn,duration:250})
	}
	//翻页
	for(var i=0; i<oMenu_ali.length ;i ++){
		(function(index){
			oMenu_ali[i].onclick = function(){
				for(var i=0; i<oMenu_ali.length ;i ++){
					oMenu_ali[i].className = ''
				}
				this.className  = 'cur'
				move(oPage_wrap,{top:-index*(oPage[0].offsetHeight)},{easing:Tween.Quint.easeIn,duration:400})
				cur = index;	
			};
		})(i)
	}
	
	//about_more
	//第一屏左侧详细介绍的左侧显示隐藏
	var bmore = false;
	about_close.onclick = about_more.onclick = function(){
		if(!bmore){
			move(about_big,{marginLeft:0},{easing:Tween.Expo.easeOut,duration:700})	
			bmore = true;		
		}else{
			move(about_big,{marginLeft:-600},{easing:Tween.Expo.easeOut,duration:700})
			bmore = false;
		}
	};

	//判断浏览器高度
	function setSize(){
		clientH = document.documentElement.clientHeight|| document.body.clientHeight;
		move(oPage_wrap,{height:clientH * 3},{easing:Tween.Expo.easeOut,duration:200})
		move(oPage[cur],{height:Math.floor(clientH *  0.75)},{easing:Tween.Expo.easeOut,duration:250})		
	};
	
	//窗口改变
	
	window.onresize = function(){
		setSize();
		/*clearTimeout(timer);
		timer = setTimeout(function(){
			for(var i = 0 ; i <oMenu_ali.length ; i++){
				move(oPage_wrap,{top:-cur*oPage[0].offsetHeight})
					//oPage_wrap.style.top = -cur*oPage[1].offsetHeight + 'px'
			}
		},251);	*/
	};
//lagou效果
	function lagou(obj){
		obj.onmouseover = function (e){
			
			var oSpan =this.children[0];
			var oEvent = e||event;
			var x = oEvent.clientX - getPos(obj).left - obj.offsetWidth/2;
			var y = getPos(obj).top + obj.offsetHeight/2 - oEvent.clientY;
			n = Math.round((Math.atan2(y,x)*180/Math.PI +180)/90)%4; 

			var oFrom = oEvent.fromElement || oEvent.relatedTarget;
			if(obj.contains(oFrom)){
				return;
			}

			switch(n){
				case 0:// 0 左
					oSpan.style.left = -obj.offsetWidth +'px';
					oSpan.style.top  = "0";
					break;
				case 1:// 1 下
					oSpan.style.left = "0";
					oSpan.style.top  =  obj.offsetHeight +'px';
					break;
				case 2:// 2 右
					oSpan.style.left = obj.offsetWidth +'px';
					oSpan.style.top  = "0";
					break;
				case 3:// 3 上
					oSpan.style.left = "0";
					oSpan.style.top  = -obj.offsetHeight +'px';
			}/* end switch */
			move(oSpan,{left:0 ,top :0},{easing:Tween.Quad.easeOut,duration:500})
			var oInner = obj.children[1];
			oInner.className = 'cur item_inner'	
		
		}
		
		obj.onmouseout = function (e){
			var oSpan =this.children[0];
			var oEvent = e||event;
			
			var x = oEvent.clientX - getPos(obj).left - obj.offsetWidth/2;
			var y = getPos(obj).top + obj.offsetHeight/2 - oEvent.clientY;
			n = Math.round((Math.atan2(y,x)*180/Math.PI +180)/90)%4; 
			
			var oTo = oEvent.toElement || oEvent.relatedTarget;
			if(obj.contains(oTo)){
				return;
			}
		
			switch(n){
				case 0:// 0 左
					move(oSpan,{left:-obj.offsetWidth,top:0},{easing:Tween.Quart.easeOut,duration:400});	
					break;
				case 1:// 1 下
					move(oSpan,{left:0,top:obj.offsetHeight},{easing:Tween.Quart.easeOut,duration:400});	
					break;
				case 2:// 2 右
					move(oSpan,{left:obj.offsetWidth,top:0},{easing:Tween.Quart.easeOut,duration:400});	
					break;
				case 3:// 3 上
					move(oSpan,{left:0,top:-obj.offsetHeight},{easing:Tween.Quart.easeOut,duration:400}); 
					break;
			}
			var oInner = obj.children[1];
			oInner.className = 'item_inner'	
		}	
	}; //  end
	
	
	//work
	
	(function(){
		var swiper_wrapper = document.getElementsByClassName('swiper-wrapper')[0];
		var oDevice  =  document.getElementById('device');
		var aItem1 = oDevice.getElementsByClassName('item1');
		var oMask  = document.getElementById('mask');
		var swiper_slide = document.getElementsByClassName('swiper-slide');
		var arrow_left = document.getElementsByClassName('arrow-left')[0];
		var arrow_right = document.getElementsByClassName('arrow-right')[0];
		swiper_wrapper.innerHTML = swiper_wrapper.innerHTML + swiper_wrapper.innerHTML;
		swiper_wrapper.style.width = swiper_slide[0].offsetWidth * swiper_slide.length + 'px';
		var w= swiper_wrapper.offsetWidth/2;
		var work_close = document.getElementById('work_close');
		var work_case =  getByClass(oMask,'work_case');
		var n = 0 ;
		//alert(aItem1.length)
		//alert(work_case.length)
		//aItem1 click
		for(var i = 0 ; i < swiper_slide.length ; i++){
			swiper_slide[i].style.width  = document.documentElement.clientWidth + 'px';
		}
		
		//点击li
		var curClose = 0; 
		var len = aItem1.length/2 
		for(var i = 0 ; i <len ; i++){
			(function(index){
				aItem1[i].onclick = function(){
					for(var i = 0 ;i< len ; i++){
						work_case[i].style.opacity = 0;
						work_case[i].style.webkitTransform="translateZ(700px) rotateY(90deg)"; 
						oMask.style.opacity = 0
						oMask.style.zIndex = -100;
					}
					oMask.style.opacity = 1; 
					oMask.style.zIndex = 20;
					work_case[index].style.opacity = 1;
					curClose  = index;
					work_case[index].style.webkitTransform =  "translateZ(0px) rotateY(0deg)";  
					
				}
			})(i)
		};


		//关于详情
		work_close.onclick = function(){
			work_case[curClose].style.opacity = 0;
			work_case[curClose].style.webkitTransform="translateZ(700px) rotateY(90deg)"; 
			oMask.style.zIndex = -100;
			oMask.style.opacity = 0;
			
		}
		

		
		//work 无缝滚
		arrow_right.onclick = function(){
			n++;
			move(swiper_wrapper,-swiper_slide[0].offsetWidth * n)	
		};
		
		arrow_left.onclick = function(){
			n--;
			move(swiper_wrapper,-swiper_slide[0].offsetWidth * n)	
		};
		
		
		var left = 0;
		var timer =null;
		function move(obj,iTarget){
			var start = left;
			var dis = iTarget-start;
			var time =700;
			var count = Math.round(700/30);
			var n = 0;
			
			clearInterval(obj.timer)
			obj.timer = setInterval(function(){
				n++;
				var a =1 -n/count;
				a = 1- Math.pow(a,3)
				left = start+ dis*a;
				if(left<0){ //右
					obj.style.left  = left%w + 'px';		
				}else{
					obj.style.left  = (left%w-w)%w + 'px';	
				}
				if(n==count){
					clearInterval(obj.timer)
				}
			},30);	
		}
	
	})();  ///work end 
	

	
};  //window onload  end









//getByClass
function getByClass(oParent,className){
	var arr2 =[];
	aTag = document.getElementsByTagName('*')
	//console.log(aTag)
	for(var i = 0 ; i <aTag.length; i++){
		var arr = aTag[i].className.split(' ');
		for(var j=0; j<arr.length; j++){
			if(arr[j] == className){
				arr2.push(aTag[i]);
				break;
			}
		}
	}
	return arr2;
};

//getStyle
function getStyle(obj,name){
	return (obj.currentStyle||getComputedStyle(obj,null))[name];	
};

//运动框架
function move(obj,json,options){
	options = options || {};
	options.duration = options.duration || 700;
	options.easing = options.easing || Tween.Cubic.easeOut;
	
	var start = {};
	var dis = {};
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		dis[name] = json[name] - start[name];
	}
	
	var count = Math.round(options.duration/30);
	var n  = 0;
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
			 
			var cur = options.easing(n/count*options.duration,start[name],dis[name],options.duration);
			
			if(name == "opacity"){
				obj.style.opacity = cur;
				obj.style.filter = "alpha(opacity:"+cur*100+")";
			} else {
				obj.style[name] = cur + "px";
			}
		}
		if(n == count){
			clearInterval(obj.timer);
			options.complete &&　options.complete();
		}
	},30);
}

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
// Tween类
var Tween = {
	Linear: function(t,b,c,d){ return c*t/d + b; },
	Quad: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	},
	Cubic: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
	},
	Quart: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
	},
	Quint: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Sine: {
		easeIn: function(t,b,c,d){
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOut: function(t,b,c,d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
	},
	Expo: {
		easeIn: function(t,b,c,d){
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOut: function(t,b,c,d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {
		easeIn: function(t,b,c,d){
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
	},
	Elastic: {
		easeIn: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
		},
		easeInOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
	},
	Back: {
		easeIn: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
	},
	Bounce: {
		easeIn: function(t,b,c,d){
			return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
		},
		easeOut: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOut: function(t,b,c,d){
			if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
			else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	}
};


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;   //运动框架结束


//ajax 
//options url data type timeout success error
function ajax(options){
	
	options = options || {};
	if(!options.url){
		return;
	}
	options.data = options.data || {};
	options.type = options.type || "get";
	options.timeout = options.timeout || 0;
	
	
	var arr = [];
	options.data.t = Math.random();
	for(var name in options.data){
		arr.push(name + "=" + encodeURIComponent(options.data[name]));
	}
	var str = arr.join("&");
	
	//1 创建
	if(window.XMLHttpRequest){
		var xhr = new XMLHttpRequest();
	} else {
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	//2 连接
	//3 发送
	if(options.type == "get"){
		xhr.open("get",options.url + "?" + str,true);
		xhr.send();
	} else {
		xhr.open("post",options.url,true);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(str);
	}
	
	//4 接收
	xhr.onreadystatechange = function(){
		
		if(xhr.readyState == 4){//完成
			clearTimeout(timer);
			if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){//成功
				options.success &&　options.success(xhr.responseText);
			} else {//失败
				options.error &&　options.error(xhr.status);
			}
		}	
	};
	
	//超时
	if(options.timeout){
		var timer = setTimeout(function(){
			xhr.abort();	
		},options.timeout);
	}
	
}; //ajax 结束


//jsonp
function jsonp(options){
	
	options = options || {};
	if(!options.url) return ;
	options.data = options.data || {};
	options.timeout = options.timeout || 0;
	options.cbName = options.cbName || "cb";
		
     var fnName = ("jsonp_" + Math.random()).replace(".","");
	 var arr = [];
	 //cb  callback
	 options.data[options.cbName] = fnName;
	 for(var i in options.data){
	 	arr.push(i + "=" + encodeURIComponent(options.data[i]));
	 } 
	 var str = arr.join("&");
	 
	 window[fnName] = function(json){
		options.success && options.success(json);	
		
		oHead.removeChild(oS); 
		window[fnName] = null;
		clearTimeout(timer);
	 };
	 
	 var oS = document.createElement("script");
	 oS.src = options.url + "?" + str;
	 
	 var oHead = document.getElementsByTagName("head")[0];
	 oHead.appendChild(oS);
	 
	 
	 if(options.timeout){
		var timer = setTimeout(function(){
			options.error &&options.error();
			
			//window[fnName] = null;
			window[fnName] = function(){};
		},options.timeout);
	 }
	 
}; //jsonp 结束

//随机
function rnd(n,m){
	return parseInt(Math.random()*(m-n)+n);
}

//getPos
function getPos(obj){
    var l = 0;
    var t = 0;
    while(obj){
        l += obj.offsetLeft;
        t += obj.offsetTop;

        obj = obj.offsetParent;
    }
    return {left:l,top:t};
}



