$(function () {
  let isSliding = false; // 슬라이드 상태 추적 변수
  let timeout; // 타임아웃 변수 (딜레이를 위한 변수)

  // .nav > li에 마우스가 들어가면
  $(".nav>li").on("mouseenter", function () {
      // 마우스가 .nav 위로 들어가면 슬라이드 다운
      if (!isSliding) {
          isSliding = true;
          $(".depth").stop(true, true).slideDown(500); // slideDown 실행 전에 이전 애니메이션을 중지
          $(".depth").addClass("show slide-down"); // 슬라이드 애니메이션 시작
      }
      // .nav에 마우스가 들어오면 drop 클래스 추가
      $('header').addClass('drop');
  });

  // .nav 또는 .depth에서 마우스가 나가면
  $(".nav>li, .depth").on("mouseleave", function (e) {
      // 마우스가 .nav와 .depth 영역을 모두 벗어났을 때만 drop 클래스 제거
      timeout = setTimeout(function () {
          // .nav와 .depth 영역을 모두 벗어났다면 drop 클래스 제거
          if (!$(e.relatedTarget).closest(".nav").length && !$(e.relatedTarget).closest(".depth").length) {
              $('header').removeClass('drop');
          }
      }, 300); // 300ms 뒤에 클래스 제거

      // 마우스가 .nav와 .depth 영역을 모두 벗어났을 때 슬라이드 업
      if (!$(e.relatedTarget).closest(".nav").length && !$(e.relatedTarget).closest(".depth").length) {
          isSliding = false;
          $(".depth").stop(true, true).slideUp(300); // slideUp 실행 전에 이전 애니메이션을 중지
          $(".depth").removeClass("show slide-down"); // 슬라이드 애니메이션 종료
      }
  });

  // .nav 영역에 마우스가 들어가면 이전 타임아웃 취소
  $(".nav").on("mouseenter", function () {
      clearTimeout(timeout); // 이전 타임아웃을 취소
  });
});

