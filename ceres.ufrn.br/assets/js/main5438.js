$(document).ready(function() {
    // Vars
    var main_slide = $('.main-slide');
    var partners_slide = $('.partners-slide');

    $('.owl-dot').click(function () {
        owl.trigger('to.owl.carousel', [$(this).index(), 300]);
    });

    main_slide.owlCarousel({
        items:1,
        loop:true,
        autoplay:true,
        autoplayTimeout:8000,
        autoplayHoverPause:false
    });

    partners_slide.owlCarousel({
        lazyLoad: true,
        lazyData: true,
        margin: 20,
        loop: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    });

    $('.previous').click(function() {
        partners_slide.trigger('prev.owl.carousel');
    })
    $('.next').click(function() {
        partners_slide.trigger('next.owl.carousel');
    })

    // Simulate hover effect on touch devices
    $(document).ready(function() {
        $('#photos figure').bind('touchstart touchend', function(e) {
            e.preventDefault();
            $(this).toggleClass('hover_effect');
        });
    });
});