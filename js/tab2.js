// // 1. 탭 버튼과 탭 내용 부분들을 querySelectorAll을 사용해 변수에 담는다.
// const tabItem2 = document.querySelectorAll(".route-menu-btn");
// const tabContent2 = document.querySelectorAll(".route-menu");

// // 2. 탭 버튼들을 forEach 문을 통해 한번씩 순회한다.
// // 이때 index도 같이 가져온다.
// tabItem2.forEach((item, index) => {
//   // 3. 탭 버튼에 클릭 이벤트를 준다.
//   item.addEventListener("click", (e) => {
//     // 4. 버튼을 a 태그에 만들었기 때문에, 
//     // 태그의 기본 동작(링크 연결) 방지를 위해 preventDefault를 추가한다.
//     e.preventDefault(); // a 
    
//     // 5. 탭 내용 부분들을 forEach 문을 통해 한번씩 순회한다.
//     tabContent2.forEach((content) => {
//       // 6. 탭 내용 부분들 전부 active 클래스를 제거한다.
//       content.classList.remove("btn");
//     });

//     // 7. 탭 버튼들을 forEach 문을 통해 한번씩 순회한다.
//     tabItem2.forEach((content) => {
//       // 8. 탭 버튼들 전부 active 클래스를 제거한다.
//       content.classList.remove("btn");
//     });

//     // 9. 탭 버튼과 탭 내용 영역의 index에 해당하는 부분에 active 클래스를 추가한다.
//     // ex) 만약 첫번째 탭(index 0)을 클릭했다면, 같은 인덱스에 있는 첫번째 탭 내용 영역에
//     // active 클래스가 추가된다.
//     tabItem2[index].classList.add("btn");
//     tabContent2[index].classList.add("btn");
//   });
// });
// const swiper4 = new Swiper(".route-tab-swiper", {
//   spaceBetween: 0,
//   slidesPerView: 'auto',
//   breakpoints: {
//     440: {
//       slidesPerView: 'auto',
//     },
//     740: {
//       slidesPerView: 'auto',
//     },
//     890: {
//       slidesPerView: 'auto',
//     },
//     1086: {
//       slidesPerView: 'auto',
//     }
//   },
//   on: {
// init: function () {
//   setSquareSlides();  // Swiper 초기화 후에 비율 설정
// },
// resize: function () {
//   setSquareSlides();  // 화면 크기 변경 시 슬라이드 비율 재조정
// },
// },
// });

// 1. 먼저 선택자를 명확하게 수정합니다
const tabButtonsDesktop = document.querySelectorAll(".route-tab-box01 .route-menu-btn");
const tabButtonsMobile = document.querySelectorAll(".route-tab-swiper .route-menu-btn");
const tabContents = document.querySelectorAll(".route-img-box .route-menu");

// 2. 공통 탭 전환 함수를 만듭니다
const switchTab = (index) => {
    // 모든 컨텐츠에서 btn 클래스 제거
    tabContents.forEach(content => {
        content.classList.remove("btn");
    });

    // 데스크톱 버전의 모든 버튼에서 btn 클래스 제거
    tabButtonsDesktop.forEach(button => {
        button.classList.remove("btn");
    });

    // 모바일 버전의 모든 버튼에서 btn 클래스 제거
    tabButtonsMobile.forEach(button => {
        button.classList.remove("btn");
    });

    // 선택된 인덱스의 컨텐츠에 btn 클래스 추가
    tabContents[index].classList.add("btn");
    
    // 데스크톱과 모바일 버전의 해당 버튼에 각각 btn 클래스 추가
    if (tabButtonsDesktop[index]) tabButtonsDesktop[index].classList.add("btn");
    if (tabButtonsMobile[index]) tabButtonsMobile[index].classList.add("btn");
};

// 3. 데스크톱 버전 탭 버튼에 이벤트 추가
tabButtonsDesktop.forEach((button, index) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        switchTab(index);
    });
});

// 4. 모바일 버전 탭 버튼에 이벤트 추가
tabButtonsMobile.forEach((button, index) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        switchTab(index);
        swiper4.slideTo(index);
    });
});

// 5. Swiper 초기화
const swiper4 = new Swiper(".route-tab-swiper", {
    spaceBetween: 0,
    slidesPerView: 'auto',
    breakpoints: {
        440: { slidesPerView: 'auto' },
        740: { slidesPerView: 'auto' },
        890: { slidesPerView: 'auto' },
        1086: { slidesPerView: 'auto' }
    },
    on: {
        init: function() {
            // 초기 상태 설정
            const activeIndex = Array.from(tabContents).findIndex(content => 
                content.classList.contains('btn')
            );
            if (activeIndex >= 0) {
                switchTab(activeIndex);
            }
        },

    }
});