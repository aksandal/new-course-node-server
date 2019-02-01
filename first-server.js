const express=require('express')
const hbs=require('hbs')
const fs=require('fs')
var app=express()




//hbs config
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})


//set the view engine to use hbs 
app.set('view engine','hbs')




//make these file public
app.use((req,res,next)=>{
    let log=`${new Date().toString}: ${req.method} ${req.url}`
    fs.appendFile('server.log',log+'\n',(error)=>{
        if(error){
            throw error
        }
    })
    next()    
})

// app.use((req,res,next)=>{
//     res.render('maintainance.hbs')
// })



app.get('/',(req,res)=>{
    res.render('home.hbs',{
        welcomeMessage:'What the hell welcomes you',
        pageTitle:'Brand New Companys',
        getCurrentYear:'2016'
    })
})
//place it below action so that middleware put function are overwrite them
app.use(express.static(__dirname+'/public'))

app.listen(3000)