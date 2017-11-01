
var express = require('express');
//加载模板处理模块
var swig = require('swig');
var mongoose = require('mongoose');
//加载body-parser，用来处理post提交过来的数据
var bodyParser = require('body-parser');
var Cookies = require('cookies');
var app = express();

app.use('/public', express.static(__dirname + '/public'));

//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views', './views');
//注册所使用的模板引擎，第一个参数必须是 view engine，第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
app.set('view engine', 'html');
//在开发过程中，需要取消模板缓存
swig.setDefaults({
    cache: false
});

//bodyparser设置
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/', require('./routers/main'));
app.listen(8082);

