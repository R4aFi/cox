/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}


/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*=============== ADD BLUR TO HEADER ===============*/
const blurHeader = () => {
    const header = document.getElementById('header');
    this.scrollY >= 50 ? header.classList.add('blur-header') : header.classList.remove('blur-header');
}
window.addEventListener('scroll', blurHeader);

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp =()=>{
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll');
}

window.addEventListener('scroll',scrollUp)
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr =ScrollReveal({
    origin:'top',
    distance: '60px',
    duration: 2500,
    delay: 400
})

sr.reveal(`.home__data, .explore__data, .explore__user, .footer__container`)
sr.reveal(`.home__card`,{delay:600,distance:'100px',interval:100})
sr.reveal(`.about__data, .join__image`,{origin:'right'})
sr.reveal(`.about__image, .join__data`,{origin:'left'})
sr.reveal(`.popular__card`,{interval:200})

// video not download script 
document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('video');
    
    // Comprehensive download prevention techniques
    const preventDownload = () => {
      // Disable default browser download behaviors
      video.removeAttribute('download');
      video.setAttribute('disablePictureInPicture', 'true');
  
      // Block right-click and context menu
      video.oncontextmenu = (e) => {
        e.preventDefault();
        return false;
      };
  
      // Prevent drag operations
      video.ondragstart = (e) => {
        e.preventDefault();
        return false;
      };
  
      // Intercept and modify video source dynamically
      Object.defineProperty(video, 'src', {
        set: function(value) {
          // Custom source setting logic to prevent direct access
          if (value.includes('assets/videos/')) {
            this.setAttribute('src', value);
          }
        }
      });
  
      // Additional network request interception
      video.addEventListener('play', () => {
        const originalSrc = video.currentSrc;
        const modifiedSrc = originalSrc + '?token=' + Date.now();
        video.src = modifiedSrc;
      });
    };
  
    // Initial prevention
    preventDownload();
  
    // Periodic re-application to handle dynamic changes
    const observer = new MutationObserver(preventDownload);
    observer.observe(video, { 
      attributes: true, 
      attributeFilter: ['src'] 
    });
  });