//Banner
$('#banner').owlCarousel({
  loop:true,
  margin:10,
  nav:false,
//navText:["<div class='nav-btn prev-slide'><i class='fas fa-angle-left'></i></div>","<div class='nav-btn next-slide'><i class='fas fa-angle-right'></i></i></div>"],
loop: true,
 slideSpeed: 300,
  autoplay: true,
  animateOut: 'fadeOut',
  responsive:{
      0:{
          items:1
      },
      600:{
          items:1
      },
      1000:{
          items:1
      }
  }
})
//end

//client logo
$('#testimonial').owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    navText: ["<div class='nav-btn prev-slide'><i class='fas fa-angle-left'></i></div>", "<div class='nav-btn next-slide'><i class='fas fa-angle-right'></i></i></div>"],
    loop: true,
    slideSpeed: 300,
    autoplay: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 2
        }
    }
})
//end