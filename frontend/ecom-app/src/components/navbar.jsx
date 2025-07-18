import React, { useState } from 'react';
import '../styles/navbar.css'; // Importing styles for the navbar
import { Link } from 'react-router-dom'; // Importing Link for navigation
import { IoCartOutline } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

const scrollToSection = (sectionId) => {
  const target = document.getElementById(sectionId);

  if (target) {
    const start = window.scrollY || document.documentElement.scrollTop;
    const end = target.getBoundingClientRect().top + start; // get absolute Y of the target
    const duration = 1000;
    const startTime = performance.now();

    const smoothScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeInOutQuad =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const scrollY = start + (end - start) * easeInOutQuad;
      window.scrollTo(0, scrollY);

      if (elapsed < duration) {
        requestAnimationFrame(smoothScroll);
      }
    };

    requestAnimationFrame(smoothScroll);
  }
};


  return (
    <nav className="navbar">


      <div className="logo">VELMURE</div>

      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
       <ul>
         <li>
            <button onClick={() => scrollToSection("section1")}>About</button>
          </li>
          <li>
            <button onClick={() => scrollToSection("section2")}>Catalog</button>
          </li>
          <li>
            <button onClick={() => scrollToSection("section3")}>Delivery</button>
          </li>
          <li>
            <button onClick={() => scrollToSection("section4")}>FAQ</button>
          </li>
       </ul>
      </div>
      <div className="min">
      <div className="auth-buttons">
        <Link to="/cart">
          <button>
            <IoCartOutline size={'25'} style={{ color: '#4B2E4C' }}/>
          </button>
        </Link> 
         <Link to="/register">
        <button>
        <LuUserRound size={'25'} style={{ color: '#4B2E4C' }}  />
        </button>
        </Link>
        </div>
      <div className="hamburger" onClick={toggleMenu}>
        {/* 3 lines of hamburger icon */}
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
