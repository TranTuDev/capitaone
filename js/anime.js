// ===== INFINITE SLIDE =====
$(document).ready(function () {
  $('.infiniteslide_wrap').each(function () {
    const $wrap = $(this);
    const slide = $wrap.find('.infiniteslide')[0];
    const slideWidth = slide.scrollWidth / 2;
    const tl = gsap.to(slide, {
      x: -slideWidth,
      duration: 18,
      ease: "linear",
      repeat: -1
    });

    $wrap.hover(
      function () { tl.pause(); },
      function () { tl.resume(); }
    );
  });
});
// ===== DATA ANIMATE =====
$(document).ready(function () {
  const $items = $('[data-animate]');

  function checkAnimate() {
    const windowBottom = $(window).scrollTop() + $(window).height();

    $items.each(function () {
      const itemTop = $(this).offset().top + 100;

      if (windowBottom > itemTop) {
        $(this).addClass('animated');
      }
    });
  }

  $(window).on('scroll', checkAnimate);
  checkAnimate();
});

// ===== GO TOP BUTTON =====
// ===== GO TOP BUTTON =====
$(function () {
  const $goTop = $("#goTop");

  $(window).on("scroll", function () {
    const scrollTop = $(this).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const progress = (scrollTop / docHeight) * 360;

    if (scrollTop > 300) {
      $goTop.addClass("show");
    } else {
      $goTop.removeClass("show");
    }

    $goTop.find(".border-progress")
      .css("--progress-angle", progress + "deg");
  });

  $goTop.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
  });

});

// ===== COUNTER ANIMATION =====
$(document).ready(function () {
  const $counters = $('[data-target]');

  function checkCounter() {
    const windowBottom = $(window).scrollTop() + $(window).height();

    $counters.each(function () {
      const $el = $(this);
      if ($el.data('animated')) return;

      const elementTop = $el.offset().top;

      if (windowBottom > elementTop + 100) {
        const targetValue = Number($el.data('target'));
        const suffix = $el.data('suffix') || '';

        // GSAP counter
        gsap.fromTo(
          { value: 0 },
          {
            value: targetValue,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () {
              $el.html(Math.round(this.targets()[0].value) + suffix);
            }
          }
        );

        $el.data('animated', true);
      }
    });
  }

  $(window).on('scroll', checkCounter);
  setTimeout(checkCounter, 100); // chạy lần đầu
});

// ===== PAGE TRANSITION =====
$(document).ready(function () {

  const $overlay = $(".page-transition");
  if (!$overlay.length) return;

  const $logo = $(".transition-logo");
  const panelLeft = $(".panel-left")[0];
  const panelRight = $(".panel-right")[0];

  // Split chữ nếu chưa có
  if ($logo.find("span").length === 0) {
    $logo.html(
      $logo.text().trim()
        .split("")
        .map(l => `<span>${l}</span>`)
        .join("")
    );
  }

  const letters = $(".transition-logo span").toArray();

  function playTransition() {
    $overlay.css("display", "flex");

    const tl = gsap.timeline({
      ease: "expo.inOut",
      onComplete: () => {
        $overlay.hide();

        // Reset về trạng thái ban đầu
        gsap.set(letters, { y: 60, opacity: 0, filter: "blur(8px)" });
        gsap.set([panelLeft, panelRight], { x: "0%" });
      }
    });

    tl
      .fromTo(letters,
        { y: 60, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.08
        }
      )
      .to(letters, {
        opacity: 0,
        duration: 0.4,
        delay: 0.2
      })
      .to(panelLeft, {
        x: "-100%",
        duration: 0.9
      })
      .to(panelRight, {
        x: "100%",
        duration: 0.9
      }, "-=0.9");   // chạy cùng lúc với panelLeft
  }

  // Chạy sau khi DOM ổn định
  setTimeout(playTransition, 150);
});

