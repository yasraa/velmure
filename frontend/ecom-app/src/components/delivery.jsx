
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Newssignup from './newssignup';
import '../styles/delivery.css';
import Car from '../assets/car.png';
import { TfiAlarmClock } from "react-icons/tfi";
import { CiGlobe } from "react-icons/ci";
import { CiGift } from "react-icons/ci";
import { IoFlashOutline } from "react-icons/io5";
gsap.registerPlugin(ScrollTrigger);

const Delivery = () => {

  useGSAP(() => {
    gsap.matchMedia().add(
      {
        // Desktop (min-width: 768px)
        desktop: "(min-width: 768px)",
        mobile: "(max-width: 767px)",
      },
      (context) => {
        const { desktop, mobile } = context.conditions;
        if (desktop) {
          gsap.to('.delivery h1,.onm', {
            scrollTrigger: {
              trigger: '.delivery',
              toggleActions: 'restart none none none',
            },
            y: -20,
            duration: 2,
            delay: 0.5,
          })
          gsap.to('.delivery-container', {
            scrollTrigger: {
              trigger: '.delivery',
              toggleActions: 'restart none none none',
            },
            y: -20,
            duration: 2,
            delay: 0.5,
          })
        }
        if(mobile){
           gsap.to('#oanimate,#tanimate,#thanimate,#fanimate', {
            scrollTrigger: {
              trigger: '.delivery',
              toggleActions: 'restart none none none',
            },
            y: -20,
            stagger:0.5,
            duration: 2,
            delay: 0.5,
          })
             gsap.to('.delivery h1,.onm', {
            scrollTrigger: {
              trigger: '.delivery',
              toggleActions: 'restart none none none',
            },
            y: -20,
            duration: 2,
            delay: 0.5,
          })
        }
      })


    const screenWidth = window.innerWidth;
    let xValue;
    if (screenWidth > 1024) {
      // Desktop
      xValue = 1040;
    } else if (screenWidth > 768) {
      // Tablet
      xValue = 400;
    } else {
      // Mobile
      xValue = 250;
    }
    gsap.to('.car img', {
      scrollTrigger: {
        trigger: '.car',
        toggleActions: 'restart none none none',
      },
      x: xValue,
      duration: 2,
      delay: 0.5,
    })

  })

  return (
    <div className='delivery' name='delivery' id='section3'>
      <h1>Delivery</h1>
      <p className='onm'>
        We offer fast and secure shipping across the country.
      </p>
      <div className="car">
        <img src={Car} alt=""
          style={{ width: '62px' }} />
      </div>
      <div className="delivery-container">
        <div className="delivery-item" id='oanimate'>
          <div className="icon">
            <TfiAlarmClock style={{ fontSize: '50px' }} />
          </div>
          <div className="del-cont">
            <h2>Order Tracking </h2>
            <p >Get real-time updates from checkout to delivery with tracking & SMS/email alerts..</p>
          </div>
        </div>
        <div className="delivery-item" id='tanimate'>
          <div className="icon">
            <CiGlobe style={{ fontSize: '50px' }} />
          </div>
          <div className="del-cont">
            <h2>International Shipping</h2>
            <p>“We ship worldwide! International orders typically arrive within 7–14 business days.”</p>
          </div>
        </div>
        <div className="delivery-item" id='thanimate'>
          <div className="icon">
            <CiGift style={{ fontSize: '50px' }} />
          </div>
          <div className="del-cont">
            <h2> Free Samples</h2>
            <p>Every order includes a free mini sample of our product your skin deserves options.</p>
          </div>
        </div>
        <div className="delivery-item" id='fanimate'>
          <div className="icon">
            <IoFlashOutline style={{ fontSize: '50px' }} />
          </div>
          <div className="del-cont">
            <h2>Fast Delivery</h2>
            <p>Get your orders delivered within 2-3 business days.</p>
          </div>
        </div>
      </div>
      <Newssignup />
    </div>
  );
};

export default Delivery;
