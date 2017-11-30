var mongodb = require('mongodb');
var apiresult = require('./../modules/apiresult');
var client = mongodb.MongoClient;
var connstr = 'mongodb://localhost:27017/market'; // => 连接的是mongodb的端口

var requestHandle = require('./../modules/requestHandle');

// 全局变量db
var db;
client.connect(connstr,function(err,_db){
	if(err){
		console.log(err);
	}else{
		db = _db;
	}
})

// 暴露 => 增删查改
module.exports = {
	select:function(_collection,_condition,_cb){
		// db.collection('user'); // => 查找集合
		// market.user.find({'name':'admin','password':'123'})
		// console.log(_collection,_condition);
		db.collection(_collection).find(_condition || {}).toArray(function(err,res){
			// err != null => 出问题
			// err == null => 没问题
			_cb(requestHandle(err?false:true,err?err:res));
		})
		// => 把数据往上传 => 回调函数
	},
	insert:function(_collection,_condition,_cb){
		// db.user.insert({'name':'admin','password':'123','type':2})
		db.collection(_collection).insert(_condition,function(err,res){
			_cb(requestHandle(err?false:true,err?err:res)); // => db哪里来? 全局参数
		})
	},
	delete:function(_collection,_condition,_cb){
		// console.log(_collection,_condition);
		db.collection(_collection).remove(_condition,function(err,res){

			_cb(requestHandle(err?false:true,err?err:res));

		})
	},
	update:function(_collection,_condition,_cb){
		// db.user.update({username:'yy'},{username:'x心'});
		// console.log(_condition[0],_condition[1]);
		db.collection(_collection).update(_condition[0][0],{$set:_condition[1]},function(err,res){

			_cb(requestHandle(err?false:true,err?err:res))
		})
	},
	updatePurchase:function(_collection, _condition, _data, _cb) {
		db.collection(_collection).update(_condition, {$set: _data}, {safe: true}, function(error,result) {
			_cb(apiresult(error ? false : true, error || result));
		})
	}
}