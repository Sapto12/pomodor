let player;
let timer;
let isRunning = false;
let timeLeft = 60 * 60; // 1 hour (3600 seconds)
let currentPlaylist = 'https://youtu.be/Iv6SiKEgSSQ?si=viLmszqbEA9tvR1_'; // Default playlist

// YouTube Player API will trigger this function when the API is ready
function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player-container', {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,  // Do not autoplay on load
      loop: 1,       // Enable looping for the playlist
      playlist: currentPlaylist, // Set initial playlist
      rel: 0,        // Disable related videos at the end of playback
      iv_load_policy: 3, // Hide video annotations
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  console.log("Player is ready");
  player.loadPlaylist([currentPlaylist]); // Load the playlist on player initialization
}

function onPlayerStateChange(event) {
  // Handle video end and play the next video in the playlist
  if (event.data === YT.PlayerState.ENDED) {
    player.playVideo();
  }
}

function updateDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  document.getElementById('timer').textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  player.playVideo(); // Play video when timer starts
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      player.pauseVideo(); // Pause the video when the timer finishes
      alert('Pomodoro Selesai!');
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  player.pauseVideo(); // Pause video when timer is paused
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 60 * 60; // Reset to 1 hour
  isRunning = false;
  player.pauseVideo(); // Pause video when reset
  updateDisplay();
}

function switchPlaylist() {
  currentPlaylist = currentPlaylist === 'PLU1iHvNQI7mH5EBMo376lDWfkqDnZy7ih' ? 'OLAK5uy_lkKjCBuIb5Zj-jW5m-SluHL-W1ic8Xw4w' : 'PLU1iHvNQI7mH5EBMo376lDWfkqDnZy7ih';
  player.loadPlaylist([currentPlaylist]); // Switch playlist
}

// Event listeners
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
document.getElementById('switchPlaylistBtn').addEventListener('click', switchPlaylist); // Playlist switch button

// Initial timer display
updateDisplay();
