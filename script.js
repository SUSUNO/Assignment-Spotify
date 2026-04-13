const albums = [
    {
        id: 1,
        title: "Uta One Piece",
        artist: "Uta",
        cover: "assets/album1.jpg",
        bgColor: "rgba(87, 35, 100, 1)",
        songs: [
            { id: "1-1", title: "New Genesis", duration: 225, src: "songs/New Genesis (UTA from ONE PIECE FILM RED).mp3" },
            { id: "1-2", title: "I'm invincible", duration: 252, src: "songs/ADO - I'M INVINCIBLE (One Piece Film Red OST)  Lyrics.mp3" },
            { id: "1-3", title: "Backlight", duration: 178, src: "songs/ADO - BACKLIGHT (One Piece Film Red OST) Lyrics  Lirik & Terjemahan.mp3" },
            { id: "1-4", title: "Fleeting Lullaby", duration: 210, src: "songs/Adoウタカタララバイウタ from ONE PIECE FILM RED.mp3" },
            { id: "1-5", title: "Tot Musica", duration: 301, src: "songs/AdoTot Musicaウタ from ONE PIECE FILM RED.mp3" }
        ]
    },
    {
        id: 2,
        title: "Billie Eilish",
        artist: "Billie Eilish",
        cover: "assets/album2.jpg",
        bgColor: "rgba(35, 80, 100, 1)",
        songs: [
            { id: "2-1", title: "Bad Guy", duration: 194, src: "songs/Billie Eilish - bad guy (Official Music Video).mp3" },
            { id: "2-2", title: "Happier Than Ever", duration: 298, src: "songs/Billie Eilish - Happier Than Ever (Official Music Video).mp3" },
            { id: "2-3", title: "When the Party's Over", duration: 196, src: "songs/Billie Eilish - when the party's over.mp3" },
            { id: "2-4", title: "Everything I Wanted", duration: 245, src: "songs/Billie Eilish - everything i wanted.mp3" },
            { id: "2-5", title: "Ocean Eyes", duration: 200, src: "songs/Billie Eilish - ocean eyes (Official Music Video).mp3" }
        ]
    },
    {
        id: 3,
        title: "Taylor Swift",
        artist: "Taylor Swift",
        cover: "assets/album3.jpg",
        bgColor: "rgba(100, 70, 70, 1)",
        songs: [
            { id: "3-1", title: "Anti-Hero", duration: 200, src: "songs/Taylor Swift - Anti-Hero (Official Music Video).mp3" },
            { id: "3-2", title: "Blank Space", duration: 231, src: "songs/Taylor Swift - Blank Space.mp3" },
            { id: "3-3", title: "Love Story", duration: 235, src: "songs/Taylor Swift - Love Story.mp3" },
            { id: "3-4", title: "Shake It Off", duration: 219, src: "songs/Taylor Swift - Shake It Off.mp3" },
            { id: "3-5", title: "You Belong With Me", duration: 232, src: "songs/Taylor Swift - You Belong With Me.mp3" }
        ]
    },
    {
        id: 4,
        title: "Ed Sheeran",
        artist: "Ed Sheeran",
        cover: "assets/album4.jpg",
        bgColor: "rgba(35, 100, 60, 1)",
        songs: [
            { id: "4-1", title: "Eraser", duration: 227, src: "songs/Ed Sheeran - Eraser [Official Audio].mp3" },
            { id: "4-2", title: "Perfect", duration: 263, src: "songs/Ed Sheeran - Perfect.mp3" },
            { id: "4-3", title: "Photograph", duration: 274, src: "songs/Ed Sheeran - Photograph (Official Music Video).mp3" },
            { id: "4-4", title: "Shape of You", duration: 233, src: "songs/Ed Sheeran - Shape of You (Official Music Video).mp3" },
            { id: "4-5", title: "Thinking Out Loud", duration: 281, src: "songs/Ed Sheeran - Thinking Out Loud (Official Music Video).mp3" }
        ]
    },
    {
        id: 5,
        title: "Adele",
        artist: "Adele",
        cover: "assets/album5.jpg",
        bgColor: "rgba(100, 35, 35, 1)",
        songs: [
            { id: "5-1", title: "Easy On Me", duration: 224, src: "songs/Adele - Easy On Me (Official Lyric Video).mp3" },
            { id: "5-2", title: "Hello", duration: 366, src: "songs/Adele - Hello (Official Music Video).mp3" },
            { id: "5-3", title: "Rolling in the Deep", duration: 233, src: "songs/Adele - Rolling in the Deep (Official Music Video).mp3" },
            { id: "5-4", title: "Someone Like You", duration: 284, src: "songs/Adele - Someone Like You (Official Music Video).mp3" },
            { id: "5-5", title: "Set Fire To The Rain", duration: 242, src: "songs/Set Fire To The Rain - Adele (Lyrics).mp3" }
        ]
    }
];

