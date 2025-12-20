import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`;

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo"><span>GC 2026</span></div>
      <div className="nav-divider"></div>
      <NavLink to="/" className={linkClass} end><span>Home</span></NavLink>
      <NavLink to="/schedule" className={linkClass}><span>Schedule</span></NavLink>
      <NavLink to="/leaderboard" className={linkClass}><span>Leaderboard</span></NavLink>
    </nav>
  );
}