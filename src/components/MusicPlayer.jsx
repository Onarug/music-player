import { useMusic } from "../contexts/MusicContext";
import { useRef, useEffect, useContext } from "react"
 

export const MusicPlayer = () => {
    const {currentTrack,
            formatTime,
            currentTime,
            setCurrentTime,
            duration,
            setDuration,
            nextTrack,
            prevTrack,
            play,
            pause,
            isPlaying,
            volume,
            setVolume
        } = useMusic();
    const audioRef = useRef(null);

    const handleTimeChange = (e) => {
        const audio = audioRef.current;
        if(!audio){
            return;
        }
        const newTime = parseFloat(e.target.value);
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    }

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
    }
    
    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
    useEffect(() => {
        const audio = audioRef.current;
            if(!audio){
                return;
            }
        if(isPlaying){
            audio.play().catch((err) => console.long(err));
        } else {
            audio.pause();
        }
    }, [isPlaying]) 
    
    useEffect(() => {
        const audio = audioRef.current;
            if(!audio){
                return;
            }
        audio.volume = volume;
    }, [volume]) 

    useEffect(() => {
        const audio = audioRef.current;
            if(!audio){
                return;
            }


        const handleLoadedMetadata = () => {
                setDuration(audio.duration);
                
        }

        const handleTimeUpdate = () => {
                setCurrentTime(audio.currentTime);
        }
        
        const handleEnded = () => {
                nextTrack();

        }

        audio.addEventListener("loadedmetadata",handleLoadedMetadata);
        audio.addEventListener("canplay",handleLoadedMetadata);
        audio.addEventListener("timeupdate",handleTimeUpdate);
        audio.addEventListener("ended",handleEnded);


            return () => {
                audio.removeEventListener("loadedmetadata",handleLoadedMetadata);
                audio.removeEventListener("canplay",handleLoadedMetadata);                
                audio.removeEventListener("timeupdate",handleTimeUpdate);
                audio.removeEventListener("ended",handleEnded);
            }
    },[setDuration, setCurrentTime, currentTrack,nextTrack]);

    useEffect(() => {
        const audio = audioRef.current;
            if(!audio){
                return;
            }
            audio.load();
            setCurrentTime(0);
            setDuration(0);
    },[currentTrack,setCurrentTime,setDuration])
    
    return (
        <div className="music-player">
            <audio ref={audioRef} src={currentTrack.url} preload="metadata" crossOrigin="anonymous"/>
            <div className="track-info">
                    <h3 className="track-title">{currentTrack.title}</h3>
                    <h3 className="track-artist">{currentTrack.artist}</h3>


            </div>

            <div className="progress-container">
                <span ClassName="time">
                    {formatTime(currentTime)}
                </span>
                <input type="range"
                min="0" max={duration || 0}
                step ="0.1"
                value={currentTime || 0}
                className="progress-bar"
                style={{"--progress" : `${progressPercentage}%`}}
                onChange={handleTimeChange}
                />
                <span ClassName="time">
                    {formatTime(duration)}
                </span>
                <div className="controls">
                    <button className="control-btn" onClick={prevTrack}>↺</button>
                    <button className="control-btn play-btn" onClick={() => isPlaying ? pause() : play()}>
                        {isPlaying ? "⏸" : "▶"}
                    </button>
                    <button className="control-btn" onClick={nextTrack}>▹▹</button>

                </div>
                <div className="volume-container">
                    <span className="volume-icon"> Volume
                        <input type="range" min="0" max="1" step="0.1" className="volume-bar" onChange={handleVolumeChange}></input>

                    </span>
                </div>
            </div>
        </div>
    )
}