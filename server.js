var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var unirest = require("unirest");
var urlencodedParser = bodyParser.urlencoded({extended: false});

var data = {
    title: "Authentication Verification",
    status: 200,
}

const port = 3000;

app.set("view engine", "ejs");
app.use("/assets", express.static('assets'));
app.use('/js', express.static(__dirname + '/node_modules/bulma-accordion/dist/js'));
app.use('/css', express.static(__dirname + '/node_modules/bulma-accordion/dist/css'));
app.get('/', (req,res) => {
    res.render("home", {data: data});
})
app.use

app.post("/", urlencodedParser, (req,res) => {
    var auth = req.body.email + ":" + req.body.password;
    var base64auth = Buffer.from(auth).toString('base64');
    connect(base64auth, res, req.body.link);
})

app.listen(port, () => console.log(`Website is hosting on http://localhost.com:${port}`));


function connect(base64auth, appres, link) {
    var req = unirest("GET", link + "/api/v2/tickets.json");
    req.headers({
        "cache-control": "no-cache",
        "Connection": "keep-alive",
        "accept-encoding": "gzip, deflate",
        "cookie": "__cfduid=d1dcade0ce08e62dc89f900d586cbfae81560220586; _zendesk_session=BAh7CEkiD3Nlc3Npb25faWQGOgZFVEkiJTgzNzUxY2RhYTJiN2IyNmMxMDQzNmJlZGMyNDFkNjZjBjsAVEkiDGFjY291bnQGOwBGaQNRLY5JIgpyb3V0ZQY7AEZpA68XKw%3D%3D--3db74e1818d97f982e8d5727656f80fd139de1be; __cfruid=bf4917398811305ee850954ca2f1690324847fe3-1560220586",
        "Host": "austinpham.zendesk.com",
        "Postman-Token": "d93dcdad-80a9-4c46-b01e-dec6aef948bf,514cad75-a37c-47b9-a944-af7091471379",
        "Cache-Control": "no-cache",
        "Accept": "*/*",
        "User-Agent": "PostmanRuntime/7.13.0",
        "Authorization": "Basic " + base64auth
      });
      
      
      req.end(function (res) {
        if (res.error) {
            console.log("Authentication Error");
            data.status = res.status;
            appres.render('home', {data:data})
        } else {
            appres.redic
            appres.render('tickets', {data: res.body});
        }      
      });
}
