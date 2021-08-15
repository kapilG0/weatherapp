const request=require('request')
const forecast=(latitude,longitude,callback)=>{

const url="http://api.weatherstack.com/current?access_key=19486c1fdefba2eebfddb5897e4b0989&query="+latitude+","+longitude+"&units=f"
request({url:url,json:true},(error,response)=>{
    if(error){
        callback('network issue',undefined)
    }else if(response.body.error){
        console.log(response.body.error,'error')
        callback('Unable to find location ',undefined)
    }
    else{
    callback(undefined,"it is currently" + response.body.current.temperature + " degree out, it feel like "+ response.body.current.feelslike+ "degree out")    


}

})
}
module.exports=forecast