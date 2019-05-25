			/*
				运动的过程中，如果其中一个样式到达目的值，他就直接将定时器关闭了。
				【注】保证所有的动画结束的时候，才能够关闭定时器。

				下述这个函数，就叫做缓冲运动的运动框架
			*/
			function startMove(node, cssObj, complete){ //complete = callback
				clearInterval(node.timer);
				node.timer = setInterval(function(){
					var isEnd = true; //假设所有运动都到达目的值了

					for(var attr in cssObj){
						var iTarget = cssObj[attr];

						//1、获取当前样式
						var iCur = null;
						if(attr == "opacity"){
							iCur = parseInt(parseFloat(getStyle(node, attr)) * 100);
						}else{
							iCur = parseInt(getStyle(node, attr));
						}

						var speed = (iTarget - iCur) / 8;
						speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

						
						if(attr == "opacity"){
							iCur += speed;
							node.style.opacity = iCur / 100;
							node.style.filter = "alpha(opacity=" + iCur + ")";
						}else{
							node.style[attr] = iCur + speed + 'px';
						}
						
						if(iCur != iTarget){
							isEnd = false;
						}
					}
					if(isEnd){
						clearInterval(node.timer);
						if(complete){
							complete.call(node);
						}
					}

				}, 30);
			}
			// 浏览器兼容写法
			function getStyle(node, styleType){
				return node.currentStyle ? node.currentStyle[styleType] : getComputedStyle(node)[styleType];
			}