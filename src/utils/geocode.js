const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoia2EwIiwiYSI6ImNrc2JncmY0NDA2bmEyd3BrajJ4YWptdXAifQ.xYkA7djALTYDyI7CbLIvLA'
    request({url:url,json:true},(error,response)=>{
    if(error){
        callback('network issue',undefined)
    }else if(response.body.features.length === 0){
        callback('unable to find location please check address',undefined)
    }
    else{
        callback(undefined,{
            latitude:response.body.features[0].center[1],
            longitude:response.body.features[0].center[0],
            location:response.body.features[0].place_name
        })
    }
})

}
module.exports= geocode