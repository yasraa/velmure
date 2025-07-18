import React from 'react'
import '../styles/catalog.css'
import Serum from '../assets/serum.png'
import Creame from '../assets/creame.png'
import Spray from '../assets/spray.png'

import { gsap } from 'gsap';
import {useGSAP} from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Seller = () => {
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
          gsap.to(".seller h1,.oml", {
            y: -20,
            opacity: 1,
            duration:1,
            scrollTrigger: {
              trigger: ".seller",
  toggleActions: 'restart none none none',
            },
          });
          gsap.to(".cat-card", {
            y: -30,
            opacity: 1,
            duration:2,
            scrollTrigger: {
              trigger: ".seller",
              toggleActions: 'restart none none none',
            },
          });

        }

         if (mobile) {
          gsap.to(".seller h1,.oml,.cat-card" ,{
            y: -20,
            opacity: 1,
            duration:2,
            scrollTrigger: {
              trigger: ".seller",
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
    <div className='seller' name='seller' >
      <h1>Best Seller</h1>
      <p className='oml'>Discover the calm your skin craves — these are your glow-getters.</p>
      <div className="best-selling-products">




<div className="cat-card">
        <div className="product">
          <img src={Serum} alt="" className='seller-img' style={{borderRadius:'50px 0px'}}/>
        </div>
        <p>
"This serum delivers instant hydration <br/>because calm skin is radiant skin."
        </p>
</div>

<div className="cat-card">
        <div className="product" >
          <img src={Creame} alt="" className='seller-img' />
        </div>
        <p>
"A nightly ritual in a jar nourishing and clinically backed for overnight repair."
        </p>
</div>

<div className="cat-card">
        <div className="product">
          <img src={Spray} alt="" className='seller-img'style={{borderRadius:'0px 50px'}}/>
        </div>
        <p>
"Like a breath of fresh air for your face,this refreshes anytime."
        </p>
</div>

      </div>
    </div>
  )
}

export default Seller