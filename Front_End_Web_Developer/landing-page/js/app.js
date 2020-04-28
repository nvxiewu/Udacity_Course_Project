/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
function Section(id,header,content1,content2){
	this.id=id;
	this.header=header;
	this.paragraph1=content1;
	this.paragraph2=content2;
	this.getid=function(){
		return this.id;
	};
	this.setid=function(id){
		this.id=id;
	};
	this.getheader=function(){
		return this.header;
	};
	this.setheader=function(header){
		this.header=header;
	};
	this.getparagraph1=function(){
		return this.paragraph1;
	};
	this.setparagraph1=function(content){
		this.paragraph1=content;
	};
	this.getparagraph2=function(){
		return this.paragraph2;
	};
	this.setparagraph2=function(content){
		this.paragraph2=content;
	};
}

var sections={
	sections: [],
	init:function(sectionCount) {
		for (var i = 0; i < sectionCount; i++) {
			let id="section"+(i+1);
			let header="Section"+" "+(i+1);
			let content1="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.";
			let content2="Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.";
			let section=new Section(id,header,content1,content2);
			this.sections.push(section);
		};
	},
	getsections:function() {
		return this.sections;
	}
};

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
let callback=(entries,observer) => {
	entries.forEach(entry => {
    	switch(entry.target.tagName){
        	case "HEADER":
          	if(entry.intersectionRatio>=0.5){
          		controler.setisinTopSection(true);
          		backToView.setunvisible();
          		controler.removTimeout_to_navbar();
          	}else{
            	controler.setisinTopSection(false);
            	backToView.setvisible();
          	};
          	break;
        	case "SECTION":
          	if(entry.intersectionRatio>=0.5){
            	entry.target.classList.add("your-active-class");
            	navView.setactive(entry.target.dataset.nav);
          	}else{
            	entry.target.classList.remove("your-active-class");
            	navView.removeactive(entry.target.dataset.nav);
          	};
          	break;
      	};
    });
	
};
let observer=new IntersectionObserver(callback,{threshold:0.5});


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

var navView={
	navbarElement:document.querySelector(".page__header"),
	init:function(){
		let sections=controler.getsections();
		let fragment=document.createDocumentFragment();
		let mynavlist=document.querySelector("#navbar__list");
		sections.forEach(section=>{
			let mylink=document.createElement('li');
			let mylinka=document.createElement('a'); 
			mylinka.textContent=section.getheader();
			mylinka.setAttribute("href","#"+section.getid());
			mylinka.setAttribute("class","menu__link");
			mylink.appendChild(mylinka);
			fragment.appendChild(mylink); 
		});
		mynavlist.appendChild(fragment);
		this.navbarElement.addEventListener("mouseenter",()=>{
			console.log("mouse in navbar");
			controler.setismoseinnavbar(true);
			controler.removTimeout_to_navbar();
		});
		this.navbarElement.addEventListener("mouseleave",()=>{
			console.log("mouse out navbar");
			controler.setismoseinnavbar(false);
			controler.addTimeout_to_navbar(10000);
		});
		this.navbarElement.addEventListener("touchstart",event=>{
			console.log("finger in navbar");
			event.preventDefault();
			if(!controler.getisfingerinnavbar()){
				controler.setisfingerinnavbar(true);
				controler.removTimeout_to_navbar();
			}
		});
		this.navbarElement.addEventListener("touchend",event=>{
			console.log("finger out navbar");
			controler.setisfingerinnavbar(false);
			controler.addTimeout_to_navbar(10000);
		});
	},
	setactive:function(data){
		let activeLinks=document.evaluate("//a[contains(.,'"+data+"')]",document,null,XPathResult.ANY_TYPE,null);
    	let activeLink=activeLinks.iterateNext();
    	activeLink.classList.add("your-active-class");
	},
	removeactive:function(data){
		let activeLinks=document.evaluate("//a[contains(.,'"+data+"')]",document,null,XPathResult.ANY_TYPE,null);
    	let activeLink=activeLinks.iterateNext();
    	activeLink.classList.remove("your-active-class");		
	},
	setunvisible:function() {
		this.navbarElement.style.visibility="hidden";
	},
	setvisible:function() {
		this.navbarElement.style.visibility="visible";
	}
}
// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
var sectionView={
	init:function(){
		let sections=controler.getsections();
		let fragment=document.createDocumentFragment();
		let myMainElement=document.querySelector("main");
		let mymainHearo=document.querySelector(".main__hero");
		sections.forEach(section=>{
			let mysection=document.createElement("section");
			let mydivForLandingContainer=document.createElement("div");
			let myHeader=document.createElement("h2");
			let myParagraph1=document.createElement("p");
			let myParagraph2=document.createElement("p");
			myHeader.textContent=section.getheader();
			myHeader.setAttribute("title","Click to collapse");
			myParagraph1.textContent=section.getparagraph1();
			myParagraph2.textContent=section.getparagraph2();
			mydivForLandingContainer.appendChild(myHeader);
			mydivForLandingContainer.appendChild(myParagraph1);
			mydivForLandingContainer.appendChild(myParagraph2);
			mydivForLandingContainer.setAttribute("class","landing__container");
			mysection.setAttribute("id",section.getid());
			mysection.setAttribute("data-nav",section.getheader());
			mysection.appendChild(mydivForLandingContainer);
			fragment.appendChild(mysection);
			observer.observe(mysection);
		});
		myMainElement.appendChild(fragment);
		observer.observe(mymainHearo);
		myMainElement.addEventListener("click",event=>{
			if(event.target.tagName==="H2"){
				let fe=event.target.nextElementSibling;
				let se=fe.nextElementSibling;
				let pe=event.target.parentElement;
				let gpe=pe.parentElement;
				if(!event.target.classList.contains("collapse")){
					gpe.style.minHeight="0";
					fe.style.display="none";
					se.style.display="none";
					event.target.classList.add("collapse");
					event.target.setAttribute("title","Click to expand");
				}else{
					gpe.style.minHeight="80vh";
					fe.style.display="block";
					se.style.display="block";
					event.target.classList.remove("collapse");
					event.target.setAttribute("title","Click to collapse");
				};
			}
		});
	}
}

