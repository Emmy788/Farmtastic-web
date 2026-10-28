// Home (Slideshow images)
 document.addEventListener('scroll', () => {
     const header = document.querySelector('header');
     if (!header) {
         return;
     }

     if (window.scrollY > 0) {
         header.classList.add('scrolled');
     } else {
         header.classList.remove('scrolled');
     }
 });

//  Join Us Button
function redirectToPage() {
    // Change the URL to the desired page
    window.location.href = "http://127.0.0.1:5500/signup.html";
}
// Sidebar
    function showSidebar(){
        const sidebar = document.querySelector('.sidebar')
        sidebar.style.display = 'flex'
    }
    function hideSidebar(){
        const sidebar = document.querySelector('.sidebar')
        sidebar.style.display = 'none'
    }

// Header (Active link)
let section=document.querySelectorAll('section')
let navLink=document.querySelectorAll('header nav a')
window.onscroll=()=>{
    section.forEach(sec=>{
        let top=window.scrollY;
        let offset=sec.offsetTop-150;
        let height=sec.offsetHeight;
        let id=sec.getAttribute('id')
        if(top>offset && top<offset + height){
            navLink.forEach(links=>{
                links.classList.remove('active')
                const activeLink = document.querySelector('header nav a[href*='+id+']')
                if (activeLink) {
                    activeLink.classList.add('active')
                }
            })
        }
    })
}

// Services
let valueDisplays = document.querySelectorAll(".num");
let interval = 4000;

valueDisplays.forEach((valueDisplays) => {
    let startValue = 0;
    let endValue = parseInt(valueDisplays.getAttribute
        ("data-val"));
    let duration = Math.floor(interval / endValue);
    let counter = setInterval(function () {
        startValue += 1;
        valueDisplays.textContent = startValue;
        if(startValue == endValue) {
            clearInterval(counter);
        }
    }, duration);
});


// To-top scroll button
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if (!toTop) {
        return;
    }

    if (window.pageYOffset > 100) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
})

// Reveal Website Elements on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

document.querySelectorAll('[data-current-year]').forEach((year) => {
    year.textContent = new Date().getFullYear();
});