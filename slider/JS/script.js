$(function () {

    $(".btn-pref").click(function(){
        $(".slider-item:first-child").appendTo(".slider-block");
        sliderCount();
    });

    $(".btn-next").click(function(){
        $(".slider-item:last-child").prependTo(".slider-block");
        sliderCount();
    });
    function sliderCount() {
        $('.btn').empty();
        let slidesCount = $('.slider-item').length;

        for (let i = 0; i < slidesCount; i++) {
            $('.btn').append('<span></span>');
        }

        let activeIndex = $('.slider-item.active').index();

        if (activeIndex >= 0) {
            $('.btn span').removeClass('active');
            $('.btn span').eq(activeIndex).addClass('active');
        }

    }
    sliderCount();
    
});