var backToView={
	mybackTo:document.querySelector(".backToTop"),
	init:function() {
		this.mybackTo.addEventListener("click",event=>{
			window.scrollTo(0,0);
		});
	},
	setunvisible:function() {
		this.mybackTo.style.visibility="hidden";
	},
	setvisible:function() {
		this.mybackTo.style.visibility="visible";
	}
}
// Scroll to section on link click

// Set sections as active

var controler={
	timeoutID:0,
	isinTopSection:true,
	ismoseinnavbar:false,
	isfingerinnavbar:false,
	issetTimeout:false,
	init:function(){
		sections.init(4);
		backToView.init();
		sectionView.init();
		navView.init();
		window.addEventListener("scroll",()=>{
			if(!controler.getisinTopSection()){
				controler.addTimeout_to_navbar(10000);
			};
		});
	},
	getsections:function(){
		return sections.getsections();
	},
	setisinTopSection:function(b){
		this.isinTopSection=b;
	},
	getisinTopSection:function(){
		return this.isinTopSection;
	},
	settimeoutID:function(id){
		this.timeoutID=id;
	},
	gettimeoutID:function(){
		return this.timeoutID;
	},
	getismoseinnavbar:function() {
		return this.ismoseinnavbar;
	},
	setismoseinnavbar:function(b) {
		this.ismoseinnavbar=b;
	},
	getissetTimeout:function() {
		return this.issetTimeout;
	},
	setissetTimeout:function(b) {
		this.issetTimeout=b;
	},
	getisfingerinnavbar:function() {
		return this.isfingerinnavbar;
	},
	setisfingerinnavbar:function(b) {
		this.isfingerinnavbar=b;
	},
	addTimeout_to_navbar:function(time) {
		if(!this.getismoseinnavbar()&&!this.getisinTopSection()&&!this.getissetTimeout()&&!this.getisfingerinnavbar()){
			navView.setvisible();
			this.setissetTimeout(true);
			this.settimeoutID(window.setTimeout(()=>{
				navView.setunvisible();
				controler.setissetTimeout(false);
			},time));
			console.log(this.gettimeoutID());
		};
	},
	removTimeout_to_navbar:function() {
		if(this.getissetTimeout()){
			window.clearTimeout(controler.gettimeoutID());
			this.setissetTimeout(false);
			navView.setvisible();
			console.log("clearTimeout");
		};
	}
 }

controler.init();