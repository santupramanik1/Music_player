// Get the Refference All the Display Area
const songName = document.getElementById('song-name')
const artist = document.getElementById('artist')
const imageArea = document.getElementById('album-image');
const imageId = document.getElementById('image-id')
// Get the Refference of Progress Bar
const initialTime = document.getElementById('initial-time')
const totalDuration = document.getElementById('total-duration')
const progreeContainer = document.getElementById('progress-container')
const progressValue = document.getElementById('progress-value')
// Get the Refference of Mute and Unmute
const muteAndUnmute = document.getElementById('mute-unmute')
// Get the Refference of volume
const volumeChanger = document.getElementById('volumeChanger')
// Get the Refference All the Click Button
const previousBtn = document.getElementById('previous-btn');
const pauseBtn = document.getElementById('pause-btn')
const nextBtn = document.getElementById('next-btn')
const audio = document.getElementById('audio')



// List of Songs
const songs = [{
    name: "Tere hawale",
    title: "Arijit Singh",
    imageName: "arijit_singh"
},
{
    name: "Hawane a Kaha",
    title: "Udit Narayan",
    imageName: "udit_narayan"
},
{
    name: "Abhi Mujh mein",
    title: "Sonu nigam",
    imageName: "sonu_nigam"
},
{
    name: "Khujechi Toke",
    title: "jeet_ganguli",
    imageName: "jeet_ganguli"
}
]
// 1.Toggle the Pause Button
// pauseBtn.onclick = () => {
//     pauseBtn.classList.toggle('fa-play')
//     if (!pauseBtn.classList.contains('fa-play')) {
//         // alert("yes")
//         audio.play()
//     }
//     pauseBtn.classList.toggle('fa-pause')
//     if (!pauseBtn.classList.contains('fa-pause')) {
//         audio.pause()
//     }
//     imageId.classList.toggle('animate-spin-360')

// }

// // Display title
// let index = 0;
// function display(index) {
//     songName.innerHTML = songs[index].name
//     artist.innerHTML = songs[index].title
//     imageId.src = `IMAGES/${songs[index].imageName}.jpg`
//     audio.src = `MUSIC/${songs[index].imageName}.mp3`
// }
// display(index)

// // For the Next Song
// const nextSong = () => {
//     index++
//     if (index <= songs.length - 1) {
//         display(index)

//     }
//     else {
//         index = 0;
//         display(index)
//     }
//     if (pauseBtn.classList.contains('fa-play')) {
//         pauseBtn.classList.toggle('fa-play')
//         pauseBtn.classList.toggle('fa-pause')

//         if (pauseBtn.classList.contains('fa-pause')) {
//             imageId.classList.toggle('animate-spin-360')
//         }
//     }

//     audio.play()
// }
// nextBtn.addEventListener('click', () => {
//     nextSong()
// })

// *This is More Easy Code 

let arrOfObjectLength = songs.length - 1;
let isPlaying = false

// Play Music
const playMusic = () => {
    isPlaying = true
    pauseBtn.classList.replace("fa-play", "fa-pause")
    audio.play()
    imageId.classList.add('animate-spin-360')
}

// Pause Music
const pauseMusic = () => {
    isPlaying = false
    pauseBtn.classList.replace("fa-pause", "fa-play")
    audio.pause()
    imageId.classList.remove('animate-spin-360')
}
pauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseMusic()
    }
    else {
        playMusic()
    }
})

// For Display
let index = 0;
function display(index) {

    songName.innerHTML = songs[index].name
    artist.innerHTML = songs[index].title
    imageId.src = `IMAGES/${songs[index].imageName}.jpg`
    audio.src = `MUSIC/${songs[index].imageName}.mp3`
    console.log(index)
}
display(index)

// Next Song
const nextSong = () => {

    index++
    if (0 <= index && index <= arrOfObjectLength) {
        display(index)
    }
    else {
        index = 0
        display(index)
    }
    playMusic()

}

nextBtn.addEventListener('click', () => {
    nextSong()
})

// Previous Song
const previousSong = () => {
    index--;
    console.log("call")
    if (index >= 0) {
        console.log("prev", index)
        display(index)
    }
    else {
        index = 0
    }
    playMusic()
}
previousBtn.addEventListener('click', () => {
    previousSong()
})

// Progress Bar
audio.addEventListener('timeupdate', (event) => {
    // Object Destructuring
    const { currentTime, duration } = event.srcElement
    calculatePercentage = (currentTime / duration) * 100
    progressValue.style.width = `${calculatePercentage}%`

    //  Get Total Duration Time  
    let getSecond = Math.floor(duration)
    let minutes = Math.floor(getSecond / 60)
    let Second = getSecond % 60
    let convertInt = String(Second)

    if (convertInt.length == 1) {
        convertInt = '0' + convertInt
    }
    if (duration) {
        totalDuration.textContent = `${minutes}:${convertInt}`
    }

    //  Get Current Time  
    let getCurrentSecond = currentTime
    // console.log(getCurrentSecond)
    let curreMinutes = Math.floor(getCurrentSecond / 60)
    let currSecond = Math.floor(getCurrentSecond % 60)
    let currconvertInt = String(currSecond)

    if (currconvertInt.length == 1) {
        currconvertInt = '0' + currconvertInt
    }
    initialTime.textContent = `${curreMinutes}:${currconvertInt}`

    // If Music End Call Next Music
    if (calculatePercentage == 100) {
        pauseMusic()
        nextSong()
    }
})

// Progress onclick
progreeContainer.addEventListener('click', (event) => {
    const clientWidth = progreeContainer.offsetWidth
    let position = event.offsetX
    const duration = audio.duration
    let percentage = (position / clientWidth) * duration
    audio.currentTime = percentage
})

// Mute and Unmute
let isMute = false
const muteAudio = () => {
    isMute = true
    muteAndUnmute.classList.replace('fa-volume-off', 'fa-volume-xmark')
    audio.muted = true
}
const unmuteAudio = () => {
    isMute = false
    muteAndUnmute.classList.replace('fa-volume-xmark', 'fa-volume-off')
    audio.muted = false
}
muteAndUnmute.addEventListener('click', () => {
    if (isMute) {
        unmuteAudio()
    }
    else {
        muteAudio()
    }

})

// Volume up and Down
const volumeUpDown = () => {
    let vol = volumeChanger.value
    let volPercentage = vol / 100
    if (vol == 0) {
        muteAudio()
    }
    audio.volume = volPercentage
}
volumeChanger.addEventListener('input', () => {
    volumeUpDown()
})