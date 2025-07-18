import React from 'react'
import Seller from '../components/seller'
import Productcard from '../components/productcard'
import '../styles/catalog.css'
import {Link} from 'react-router-dom'
import { gsap } from 'gsap';
import {useGSAP} from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Catalog = () => {

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
          gsap.to(".products h2,.animation", {
            y: -20,
            opacity: 1,
            duration:1,
            scrollTrigger: {
              trigger: ".products",
              toggleActions: 'restart none none none',
            },
          });
        }

         if (mobile) {
         gsap.to(".products h2,.animation", {
            y: -20,
            opacity: 1,
            duration:1,
            scrollTrigger: {
              trigger: ".products",
              toggleActions: 'restart none none none',
              markers:"true",
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
    <div className='catalog' name='catalog' id='section2'>
<Seller />
<div className="products">
  <h2>Our Products</h2>
<div className="animation">
<Productcard/>
</div>
<Link to="/products" >
<button className='prod'>Show More</button>
</Link>
</div>

    </div>
  )
}

export default Catalog