var db = require('../db/dbhelper');

module.exports = {
    register: function(app){
        app.post('/generateorder', function(req, res){
            var products = req.body.products;
            db.mongodb.insert('order', {orderno: new Date().getTime().toString(), products: products, state: 1}, function(result){
                res.send(result);
            })
        })
        app.post('/indentdata',function(req,res){
        	var orderNo = req.body.orderNo;
        	var indentStatus = req.body.indentStatus;
        	db.mongodb.select('indent', {orderNo:orderNo, indentStatus:indentStatus}, function(result){
                res.send(result);
            })
        })
        app.post('/changeindentdata',function(req,res){
        	var orderNo = req.body.orderNo;
        	var indentStatus = req.body.indentStatus;

        	db.mongodb.update('indent', {orderNo:orderNo}, {indentStatus:indentStatus}, function(result){
                res.send(result);
        	})
        })
    }
}