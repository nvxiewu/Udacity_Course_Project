
//import { fetchData, postData } from './js/test'
import { controller } from './js/app'
let location = "New York"
let datetime = "2020-06-06"
let proxy = "https://cors-anywhere.herokuapp.com/"
let geourl = "http://api.geonames.org/searchJSON?q="+encodeURIComponent(location)+"&maxRows=10&username=nvxiewu123"
let darkskybaseurl="https://api.darksky.net/forecast/8755b770092b4abe92e2f7bf9a4b6ec6/"
let pxbaseurl = "https://pixabay.com/api/?key="
let pxapikey = "16616229-1aef1d0b813d684a8cde80c7e"
let pixurl = pxbaseurl+pxapikey+"&q="+encodeURIComponent(location)
//fetchData(geourl).then(data=>{
//    let lat = data.geonames[0].lat
//    let lng = data.geonames[0].lng
//    fetchData(proxy+darkskybaseurl+lat+","+lng+","+datetime+"T01:00:00").then(data=>{
//        fetchData(pixurl)
//    })
//})
//postData('http://localhost:3000/add',{
    //country:"America",
    //datetime:"2020-06-01",
    //hightemp:71.88,
    //lowtemp:63.99,
    //summary:"Partly cloudy throughout the day.",
    //imgurl:"https://pixabay.com/get/55e3d3474d57b108f5d08460962931781439dce75a4c704c7c2f7ad79349c25a_1280.jpg"
//})
//fetchData('http://localhost:3000/all')
window.onload = ()=>{
    controller.init()
}
const add = function(data) {
    controller.addtrip(data)
}
add({
    country:"America",
    datetime:"2020-06-01",
    hightemp:71.88,
    lowtemp:63.99,
    summary:"Partly cloudy throughout the day.",
    imgurl:"https://pixabay.com/get/55e3d3474d57b108f5d08460962931781439dce75a4c704c7c2f7ad79349c25a_1280.jpg"
})