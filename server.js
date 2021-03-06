const express = require('express');
const hbs = require('hbs');


const port=process.env.PORT||3000;
const fs=require('fs');
var app = express();
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});


hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})

//app.set('template engine', 'hbs');


/* app.use((req,res,next)=>{
    res.render('maintainance.hbs'); 
})
 */app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now}:${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile('server.log',log+'\n',(err)=>{
        console.log(err);
    })
    next();
});

app.get('/', (req, res) => {
    res.render('home.hbs',{
        welcomeMessage:'What the hell welcomes you',
        pageTitle:'Brand New Companys',
        getCurrentYear:'2016'
    });
});




app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle:'About Page',
        currentYear:new Date().getFullYear()
    })
});


app.get('/projects', (req, res) => {
    res.render('projects.hbs',{
        pageTitle:'Projects',
        getCurrentYear:'2016'
    });
});




app.listen(port, () => {
    console.log(`listening on ${port}`);
});