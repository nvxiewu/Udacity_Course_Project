/* Global Variables */
// Personal API Key for OpenWeatherMap API  
const apikey = '&appid=60b6d92be306b99df61f3bea2445486f';
// Base URL for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click',performAction);

function performAction(e) {
	const zipCod = document.getElementById('zip').value;
	const feeling = document.getElementById('feelings').value;
	getTemp(baseURL,zipCod,apikey)
	.then((data)=>{
		postData('/add',{temp:data.main.temp,feel:feeling,date:newDate});
	})
	.then(()=>{
		updateUI();
	})
	.catch((e)=>{
		console.log('error',e);
	});
}

const getTemp = async (baseURL,zipCod,apikey)=>{
	const res = await fetch(baseURL+zipCod+apikey)
	try {
		const data = await res.json();
		return data;
	} catch(e) {
		console.log("error",e);
	}
}

const postData = async (url='',data={})=>{
	const res=await fetch(url,{
		method:'POST',
		credentials:'same-origin',
		headers: {
			'Content-Type':'application/json',
		},
		body:JSON.stringify(data)
	});

	try {
		const newData = await res.json();
		return newData
	}catch(e){
		console.log("error",e);
	}
}

const updateUI = async ()=> {
	const req = await fetch('/all')
	try{
		const allData= await req.json();
		document.getElementById('date').innerHTML=allData.date;
		document.getElementById('temp').innerHTML=allData.temp;
		document.getElementById('content').innerHTML=allData.feel;

	}catch(e){
		console.log("error",e);
	}
}