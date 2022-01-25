console.log("Welcome to Spotify");

// Intialize variables
let songIndex = 1;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'))

let songs = [
    {name:"Mast Magan - 2 States", filePath:'songs/1.mp3', coverPath:'covers/1.webp'},
    {name:"Enna Sona - Ok Jaanu", filePath:'songs/2.mp3', coverPath:'covers/2.jpg'},
    {name:"Amplifier - Imran Khan", filePath:'songs/3.mp3', coverPath:'covers/3.jpg'},
    {name:"Brown Munde - AP Dhillon", filePath:'songs/4.mp3', coverPath:'covers/4.jpg'},
    {name:"Tera Hone Laga Hoon ", filePath:'songs/5.mp3', coverPath:'covers/5.jfif'},
    {name:"Jashn E Bahaaraa", filePath:'songs/6.mp3', coverPath:'covers/6.jfif'},
]

songItem.forEach((element,i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByTagName('span')[0].innerText = songs[i].name;
});

// Handle play/pause click
masterplay.addEventListener('click',()=>{
    if (audioElement.paused || audioElement.currentTime <=0 ){
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.src = "icons/4.png";
        masterSongName.innerText = songs[songIndex-1].name;
    }
    else{
        audioElement.pause();
        makeAllPlays();
        gif.style.opacity = 0;
        masterplay.src = "icons/2.png";
    }
})

// Listen to events
audioElement.addEventListener('timeupdate',()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

// Handle Seek event
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

// Play individual songs from list
const makeAllPlays=()=>{
    songItemPlay.forEach((element) =>{
        element.src = 'icons/5.png';
    })
}

songItemPlay.forEach((element)=>{
    element.addEventListener('click', ()=>{
        makeAllPlays();
        songIndex = parseInt(element.id)+1;
        element.src = 'icons/6.png';
        audioElement.src = 'songs/'+songIndex+'.mp3';
        masterSongName.innerText = songs[songIndex-1].name;
        audioElement.currentTime = 0;
        audioElement.play();
        masterplay.src = 'icons/4.png';
        gif.style.opacity = 1;
    })
})


// Handle previous button
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <= 1){
        songIndex = 6;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = 'songs/'+songIndex+'.mp3';
    masterSongName.innerText = songs[songIndex-1].name;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.src = 'icons/4.png';
    gif.style.opacity = 1;
    makeAllPlays();
})


//Handle next button
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= 6){
        songIndex = 1;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = 'songs/'+songIndex+'.mp3';
    masterSongName.innerText = songs[songIndex-1].name;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.src = 'icons/4.png';
    gif.style.opacity = 1;
    makeAllPlays();
})