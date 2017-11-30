var db = require('./../db/dbhelper');
// var apiresult = require('../modules/apiresult');
var requestHandle = require('./../modules/requestHandle');


module.exports = {
    register: function(app){
        // console.log(app);
        app.post('/getsettleAccout',function(req, res){
        	// console.log(req.body);
        	db.mongodb.select('goods',{goodno:req.body.goodno},function(result){ // => 把这个集合换成你的
                // console.log(req.body);
        		// console.log(result.data.length);
                   console.log(result);
        		if(result.status && result.data.length != 0){
        			res.send(requestHandle(true,result.data,'success'));
        		}else{
        			res.send(requestHandle(false,[],'不存在的商品'));
        		}
        	})
        })
    }
}