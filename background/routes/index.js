var express = require('express');
var router = express.Router();
const Mongo = require("mongodb-curd");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/app/getData', function(req, res, next) {
    let { skip, limit } = req.body;
    if (!skip || !limit) {
        return res.send({ code: 2, msg: "参数不完整" });
    }
    Mongo.find("kao", "yue", (rs) => {
        if (rs) {
            let len = Math.ceil(rs.length / 10);
            Mongo.find("kao", "yue", (result) => {
                if (result) {
                    res.send({ code: 1, data: result, total: len, msg: "成功" });
                } else {
                    res.send({ code: 0, msg: "失败" });
                }
            }, {
                skip: skip,
                limit: limit
            })
        } else {
            res.send({ code: 0, msg: "失败" });
        }
    })
});

router.post('/app/addData', function(req, res, next) {
    let { name, type, img, jie } = req.body;
    if (!name || !type || !jie) {
        return res.send({ code: 2, msg: "参数不完整" });
    }
    Mongo.insert("kao", "yue", req.body, (rs) => {
        if (rs) {
            res.send({ code: 1, data: rs, msg: "成功" });
        } else {
            res.send({ code: 0, msg: "失败" });
        }
    })
});

module.exports = router;