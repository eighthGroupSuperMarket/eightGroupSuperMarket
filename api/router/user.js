var jwt = require('jsonwebtoken');
var requestHandle = require('./../modules/requestHandle'); // 写路由怎么可能没有
var ObjectID = require('mongodb').ObjectID;

// 导入数据库
var db = require('./../db/dbhelper');
module.exports = {
	user_action:function(app){
		// 登陆
		app.post('/login',function(req,res){
			db.mongodb.select('user',{'username':req.body.username,'password':req.body.password},function(result){
				// 获取登陆人员类型
				if(result.status && result.data.length > 0){
					var type = result.data[0].type;
					var token = jwt.sign({username:req.body.username},'str',{'expiresIn':9999});
					result.data[0]['token'] = token;
					res.send(requestHandle(true,result.data[0],'登陆成功'));
				}else{	
					res.send(requestHandle(false,[],'用户名或密码错误')); // => 保证返回结果一样
				}
			})
		})
		// 注册
		app.post('/register',function(req,res){

			db.mongodb.select('user',{username:req.body.username},function(result){

				// 查询用户是否存在
				if(result.status && result.data.length == 0){
					// 插入数据
					db.mongodb.insert('user',{username:req.body.username,password:req.body.password,type:'2'},function(result){
						// console.log(result);
						if(result.status && result.data.result.n == 1){
							res.send(requestHandle(true,result.data.ops,'注册成功'));
						}
					})
				}else{
					res.send(requestHandle(false,[],'用户已经存在'))
				}
			})
		})

		// 界面跳转
		app.get('/index',function(req,res){
			var token = req.query.token;
			var type = req.query.type;
			var info = {};
			for(var attr in req.query){
				if(attr == '_id'){
					info[attr] = ObjectID(req.query[attr]);
				}else if(attr == "username"){
					info[attr] = req.query[attr];
				}
			}

			jwt.verify(token,'str',function(err,result){
				if(err){
					res.send(requestHandle(false,[],'请求出错'));
				}else{
					// 给用户表添加一个标识字段 => type:1 => 管理员 2 => 收银员
					switch(type){
						case '1':
							db.mongodb.select('user',info,function(result){
								res.send(requestHandle(true,result,'管理员'));
							});
							break;
						case '2':
							db.mongodb.select('user',{'type':type},function(result){
								res.send(requestHandle(true,result,'收银员'));
							});
							break;
					}
				}
			})
		})
		// 管理人界面
		app.post('/admin',function(req,res){
			var action = req.body.action;
			switch(action){
				case '1': // => 删除
					db.mongodb.delete('user',{username:req.body.username},function(result){
						if(result.status && result.data.result.n == 1){
							res.send(requestHandle(true,result.data.result,'操作成功'));
						}else{
							res.send(requestHandle(false,result.data.result,'失败'));
						}
					})
					break;
				case '2': // => 更新
					db.mongodb.select('user',{_id:ObjectID(req.body._id)},function(result){

						if(result.status && result.data != 0){
							db.mongodb.update('user',[result.data,{username:req.body.username,password:req.body.password,type:req.body.type}],function(result){
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
					break;
			}
		})
	}
}