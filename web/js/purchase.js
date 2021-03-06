jQuery(function($){
	//弹窗操作
	$('.modal').modal({
		show: false
	});	
	//添加按钮
	$('.add').click(function(){
		$('.modal').modal('toggle');
	})
	
	//查询,模糊搜索
	var $searchBox = $('#searchBox');
	var $searchIcon = $('.searchIcon');
	
    $searchBox.click(function(){$searchBox.val('');});
    $searchBox.keyup(function(e){
    	if(e.keyCode==13){
    		$searchIcon.click();
    	};
	})
    $searchIcon.click(function(){
    	var text = $searchBox.val().trim();
    	var $dataTrs = $("tr:not('tr:first')");
        if(text==''){return;}
        if(text=='*'){
        	$dataTrs.addClass('checked');
        }
        $dataTrs.filter(':contains('+text+')').addClass('checked');
    });
	
	//生成表格
	$('#btnSave').click(function(){
		$.post(global.apiBaseUrl + 'addpurchase', {
			number: $('#number').val(),
			brand: $('#brand').val(), 
			amount: $('#amount').val(), 
			unit: $('#unit').val(),
			productname: $('#productname').val(),
			price: $('#price').val(),
			arrived: $('#arrived').val(),
			nonarrival: $('#nonarrival').val(),
			codecode: $('#codecode').val()
			}, function(response){
				$('#number,#brand,#amount,#unit,#productname,#price,#arrived,#nonarrival,#codecode').val('');
				$('#datagrid').html('');
				ajaxData();
			}
		);
		$('.modal').modal('toggle');
	})
	ajaxData();
	function ajaxData(){
		console.log($('#datagrid'));
		$('#datagrid').datagrid({
			url:'http://localhost:120/purchase',
			cols: 'number,brand,productname,unit,price,amount,arrived,nonarrival,codecode',
			edit: true,
			delete: true
		})
	}
})
