
;(function($){
    $.fn.x_window = function(options){

        var defaults = {
            width:600,
            height:600,
            content:'编辑',
            data:{}
        }

        this.each(function(){
            var opt = $.extend({},defaults,options);
            var $that = $(this).addClass('ctrl');
            // console.log($that);

            var x_window = {
                init(opt){
                    this.opt = opt;
                    this.$header = $('<header/>').appendTo($that);
                    var $span_content = $('<span/>').html(this.opt.content).appendTo(this.$header);
                    var $span_close = $('<span/>').html('&times;').appendTo(this.$header);

                    var $ul = $('<ul/>').addClass('goodsInfo').appendTo($that);

                    for(var attr in this.opt.data){
                        if(attr == '_id'){
                            continue;
                        }
                        var $li = $('<li/>').appendTo($ul);
                        var $span = $('<span/>').html(attr).appendTo($li);
                        var $p = $('<p/>').appendTo($li)
                        var $input = $('<input/>').attr({'type':'text','value':this.opt.data[attr],'class':'p-'+attr}).appendTo($p);
                    }
                    var $btn_save = $('<button/>').html('保存').addClass('save').appendTo($that);
                    var $btn_cannel = $('<button/>').html('取消').addClass('cannel').appendTo($that);
                    
                    $('#main').append($that);
                    console.log($('body'));
                    $that.css({
                        left:(window.innerWidth - $that.width())/2,
                        top:0
                    })

                    // this.$header.on('mousedown',(e)=>{

                    //     this.mDown(e.clientX,e.clientY);

                    //     this.$header.on('mousemove',(ev)=>{
                    //         this.move(ev.clientX,ev.clientY);
                    //     })
                    // })

                    this.ele = $that;
                    // console.log(this.ele);
                    this.$header[0].onmousedown = (e)=>{
                        // console.log(66);
                        this.mDown(e.clientX,e.clientY);

                        this.$header[0].onmousemove = (ev)=>{
                            this.move(ev.clientX,ev.clientY);
                        }
                    }

                    document.onmouseup = ()=>{
                        this.mUp();
                    }

                    $span_close[0].onclick = ()=>{
                        this.Close();
                    }

                    $btn_cannel[0].onclick = ()=>{
                        this.Close();
                    }

                    // $btn_save[0].onclick = ()=>{
                    //     this.Close();
                    // }
                },
                move(x,y){
                    $that.css({
                        left: x - this.ox,
                        top: y - this.oy
                    })
                },
                mDown(x,y){
                    this.ox = x - $that.offset().left;
                    this.oy = y - $that.offset().top;
                },
                mUp(){
                    this.$header[0].onmousemove = null; // => 谁移动?header？
                },
                Close(){
                    this.ele.remove();
                }
            }

            x_window.init(opt);
        })
    }
})(jQuery);
