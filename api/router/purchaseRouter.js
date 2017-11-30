var db = require('../db/dbhelper');
var path = require('path');
// var url = require('url');

module.exports = {
	register: function(app){
		//场景
		app.get('/purchase', function(req, res){
//			var params = req.query;
			db.mongodb.select('purchase', {}, function(result){
				//result这里是数组
				res.send(result);
			});
		})

		app.post('/addpurchase', function(req, res){
			db.mongodb.insert('purchase', req.body, function(result){
				res.send(result);
			})
		})

		app.post('/updatepurchase', function(req, res){
			db.mongodb.updatePurchase('purchase', {'number':req.body.number},req.body,function(result){
                res.send({status: true});
            })
		})

		app.post('/deletepurchase', function(req, res){
		    db.mongodb.delete('purchase', {'number':req.body.number},function(result){
		        res.send({status: true});
		    })
		})

	}
}