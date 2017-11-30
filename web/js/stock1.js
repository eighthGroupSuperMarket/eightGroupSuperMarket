jQuery(function($){
		$.post(global.apiBaseUrl+'stock',function(res){
			// console.log(res.length);
			makePage(res);
			// makeHTML(data);

		})
			function makePage(res){
			var $qty = 15;
			var pageNo = Math.ceil(res.length/$qty);
			var data = res.slice(0,$qty);
			makeHTML(data);
			var allpage = $('.stockpage');
			$('.stockpage').html('');
			for(var i=1;i<pageNo+1;i++){
				var page = $('<span>'+ i +'</span>').css({'display':'inline-block','width':'20px','height':'20px','border':'1px solid #ccc','text-align':'center','padding':'0 5px'});		
				$('.stockpage').append(page);
			}

			$('.stockpage').on('click','span',function(){
				var num = $(this).html();
				var pagelen = $('.stockpage').children('span');
				for(var i=0;i<pagelen.length;i++){

					pagelen.eq(i).css({'background':'#fff'});
				}
				$(this).css({'background':'#ccc'});
				 data = res.slice((num-1)*$qty,num*$qty);
				makeHTML(data);
			});

			}
			function makeHTML(data){
				var tr = $.map(data,function(item,idx){
					return `
					<tr>
						<td>${item.waybill}</td>
						<td>${item.goodno}</td>
						<td>${item.goodname}</td>
						<td>${item.goodtype}</td>
						<td>${item.inprice}</td>
						<td>${item.quantity}</td>
						<td>${item.manager}</td>
						<td>${item.remark}</td>
						<td><button class="edit">编辑</button></td>
						<td><button class="delete">删除</button></td>
					</tr>
					`
				}).join('');
				$('#tbody1').html(tr);
			}

		$('.table').on('click','.edit',function(e){
			console.log(66);
			var target = e.target;
			console.log(this);
			var bh = $("body").height(); 
			var bw = $("body").width(); 
			$("#fullbg").css({ 
				height:bh, 
				width:bw, 
				display:"block" 
				}); 
			$("#dialog").show(); 
			$('.addkeep').css('display','none');
			$('.saveedit').css('display','block');
			var editdet = $(".editlist").children('input');

			// console.log(editdet);
			var parenttr = target.parentNode.parentNode;
			var child = parenttr.children;

			// console.log(child)
			for(var i=0;i<editdet.length;i++){
				editdet[i].value = child[i].innerText;
			}

			$('.saveedit').click(function(){
				for(var i=0;i<editdet.length;i++){
					child[i].innerHTML = editdet[i].value;
				}
				var res1 = {
              	waybill:child[0].innerText,
              	goodno:child[1].innerText,
              	goodname:child[2].innerText,
              	goodtype:child[3].innerText,
              	inprice:child[4].innerText,
              	quantity:child[5].innerText,
              	manager:child[6].innerText,
              	remark:child[7].innerText
              };
              console.log(res1)

              $.post(global.apiBaseUrl+'update',res1,function(result){
			})

				$("#fullbg,#dialog").hide(); 

			})
		})
	//添加商品入库
	$('.add_shop').click(function(){
		var bh = $("body").height(); 
		var bw = $("body").width(); 
		$("#fullbg").css({ 
				height:bh, 
				width:bw, 
				display:"block" 
				}); 
			// $("#dialog").show(); 
		$("#fullbg,#dialog").show();
		$('.saveedit').css('display','none');
		$('.addkeep').css('display','block');

		var insertdet = $(".editlist").children('input');
			for(var i=0;i<insertdet.length;i++){
				insertdet[i].value='';
			}

	});


	$('.addkeep').click(function(){
			var html =$('<tr/>');
			var insertarr = [];
			var insertdet = $(".editlist").children('input');

			for(var i=0;i<insertdet.length;i++){
				html.append( "<td>"+insertdet[i].value+"</td>");
				insertarr.push(insertdet[i].value);
				}

				html.append(`<td><button class="edit">编辑</button></td><td><button class="delete">删除</button></td>`);
			$('#tbody1').append(html);

			var res2 = {
              	waybill:insertarr[0],
              	goodno:insertarr[1],
              	goodname:insertarr[2],
              	goodtype:insertarr[3],
              	inprice:insertarr[4],
              	quantity:insertarr[5],
              	manager:insertarr[6],
              	remark:insertarr[7]
              };

              $.post(global.apiBaseUrl+'insert',res2,function(result){
			})
              $("#fullbg,#dialog").hide(); 

              $.post(global.apiBaseUrl+'stock',function(res){
			// console.log(res.length);
			makePage(res);
			// makeHTML(data);

		})
	})

//-==========================================================================================================



		$('.table').on('click','.delete',function(e){
			var target = e.target;
			var r = confirm("确定删除吗？")
			if(r == true){
				var currentTr = target.parentNode.parentNode;

				currentTr.parentNode.removeChild(currentTr);

				var goodno = currentTr.children[1].innerText;

				$.post(global.apiBaseUrl+'delete',{goodno:goodno},function(res){

				})
				
				$.post(global.apiBaseUrl+'stock',function(res){
				makePage(res);

		})
			}
		})
		$('.closeBg').on('click',function(){
			$("#fullbg,#dialog").hide(); 
		})

		//搜索
		$('#gosearch').click(function(){
			var $stype = $('#stype').val();
			console.log($stype)
			var $search = $('#search').val();
			if($stype == '商品编号'){
				console.log(123456789)
				$.post(global.apiBaseUrl+'stock',{goodno:$search},function(res){
					// makeHTML(res);
					makePage(res);
				})
			}else if($stype == '商品类型'){
				$.post(global.apiBaseUrl+'stock',{goodtype:$search},function(res){
					// makeHTML(res);
					makePage(res);
				})
			}else if($stype == '收货单号'){
				$.post(global.apiBaseUrl+'stock',{waybill:$search},function(res){
					// makeHTML(res);
					makePage(res);
				})
			}
		})

})