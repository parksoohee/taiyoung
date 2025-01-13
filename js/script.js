const businessSection = document.querySelector(".section-business");

let lastScrollTop = 0;
let scrollDistance = 0;
let resetDistance = window.innerHeight * 0.5;

let isSectionVisible = false;
let isEventActive = window.innerWidth > 1086;

// Intersection Observer 설정
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // isEventActive가 false면 무조건 동작하지 않음
      if (!isEventActive) {
        return;
      }

      // 요소가 화면에 들어올 때만 처리
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          businessSection.classList.add("scroll");
          businessSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          isSectionVisible = true;
        });
      }
    });
  },
  {
    threshold: 0.8,
  }
);

function handleScroll() {
  if (!isEventActive) {
    return;
  }

  const currentScrollTop = window.scrollY;

  // 아래로 스크롤
  if (currentScrollTop > lastScrollTop) {
    scrollDistance = 0;
  } 
  // 위로 스크롤
  else if (currentScrollTop < lastScrollTop) {
    scrollDistance += lastScrollTop - currentScrollTop;

    if (scrollDistance > resetDistance && isSectionVisible) {
      requestAnimationFrame(() => {
        businessSection.classList.remove("scroll");
        isSectionVisible = false;
      });
    }
  }

  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
}

function cleanupSection() {
  // cleanup 시 즉시 상태 초기화
  requestAnimationFrame(() => {
    businessSection.classList.remove("scroll");
  });
  isSectionVisible = false;
  scrollDistance = 0;
  lastScrollTop = 0;
  
  // 이벤트 리스너 제거
  observer.unobserve(businessSection);
  window.removeEventListener("scroll", handleScroll);
}

function activateSection() {
  // 활성화 전에 먼저 cleanup
  cleanupSection();
  
  // 이벤트 다시 등록
  observer.observe(businessSection);
  window.addEventListener("scroll", handleScroll);
}

function handleResize() {
  const prevWidth = window.innerWidth;
  const wasEventActive = isEventActive;
  
  isEventActive = window.innerWidth > 1086;
  
  // 1086px 기준으로 상태가 변경될 때만 처리
  if (wasEventActive !== isEventActive) {
    if (!isEventActive) {
      cleanupSection();
    } else {
      activateSection();
    }
  }

  resetDistance = window.innerHeight * 0.5;
}

// 초기 설정
if (isEventActive) {
  activateSection();
} else {
  cleanupSection();
}

// debounce를 적용한 resize 이벤트 리스너
let resizeTimeout;
window.addEventListener("resize", () => {
  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
  }
  resizeTimeout = setTimeout(handleResize, 100);
});

// 페이지 로드 시 초기 상태 확인
handleResize();