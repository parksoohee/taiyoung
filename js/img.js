var defaultImgSrc = "img/img01.jpg"; // 원래 이미지 경로를 여기에 설정하세요
$(document).ready(function(){
  $(window).resize(function() { // 창 크기 변경 시마다 실행
    if ($(window).width() > 1086) { // 화면 크기가 1086px 이상일 때만 실행
      $(".section-business .business-list li").hover(function(){
        var num = $(this).index() + 2;
        if ($(".business-bg img").data("num") != num) {
          $(".business-bg img").css('opacity', '0.5').stop().attr("src", "../img/img0" + num + ".jpg").animate({opacity: 1}, 1000).data("num", num);
        }
      },
      function () {
        // 마우스를 떼었을 때 원래 이미지로 복원
        $(".business-bg img")
          .css("opacity", "0.8")
          .stop()
          .attr("src", defaultImgSrc)
          .animate({opacity: 1}, 1000)
          .removeData("num"); // num 데이터를 초기화
      });
    } else {
      // 1086px 이하에서는 hover 이벤트 제거
      $(".section-business .business-list li").off("mouseenter mouseleave");
    }
  });

  // 초기 로드 시에도 창 크기에 따라 이벤트 설정
  if ($(window).width() > 1086) {
    $(".section-business .business-list li").hover(function(){
      var num = $(this).index() + 2;
      if ($(".business-bg img").data("num") != num) {
        $(".business-bg img").css('opacity', '0.5').stop().attr("src", "img/img0" + num + ".jpg").animate({opacity: 1}, 1000).data("num", num);
      }
    },
    function () {
      // 마우스를 떼었을 때 원래 이미지로 복원
      $(".business-bg img")
        .css("opacity", "0.8")
        .stop()
        .attr("src", defaultImgSrc)
        .animate({opacity: 1}, 1000)
        .removeData("num"); // num 데이터를 초기화
    });
  }
});