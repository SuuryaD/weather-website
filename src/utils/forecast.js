const request = require('request')


const forecast = (longitude , latitude , callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/forecast?lat='+encodeURIComponent(longitude) +'&lon='+encodeURIComponent(latitude) + '&APPID=0ffed00932a4dd397735339063362f52&cnt=2'
    request({url , json: true} , (error , { body }) => {
        if(error){
            callback('Unable to connect to the weather service')
        }
        else if(body.message){
            callback('cannot find the place')
        }
        else{
            callback(undefined , 'it is currently ' + body.list[0].main.temp + '. the humidity is ' + body.list[0].main.humidity)
        }
    })
}
module.exports = forecast