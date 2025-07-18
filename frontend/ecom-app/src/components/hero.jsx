import React from 'react'
import '../styles/hero.css' // Assuming you have a CSS file for styling the hero component
import Navbar from './navbar'
import { Link } from 'react-router-dom'
const hero = () => {
  return (
    <div className="hero" name="hero" id="section0">
<Navbar />
        <div className="hero-content">
<div className="main">
            <h1>Where Calm Meets Care</h1>
            <p>“Your ritual of softness begins here. Skincare crafted to calm, hydrate, and restore.”</p>
            <p>We don’t chase trends. We listen to skin <br/>calmly, intentionally, and with purpose.</p>
            <Link to="/products">
            <button>Shop Now</button>
            </Link>
</div>
            </div>
    </div>
  )
}

export default hero