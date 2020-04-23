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
	this.paragraph1=function(){
		return this.paragraph1;
	};
	this.paragraph1=function(content){
		this.paragraph1=content;
	};
	this.getparagraph2=function(){
		return this.paragraph2;
	};
	this.paragraph2=function(content){
		this.paragraph2=content;
	};
};
var sections={
	sections=[];
	init:function(sectionCount) {
		for (var i = 0; i <= sectionCount; i++) {
			let id="section"+(i+1);
			let header="Section"+" "+id;
			let content1="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.";
			let content2="Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.";
			let section=new Section(id,header,content1,content2);
			sections.push(Section);
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



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


