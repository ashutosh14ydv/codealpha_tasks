const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

const songs = [
  { title: "Song One", artist: "Artist A", src: "music/song1.mp3" },
  { title: "Song Two", artist: "Artist B", src: "music/song2.mp3" },
  { title: "Song Three", artist: "Artist C", src: "music/song3.mp3" }
];

let songIndex = 0;
let isPlaying = false;

// Load song
function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  updatePlaylist();
}

// Play / Pause
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = "▶";
  } else {
    audio.play();
    playBtn.textContent = "⏸";
  }
  isPlaying = !isPlaying;
}

// Next / Previous
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
}

// Progress update
audio.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audio;
  progress.style.width = `${(currentTime / duration) * 100}%`;

  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

// Seek
progressContainer.addEventListener("click", e => {
  const width = progressContainer.clientWidth;
  audio.currentTime = (e.offsetX / width) * audio.duration;
});

// Volume
volume.addEventListener("input", e => {
  audio.volume = e.target.value;
});

// Autoplay next
audio.addEventListener("ended", nextSong);

// Playlist
function updatePlaylist() {
  playlistEl.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    if (index === songIndex) li.classList.add("active");
    li.addEventListener("click", () => {
      songIndex = index;
      loadSong(songIndex);
      audio.play();
      isPlaying = true;
      playBtn.textContent = "⏸";
    });
    playlistEl.appendChild(li);
  });
}

// Utility
function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Event listeners
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Init
loadSong(songIndex);
