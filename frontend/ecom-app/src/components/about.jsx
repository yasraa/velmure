import React from 'react'
import '../styles/about.css' // Assuming you have a CSS file for styling
import { gsap } from 'gsap';
import {useGSAP} from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {

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
          gsap.to(".left-side", {
            x: 15,
  
            duration:2,
            scrollTrigger: {
              
              trigger: ".about",
               toggleActions: 'restart none none none',
            },
          });
          gsap.to(".right-side", {
            y: 15,
            opacity: 1,
            duration:2,
            scrollTrigger: {
 toggleActions: 'restart none none none',
              trigger: ".about",
             
            },
          });

        }

         if (mobile) {
          gsap.to(".right-side", {
            y: -20,
            opacity: 1,
            duration:2,
            scrollTrigger: {
              trigger: ".about",
               toggleActions: 'restart none none none',
            },
          });
        }
        if (mobile) {
          gsap.to(".left-side", {
            y:-20,
 
            duration:2,
            scrollTrigger: {
              trigger: ".about",
               toggleActions: 'restart none none none',
            },
          });
        }

           // Cleanup on resize
        return () => {
          gsap.killTweensOf(".box");
        };
      }
    );
})
  return (
    <div className="about" name="about" id="section1">
<div className="left-side">
    <h1>About Us</h1>
    <div className="top-paragraph">Serein was born from a simple belief: skincare should feel like self-care, not a struggle.
Inspired by the gentle serenity of a quiet evening rain (“serein” means fine rain that falls after sunset), our brand is built around soothing rituals, clean ingredients, and science-backed formulas that put your skin and peace of mind first.</div>
    <div className="bottom-paragraph">“We’re a skincare brand born from the idea that beauty begins with calm.
From gentle formulations to mindful routines — welcome to skin serenity.”</div>
</div>
<div className="right-side">
  
</div>
    </div>
  )
}

export default About