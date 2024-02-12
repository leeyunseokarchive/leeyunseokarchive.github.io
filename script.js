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