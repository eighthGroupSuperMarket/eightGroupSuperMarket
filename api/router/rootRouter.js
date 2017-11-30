var express = require('express');

var app = express();
var bp = require('body-parser');

var user = require('./user.js');
var products = require(('./products.js'));
var productRouter = require('./product');
var purchaseRouter = require('./purchaseRouter');
var paymentRouter = require('./payment');
var sellpayRouter = require('./settleAccout');
var updateRouter = require('./update');

var path = require('path');

module.exports = {
	start:function(_port){ // => 
		app.use(bp.urlencoded({extended:false}));

		// app.use(express.static(path.join(__dirname,'/')));
		app.use(express.static(path.join(__dirname,'../../')));

		// 跨域决解方案
		app.all('*', function(req, res, next) {
		    res.header("Access-Control-Allow-Origin", "*");
		    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
		    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		    res.header("X-Powered-By",' 3.2.1')
		    if(req.method=="OPTIONS") {
		          res.sendStatus(200); /*让options请求快速返回*/
		    } else{
		          next();
		    }
		});

		user.user_action(app);
		products.products_action(app);
		app.listen(_port);

		// r
		productRouter.register(app);
        purchaseRouter.register(app);
        paymentRouter.register(app);

        // x
        sellpayRouter.register(app);

        // w
        updateRouter.change(app);
        updateRouter.gengxin(app);
        updateRouter.insert(app);
        updateRouter.delete(app);
        updateRouter.select(app);
        updateRouter.chaxun(app);
		console.log(`server running http://localhost${_port}`);
	}
}