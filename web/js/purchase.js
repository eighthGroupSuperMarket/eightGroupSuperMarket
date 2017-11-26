jQuery(function($){

	//弹窗操作
	$('.modal').modal({
		show: false
	});	
	//添加按钮
	$('.add').click(function(){
		$('.modal').modal('toggle');
	})
	
	//生成表格
	$('#btnSave').click(function(){
		$.post(common.baseUrl + 'addpurchase', {
			number: $('#number').val(),
			brand: $('#brand').val(), 
			amount: $('#amount').val(), 
			unit: $('#unit').val(),
			productname: $('#productname').val(),
			price: $('#price').val(),
			arrived: $('#arrived').val(),
			nonarrival: $('#nonarrival').val()
			}, function(response){
				//清空表单
				$('#number,#brand,#amount,#unit,#productname,#price,#arrived,#nonarrival').val('');
				$('#datagrid').html('');
				$('#datagrid').datagrid({
					url:common.baseUrl+'purchase',
					cols: 'number,brand,productname,unit,price,amount,arrived,nonarrival',
					edit: true,
					delete: true
				})
			}
		);
		$('.modal').modal('toggle');
	})
	$('#datagrid').datagrid({
		url:common.baseUrl+'purchase',
		cols: 'number,brand,productname,unit,price,amount,arrived,nonarrival',
		edit: true,
		delete: true
	})
	
})
