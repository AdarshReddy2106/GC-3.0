import { NavLink } from 'react-router-dom';
import { FaTrophy } from 'react-icons/fa';

const linkClass = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`;

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src="/logo.png" alt="GC 2026 Logo" className="logo-image" />
        <span>GC 2026</span>
      </div>
      
      <div className="nav-links">
        <NavLink to="/" className={linkClass} end>HOME</NavLink>
        <NavLink to="/schedule" className={linkClass}>SCHEDULE</NavLink>
        <NavLink to="/leaderboard" className={linkClass}>LEADERBOARD</NavLink>
        <NavLink to="/teams" className={linkClass}>TEAMS</NavLink>
        <NavLink to="/gallery" className={linkClass}>GALLERY</NavLink>
        <NavLink to="/contact" className={linkClass}>CONTACT</NavLink>
      </div>
    </nav>
  );
}