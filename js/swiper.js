// ================= PORTFOLIO SWIPER =================
if ($(".swiper-portfolio").length) {
  new Swiper(".swiper-portfolio", {
    slidesPerView: 5,
    spaceBetween: 10,
    speed: 1000,
    loop: false,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".sw-pagination-portfolio",
      clickable: true,
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1200: { slidesPerView: 5 },
    },
  });
}


// ================= TESTIMONIAL SWIPER =================
$(document).ready(function () {

  let swiperTestimonialLeft = null;
  let swiperTestimonialRight = null;

  if ($(".swiper-testimonial-left").length > 0) {
    swiperTestimonialLeft = new Swiper(".swiper-testimonial-left", {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 800,
      loop: true,
      allowTouchMove: true,
      grabCursor: true,

      breakpoints: {
        0: {
          slidesPerView: 1,
          centeredSlides: true,
        },
        992: {
          slidesPerView: 1,
          centeredSlides: false,
        }
      }
    });
  }

  if ($(".swiper-testimonial-right").length > 0) {
    swiperTestimonialRight = new Swiper(".swiper-testimonial-right", {
      slidesPerView: 1,
      spaceBetween: 30,
      speed: 800,
      loop: true,
      autoHeight: true,
      pagination: {
        el: ".sw-pagination-testimonial",
        clickable: true,
      },
    });
  }

  if (swiperTestimonialLeft && swiperTestimonialRight) {
    swiperTestimonialLeft.controller.control = swiperTestimonialRight;
    swiperTestimonialRight.controller.control = swiperTestimonialLeft;
  }

});


// ================= HOME RIGHT SLIDER =================
if ($(".slider-home-right").length > 0) {
  var swiperTestimonialLeft = new Swiper(".slider-home-right", {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 1500,
    loop: true,

   

    navigation: {
      nextEl: ".sw-btn-next",
      prevEl: ".sw-btn-prev",
    },

    pagination: {
      el: ".sw-pagination-testimonial",
      clickable: true,
    },
  });
}



// ================= PORTFOLIO SLIDER =================
if ($(".portfolio-slider").length > 0) {

  var swiperPortfolio = new Swiper(".portfolio-slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 600,
    loop: false,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

    breakpoints: {
      1400: { slidesPerView: 4 },
      1200: { slidesPerView: 4 },
      992: { slidesPerView: 3 },
      768: { slidesPerView: 2 },
      0: { slidesPerView: 1 }
    }
  });

}


// ================= VIDEO POPUP =================
$(document).ready(function () {


  $('.video-play-button').on('click', function (e) {
    e.preventDefault();
    var videoSrc = $(this).attr('data-video');
    $('#videoFrame').attr('src', videoSrc);
    $('#videoPopup').css('display', 'flex');
  });


  $('#videoClose').on('click', function () {
    $('#videoFrame').attr('src', '');
    $('#videoPopup').css('display', 'none');
  });

  $('#videoPopup').on('click', function (e) {
    if (e.target === this) {
      $('#videoFrame').attr('src', '');
      $('#videoPopup').css('display', 'none');
    }
  });

});


// ================= COURSE DETAILS SLIDER =================
$(document).ready(function () {

  const courseSlider = new Swiper('.course-details-slider', {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 30,
    loop: false,
    speed: 800,

    navigation: {
      nextEl: '.course-details-slider .sw-next',
      prevEl: '.course-details-slider .sw-prev',
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      }
    }
  });

});


