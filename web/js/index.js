jQuery(function($){
     /*tab模块切换,大模块.admin_item中的小模块为.tab_item,.tab_item对应.item_cont*/
    
    $('.main_left').on('click','.title',function(){
    	$(this).next('.tab_item_list').toggleClass('collapse');
    })
    
    $('.main_left').on('click','.tab_item',function(){
        var $this = $(this);
        var idx = $this.addClass('focus').index();
        $('.tab_item').removeClass('focus');
        $($($this.closest('.tab_item_list')[0]).find('.tab_item').get(idx)).addClass('focus');
        $('.item_cont').hide();
        $($($('.item_cont_list').get($($this.closest('.admin_item')[0]).index())).find('.item_cont').get(idx)).show();
    });
})