// State vars
let currentAlbum = null;
let currentSong = null;
let isPlaying = false;
let currentProgress = 0;
let playbackInterval = null;
let audioPlayer = new Audio();

audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.src && !audioPlayer.paused) {
        currentProgress = Math.floor(audioPlayer.currentTime);
        document.getElementById('current-time').innerText = formatTime(currentProgress);
        document.getElementById('progress-bar').value = currentProgress;
    }
});
audioPlayer.addEventListener('loadedmetadata', () => {
    document.getElementById('total-time').innerText = formatTime(audioPlayer.duration);
    document.getElementById('progress-bar').max = audioPlayer.duration;
});
audioPlayer.addEventListener('ended', playNext);

// Helpers
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function init() {
    renderSidebar();
    renderHomeView();
    setupEventListeners();
}

function renderSidebar() {
    const sidebarAlbums = document.getElementById('sidebar-albums');
    sidebarAlbums.innerHTML = '';
    albums.forEach(album => {
        const div = document.createElement('div');
        div.className = 'sidebar-album-item';
        div.innerHTML = `
            <img src="${album.cover}" alt="cover" class="sidebar-album-cover">
            <div class="sidebar-album-info">
                <span class="sidebar-album-name">${album.title}</span>
                <span class="sidebar-album-type">Album • ${album.artist}</span>
            </div>
        `;
        div.onclick = () => openAlbum(album.id);
        sidebarAlbums.appendChild(div);
    });
}

