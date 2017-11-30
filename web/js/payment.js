var db = require('../db/dbhelper');
var apiresult = require('../modules/apiresult');
module.exports = {
    register: function(app){
        app.post('/indentdata',function(req,res){
        	var orderNo = req.body.orderNo;
        	var stat = req.body.stat;
        	db.mongodb.select('indent', {orderNo:orderNo, stat:stat}, function(result){
                res.send(result);
            })
        })
        app.post('/changeindentdata',function(req,res){
        	var orderNo = req.body.orderNo;
        	var stat = req.body.stat;

        	db.mongodb.update('indent', {orderNo:orderNo}, {stat:stat}, function(result){
                res.send(result);
        	})
        })
        //生成订单
        app.post('/generateorder',function(req,res){
            // console.log(req.body)
            db.mongodb.insert('indent',{needPay:req.body.needPay,stat:req.body.stat,orderNo:req.body.orderNo},function(error,result){
                if(error){
                    res.send(error);
                }else{
                    res.send(result);
                }
            })
        })
        //查找商品
        app.post('/getsettleAccout',function(req, res){
            db.mongodb.select('goods',{goodsID:req.body.goodsID},function(result){ // => 把这个集合换成你的
                console.log(result);
                if(result.state && result.data.length != 0){
                    res.send(apiresult(true,result.data,'success'));
                }else{
                    res.send(apiresult(false,[],'不存在的商品'));
                }
            })
        })
    }
}