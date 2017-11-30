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

    // 用户管理
    var token = localStorage.getItem('token');
    var type = localStorage.getItem('type'); // => 登陆时已经做出判断
    var currentUser = localStorage.getItem('username');
    var currentPwd = localStorage.getItem('password');

    $.get('http://localhost:120/index',{token:token,type:type},function(res){
        switch(type){
            case '1': // => 管理员
                // $('.userManage h1').html('用户资料');

                if(res.data.data){
                    // 用户信息
                    dataList(res);

                    // 点击查询请求数据
                    var searchObj = {};
                    $('#btnSearch_user').on('click',function(){
                        var searchContent = $('#searchContent_user').val();

                        if(searchContent == ''){
                            searchObj = searchObj;
                        }else if(!!Number(searchContent)){
                            searchObj = {_id:res.data.data[Number(searchContent)-1]._id};
                            // console.log(Obj);
                        }else if(!!Number(searchContent) == false){
                            searchObj = {username:searchContent};
                        }
                        
                        searchObj['token'] = token;
                        searchObj['type'] = type;

                        $.get('http://localhost:120/index',searchObj,function(res){
                            // console.log(res);
                            dataList(res);

                        })
                        // 每次清空数据
                        searchObj = {};
                        // location.reload();
                    })

                    // 操作
                    $('.userManage').on('click','span',function(){
                        var username = $(this).parents('tr').find('.username').html();
                        // console.log(res);
                        switch(this.className){
                            case 'del':
                                $.post('http://localhost:120/admin',{username:username,action:1},function(res){
                                    // console.log(res);
                                    console.log(res);
                                    if(res.data.n == 1){
                                        alert(res.msg)
                                    }else if(res.data.n == 0){
                                        alert(res.msg)
                                    }
                                })
                                break;
                            case 'update':
                                $.get('http://localhost:120/index',{username:$(this).parents('tr').find('.username').html(),token:token,type:type},function(res){
                                    // console.log(res.data.data[0]);
                                    var $div = $('<div/>').x_window({data:res.data.data[0]});
                                    // console.log($div);
                                    // res.data.data[0]['action'] = 2;

                                    $('.save').on('click',function($div){
                                        $.post('http://localhost:120/admin',{username:$('.p-username').val(),password:$('.p-password').val(),type:$('.p-type').val(),action:2,_id:res.data.data[0]._id},function(res){
                                            // console.log(res);
                                            if(res.status){
                                                alert(res.msg);
                                            }else{
                                                alert(res.mgs);
                                            }
                                        })
                                        $('.ctrl').remove();
                                    })
                                })
                                break;
                        }
                    })
                }
                break;
            case '2': // => 工作人员
                // $('.goodsManage h1').html('商品管理界面');
                console.log(res);
                if(res.data.data){
                    var str = `<table id="goodsInfo"><tr>
                                <td>商品名称</td>
                                <td>价格</td>
                                <td>密码</td>
                                <td>类型</td>
                                <td>操作</td>
                               </tr>`;
                    var content = res.data.data.map((item,index)=>{
                        return `<tr>
                                <td data-id=${index}>${index+1}</td>
                                <td class="username">${item.username}</td>
                                <td>${item.password}</td>
                                <td>${item.type}</td>
                                <td><span class="del">删除</span><span class="update">修改</span></td>
                                </tr>`;
                    }).join('');
                    // console.log(content);
                    $('.goodsData').html(str+content+'</table>');
                    console.log($('.goodsData'));
                }
                break;
        }

        // 显示当前用户
        $('header p.pull-left').html(res.msg+':'+currentUser);
    })

    // 请求返回数据
    function dataList(res){
        var str = `<table id="userInfo"><tr>
            <td>序号</td>
            <td>用户名</td>
            <td>密码</td>
            <td>类型</td>
            <td>操作</td>
           </tr>`;
        var content = res.data.data.map((item,index)=>{
            return `<tr>
                    <td data-id=${index}>${index+1}</td>
                    <td class="username">${item.username}</td>
                    <td>${item.password}</td>
                    <td>${item.type}</td>
                    <td><span class="del">删除</span><span class="update">修改</span></td>
                    </tr>`;
        }).join('');
        $('.userDate').html(str+content+'</table>');
    }

    // 新增人员
    $('#addPerson').on('click',function(){
        console.log(66);
        $('<div/>').x_window();
        
        
        $('.save').on('click',function(){
            $.post('http://localhost:120/register',{username:$('.p-username').val(),password:$('.p-password').val()},function(res){

                console.log(res); // => res.send
                if(res.status && res.data){
                    alert(res.msg);
                }else{
                    alert(res.msg);
                }
            })
            $('.ctrl').remove();
        })
    })

    // 修改密码
    $('#changePwd').on('click',function(){
        $.post('http://localhost:120/login',{username:currentUser,password:currentPwd},function(res){
            // console.log(res);
            var $div = $('<div/>').x_window({data:{username:currentUser,password:currentPwd}});

            $('.save').on('click',function(){
                $.post('http://localhost:120/admin',{username:$('.p-username').val(),password:$('.p-password').val(),type:$('.p-type').val(),action:2,_id:res.data.data[0]._id},function(res){
                    // console.log(res);
                    // if(res.status){
                    //     alert(res.msg);
                    // }else{
                    //     alert(res.mgs);
                    // }
                })
                $('.ctrl').remove();
            })
        })
    })
    
    // 点击生成二维码
    var orderNo = '1';
    $('#btn_pay').on('click', function() {
        var goodsArr = [];
        // console.log(6);
        //清楚上次数据，初始化
        $('#code').html('');
        //生成订单，待写
        // console.log($('#needPay'));
        // var goodsOrder = {
        //     indentStatus:'0', // => 微支付
        //     data:goodsArr,
        //     total:Number($('#needPay').html())
        // }
        //请求订单的数据，改变订单状态
        // console.log(goodsArr);
        var trs = $('#tbody tr');
        // console.log(trs);
        // trs.each(function(index,item){
        //     con
        // })
        for(var i=0;i<trs.length;i++){
            var item = trs[i];
            var obj = {
                id:$(item).find('td').eq(0).html(),
                name:$(item).find('td').eq(1).html(),
                qty:$(item).find('.qty').val(),
                price:$(item).find('.goodsprice').html(),
            }
            goodsArr.push(obj);
        }
        // console.log(obj);
        goodsArr8 = JSON.stringify(goodsArr);
        // console.log(goodsArr8);
        $.post('http://localhost:120/generate', {indentStatus:'0',data:goodsArr8,total:Number($('#needPay').html())}, function(res) {
            //未支付
            console.log(res.data.data.ops[0].total);
            console.log(res.data.data.ops[0]._id);
            // var orderNo_total = 
            if (res.status == true && res.data.data.ops.length != 0) {
                $('#code').qrcode('http://10.3.135.36:120/web/html/checkout.html?orderToatal='+res.data.data.ops[0].total+'&orderId='+res.data.data.ops[0]._id);
                // window.localStorage.setItem('orderNo',res.data.data.ops[0].indentStatus);
                window.localStorage.setItem('orderNo_id',res.data.data.ops[0]._id);
                window.localStorage.setItem('orderNo_total',res.data.data.ops[0].total);
                alert(res.msg);
            }else{
                alert(res.msg);
            }
        })
        // console.log(goodsOrder);
    })

    // 结算页面 => 输入二维码查找商品生成订单
    // $(function(){
    //     var str = "";
    //     $('#code').qrcode(str);
        
    //     $("#sub_btn").click(function(){
    //         var code = document.querySelector('#code');
    //         code.style.display = 'block';
    //         $("#code").empty();
    //         var str = toUtf8($("#mytxt").val());
            
    //         $("#code").qrcode({
    //             render: "table",
    //             width: 200,
    //             height:200,
    //             text: str
    //         });
    //     });
    // })
    // function toUtf8(str) {   
    //     var out, i, len, c;   
    //     out = "";   
    //     len = str.length;   
    //     for(i = 0; i < len; i++) {   
    //         c = str.charCodeAt(i);   
    //         if ((c >= 0x0001) && (c <= 0x007F)) {   
    //             out += str.charAt(i);   
    //         } else if (c > 0x07FF) {   
    //             out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));   
    //             out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));   
    //             out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
    //         } else {   
    //             out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));   
    //             out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
    //         }   
    //     }   
    //     return out;
    // }

    
    $('#btn').on('click',function(){
        var goodno = $('#goodsID').val();
        // console.log(goodsID);
        $.post('http://localhost:120/getsettleAccout',{goodno:goodno},function(res){
            console.log(res); // => 接收商品信息收商品信息
            var goodsItem = res.data;
            // goodsItem['qty'] = 
            
            var total = 0;
            let tbody = document.querySelector('#tbody');
            var tr = document.createElement('tr');
            tr.innerHTML = res.data.map(item=>{
                total = item.inprice;
                // console.log(item.inprice);
               // console.log(total);
                return `
                        <td>${item.goodno}</td>
                        <td>${item.goodname}</td>
                        <td class="goodsqty">
                            <input type="button" value="-" class ="minus">
                            <input type="text" value="1" class ="qty">
                            <input type="button" value="+" class ="add">
                        </td>
                        <td class="goodsprice">${item.inprice}</td>
                        <td class='totalprice'>${total}</td>  
                `
            }).join('');
            // console.log($('.qty').val())
            var qtyArr = $('.qty');
            // console.log(qtyArr);
            qtyArr.each(function(index,item){
                console.log(item.value);
            })
          
            tbody.appendChild(tr);
            
    
            $('.goodsqty').on('click','.add',function(){
                $(this).prev('.qty').val($(this).prev('.qty').val()*1+1);
                $total = $(this).closest('.goodsqty').siblings('.goodsprice').html()*($(this).prev('.qty').val());
                // console.log($('.qty').val());
                // console.log($total);
                $(this).closest('.goodsqty').siblings('.totalprice').html($total);
                var totalPay = 0;

                var tdArr = $('.totalprice');
                // var tdArr = document.getElementsByClassName('totalprice');
                // console.log(tdArr);

                tdArr.each(function(index,item){
                    // console.log(item.innerText);
                    totalPay += Number(item.innerText);
                })
                $('#needPay').html(totalPay);
            });
            $('.goodsqty').on('click','.minus',function(){    
                if($(this).next('.qty').val()<2){
                    $(this).next('.qty').val($(this).next('.qty').val())==1;
                }else{
                    $(this).next('.qty').val($(this).next('.qty').val()*1-1);
                    $total = $(this).closest('.goodsqty').siblings('.goodsprice').text()*($(this).next('.qty').val());
                    // console.log($(this).next('.qty').val());
                    // console.log($total);
                    $(this).closest('.goodsqty').siblings('.totalprice').html($total);
                }
                var totalPay = 0;

                var tdArr = $('.totalprice');
                // var tdArr = document.getElementsByClassName('totalprice');
                // console.log(tdArr);

                tdArr.each(function(index,item){
                    console.log(item.innerText);
                    totalPay += Number(item.innerText);
                })
                $('#needPay').html(totalPay);
            });
         
            $('.goodsqty').on('blur','.qty',function(){
                $total = $(this).closest('.goodsqty').siblings('.goodsprice').text()*($(this).val());
                console.log($('.qty').val());
                $(this).closest('.goodsqty').siblings('.totalprice').html($total);
                var totalPay = 0;

                var tdArr = $('.totalprice');
                // var tdArr = document.getElementsByClassName('totalprice');
                // console.log(tdArr);

                tdArr.each(function(index,item){
                    console.log(item.innerText);
                    totalPay += Number(item.innerText);
                })
                $('#needPay').html(totalPay);
            })

        });
    })
        
    $('#searchewm').on('click',function(){
        var goodsID = $('.search').val();

        $.post('http://localhost:120/getsettleAccout',{goodsID:goodsID},function(res){

            let tbodys = document.querySelector('#tbodys');
            var tr = document.createElement('tr');
            tr.innerHTML = res.data.map(item=>{
                return `
                    <td>${item.barcode}</td>
                `
            }).join('');

            tbodys.appendChild(tr);
        })
    })

    $('#confirmBuy').on('click',function(){
        var needPay = $('#needPay').html();
        // console.log(needPay);
        var order = {
            needPay : needPay,
            status:0
        };
        $.post('http://localhost:120/getsettleAccout',order,function(res){
             console.log(res);   
        })
    })

    // 库存管理
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
            <tr data-id="${item._id}">
                <td>${item.waybill}</td>
                <td>${item.goodno}</td>
                <td>${item.goodname}</td>
                <td>${item.goodtype}</td>
                <td>${item.inprice}元</td>
                <td>${item.quantity}个</td>
                <td>${item.manager}</td>
                <td>${item.remark}</td>
                <td><button class="edit">编辑</button></td>
                <td><button class="delete">删除</button></td>
            </tr>
            `
        }).join('');
        $('#tbody1').html(tr);
    }

    $('.table').on('click','.edit',function(){

        var goods_id = $(this).parents('tr').attr('data-id');
        $.post('http://localhost:120/chaxun',{_id:goods_id},function(res){
            // console.log(res.data.data[0]);
            // console.log(res);
            // console.log(res.data.data[0]._id);
            $('<div/>').x_window({data:res.data.data[0]});

            $('.save').on('click',function(){
                // console.log(6);
                var goodsInfo = {
                    waybill:$('.p-waybill').val(),
                    goodno:$('.p-goodno').val(),
                    goodname:$('.p-goodname').val(),
                    goodtype:$('.p-goodtype').val(),
                    inprice:$('.p-inprice').val(),
                    manager:$('.p-manager').val(),
                    quantity:$('.p-quantity').val(),
                    remark:$('.p-remark').val()
                }
                // console.log(goodsInfo);
                goodsInfo['_id'] = res.data.data[0]._id;
                $.post('http://localhost:120/genxin',goodsInfo,function(res){
                    // console.log(res);
                    if(res.status && res.data.data.n == 1){
                        alert(res.msg);
                    }else{
                        alert(res.msg);
                    }
                })
                $('.ctrl').remove();
            })
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
            })
    })

    $('.table').on('click','.delete',function(e){
        var target = e.target;
        // console.log(target);
        var r = confirm("确定删除吗？");
        var goods_id = $(target).parents('tr').attr('data-id');
        // console.log(goods_id);
        if(r == true){
            var currentTr = target.parentNode.parentNode;

            currentTr.parentNode.removeChild(currentTr);

            var goodno = currentTr.children[1].innerText;
            // console.log(goodno)

            $.post(global.apiBaseUrl+'delete',{_id:goods_id},function(res){
                if(res.status && res.data.data.n == 1){
                    console.log('删除成功');
                }else{
                    console.log('失败');
                }
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

    
       var socket = null;
       if(!socket){
            //建立连接
           socket = io('http://localhost:66');
       }  
       socket.on('printOrder',function(par2){
               console.log('printOrder客户端');
//             console.log(par2);
               //发送打印小票的请求
               $.post('http://localhost:120/changeindentdata', {id:par2},function(res){
                  
                   if(!res.status && res.data.length != 0){
						console.log(res.data);

                       // 打印小票
                       var goodsInfo = JSON.parse(res.data[0].data);
                    
                       var content = ($.map(goodsInfo,function(item){
                           return `${item.name} ${item.qty} ${item.price}\n`
                       }).join(''));

                       var str = '超市收银系统\n********************************\n商品名称 数量 价格\n'+content
             +'总金额'+res.data[0].total+'元\n********************************\n';
                          console.log(str);
                       $.post('http://10.3.135.62:81/print',{text:str},function(res){
                           console.log(res);
                       })
                   }else{
//                     alert(res.msg);
                   }
               });
       });
})
