import { AllSongs } from "./components/AllSongs"
import { MusicPlayer } from "./components/MusicPlayer"
import { BrowserRouter,Route,Routes } from "react-router"
import { Playlists } from "./components/Playlists"
import { MusicProvider } from "./contexts/MusicContext"
import { NavBar } from "./components/NavBar"

function App() {

  return (
    <BrowserRouter>
    <MusicProvider>
      <div className="app">
      <NavBar></NavBar>
      <main className="app-main">
        <div className="player-section">
          <MusicPlayer />
        </div>
        <div className="content-section">
          <Routes>
            <Route path="/" element = {<AllSongs />}/>
            <Route path="/playlists" element = {<Playlists />}/>
          </Routes>
        </div>
  </main>
    </div>
    </MusicProvider>
    </BrowserRouter>

  )
      
  
}

export default App
