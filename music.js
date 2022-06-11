const playListContainerTag =document.getElementsByClassName("playListContainer")[0];
const audioTag =document.getElementsByClassName("audioTag")[0];
const CurrentAndTotalTimeTag =document.getElementsByClassName("CurrentAndTotalTime")[0];
const progressBarTag =document.getElementById("progressBar");
const currentProgressTag =document.getElementById("currentProgress");
const playButtonTag =document.getElementsByClassName("playButton")[0];
const pauseButtonTag =document.getElementsByClassName("pauseButton")[0];
const nextButtonTag =document.getElementsByClassName("nextButton")[0];
const previousButtonTag =document.getElementsByClassName("previousButton")[0];


const tracks= [
    {trackId :"music/track1.mp3",title :"BTS - Permission to Dance"},
    {trackId :"music/track2.mp3",title :"Shew Htoo - Amone Phine"},
    {trackId :"music/track3.mp3",title :"Ray Mone - Thar Gyi Thoe Aye Say"},
    {trackId :"music/track4.mp3",title :"Sai - Unstoppable"},
    {trackId :"music/track5.mp3",title :"BTS - My Universe"},
] 

for (let i = 0; i < tracks.length; i++) {
    
    const trackTag =document.createElement("div");
    trackTag.classList.add("trackItem");

    //click div
    trackTag.addEventListener("click",()=>{
        const tracksId =tracks[i].trackId;
        audioTag.src =tracksId;
        isPlaying=true;
        updatingButton();
        audioTag.play();
    });

    //create title
    const trackTitle =(i + 1).toString() + ". " +tracks[i].title;
    trackTag.textContent =trackTitle;
    playListContainerTag.append(trackTag);

};

//music duration
let durationText="00:00";
let duration;
audioTag.addEventListener("loadeddata",()=>{
     duration=Math.floor(audioTag.duration);
     durationText = getTime(duration);
    
});

//music current Time
audioTag.addEventListener("timeupdate",()=>{
    const current =Math.floor(audioTag.currentTime);
    const currentTimeText = getTime(current);
    const timeUpdate =currentTimeText +" / "+durationText;
    CurrentAndTotalTimeTag.textContent =timeUpdate;

    updateBar(current);
});

//update Bar
const updateBar=(current) =>{
    const barProcess =( 500 /duration) * current;
    currentProgressTag.style.width =barProcess.toString() + "px";
   
}
//update main funciton
const getTime =(totalSecond)=>{
    const minute =Math.floor(totalSecond / 60 );
    const second =totalSecond % 60;

    const minuteText =minute < 10 ? "0" +minute.toString() : minute;
    const secondText =second <10 ? "0" + second.toString() :second;
    return minuteText+":"+secondText;
};

//play Button 
let playingIndex = 0;
let isPlaying =false;

playButtonTag.addEventListener("click",()=>{
    const current =Math.floor(audioTag.currentTime);
    isPlaying =true;
    if(current == 0){
        audioTag.src =tracks[playingIndex].trackId;
        audioTag.play();
        updatingButton()
    }else{
        audioTag.play();
        updatingButton();
    }
});

//pause Button
pauseButtonTag.addEventListener("click",()=>{
    audioTag.pause();
    isPlaying =false;
    updatingButton()
   
});

const updatingButton=()=>{
    if(isPlaying == true){
        playButtonTag.style.display ="none";
        pauseButtonTag.style.display="inline";
    }else{
        playButtonTag.style.display ="inline";
        pauseButtonTag.style.display="none";
    }
}

//next Button
nextButtonTag.addEventListener("click",()=>{
    
    if(playingIndex == 5){
       playingIndex = -1
      return
    }
    isPlaying =true;
    playingIndex +=1;
    const songIdtoPlay =tracks[playingIndex].trackId;
    audioTag.src =songIdtoPlay;
    audioTag.play();
   console.log(songIdtoPlay);
    
})

//previous Button
previousButtonTag.addEventListener("click",()=>{
    
    if(playingIndex == 0){
        playingIndex =5;
    }
    isPlaying =true;
    playingIndex -=1;
    const songIdtoPlay =tracks[playingIndex].trackId;
    audioTag.src =songIdtoPlay;
    audioTag.play();
})

