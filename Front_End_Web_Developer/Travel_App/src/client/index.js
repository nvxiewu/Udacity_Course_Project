
import { fetchData } from './js/test'
let location = "New York"
let datetime = "2020-06-06"
let proxy = "https://cors-anywhere.herokuapp.com/"
let geourl = "http://api.geonames.org/searchJSON?q="+encodeURIComponent(location)+"&maxRows=10&username=nvxiewu123"
let darkskybaseurl="https://api.darksky.net/forecast/8755b770092b4abe92e2f7bf9a4b6ec6/"
let pxbaseurl = "https://pixabay.com/api/?key="
let pxapikey = "16616229-1aef1d0b813d684a8cde80c7e"
let pixurl = pxbaseurl+pxapikey+"&q="+encodeURIComponent(location)
fetchData(geourl).then(data=>{
    let lat = data.geonames[0].lat
    let lng = data.geonames[0].lng
    fetchData(proxy+darkskybaseurl+lat+","+lng+","+datetime+"T01:00:00").then(data=>{
        fetchData(pixurl)
    })
})