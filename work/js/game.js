function rnd(min, max)
{
	return parseInt((Math.random()*999)%(max-min+1))+min;
}

document.oncontextmenu=function ()
{
	return false;
};

window.onload=function ()
{
	var oBg=document.getElementById('bg');
	var oMan=document.getElementById('man');
	var oScore=document.getElementById('score');
	var oGameOver=document.getElementById('game_over');
	var oStart=document.getElementById('start');
	var oImgLog=document.getElementById('img_logo');
	var oProgress=document.getElementById('progress');
	var oProgressSpan=oProgress.getElementsByTagName('span')[0];
	var oShadow=document.getElementById('shadow');
	var oPopup=document.getElementById('popup');
	//var oCommitBtn=document.getElementById('commit_btn');
	var oCloseBtn=document.getElementById('clos');
	var iTimerBullet=null;
	var aBullet=[];
	var MAX_SPEED=5;
	var MIN_SPEED=2;
	var SCREEN_TIME=3;
	var COUNT_BULLET=10;
	var iLevel=1;
	var iScore=0;
	var i=0;
	

	oCloseBtn.onclick=function ()
	{
		oShadow.style.display='none';
		oPopup.style.display='none';
	};
	
	oStart.onclick=function (ev)
	{
		oMan.style.display='block';
		oImgLog.style.display='none';
		
		//移动红快
		(document.onmousemove=function (ev)
		{
			var oEvent=ev||event;
			
			var l=oEvent.clientX-oBg.offsetLeft-oMan.offsetWidth/2;
			var t=oEvent.clientY-oBg.offsetTop-oMan.offsetHeight/2;
			
			if(l<0)
			{
				l=0;
			}
			else if(l>=oBg.offsetWidth-oMan.offsetWidth)
			{
				l=oBg.offsetWidth-oMan.offsetWidth;
			}
			
			if(t<0)
			{
				t=0;
			}
			else if(t>=oBg.offsetHeight-oMan.offsetHeight)
			{
				t=oBg.offsetHeight-oMan.offsetHeight;
			}
			
			oMan.style.left=l+'px';
			oMan.style.top=t+'px';
		})(ev);
		
		//子弹
		var startTime=(new Date()).getTime();
		var startTimeAll=(new Date()).getTime();
		iTimerBullet=setInterval(function (){
			for(i=0;i<aBullet.length;i++)
			{
				aBullet[i].x+=aBullet[i].speedX;
				aBullet[i].y+=aBullet[i].speedY;
				
				aBullet[i].obj.style.left=aBullet[i].x+'px';
				aBullet[i].obj.style.top=aBullet[i].y+'px';
				
				if(aBullet[i].x<0 || aBullet[i].x>oBg.offsetWidth || aBullet[i].y<0 || aBullet[i].y>oBg.offsetHeight)
				{
					removeBullet(aBullet[i]);
					createBullet();
					i--;
				}
				
				if(cd(aBullet[i].obj, oMan))
				{
					clearInterval(iTimerBullet);
					document.onmousemove=null;
					oGameOver.style.display='block';
				}
			}
			
			var t=(new Date()).getTime()-startTimeAll;
			iScore=parseInt(t/300);
			oScore.innerHTML='<li>难度：'+iLevel+'</li><li>得分：'+iScore+'</li>';
			
			var t=(new Date()).getTime()-startTime;
			var scale=100*(1-t/(SCREEN_TIME*1000));
			
			if(scale<=0)
			{
				oProgressSpan.style.width=0+'%';
				startTime=(new Date()).getTime();
				createBullet();
				COUNT_BULLET++;
				MAX_SPEED+=0.5;
				iLevel++;
			}
			else
			{
				oProgressSpan.style.width=scale+'%';
			}
			//document.title=100*(1-t/(SCREEN_TIME*1000));
		}, 30);
		
		function createBullet()
		{
			var x,y,speedX,speedY;
			
			do
			{
				var left=rnd(0,2);
				var top=rnd(0,2);
			}while(!(left==1 && top!=1 || left!=1 && top==1));
			
			if(0==left)
			{
				x=0;
				speedX=rnd(MIN_SPEED, MAX_SPEED);
			}
			else if(1==left)
			{
				x=rnd(0, oBg.offsetWidth);
				speedX=rnd(-MAX_SPEED, MAX_SPEED);
			}
			else
			{
				x=oBg.offsetWidth;
				speedX=-rnd(MIN_SPEED, MAX_SPEED);
			}
			
			if(0==top)
			{
				y=0;
				speedY=rnd(MIN_SPEED, MAX_SPEED);
			}
			else if(1==top)
			{
				y=rnd(0, oBg.offsetHeight);
				speedY=rnd(-MAX_SPEED, MAX_SPEED);
			}
			else
			{
				y=oBg.offsetHeight;
				speedY=-rnd(MIN_SPEED, MAX_SPEED);
			}
			
			var oDiv=document.createElement('div');
			oDiv.className='bullet';
			oDiv.style.left=x+'px';
			oDiv.style.top=y+'px';
			
			oBg.appendChild(oDiv);
			
			aBullet.push({obj: oDiv, x: x, y: y, speedX: speedX, speedY: speedY});
		}
		
		function removeBullet(oBullet)
		{
			var aResult=[];
			for(i=0;i<aBullet.length;i++)
			{
				if(aBullet[i]!=oBullet)
				{
					aResult.push(aBullet[i]);
				}
			}
			
			oBg.removeChild(oBullet.obj);
			
			aBullet=aResult;
		}
		
		for(i=0;i<COUNT_BULLET;i++)
		{
			createBullet();
		}
		
		function cd(obj1, obj2)
		{
			var l1=obj1.offsetLeft;
			var r1=obj1.offsetLeft+obj1.offsetWidth;
			var t1=obj1.offsetTop;
			var b1=obj1.offsetTop+obj1.offsetHeight;
			
			var l2=obj2.offsetLeft;
			var r2=obj2.offsetLeft+obj2.offsetWidth;
			var t2=obj2.offsetTop;
			var b2=obj2.offsetTop+obj2.offsetHeight;
			
			if(r1<l2 || l1>r2 || b1<t2 || t1>b2)
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		oStart.style.display='none';
	};
	
};
