import { createContext,useContext,useState, useEffect } from "react";


const songs = [
{
    id: 1,
    title: "Breaching",
    artist: "EchoBR",
    url: "/songs/Breaching.wav",
    duration: "5:52",
  },
  {
    id: 2,
    title: "Forgotten Memories",
    artist: "EchoBR",
    url: "/songs/Forgotten Memories.wav",
    duration: "4:51",
  },  
  {
    id: 3,
    title: "Glacier Blue",
    artist: "EchoBR",
    url: "/songs/Glacier Blue.wav",
    duration: "4:32",
  },
    {
    id: 4,
    title: "Just a waste",
    artist: "PinkPanthress",
    url: "/songs/Just a waste.wav",
    duration: "1:42",
  }
]

export const MusicContext = createContext()

export const MusicProvider = ({children}) => {

     const [allSongs, setAllSongs] = useState(songs);
        const [currentTrack, setCurrentTrack] = useState(songs[0]);
        const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
        const [currentTime, setCurrentTime] = useState(0);
        const [duration, setDuration] = useState(0);
        const [isPlaying,setIsPlaying] = useState(false);
        const [volume, setVolume] = useState(0.5);
        const [playlists, setPlaylists] = useState([])
        
        useEffect(( )=> {
          const savedPlaylists = localStorage.getItem("musicPlayerPlaylists") 
          if( savedPlaylists){
            const playlists = JSON.parse(savedPlaylists);
            setPlaylists(playlists);
          }
        },[]);
    
        useEffect(() => {
            if(playlists.length > 0){
                localStorage.setItem("musicPlayerPlaylists",JSON.stringify(playlists));
            } else {
                localStorage.removeItem("musicPlayerPlaylists");

            }
        }, [playlists]);

        const play = () => {
            setIsPlaying(true);
        };
    
        const pause = () => {
            setIsPlaying(false);
        };
    
        const handlePlaySong = (song,index) => {
            setCurrentTrack(song);
            setCurrentTrackIndex(index);
            setIsPlaying(false);
    
        };
    
        const nextTrack = () => {
            setCurrentTrackIndex((prev) => {
                const nextIndex = (prev + 1) % allSongs.length;
                setCurrentTrack(allSongs[nextIndex]);
                return nextIndex
            } )
            setIsPlaying(false);
    
        };
    
        const prevTrack = () => {
            setCurrentTrackIndex((prev) => {
                const nextIndex = prev === 0 ? allSongs.length - 1 : prev -1;
                setCurrentTrack(allSongs[nextIndex]);
                return nextIndex
            } )
            setIsPlaying(false);
    
        };
    
    
        const formatTime = (time) =>{
            if(isNaN(time) || time === undefined){
                return "0:00";
            }
    
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
    
            return `${minutes}:${seconds.toString().padStart(2,"0")}`;
    
        };

        const createPlaylist = (name) => {
            const newPlaylist = {
                id: Date.now(),
                name,
                songs : [],
            }
 
            setPlaylists((prev) => [...prev,newPlaylist]);
        };

        const addSongToPlaylist = (playlistId,song) => {
            setPlaylists((prev) => prev.map((playlist) => {
                if(playlist.id === playlistId) {
                    return {...playlist, songs :[...playlist.songs,song]}
                } else {
                    return playlist;
                }
            }))
        }

        const deletePlaylist = (playlistId) => {
            setPlaylists((prev) => prev.filter((playlist ) => playlist.id !== playlistId));
        }

    return <MusicContext.Provider value={{
        allSongs,
         handlePlaySong,
         currentTrackIndex,
          currentTrack,
          currentTime,
          setCurrentTime,
          formatTime,
          duration,
          setDuration,
          nextTrack,
          prevTrack,
          play,
          pause,
          isPlaying,
          volume,
          setVolume,
          createPlaylist,
          playlists,
          addSongToPlaylist,
          setCurrentTrack,
          deletePlaylist
        }}>{children}</MusicContext.Provider>
}

export const useMusic = () => {
    const contextValue = useContext(MusicContext);

    if(!contextValue) {
        throw new Error("useMusic needs to be inside of a musicprovider")
    }
    return contextValue;
};