const express=require('express')
const path=require('path')
const hbs=require('hbs')
const app=express()
const view=path.join(__dirname,'../templates/views')
const partials=path.join(__dirname,'../templates/partials')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
app.set('view engine','hbs')
app.set('views',view)
hbs.registerPartials(partials)
app.use(express.static(path.join(__dirname,'../public')))
app.get('/',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'k'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'mail on kapilkggupta2@gmail.com',
        title:'help',
        name:'k'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about',
        name:'k'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send("Please provide address")
    }
    const str=req.query.address
    const address=str.charAt(0).toUpperCase()+str.slice(1)
console.log(address,'addrss')
    geocode(address,(error,{latitude , longitude, location} = { } )=>{
        if(error){
            // console.log(error)
            return res.send({error})
        }
        // console.log(data,'data')
        forecast(latitude,longitude,(error,Data)=>{
            if(error){

               return res.send({error})
            }
            console.log(location)
            console.log(Data,'data')
            res.send({
                forecast:Data,
                location:location,
                address:address
            })
        })
        
    })
    
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'k',
        errorMessage:'Help article not here'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'k',
        errorMessage:'Page not found'
    })
})
app.listen(3000,()=>{
    console.log('server')
})