// ===== IMAGE PUZZLE ANIMATION =====
$(document).ready(function () {
  $('.animation-img').each(function () {
    const $img = $(this);
    const rows = 2;
    const cols = 2;
    let animated = false;

    const $parent = $img.parent();
    $parent.css({ position: 'relative', overflow: 'hidden', isolation: 'isolate' });

    function initAnimation() {
      const imgWidth = $img.outerWidth();
      const imgHeight = $img.outerHeight();
      if (!imgWidth || !imgHeight) return;

      const pieces = [];

      $img.css({ opacity: 0 });

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const $piece = $('<div></div>');
          $piece.css({
            position: 'absolute',
            width: (imgWidth / cols) + 'px',
            height: (imgHeight / rows) + 'px',
            left: (c * imgWidth / cols) + 'px',
            top: (r * imgHeight / rows) + 'px',
            backgroundImage: `url(${$img.attr('src')})`,
            backgroundSize: `${imgWidth}px ${imgHeight}px`,
            backgroundPosition: `-${c * imgWidth / cols}px -${r * imgHeight / rows}px`,
            willChange: 'transform, opacity'
          });

          $parent.append($piece);
          pieces.push($piece[0]);
        }
      }

      function checkScroll() {
        if (animated) return;
        const elementTop = $img.offset().top;
        const windowBottom = $(window).scrollTop() + $(window).height();

        if (windowBottom > elementTop + 100) {
          // Set trạng thái ban đầu
          gsap.set(pieces, {
            x: () => gsap.utils.random(-60, 60),
            y: () => gsap.utils.random(-60, 60),
            scale: 0.95,
            opacity: 0
          });

          // Animate vào
          gsap.to(pieces, {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "expo.out",
            onComplete: () => {
              $img.css('opacity', 1);

              // Fade out pieces
              gsap.to(pieces, {
                opacity: 0,
                duration: 0.25,
                onComplete: () => $(pieces).remove()
              });
            }
          });

          animated = true;
          $(window).off('scroll', checkScroll);
        }
      }

      $(window).on('scroll', checkScroll);
      checkScroll();
    }

    if ($img[0].complete) initAnimation();
    else $img.on('load', initAnimation);
  });
});


// ===== SCROLL ANIMATIONS (GSAP) =====
$(document).ready(function () {
  const isMobile = window.innerWidth <= 768;
  const moveDistance = isMobile ? 20 : 50;

  const animatedElements = [];

  // Ẩn thanh cuộn ngang
  $('html, body').css('overflow-x', 'hidden');

  function setupElement(el) {
    const $el = $(el);
    const rawDelay = $el.attr('data-delay');

    // Xử lý data-delay (hỗ trợ cả "0.2s" và "200")
    let customDelay = 0;
    if (rawDelay) {
      customDelay = rawDelay.includes('s')
        ? parseFloat(rawDelay) * 1000
        : parseInt(rawDelay);
    }

    // Set trạng thái ban đầu
    gsap.set($el[0], {
      opacity: 0,
      y: moveDistance,
      willChange: 'transform, opacity',
      backfaceVisibility: 'hidden'
    });

    animatedElements.push({
      el: $el[0],           // lưu DOM element thật
      delay: customDelay,
      animated: false
    });
  }

  // Selector loại trừ một số khu vực không muốn animate
  const EXCLUDED = '.tf-topbar, #header, .tf-slider-show, footer, .video-popup';

  $('section .animation-bottom, div:not(' + EXCLUDED + ') > .animation-bottom').each(function () {
    if ($(this).closest(EXCLUDED).length) return;
    setupElement(this);
  });

  // Hàm animate bằng GSAP
  function animateElement(item) {
    gsap.to(item.el, {
      y: 0,
      opacity: 1,
      duration: 0.75,
      delay: item.delay / 1000,       
      ease: "cubic-bezier(0.22, 1, 0.36, 1)",   // giữ nguyên easing bạn dùng
      onComplete: () => {
        item.animated = true;
      }
    });
  }

  // Kiểm tra scroll
  function checkScroll() {
    const viewportBottom = window.innerHeight + window.scrollY;

    animatedElements.forEach(item => {
      if (item.animated) return;

      const rect = item.el.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;

      // Trigger khi element vào khoảng 85% viewport
      if (viewportBottom > elementTop + (item.el.offsetHeight * 0.15)) {
        animateElement(item);
      }
    });
  }

  // Scroll tối ưu với requestAnimationFrame
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(() => {
        checkScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Chạy lần đầu sau khi DOM render xong
  setTimeout(checkScroll, 100);
});






const header = document.getElementById("header");

window.addEventListener("scroll", function () {
  if (window.scrollY > 120) {
    header.classList.add("is-sticky");
  } else {
    header.classList.remove("is-sticky");
  }
});



document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".fade-up");

  if (elements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    elements.forEach(el => observer.observe(el));
  }
});


