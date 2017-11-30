var db = require('./../db/dbhelper.js');
var requestHandle = require('./../modules/requestHandle.js');
var ObjectId = require('mongodb').ObjectId;
module.exports = {
	products_action:function(app){

		app.post('/addproducts',function(req,res){
			// res.send('addproducts');
			// db.mongodb.select('goods',{},function(res){
			// 	res.send(res);
			// })
		})

		app.post('/delete',function(req,res){
			// res.send('delproducts');
			db.mongodb.delete('goods',{_id:ObjectId(req.body._id)},function(result){
				// console.log(result);
				if(result.status && result.data.result.n == 1){
					res.send(requestHandle(true,result,'成功'));
				}else{
					res.send(requestHandle(true,[],'失败'));
				}
			})
		})

		app.post('/update',function(req,res){
			// console.log(req.body);
			var goodsInfo = {
				name:req.body.name,
				cate:req.body.cate,
				price:req.body.price,
				address:req.body.address,
				color:req.body.color,
				hot:req.body.hot
			}
			// res.send('updateproducts');
			db.mongodb.select('goods',{_id:ObjectId(req.body._id)},function(result){
				// console.log(result.data);
				if(result.status && result.data.length != 0){
					// db.mongodb.update('goods',result.data)
					// var 
					db.mongodb.update('goods',[result.data,goodsInfo],function(result){
						// console.log(result);
						if(result.status && result.data.result.n == 1){
							res.send(requestHandle(true,result,'更新成功'));
						}else{
							res.send(requestHandle(false,[],'操作失败'));
						}
					})
				}else{
					res.send(true,[],'获取失败');
				}
			})
		})

		app.get('/selectproducts',function(req,res){
			var params = {};
			if(req.query._id){
				params = {_id:ObjectId(req.query._id)};
			}

			// res.send('selectproducts');
			db.mongodb.select('goods',params,function(result){
				res.send(requestHandle(true,result.data,'成功'));
			})
		})
	}
}