var db = require('../db/dbhelper');
var requestHandle = require('./../modules/requestHandle.js');
var ObjectID = require('mongodb').ObjectID;

module.exports = {
    register: function(app){
        // console.log(app);
        app.post('/generateorder', function(req, res){
            var products = req.body.products;
            db.mongodb.insert('order', {orderno: new Date().getTime().toString(), products: products, state: 1}, function(result){
                res.send(result);
            })
        })
        app.post('/indentdata',function(req,res){
        	var orderNo = req.body.orderNo;
        	var indentStatus = req.body.indentStatus;
            // console.log(req.body); , indentStatus:indentStatus
        	db.mongodb.select('indent', {orderNo:orderNo}, function(result){
                // console.log(result.data[0]);
                if(result.data[0].indentStatus == '0'){
                    res.send(requestHandle(true,result,'成功生成订单'));
                }else{
                    res.send(requestHandle(false,[],'该订单已经支付'));
                }
            })
        })
        app.post('/changeindentdata',function(req,res){
            // var orderNo = req.body.orderNo;
            console.log(req.body.id);
            db.mongodb.select('indent',{_id:ObjectID(req.body.id)}, function(result1){
                // console.log(result.data[0]);
                // console.log(result);
                if(result1.data[0].indentStatus == '0'){
                    // var updateState = result.data[0]['indentStatus'] = '1';
                    // var updateState = {
                    //     indentStatus:'1',
                    // }
                    // console.log(updateState);
                    db.mongodb.update('indent',[result1.data,{indentStatus:'1'}],function(result){
                        // console.log(result);
                        if(result.status && result.data.result.n == 1){
                            res.send(requestHandle(true,result1.data,'支付成功'));
                        }
                    })
                }else{
                    res.send(requestHandle(false,result1.data,'该订单已经支付'));
                }
            })
        })
        // app.post('/changeindentdata',function(req,res){
        // 	var orderNo = req.body.orderNo;
        // 	var indentStatus = req.body.indentStatus;
        // 	// console.log(orderNo,indentStatus);
        //     console.log(req.body);
        // 	db.mongodb.update('indent', {orderNo:orderNo}, {indentStatus:indentStatus}, function(result){
        //         // console.log(result);
        //         res.send(result);
        //     })
        // })
        app.post('/generate',function(req,res){
            // console.log(req.body);
            db.mongodb.insert('indent',{indentStatus:req.body.indentStatus,data:req.body.data,total:req.body.total},function(result){
                // console.log(result);
                if(result.status && result.data.ops.length != 0){
                    res.send(requestHandle(true,result,'成功生成订单'));
                }
            })
        })
    }
}