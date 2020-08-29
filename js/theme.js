(function ($) {
    "use strict";
      function smoothSctollTop() {
        $('.navbar-nav li a[href^="#"]').on('click', function (event) {
            var target = $(this.getAttribute('href'));
            if (target.length) {
                event.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 93
                }, 1000);
            }
        });
    }
    smoothSctollTop();
    
    function menuSticky() {
        $(window).scroll(function() { 
        var scroll = $(window).scrollTop();
            if (scroll > 0) {
                $(".navbar").addClass("navbarSticky");
            }
            else {
                $(".navbar").removeClass("navbarSticky");
            }
        });
    }
    menuSticky();
  
    if($(".n_screenshot").length > 0){
        $(".n_screenshot").owlCarousel({
            items: 4,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [991, 3],
            itemsMobile: [785, 2],
            autoPlay: true,
            margin: 50,
            slideSpeed: 250,
            dotted: true,
        })
    }
    
    /*===========Portfolio isotope js===========*/
    function portfolioMasonry(){
        var portfolio = $("#masonry");
        if( portfolio.length ){
            portfolio.imagesLoaded( function() {
              // images have loaded
                // Activate isotope in container
                portfolio.isotope({
                    itemSelector: "",
                    layoutMode: 'masonry',
                    transformsEnabled: true,
                    transitionDuration: "700ms",
                });
            })
        }
    }
    portfolioMasonry();

    function gallery_sliders(){
        if ( $('.saas_screen_gallery').length ){
            $('.saas_screen_gallery').owlCarousel({
                loop:true,
                margin: 30,
                items: 3,
                nav:false,
                autoplay: true,
                dots: true,
                center: true,
                smartSpeed: 1500,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    600: {
                        items: 2,
                    },
                    768: {
                        items: 2,
                    },
                    992: {
                        items: 3,
                    }
                }
            })
        }
    }
    gallery_sliders();
    
    function featuresSliders(){
        if ( $('.features_slider').length ){
            $('.features_slider').owlCarousel({
                loop: true,
                autoplay: true,
                items: 1,
                nav: true,
                mouseDrag: false,
                autoplayHoverPause: true,
                animateOut: 'slideOutDown',
                animateIn: 'fadeIn',
                navText: ['<i class="arrow_left"></i>','<i class="arrow_right"></i>'],
            })
        }
    }
    featuresSliders();
    
    //    new-js
    /*=============================================== 
	       Parallax Init
	  ================================================*/
	if ($('#apps_craft_animation,.back_bg').length > 0 ) {
	  $('#apps_craft_animation,.back_bg').parallax();
	}
    
    /*=========animation js =========*/
    function bodyScrollAnimation() {
        var scrollAnimate = $('body').data('scroll-animation');
        if($(window).width()>768){
            new WOW({
                animateClass: 'animated', // animation css class (default is animated)
                offset:       100,          // distance to the element when triggering the animation (default is 0)
                mobile:       false, 
                duration:     1000,
            }).init()
        }
    }
    bodyScrollAnimation();
})(jQuery);
