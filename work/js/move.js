function getStyle(obj, name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj, false)[name];
	}
}


function startMove(obj, json, fnEnd)
{
	var MAX=18;
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;
		
		for(var name in json)
		{
			var iTarget=json[name];
			
			if(name=='opacity')
			{
				var cur=Math.round(parseFloat(getStyle(obj, name))*100);
			}
			else
			{
				var cur=parseInt(getStyle(obj, name));
			}
			
			var speed=(iTarget-cur)/5;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(Math.abs(speed)>MAX)speed=speed>0?MAX:-MAX;
			
			if(name=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100;
			}
			else
			{
				obj.style[name]=cur+speed+'px';
			}
			
			if(cur!=iTarget)
			{
				bStop=false;
			}
		}
		
		if(bStop)
		{
			clearInterval(obj.timer);
			
			if(fnEnd)
			{
				fnEnd();
			}
		}
	}, 20);
}





