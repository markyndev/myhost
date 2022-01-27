//FrameWorks

const low = require('lowdb')
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser")
let status = 0
let cloud = undefined
// Configurações de renderização 
var handle = handlebars.create({
    defaultLayout: 'main'
});
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.engine('handlebars', handle.engine);
app.set('view engine', 'handlebars');
// Configurações BodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Rotas

app.get('/MHPanel/config', function (req, res) {

    if(cloud === undefined){
        console.log(`[MyHost] Apparently you haven't configured your cloud yet.`)
    res.render('./config')
    app.post('/MHPanel/config', function (req, res) {
        let receber = req.body
        cloud = `http://${receber.ip}:${receber.port}`
        app.listen(receber.port, receber.ip);

        app.use(express.static('./public'));
        console.log(`-`)
         console.log(`[MyHost] Your cloud is running on http://${receber.ip}:${receber.port}`)
         res.render('./alert',{errorname:"You are successfully hosting a website!",errordesc:`To be able to access on other devices on the network it may be necessary to allow connections from "NodeJS" in your firewall.`,button:`Go to ${cloud}`,action: `location.href = '${cloud}';`})
        
    });
}else{
    console.log(cloud)
   console.log(`[MyHost] ERROR: You've already set up your cloud... CLOSING MyHost`)
   res.render('./alert',{errorname:"ERROR: You've already set up your cloud",errordesc:`Just once you can configure your cloud domain, port and folder. \n If you want to reconfigure it is necessary to restart MyHost`,button:`Go to ${cloud}`,action: `location.href = '${cloud}';`})

} 
})

// Respostas servidor
const port = 80;
console.log("Welcome to MyHost - Share your web pages easily and quickly over the network")
console.log("")
var cfg_server = app.listen(process.env.PORT || port, () => console.log(`[MyHost] first config the cloud: http://localhost/MHPanel/config`));

