var express = require('express');
var router = express.Router();

var request = require('superagent');
var cheerio = require('cheerio');


/*
 * 首页
 * */
router.get('/', function (req, res, next) {
     res.render('main/index');
});


/*cp*/
router.get('/datalist', function (req, res, next) {
    var requestData={
        siteCode:'HELSSC1',
        noOfD:req.query.num
    }

    request
    .post('https://www.hl8mem.com/cp/loadDrawHistory.do',requestData)
    .set('Content-Type', 'application/json')
    .type("form")
    .end((err, data) => {

        if(data && data.text){
            var newdata = data.text.replace(/\\/g,"").replace(/\"\[/g,"[").replace(/\]\"/g,"]");
            res.json(newdata)
        }else{
             res.json({
                message:'网络超时'
            })
        }

    });

});



router.get('/*', function (req, res) {
    res.send("404-您访问的页面丢失了！！！");

});

module.exports = router;