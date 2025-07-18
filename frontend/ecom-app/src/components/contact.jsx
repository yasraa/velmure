import React from 'react'
import '../styles/contact.css' // Assuming you have a CSS file for styling the contact component
import { IoLogoInstagram } from "react-icons/io";
import { PiTiktokLogoLight } from "react-icons/pi";
import { AiOutlinePinterest } from "react-icons/ai";

const contact = () => {
  return (
    <div className="contact" name="contact" id="section5">
        <h2>Contact Information</h2>
        <div className="phn-num">
          <div>+1 (800) 123-4567</div>
          <div>support@sereinbeauty.com</div>
        </div>
        <div className="add">
          123 Serene Blvd, New York, NY
        </div>
        <div className="icons">
            <IoLogoInstagram size={50} />
             <PiTiktokLogoLight size={50} />
            <AiOutlinePinterest size={50} />
        </div>

        <div className="links">
          <div className="logo">Velmure</div>
          <p>&copy; 2024 yasra. All Rights Reserved.</p>
          <div className="s-links">
            <li><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</li>
    <li><strong>Saturday:</strong> 10:00 AM - 4:00 PM</li>
 
          </div>
        </div>
        </div>
  )
}

export default contact