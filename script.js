document.addEventListener('DOMContentLoaded', () => {
    // 1. Get DOM Elements
    const musicContainer = document.querySelector('.player-container');
    const playBtn = document.getElementById('play');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const audio = document.getElementById('audio');
    const progress = document.getElementById('progress');
    const progressContainer = document.getElementById('progress-container');
    const title = document.getElementById('title');
    const artistEl = document.getElementById('artist');
    const cover = document.getElementById('cover');
    const currentTimeEl = document.getElementById('current-time');
    const totalDurationEl = document.getElementById('total-duration');
    const volumeSlider = document.getElementById('volume-slider');

    // 2. Playlist Data (Includes Bonus: Playlist)
    const songs = [
        {
            title: 'Electric Drive',
            artist: 'Cyber Sound',
            name: 'song1', // Assumes file is 'music/song1.mp3'
            cover: 'cover.jpg'
        },
        {
            title: 'Chill Vibes',
            artist: 'Rhythm Creator',
            name: 'song2', // Assumes file is 'music/song2.mp3'
            cover: 'cover.jpg' // Use the same cover for simplicity, or add more
        },
        {
            title: 'Upbeat Future',
            artist: 'SynthWave',
            name: 'song3', // Assumes file is 'music/song3.mp3'
            cover: 'cover.jpg' 
        }
    ];

    // Keep track of which song is currently loaded
    let songIndex = 0;

    // 3. Load Song Details
    function loadSong(song) {
        title.innerText = song.title;
        artistEl.innerText = song.artist;
        audio.src = music/${song.name}.mp3;
        cover.src = song.cover;
    }

    // Initial load
    loadSong(songs[songIndex]);

    // 4. Play/Pause Control (Core Functionality)
    function playSong() {
        musicContainer.classList.add('play');
        playBtn.querySelector('i.fas').classList.remove('fa-play');
        playBtn.querySelector('i.fas').classList.add('fa-pause');
        audio.play();
    }

    function pauseSong() {
        musicContainer.classList.remove('play');
        playBtn.querySelector('i.fas').classList.remove('fa-pause');
        playBtn.querySelector('i.fas').classList.add('fa-play');
        audio.pause();
    }

    // 5. Next/Previous Controls (Playlist Navigation)
    function prevSong() {
        songIndex--;
        if (songIndex < 0) {
            songIndex = songs.length - 1; // Loop to the last song
        }
        loadSong(songs[songIndex]);
        playSong();
    }

    function nextSong() {
        songIndex++;
        if (songIndex > songs.length - 1) {
            songIndex = 0; // Loop to the first song
        }
        loadSong(songs[songIndex]);
        playSong();
    }

    // 6. Update Progress Bar & Time Display (Progress Bar & Duration)
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = ${progressPercent}%;

        // Calculate and display time
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) durationSeconds = 0${durationSeconds};
        
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) currentSeconds = 0${currentSeconds};

        // Wait for metadata to load before showing duration
        if (duration) {
            totalDurationEl.textContent = ${durationMinutes}:${durationSeconds};
        }
        currentTimeEl.textContent = ${currentMinutes}:${currentSeconds};
    }

    // 7. Set Progress on Click
    function setProgress(e) {
        const width = this.clientWidth; // Total width of the progress bar container
        const clickX = e.offsetX;      // X position of the click
        const duration = audio.duration;
        
        audio.currentTime = (clickX / width) * duration;
    }

    // 8. Volume Control
    function setVolume(e) {
        audio.volume = e.target.value;
    }
    
    // 9. Event Listeners
    playBtn.addEventListener('click', () => {
        const isPlaying = musicContainer.classList.contains('play');
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    // Change song
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);

    // Time/song update events
    audio.addEventListener('timeupdate', updateProgress);
    progressContainer.addEventListener('click', setProgress);

    // When song ends, automatically play next (Bonus: Autoplay)
    audio.addEventListener('ended', nextSong);

    // Volume Control
    volumeSlider.addEventListener('input', setVolume);

    // Get total duration once the audio metadata is loaded
    audio.addEventListener('loadedmetadata', () => {
        updateProgress({ srcElement: audio });
    });
});