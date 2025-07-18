import React, { useState } from 'react';
import '../styles/faq.css';
import Faqimg from '../assets/faqimg.png'
import { gsap } from 'gsap';
import {useGSAP} from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Faq = () => {

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
          gsap.to(".faq h1,.omn", {
            y: -20,
            opacity: 1,
            duration:1,
            scrollTrigger: {
              trigger: ".faq",
              toggleActions: 'restart none none none',
            },
          });
          gsap.to(".faq-img", {
            x: 20,
            opacity: 1,
            duration:1,
            scrollTrigger: {
              trigger: ".faq",
              toggleActions: 'restart none none none',
            },
          });
          gsap.to(".faq-item", {
            x: -20,
            opacity: 1,
            duration:1,
            scrollTrigger: {
              trigger: ".faq",
              toggleActions: 'restart none none none',
            },
          });
        }

         if (mobile) {
         gsap.to(".faq h1,.omn", {
            y: -20,
            opacity: 1,
            duration:1,
            scrollTrigger: {
              trigger: ".faq",
              toggleActions: 'restart none none none',
            },
          });
            gsap.to(".faq-item", {
            y: -20,
            opacity: 1,
            duration:1,
            scrollTrigger: {
              trigger: ".faq",
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

  const [openIndex, setOpenIndex] = useState(null); // Track which FAQ is open

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index); // toggle open/close
  };

  const faqData = [
    {
      question: 'How do I choose the right product for my skin?',
      answer: 'Use our Skin Quiz or filter by your skin type.',
    },
    {
      question: 'Are your products cruelty-free?',
      answer: '100%. Always tested on willing humans — never animals.',
    },
    {
      question: 'What makes Serein different?',
      answer: 'Clean ingredients, clinically backed, calm-first formulations.',
    },
    {
      question: 'How do I choose the right product for my skin?',
      answer: 'Clean ingredients, clinically backed, calm-first formulations.',
    },
  ];

  return (
    <div className="faq" name="faq" id="section4">
      <h1>FAQ</h1>
      <p className='omn'>Need Help? We’ve Got You</p>
      <div className="faq-container">
        <div className="faq-img"><img src={Faqimg} alt="" /></div>
        <div className="faq-item">
          <ul>
            {faqData.map((item, index) => (
              <li key={index}>
                <div className="questions">
                <p>{item.question}</p>
                <p className={openIndex === index ? '' : 'hidden'}>
                  {item.answer}
                </p>
                </div>
                <div>
                  <div className='faq-btn' onClick={() => toggleFAQ(index)}>
                    {openIndex === index ? '-' : '+'}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Faq;
