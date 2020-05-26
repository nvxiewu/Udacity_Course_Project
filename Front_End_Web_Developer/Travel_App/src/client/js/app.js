import { fetchData, postData } from './test'
const tripObject = {
    mytrip:{},
    init:function(){
        fetchData('http://localhost:3000/all').then(data=>{
            this.updata(data)
        })
    },
    get:function(){
        return this.mytrip
    },
    add:function(data){
        postData('http://localhost:3000/add',data).then(newdata=>{
            this.updata(newdata)
        })
    },
    remove:function(){
        postData('http://localhost:3000/add',{}).then(newdata=>{
            this.updata(newdata)
        })
    },
    updata:function(data){
        Object.keys(data).forEach(key=>{
            this.mytrip[key]=data[key]
        })
    }
}
const viewObject = {
    init:function(){
        let bodyelement = document.querySelector('body')
        this.render()
    },
    render:function(){
        let data = controller.gettrip()
        console.log(data)
    }
}
const controller = {
    init:function(){
        tripObject.init()
        viewObject.init()
    },
    gettrip:function(){
        return tripObject.get()
    },
    addtrip:function(data){
        tripObject.add(data)
    },
    removetrip:function(){
        tripObject.remove()
    }
}
export { controller }