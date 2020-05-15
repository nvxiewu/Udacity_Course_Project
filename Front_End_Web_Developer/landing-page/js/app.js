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


window.onload=function() {
/**
 * Define Section Class
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
/**
 * Define Sections Object
 * 
*/
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
 * Define callback function for observer object
 * 
*/
	let callback=(entries,observer) => {
		entries.forEach(entry => {
    		switch(entry.target.tagName){
// Hidden the 'bact to top' button when window near top of viewport
        		case "HEADER":
          		if(entry.intersectionRatio>=0.5){
          			backToView.setunvisible();
          		}else{
            		backToView.setvisible();
          		};
          		break;
// Add class 'active' to section and navbar when section element near top of viewport
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
/**
 * Define observer object
 * 
*/

	let observer=new IntersectionObserver(callback,{threshold:0.5});

/**
 * Define navbar view object
 * 
*/
	var navView={
		navbarElement:document.querySelector(".page__header"),
// Define init function for navbar element when window loaded.
		init:function(){
			let sections=controler.getsections();
			let fragment=document.createDocumentFragment();
			let mynavlist=document.querySelector("#navbar__list");
			sections.forEach(section=>{
				let mylink=document.createElement('li');
				let mylinka=document.createElement('a'); 
				mylinka.textContent=section.getheader();
				mylinka.setAttribute("class","menu__link");
				mylinka.classList.add("desktop");
				mylink.appendChild(mylinka);
				fragment.appendChild(mylink); 
			});
			mynavlist.appendChild(fragment);
// Add 'mouseenter' eventlistener when the screen is non-touch screen
			this.navbarElement.addEventListener("mouseenter",event=>{
				if(controler.getistouchscreen()){
					event.preventDefault();
				}else{
					controler.setismoseinnavbar(true);
					controler.removTimeout_to_navbar();
				};
			});
// Add 'mouseleave' eventlistener when the screen is non-touch screen
			this.navbarElement.addEventListener("mouseleave",event=>{
				if(controler.getistouchscreen()){
					event.preventDefault();
				}else{
					controler.setismoseinnavbar(false);
					controler.addTimeout_to_navbar(10000);
				};
			});
// Add 'touchstart' eventlistener when the screen is touch screen
			this.navbarElement.addEventListener("touchstart",event=>{
				controler.setistouchscreen(true);
				document.querySelectorAll(".desktop").forEach(item=>{
					item.classList.remove("desktop");
				});
				if(!controler.getisfingerinnavbar()){
					controler.setisfingerinnavbar(true);
					controler.removTimeout_to_navbar();
				}
			});
// add 'touched' eventlistener when the screen is touch screen
			this.navbarElement.addEventListener("touchend",event=>{
				controler.setisfingerinnavbar(false);
				controler.addTimeout_to_navbar(10000);
			});
			this.navbarElement.addEventListener("click",event=>{
				if(event.target.tagName==="A"){
					let data=event.target.textContent;
					sectionView.scrollToViewport(data);
				}
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

/**
 * Define section view object
 * 
*/
	var sectionView={
// Define init function for section element when window loaded.
		myMainElement:document.querySelector("main"),
		init:function(){
			let sections=controler.getsections();
			let fragment=document.createDocumentFragment();
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
			this.myMainElement.appendChild(fragment);
			observer.observe(mymainHearo);
// add click eventlistener to 'main' element when click section h2 header collapse the content.
			this.myMainElement.addEventListener("click",event=>{
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
		},
		scrollToViewport:function(data) {
			let sectionElement=this.myMainElement.querySelector("section[data-nav='"+data+"']");
			sectionElement.scrollIntoView({behavior:"smooth"});
		}

	}
/**
 * Define 'backtotop' button view object
 * 
*/
	var backToView={
		mybackTo:document.querySelector(".backToTop"),
// Define init function for 'backtotop' button when window loaded:add click eventlistener when user click this button let the window back to top of viewport.
		init:function() {
			this.mybackTo.addEventListener("click",event=>{
				window.scrollTo({top:0,left:0,behavior:"smooth"});
			});
		},
		setunvisible:function() {
			this.mybackTo.style.visibility="hidden";
		},
		setvisible:function() {
			this.mybackTo.style.visibility="visible";
		}
	}
/**
 * Define controler object
 * 
*/
	var controler={
// Define Global variables for describe view state.
		timeoutID:0,
		ismoseinnavbar:false,
		isfingerinnavbar:false,
		issetTimeout:false,
		istouchscreen:false,
// Define init function for Initialize data structures and views when window loaded.
		init:function(){
			sections.init(4);
			backToView.init();
			sectionView.init();
			navView.init();
			window.addEventListener("scroll",()=>{
					controler.addTimeout_to_navbar(10000);
			});
		},
		getsections:function(){
			return sections.getsections();
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
		getistouchscreen:function() {
			return this.istouchscreen;
		},
		setistouchscreen:function(b) {
			this.istouchscreen=b;
		},
// Define helper function to add timeout function to navbar.
		addTimeout_to_navbar:function(time) {
			if(!this.getismoseinnavbar()&&!this.getissetTimeout()&&!this.getisfingerinnavbar()){
				navView.setvisible();
				this.setissetTimeout(true);
				this.settimeoutID(window.setTimeout(()=>{
					navView.setunvisible();
					controler.setissetTimeout(false);
				},time));
			};
		},
// Define helper function to remove timeout function to navbar.
		removTimeout_to_navbar:function() {
			if(this.getissetTimeout()){
				window.clearTimeout(controler.gettimeoutID());
				this.setissetTimeout(false);
				navView.setvisible();
			};
		}
 	}
// Call the controller initialization function when window loaded.
 	controler.init();
}




