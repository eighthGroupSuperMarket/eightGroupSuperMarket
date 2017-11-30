(function($){
	$.fn.x_window = function(options){
		// 默认
		var defaults = {
			width:400,
			height:200,
			position: 'absolute',
			// 内容
			c1:'提示',
			c2:'添加购物车成功',
			c3:'继续购物',
			c4:'前往结算',
			// 链接
			h1:'#',
			h2:'#'
		}

		this.each(function(){
			var opt = $.extend({},defaults,options);

			// 样式/页面
			var $obj = $(this).addClass('x_window').appendTo($('body'));

			var x_window = {
				// 初始化
				init(opt){
					this.opt = opt;
					// 设置属性
					$obj.css({
						position:this.opt.position,
						width:this.opt.width,
						height:this.opt.height,
						// 页面居中
						top:(window.innerHeight-this.opt.height)/2,
						left:(window.innerWidth-this.opt.width)/2
					});

					// 向容器添加元素 => 标题
					this.$header = $('<header/>').appendTo($obj);
					var $p = $('<p/>').html(this.opt.c1).appendTo(this.$header);
					this.$span = $('<span/>').html('&times;').addClass('close').appendTo(this.$header);

					// 向容器添加元素 => 内容
					var $content = $('<div/>').addClass('result').html(this.opt.c2).appendTo($obj);

					// 动作 // 1 // 2
					var $action = $('<div/>').addClass('action').appendTo($obj);
					var $a_js = $('<a/>').attr('href',this.opt.h1).html(this.opt.c3).appendTo($action);			
					var $a_jx = $('<a/>').attr('href',this.opt.h2).html(this.opt.c4).appendTo($action);
					
					// 鼠标按下
					this.$header[0].onmousedown = (e)=>{

						this.mouseDown(e.clientX,e.clientY);

						this.$header[0].onmousemove = (ev)=>{

							this.drag(ev.clientX,ev.clientY);
						}
					}

					// 鼠标弹起
					document.onmouseup = ()=>{
						this.mouseUp();
					};

					// 关闭窗口
					this.$span[0].onclick = ()=>{
						this.Close();
					};

					// $a_js[0].onclick = ()=>{
					// 	this.Close();
					// };

					$a_jx[0].onclick = ()=>{
						this.Close();
					};
				},
				drag(x,y){
					$obj.css({
						left:x-this.x,
						top:y-this.y
					})
				},
				mouseDown(x,y){
					this.x = x-$obj.offset().left;
					this.y = y-$obj.offset().top; // jQ对象 => $obj.offsetTop
				},
				mouseUp(){
					this.$header[0].onmousemove = null;
				},
				Close(){
					$obj.remove();
				},
			};
			x_window.init(opt);
		})
	}
})(jQuery);