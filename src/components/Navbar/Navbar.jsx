// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import style from '../Navbar/Navbar.module.css';
import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai';
import { MdMovie, MdTv } from 'react-icons/md';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme] = useState('dark');
  // const [showSearch, setShowSearch] = useState(false); // لم يعد مستخدماً
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('light-mode', theme === 'light');
    document.body.classList.toggle('dark-mode', theme === 'dark');
  }, [theme]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // const toggleTheme = () => {
  //   setTheme(theme === 'dark' ? 'light' : 'dark');
  // };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setSearchLoading(true);
    // بحث في الأفلام فقط (يمكنك توسيعه لاحقاً)
    const API_KEY = 'f1aca93e54807386df3f6972a5c33b50';
    const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`);
    const data = await res.json();
    setSearchResults(data.results || []);
    setSearchLoading(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`navbar navbar-expand-lg fixed-top navbar-dark d-none d-lg-block ${scrolled ? style.scrolledNav : style.transparentNav}`}>
        <div className="container-fluid">
          <NavLink className={`navbar-brand fw-bold fs-4 ${style.logo}`} to="/">
            <span className={style.logoWhite}>Moon</span><span className={style.logoRed}>Flix</span>
          </NavLink>

          <div className="navbar-nav me-auto">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${style.activeNav} nav-link` : 'nav-link text-white'
              }
            >
              HOME
            </NavLink>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive ? `${style.activeNav} nav-link` : 'nav-link text-white'
              }
            >
              MOVIES
            </NavLink>
            <NavLink
              to="/series"
              className={({ isActive }) =>
                isActive ? `${style.activeNav} nav-link` : 'nav-link text-white'
              }
            >
              TV SERIES
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive ? `${style.activeNav} nav-link` : 'nav-link text-white'
              }>
              SEARCH
            </NavLink>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={() => navigate('/search')} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>
              <FaSearch />
            </button>
            <header>
              <SignedOut>
                <SignInButton className="btn btn-danger fw-bold" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <nav className={`navbar fixed-top navbar-dark d-lg-none ${scrolled ? style.scrolledNav : style.transparentNav}`}>
        <div className="container-fluid">
          <button 
            className={`${style.hamburger} navbar-toggler`} 
            type="button"
            onClick={toggleSidebar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <NavLink className={`navbar-brand fw-bold fs-4 ${style.logo}`} to="/">
            <span className={style.logoWhite}>Moon</span><span className={style.logoRed}>Flix</span>
          </NavLink>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <header>
              <SignedOut>
                <SignInButton className="btn btn-danger fw-bold" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </header>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`${style.sidebar} ${sidebarOpen ? style.sidebarOpen : ''}`}>
        <div className={style.sidebarHeader}>
          <h4 className={style.sidebarTitle}>MENU</h4>
        </div>
        
        <ul className={style.sidebarMenu}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${style.sidebarLink} ${style.activeLink}` : style.sidebarLink
              }
              onClick={closeSidebar}
            >
              <AiOutlineHome className={style.sidebarIcon} />
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive ? `${style.sidebarLink} ${style.activeLink}` : style.sidebarLink
              }
              onClick={closeSidebar}
            >
              <MdMovie className={style.sidebarIcon} />
              MOVIES
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ TVSERIES"
              className={({ isActive }) =>
                isActive ? `${style.sidebarLink} ${style.activeLink}` : style.sidebarLink
              }
              onClick={closeSidebar}
            >
              <MdTv className={style.sidebarIcon} />
              TV SERIES
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive ? `${style.sidebarLink} ${style.activeLink}` : style.sidebarLink
              }
              onClick={closeSidebar}
            >
              <AiOutlineSearch className={style.sidebarIcon} />
              SEARCH
            </NavLink>
          </li>
        </ul>

        <div className={style.sidebarTheme}>
          <h5 className={style.themeTitle}>THEME</h5>
          <div className={style.themeOption}>
            <span className={style.moonIcon}>🌙</span>
            DARK MODE
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className={style.overlay} onClick={closeSidebar}></div>}

    </>
  );
};

export default Navbar;