import { Link ,useLocation} from "react-router"


export const NavBar = () => {
    
    const location = useLocation();

    
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link className="brand-link" to="/"> Music Player</Link>
            <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}> All Songs</Link>
            <Link to="/playlists" className={`nav-link ${location.pathname === "/playlists" ? "active" : ""}`}> Playlist</Link>

        </div>

    </nav>
}