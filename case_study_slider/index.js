$(document).ready(function(){
    const $tabs = $('.hs-busi-trans ul.logo-list .tab');
    const $track = $('.hs-busi-trans .metaTrack .case-study,.hs-busi-trans .CustomersCaseStudyCarousel__track');
    
    function slideToTab(index) {
      $tabs.eq(index).addClass('active').siblings().removeClass('active');
      $(`[data-tab="${$tabs.eq(index).data('tab')}"]`).addClass('active').siblings().removeClass('active');
      $track.css('transform', `translateX(calc(${index}* -100%))`);
    }
    $tabs.click(function() {
      const index = $(this).index();
      slideToTab(index);
      clearInterval(autoSlideInterval); // Stop auto-sliding if a tab is clicked
    });
    let autoSlideInterval = setInterval(function() {
      const currentActive = $tabs.filter('.active');
      const nextIndex = currentActive.index() + 1 == $tabs.length ? 0 : currentActive.index() + 1;
      slideToTab(nextIndex);
    }, 1500);
});


