import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`;

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <span className="logo-text">GC 2026</span>
      </div>
      <NavLink to="/" className={linkClass} end>HOME</NavLink>
      <NavLink to="/schedule" className={linkClass}>SCHEDULE</NavLink>
      <NavLink to="/leaderboard" className={linkClass}>LEADERBOARD</NavLink>
      <NavLink to="/contact" className={linkClass}>CONTACT</NavLink>
    </nav>
  );
}