function play(musicName) {

  var audio = musicName;
  if (audio.paused) {
    audio.play();
    audio.volume = 0.3;
  } else {
    audio.pause();
    audio.currentTime = 0
  }
}

function changeBackground(color) {
  var color = color;

}

/** 노래 중복 재생 막는 함수 */
document.addEventListener('play', function(e) {
  var audios = document.getElementsByTagName('audio');
  for (var i = 0, len = audios.length; i < len; i++) {
    if (audios[i] != e.target) {
      audios[i].pause();
      audios[i].currentTime = 0
    }
  }
}, true);

/** 배경색 바꾸는 함수 */
var currentColor = 'white';
function toggleBackgroundColor(targetColor) {
  var body = document.body;

  if (currentColor === targetColor) {
    body.style.backgroundColor = 'white';
    currentColor = 'white';
  } else {
    body.style.backgroundColor = targetColor;
    currentColor = targetColor;
  }
}

/** 슬라이드, 무한 슬라이드, 페기네이션 구현 함수*/
(function() {
  const slideList = document.querySelector('.slide_list');  // Slide parent dom
  const slideContents = document.querySelectorAll('.slide_content');  // each slide dom
  const menuButton = document.querySelector('.menuButton'); // menu button
  const slideBtnNext = document.querySelector('.nextButton'); // next button
  const slideBtnPrev = document.querySelector('.prevButton'); // prev button
  const pagination = document.querySelector('.slide_pagination');
  const slideLen = slideContents.length;  // slide length
  const slideWidth = 200; // slide width
  const slideSpeed = 300; // slide speed
  const startNum = 0; // initial slide index (0 ~ 4)

  slideList.style.width = slideWidth * (slideLen + 2) + "px";

  // Copy first and last slide
  let firstChild = slideList.firstElementChild;
  let lastChild = slideList.lastElementChild;
  let clonedFirst = firstChild.cloneNode(true);
  let clonedLast = lastChild.cloneNode(true);

  // Add copied Slides
  slideList.appendChild(clonedFirst);
  slideList.insertBefore(clonedLast, slideList.firstElementChild);

  // Add pagination dynamically
  let pageChild = '';
  for (var i = 0; i < slideLen; i++) {
    pageChild += '<li class="dot';
    pageChild += (i === startNum) ? ' dot_active' : '';
    pageChild += '" data-index="' + i + '"><a href="#"></a></li>';
  }
  pagination.innerHTML = pageChild;
  const pageDots = document.querySelectorAll('.dot'); // each dot from pagination

  slideList.style.transform = "translate3d(-" + (slideWidth * (startNum + 1)) + "px, 0px, 0px)";

  let curIndex = startNum; // current slide index (except copied slide)
  let curSlide = slideContents[curIndex]; // current slide dom
  curSlide.classList.add('slide_active');

  /** Menu Button Event */
  menuButton.addEventListener('click', function() {
    if (curIndex == 0) {
      location.href = 'toDoListPage.html'; // to do list & memo
    }
    else if (curIndex == 1) {
      location.href = 'https://www.instagram.com/oskueny/'; // instagram
    }
    else if (curIndex == 2) {
      location.href = 'https://leeyunseokarchive.github.io/203/'; // 203 online store
    }
    else if (curIndex == 3) {
      location.href = 'https://github.com/leeyunseokarchive'; // github
    }
    else if (curIndex == 4) {
      location.href = 'https://on.soundcloud.com/xKKVA'; // sound cloud
    }

  });

  /** Next Button Event */
  slideBtnNext.addEventListener('click', function() {
    if (curIndex <= slideLen - 1) {
      slideList.style.transition = slideSpeed + "ms";
      slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 2)) + "px, 0px, 0px)";
    }
    if (curIndex === slideLen - 1) {
      setTimeout(function() {
        slideList.style.transition = "0ms";
        slideList.style.transform = "translate3d(-" + slideWidth + "px, 0px, 0px)";
      }, slideSpeed);
      curIndex = -1;
    }
    curSlide.classList.remove('slide_active');
    pageDots[(curIndex === -1) ? slideLen - 1 : curIndex].classList.remove('dot_active');
    curSlide = slideContents[++curIndex];
    curSlide.classList.add('slide_active');
    pageDots[curIndex].classList.add('dot_active');
  });

  /** Prev Button Event */
  slideBtnPrev.addEventListener('click', function() {
    if (curIndex >= 0) {
      slideList.style.transition = slideSpeed + "ms";
      slideList.style.transform = "translate3d(-" + (slideWidth * curIndex) + "px, 0px, 0px)";
    }
    if (curIndex === 0) {
      setTimeout(function() {
        slideList.style.transition = "0ms";
        slideList.style.transform = "translate3d(-" + (slideWidth * slideLen) + "px, 0px, 0px)";
      }, slideSpeed);
      curIndex = slideLen;
    }
    curSlide.classList.remove('slide_active');
    pageDots[(curIndex === slideLen) ? 0 : curIndex].classList.remove('dot_active');
    curSlide = slideContents[--curIndex];
    curSlide.classList.add('slide_active');
    pageDots[curIndex].classList.add('dot_active');
  });

  /** Pagination Button Event */
  let curDot;
  Array.prototype.forEach.call(pageDots, function(dot, i) {
    dot.addEventListener('click', function(e) {
      e.preventDefault();
      curDot = document.querySelector('.dot_active');
      curDot.classList.remove('dot_active');

      curDot = this;
      this.classList.add('dot_active');

      curSlide.classList.remove('slide_active');
      curIndex = Number(this.getAttribute('data-index'));
      curSlide = slideContents[curIndex];
      curSlide.classList.add('slide_active');
      slideList.style.transition = slideSpeed + "ms";
      slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 1)) + "px, 0px, 0px)";
    });
  });
})();