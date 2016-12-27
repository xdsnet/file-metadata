'use strict'
var express = require('express'),
    app = express();

var multer = require('multer');
var upload = multer();
var fs = require('fs');
var read = fs.readFileSync;
var ejs = require('ejs');

//设置监听端口为配置的PORT或者80
var port = process.env.PORT || 80;


    
app.post('/filemeta', upload.single('file'), function(req, res) {
    var name = req.file.originalname;
    var size = req.file.size;
    res.json(
        {
            'name': name,
            'size': size
        }
    );
});

app.get('/',function(req,res){
  let serverHost=req.protocol+"://"+req.host+"/"
  let noRestStr= ejs.render(read("root.ejs","utf-8"),{serverHost:serverHost});
  res.end(noRestStr)
});

app.get("/*",function(req,res){
    res.redirect('/');
});

console.log("服务已启动，监听端口:" + port);
var listener = app.listen(port);