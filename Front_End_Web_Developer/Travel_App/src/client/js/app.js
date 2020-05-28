import { fetchData, postData } from './test'
import { datevalidation } from './formvalid'
const proxy = "https://cors-anywhere.herokuapp.com/"
const pxbaseurl = "https://pixabay.com/api/?key="
const pxapikey = "16616229-1aef1d0b813d684a8cde80c7e"
const darkskybaseurl="https://api.darksky.net/forecast/8755b770092b4abe92e2f7bf9a4b6ec6/"
const geobaseurl = "http://api.geonames.org/searchJSON?q="
const geouserstr = "&maxRows=10&username=nvxiewu123"

const tripObject = {
    mytrip:{},
    init:async function(){
        let data = await fetchData('http://localhost:3000/all')
        this.mytrip = data
    },
    get:function(){
        return this.mytrip
    },
    add:async function(data){
        let newdata = await postData('http://localhost:3000/add',data)
        this.mytrip = newdata
    },
    remove:async function(){
        let newdata = await postData('http://localhost:3000/add',{})
        this.mytrip = newdata
    }
}
const viewObject = {
    e_mytrip:document.querySelector('.mytrip'),
    e_div_picture:document.querySelector('.picture'),
    e_picture:document.querySelector('.picture img'),
    e_form:document.querySelector('form'),
    e_location:document.querySelector('#location'),
    e_date:document.querySelector('#date'),
    e_div_btn:document.querySelector('.btn'),
    e_save:document.querySelector('.save'),
    e_remove:document.querySelector('.remove'),
    e_div_result:document.querySelector('.result'),
    init:function(){
        this.e_save.addEventListener('click',e=>{
           controller.addtrip().then(res=>{
                controller.setthistrip(tripObject.get())
                controller.setthistripstate(true)
                this.render()
            })
        })
        this.e_remove.addEventListener('click',e=>{
            controller.removetrip().then(res=>{
                controller.setthistrip(tripObject.get())
                controller.setthistripstate(true)
                this.render()
            })
        })
        this.e_form.addEventListener('submit',e=>{
            e.preventDefault()
            let location = this.e_location.value
            let date = this.e_date.value
            if(!datevalidation(date)){
                alert("不合法的日期！")
                return false
            }
            let datetime = date.split('/').reverse().join('-')+"T01:00:00"
            fetchData(geobaseurl+encodeURIComponent(location)+geouserstr).then(data=>{
                console.log(data)
                let lat = data.geonames[0].lat
                let lng = data.geonames[0].lng
                let country = data.geonames[0].countryName
                let pixres = fetchData(pxbaseurl+pxapikey+"&q="+encodeURIComponent(location))
                let darkskyres = fetchData(proxy+darkskybaseurl+lat+","+lng+","+datetime)
                Promise.all([pixres,darkskyres]).then(values=>{
                    let data = {
                        country:country,
                        location:location,
                        date:date,
                        hightemp:values[1].daily.data[0].apparentTemperatureHigh,
                        lowtemp:values[1].daily.data[0].apparentTemperatureLow,
                        summary:values[1].daily.data[0].summary,
                        imgurl:values[0].hits[0].largeImageURL
                    }
                    controller.setthistrip(data)
                    controller.setthistripstate(false)
                    this.render()
                })
            }).catch(error=>{
                console.log(error)
            })
        })
        this.e_form.addEventListener('onkeyup',e=>{
            if(e.keyCode === '13'){
                this.e_form.submit()
            }
        })
        this.render()
    },
    render:function(){
        let data = controller.getthistrip()
        if(JSON.stringify(data)!=='{}'){
            this.e_picture.setAttribute('src',data.imgurl)
            this.e_location.setAttribute('value',data.location)
            this.e_date.setAttribute('value',data.date)
            this.e_div_result.innerHTML = `<p>${data.location},${data.country} is ${data.date} days away</p><p>Typical weather for then is:</p><p>High - ${data.hightemp},Low - ${data.lowtemp}<br>${data.summary}</p>`
            this.e_mytrip.classList.remove('empty')
            if(controller.getthisstripstate()){
                this.e_mytrip.classList.add('saveed')
                this.e_mytrip.classList.remove('nosaveed')
                this.e_save.disabled = true
                this.e_remove.disabled = false
            }else{
                this.e_mytrip.classList.add('nosaveed')
                this.e_mytrip.classList.remove('saveed')
                this.e_save.disabled = false
                this.e_remove.disabled = true
            }
        }else{
            this.e_location.value = ""
            this.e_date.value = ""
            this.e_mytrip.classList.add('empty')
            this.e_save.disabled = true
        }
    }
}
const controller = {
    thistrip:{},
    issave:true,
    init:function(){
        tripObject.init().then(res=>{
            this.setthistrip(tripObject.get())
            this.setthistripstate(true)
            viewObject.init()
        })
    },
    getthistrip:function(){
        return this.thistrip
    },
    setthistrip:function(data){
        this.thistrip = data
    },
    setthistripstate:function(b){
        this.issave = b
    },
    getthisstripstate:function(){
        return this.issave
    },
    addtrip:async function(){
        await tripObject.add(this.thistrip)
    },
    removetrip:async function(){
        await tripObject.remove()
    }
}
export { controller }