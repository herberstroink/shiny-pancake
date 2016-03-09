const PORT=8080;
var express = require('express'),
    app = express();
var fs = require('fs');

app.use(express.static('public/css'));
app.use(express.static('public/html'));
app.use(express.static('public/images'));
app.use(express.static('public/media'));
app.use(express.static('public/scripts'));

app.get('/', function(req,res){
    fs.readFile("html/index.html", function(err, data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(data);
        res.end();
    });
});

app.get('/blog/:year?/:month?/:entrytitle?',function(req,res){
    var reqpath = +req.params.year+'/'+req.params.month+'/'+req.params.entrytitle+".html";

    fs.readFile("blog/" + reqpath, function(err, data){
        if(err){
            res.send(err);

        }
        else{
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(data);
            res.end();
        }
    });
    //console.log(req.params);
   // res.send('blog/'+req.params.year+'/'+req.params.month+'/'+req.params.entrytitle);
});

var server = app.listen(PORT, function(){
    console.log("Server listening on http://localhost:%s",PORT);
});