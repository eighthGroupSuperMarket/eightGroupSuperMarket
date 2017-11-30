var db = require('../db/dbhelper');
// var apiresult = require('../modules/apiresult.js');
var requestHandle = require('./../modules/requestHandle');
var ObjectID = require('mongodb').ObjectID;

module.exports = {
    change: function(app){
        // console.log(app);
        app.post('/update',function(req,res){
            db.mongodb.update('goods',{goodno:req.body.goodno},req.body, function(result){
                if(result.state && result.data.length > 0){
                	res.send(requestHandle(false))
                }else{
                	res.send(requestHandle(true,[],'更新失败'));
                }
            })
        })
    },
    insert:function(app){
    	app.post('/insert',function(req,res){
    		console.log(req.body)
    		db.mongodb.insert('goods',req.body,function(error,result){
    			if(error){
    				res.send(error);
    			}else{
    				res.send(result);
    			}
    		})
    	})
    },
    delete:function(app){
    	app.post('/delete',function(req,res){
    		console.log(req.body);

    		db.mongodb.delete('goods',req.body,function(result){
    			res.send(result.data);
    			// console.log(result);
    		})
    	})
    },
    select: function(app){
        app.post('/stock', function(req, res){
        	// console.log(req.body);
            db.mongodb.select('goods',req.body, function(result){
                res.send(result.data);
            })
        })
    },
    chaxun: function(app){
        app.post('/chaxun',function(req,res){
            db.mongodb.select('goods',{_id:ObjectID(req.body._id)},function(result){
                // console.log(result);
                res.send(requestHandle(true,result,'成功'));
            })
        })
    },
    gengxin:function(app){
        app.post('/genxin',function(req,res){
            var goodsInfo = {
                waybill:req.body.waybill,
                goodno:req.body.goodno,
                goodname:req.body.goodname,
                goodtype:req.body.goodtype,
                inprice:req.body.inprice,
                manager:req.body.manager,
                quantity:req.body.quantity,
                remark:req.body.remark
            }
            // console.log(goodsInfo);

            db.mongodb.select('goods',{_id:ObjectID(req.body._id)},function(result){
                // console.log(result.data[0]);
                if(result.status && result.data.length != 0){
                    // console.log(result.data[0]);
                    db.mongodb.update('goods',[result.data,goodsInfo],function(result){
                        // console.log(result);
                        if(result.status && result.data.result.n == 1){
                            res.send(requestHandle(true,result,'更新成功'))
                        }else{
                            res.send(requestHandle(false,[],'操作失败'));
                        }
                    })
                }else{
                    res.send(requestHandle(false,[],'获取失败'));
                }
            })
        })
    }
}