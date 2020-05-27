import { fetchData, postData } from './test'
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
    init:function(){
        let bodyelement = document.querySelector('body')
        this.render()
    },
    render:function(){
        let data = controller.getthistrip()
        console.log(data)
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
    addtrip:async function(data){
        await tripObject.add(data)
    },
    removetrip:async function(){
        await tripObject.remove()
    }
}
export { controller }