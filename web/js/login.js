(function($){
	// 居中
	var userLogin = $('.userLogin');
	autoCenter();

	window.onresize = autoCenter;

	function autoCenter(){
		userLogin.css({
			left:(window.innerWidth - userLogin.width())/2,
			top:150
		})
	}
})(jQuery);