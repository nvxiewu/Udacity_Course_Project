function datevalidation(date){
    let arr = date.split("/").reverse();
    let year = parseInt(arr[0],10)
    let month = parseInt(arr[1],10)
    let day = parseInt(arr[2],10)
    let validate = new Date(year,month-1,day)
    if(year === validate.getFullYear() && month === validate.getMonth()+1 && day === validate.getDate()){
        return true
    }else{
        return false
    }
}

export{ datevalidation }