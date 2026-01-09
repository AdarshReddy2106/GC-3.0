import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Leaderboard from './pages/Leaderboard';
import Contact from './pages/contact';

export default function App() {
  const { pathname } = useLocation();

  return (
    <>
      <Navbar />
      <main data-path={pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </>
  );
}