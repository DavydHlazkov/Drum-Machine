import React from "react";

const audioClips = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

function App() {
  const [recording, setRecording] = React.useState('')
  const [volume, setVolume] = React.useState(1)
  const [speed, setSpeed] = React.useState(0.5)
  
  const playRecording = () => {
    let index = 0
    let recordArray = recording.split(' ')
    const interval = setInterval(() => {
    const audioTag = document.getElementById(recordArray[index])
 audioTag.volume = volume;
audioTag.currentTime = 0;
 audioTag.play();
      index++
    }, speed * 600)
    
    setTimeout(()=> clearInterval(interval), 600*speed * recordArray.length -1)
    
  }

  return ( <div id="drum-machine" className ="drum-machine">
  <div className ="text-center">
    <h2 className="dm">Drum machine</h2>
    <div className="pad-list">
    {audioClips.map(clip =>{
      return (<Pad key = {clip.id} clip = {clip} volume = {volume} setRecording = {setRecording}/>)
    })}
    </div>
    <label for= "volume" className="volume-label">Volume</label>
    <input 
      id = "volume"
      onChange = {(e) => setVolume(e.target.value)}
      type = "range"
      step = "0.01"
      min = "0"
      max = "1"
      value = {volume}
      className="volume-input"
      />
      <div className="speed-div">
    <label className="speed-label" for="speed">Speed</label>
    <input 
      id="speed"
      onChange = {(e) => setSpeed(e.target.value)}
      type = "range"
      step = "0.01"
      min = "0.1"
      max = "1.2"
      className = "speed-input"
      value = {speed}
      />
      </div>
    <h3 id="display">{recording}</h3>
    {recording && (
        <div>
        <button className = "play" onClick = {playRecording}>Play</button>
        <button onClick = {() => setRecording('')} className = "delete">Delete</button>
        </div>
    )}
   
  </div>
</div>
)
}

function Pad ({clip, volume, setRecording}){

const [active, setActive] = React.useState (false)


React.useEffect (() => {
document.addEventListener("keydown", handleKeyPress);
return () => {
  document.removeEventListener("keydown", handleKeyPress)
} 
},[])

const handleKeyPress = (e) => {

if(e.keyCode === clip.keyCode) {
 playSound();
}
}  

const playSound = () => {
setActive(true)
setTimeout(()=> setActive(false),200)
const audioTag = document.getElementById(clip.keyTrigger)
audioTag.volume = volume;
audioTag.currentTime = 0;
audioTag.play();
setRecording((prev) => prev + clip.keyTrigger + " " )
}

return (
<div onClick = {playSound} className = 'drum-pad' id = {clip.id}>
{clip.keyTrigger}
  <audio className = "clip" id = {clip.keyTrigger} src = {clip.url}/>
  
</div>
)
}

export default App;



