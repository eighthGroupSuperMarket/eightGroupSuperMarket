$.fn.datagrid = function(opts){
	var _defalt = {
		url: '',
		cols: null,
		method: 'get',
		edit: false,
		delete: false
	}

	var options = $.extend(_defalt, opts);

	var container = $(this);
	var init = function(){
		var $table = $('<table class="table table-striped table-bordered table-hover table-full-width"></table>').click(function(event){
			events(event);
		});
		var $thead = $('<thead></thead>');
		var $tbody = $('<tbody></tbody>');
		// $.get('./libs/dictionary/commonDic.txt', function(dic){
		// 	var dicObj = JSON.parse(dic);
		
			$.get(options.url, function(response){
				if(response.state && response.data[0]){
					var cols = options.cols ? options.cols.split(',') : options.cols;
					//生成 thead
					var $tr = $('<tr></tr>');
					for(var key in response.data[0]){
						if(!cols || (cols && cols.indexOf(key) > -1)){
							$("<th></th>").text(key).appendTo($tr);
						}
					}
					if(options.edit){
						$('<th></th>').text('编辑').appendTo($tr);
					}
					if(options.delete){
						$('<th></th>').text('删除').appendTo($tr);
					}				
					$tr.appendTo($thead);
					$thead.appendTo($table);

					//生成 tbody
					for(var i = 0; i < response.data.length; i++){
						$tr = $('<tr></tr>');
						for(var key in response.data[i]){
							if(!cols || (cols && cols.indexOf(key) > -1)){
								$("<td></td>").text(response.data[i][key]).appendTo($tr);
							}
						}
						if(options.edit){
							$('<td class="edit">'+
							'<button class="glyphicon glyphicon-pencil btn btn-default btn-sm"></button>'+
							'<i>&nbsp;&nbsp;&nbsp;</i>'+
							'<button flag="edit" objectid="' + response.data[i]['_id'] + ' " class="btn btn-success btn-sm save">save</button>'+
							+'</td>').appendTo($tr);
					
						}
						if(options.delete){
							$('<td class="delete">'+
							'<button class="glyphicon glyphicon-trash btn btn-default btn-sm"></button>'+
							'<i>&nbsp;&nbsp;&nbsp;</i>'+
							'<button flag="delete" objectid="' + response.data[i]['_id'] + ' "class="btn btn-warning btn-sm confirm">confirm</button>'+
							'</td>').appendTo($tr);

						}				
						$tr.appendTo($tbody);
					}
					$tbody.appendTo($table);

					$table.appendTo(container);
					

					$('.confirm,.save').hide();
					// 点击编辑按钮
					$('.glyphicon-pencil').on('click',function(){
					
						$(this).siblings('.save').toggle();
						$('.confirm').hide();
						//可编辑状态
						$(this).parents('tr').attr('contenteditable',true)
						$('.edit,.delete').attr('contenteditable',false);
					})

					//点击删除按钮
					$('.glyphicon-trash').on('click',function(){
						$(this).siblings('.confirm').toggle();
						$('.save').hide();
					})
					// 点击保存按钮
					$('.save').on('click',function(){
						$(this).hide();
						//不可编辑状态
						$(this).parents('tr').addClass('info').attr('contenteditable',false);
						
					})
					// 点击删除按钮
					$('.confirm').on('click',function(){
						$(this).hide();
					})

				}
			})
		// })
	}

	init();

	var events = function(event){
		var currObj = $(event.target);
		//更新
		if(currObj.is('button') && currObj.attr('flag') == 'edit'){
			$.post(global.apiBaseUrl + 'updatepurchase', {
				number: $(currObj).closest('tr').children().eq(0).html(),
				brand:$(currObj).closest('tr').children().eq(1).html(),
				amount:$(currObj).closest('tr').children().eq(2).html(),
				unit:$(currObj).closest('tr').children().eq(3).html(),
				productname:$(currObj).closest('tr').children().eq(4).html(),
				price:$(currObj).closest('tr').children().eq(5).html(),
				arrived:$(currObj).closest('tr').children().eq(6).html(),
				nonarrival:$(currObj).closest('tr').children().eq(7).html(),
				code: $(currObj).closest('tr').children().eq(8).html()
			}, function(response){
//					console.log(response);
				}
			);
		}
		if(currObj.is('button') && currObj.attr('flag') == 'delete'){
			//do delete
			$.post(global.apiBaseUrl+'deletepurchase', {number: $(currObj).closest('tr').children().eq(0).html()}, function(response){
				if(response.status){
					currObj.closest('tr').remove();
				} else {
					//输出错误
				}
			})
		}
	}
}