function renderHomeView() {
    document.getElementById('albums-view').classList.remove('hidden');
    document.getElementById('single-album-view').classList.add('hidden');
    document.getElementById('main-content-area').style.background = 'linear-gradient(180deg, rgba(32,32,32,1) 0%, rgba(18,18,18,1) 100%)';



    const container = document.getElementById('albums-container');
    container.innerHTML = '';
    albums.forEach(album => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img-container">
                <img src="${album.cover}" alt="${album.title}" class="card-img">
                <div class="play-hover"><i class="fa-solid fa-play"></i></div>
            </div>
            <h3>${album.title}</h3>
            <p>${album.artist}</p>
        `;
        card.onclick = () => openAlbum(album.id);
        container.appendChild(card);
    });
}

function openAlbum(albumId) {
    const album = albums.find(a => a.id === albumId);
    if (!album) return;
    currentAlbum = album;

    document.getElementById('albums-view').classList.add('hidden');
    document.getElementById('single-album-view').classList.remove('hidden');


    // Update Header
    document.getElementById('header-album-cover').src = album.cover;
    document.getElementById('header-album-title').innerText = album.title;
    document.getElementById('header-album-artist').innerText = album.artist;

    // Gradient background based on album
    document.getElementById('main-content-area').style.background = `linear-gradient(180deg, ${album.bgColor} 0%, rgba(18,18,18,1) 40%)`;

    // Render Songs
    const songsContainer = document.getElementById('songs-container');
    songsContainer.innerHTML = '';
    album.songs.forEach((song, index) => {
        const isCurrent = currentSong && currentSong.id === song.id;
        const row = document.createElement('div');
        row.className = `song-row ${isCurrent ? 'playing' : ''}`;
        row.innerHTML = `
            <span class="song-number">${index + 1}</span>
            <i class="song-play fa-solid ${isCurrent && isPlaying ? 'fa-pause' : 'fa-play'}"></i>
            <div class="song-title-col">
                <span class="song-title">${song.title}</span>
                <span class="song-artist">${album.artist}</span>
            </div>
            <span class="song-album-col">${album.title}</span>
            <span>${formatTime(song.duration)}</span>
        `;
        row.onclick = () => playSong(album, song);
        songsContainer.appendChild(row);
    });

    // Update play button state
    const playBtn = document.getElementById('album-play-btn');
    if (isPlaying && currentSong && album.songs.find(s => s.id === currentSong.id)) {
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

function playSong(album, song) {
    if (currentSong && currentSong.id === song.id) {
        togglePlayPause();
        return;
    }

    currentSong = song;
    currentProgress = 0;
    isPlaying = true;

    // Update player UI
    document.getElementById('player-cover').src = album.cover;
    document.getElementById('player-cover').classList.remove('hidden');
    document.getElementById('player-title').innerText = song.title;
    document.getElementById('player-artist').innerText = album.artist;
    document.getElementById('player-like').style.opacity = 1;
    document.getElementById('total-time').innerText = formatTime(song.duration);

    document.getElementById('progress-bar').max = song.duration;
    document.getElementById('progress-bar').value = 0;

    clearInterval(playbackInterval);
    audioPlayer.pause();

    if (song.src) {
        audioPlayer.src = song.src;
        audioPlayer.play().catch(e => console.log(e));
    } else {
        startSimulatedPlayback();
    }
    updateGlobalUI();
}

function togglePlayPause() {
    if (!currentSong) return;
    isPlaying = !isPlaying;
    if (isPlaying) {
        if (currentSong.src) {
            audioPlayer.play().catch(e => console.log(e));
        } else {
            startSimulatedPlayback();
        }
    } else {
        if (currentSong.src) {
            audioPlayer.pause();
        } else {
            clearInterval(playbackInterval);
        }
    }
    updateGlobalUI();
}

function startSimulatedPlayback() {
    clearInterval(playbackInterval);
    playbackInterval = setInterval(() => {
        if (!isPlaying || !currentSong) return;
        currentProgress += 1;

        if (currentProgress >= currentSong.duration) {
            playNext();
        } else {
            document.getElementById('current-time').innerText = formatTime(currentProgress);
            document.getElementById('progress-bar').value = currentProgress;
        }
    }, 1000);
}

function playNext() {
    if (!currentSong) return;
    const album = albums.find(a => a.songs.some(s => s.id === currentSong.id));
    const currentIndex = album.songs.findIndex(s => s.id === currentSong.id);
    if (currentIndex < album.songs.length - 1) {
        playSong(album, album.songs[currentIndex + 1]);
    } else {
        // Go to next album or stop
        const albumIndex = albums.findIndex(a => a.id === album.id);
        if (albumIndex < albums.length - 1) {
            const nextAlbum = albums[albumIndex + 1];
            playSong(nextAlbum, nextAlbum.songs[0]);
        } else {
            isPlaying = false;
            clearInterval(playbackInterval);
            updateGlobalUI();
        }
    }
}

function playPrev() {
    if (!currentSong) return;
    if (currentProgress > 3) {
        currentProgress = 0;
        document.getElementById('current-time').innerText = formatTime(0);
        document.getElementById('progress-bar').value = 0;
        if (currentSong.src) audioPlayer.currentTime = 0;
        return;
    }
    const album = albums.find(a => a.songs.some(s => s.id === currentSong.id));
    const currentIndex = album.songs.findIndex(s => s.id === currentSong.id);
    if (currentIndex > 0) {
        playSong(album, album.songs[currentIndex - 1]);
    }
}

function updateGlobalUI() {
    // Bottom player controls
    const playPauseBtn = document.getElementById('play-pause-btn');
    if (isPlaying) {
        playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
    } else {
        playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    }

    // Single album view UI
    if (currentAlbum) {
        openAlbum(currentAlbum.id); // re-render song list state
    }
}

function setupEventListeners() {



    document.getElementById('play-pause-btn').onclick = togglePlayPause;
    document.getElementById('next-btn').onclick = playNext;
    document.getElementById('prev-btn').onclick = playPrev;

    document.getElementById('album-play-btn').onclick = () => {
        if (!currentAlbum) return;
        if (currentSong == null || !currentAlbum.songs.some(s => s.id === currentSong.id)) {
            playSong(currentAlbum, currentAlbum.songs[0]);
        } else {
            togglePlayPause();
        }
    };

    const progressBar = document.getElementById('progress-bar');
    progressBar.addEventListener('input', (e) => {
        if (!currentSong) return;
        currentProgress = parseInt(e.target.value);
        document.getElementById('current-time').innerText = formatTime(currentProgress);
        if (currentSong.src) {
            audioPlayer.currentTime = currentProgress;
        }
    });
}

init();
