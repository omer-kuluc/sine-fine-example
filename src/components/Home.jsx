import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Intro from './Intro';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const phraseRefs = useRef([]);
  const orbitContainerRef = useRef(null);

  const phrases = [
    "life.", "job.", "career.", "family.", "big television.",
    "washing machine.", "good health.", "dental insurance.",
    "friends.", "family.", "your future."
  ];

  const narrativeBlocks = [
    "You’ve been choosing constantly. You’ve been forced to choose.",
    "You felt stuck, felt as if no one understood you; perhaps you even lost your way, yet the cycle of choices never ended.",
    "To bring order to your life, you had to keep choosing, and in the end, you forgot to choose yourself.",
    "But what if choosing yourself were possible?",
    "What if an alternative life existed?",
    "A reality within layers of dreams, A story inside a fairy-tale world, Or a passage between life and death...",
    "You define the content, Choose your future, Choose yourself, Choose Sine Fine."
  ];

  useEffect(() => {
    const ctx = gsap.context((self) => {
      // 1. ORBIT SECTION: CHOOSE ve Etrafındaki Dallanma
      const orbitTl = gsap.timeline({
        scrollTrigger: {
          trigger: orbitContainerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1.5,
          pin: true,
          antialiasing: true
        }
      });

      // "CHOOSE" yazısının hafif büyümesi ve parlaması
      orbitTl.to(".main-choose", {
        scale: 1.1,
        letterSpacing: "0.3em",
        opacity: 0.15,
        duration: 2
      }, 0);

      // Kelimelerin merkezden spiral çizerek dağılması
      phraseRefs.current.forEach((el, i) => {
        const angle = (i / phrases.length) * Math.PI * 2.5; // Spiral için 2.5 tur
        const radius = 180 + (i * 15); // Her kelime biraz daha uzakta
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        orbitTl.fromTo(el,
          {
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0,
            filter: "blur(10px)"
          },
          {
            x: x,
            y: y,
            opacity: 0.8,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "expo.out"
          },
          i * 0.1 // Staggered fırlatma
        );
      });

      // 2. NARRATIVE SECTION: Sinematik Odaklanma ve Reveal
      const blocks = self.selector('.narrative-block');
      blocks.forEach((block, i) => {
        const text = block.querySelector('p');

        gsap.fromTo(text,
          {
            opacity: 0,
            y: 60,
            filter: "blur(12px)",
            clipPath: "inset(0 0 100% 0)"
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            clipPath: "inset(0 0 0% 0)",
            duration: 2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              end: "top 35%",
              scrub: 1,
            }
          }
        );

        // Arka plan ızgarasının (grid) metinle beraber hafifçe kayması (Parallax)
        gsap.to(".light-grid", {
          y: "-=30",
          scrollTrigger: {
            trigger: block,
            scrub: 2
          }
        });
      });

      // Intro Geçişi - Daha yumuşak bir fade-in
      ScrollTrigger.create({
        trigger: ".intro-section",
        start: "top 60%",
        onEnter: () => {
          gsap.to(".home-overlay", { opacity: 1, duration: 1.5 });
          document.querySelector('.intro-body')?.classList.add('is-ready');
        },
        onLeaveBack: () => {
          gsap.to(".home-overlay", { opacity: 0, duration: 1 });
          document.querySelector('.intro-body')?.classList.remove('is-ready');
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="home-container" ref={containerRef}>
      <div className="light-grid"></div>
      <div className="home-overlay"></div>

      {/* Bölüm 1: Orbiting Choices */}
      <section className="orbit-container" ref={orbitContainerRef}>
        <div className="sticky-center">
          <div className="status-bar">
            <span className="pulsing-dot"></span>
            NEURAL MAPPING IN PROGRESS
          </div>
          <h1 className="main-choose">CHOOSE</h1>
          {phrases.map((phrase, i) => (
            <div
              key={i}
              ref={el => phraseRefs.current[i] = el}
              className="orbit-phrase"
            >
              {phrase}
            </div>
          ))}
        </div>
      </section>

      {/* Bölüm 2: Narrative Content */}
      <section className="narrative-section">
        {narrativeBlocks.map((text, i) => (
          <div key={i} className="narrative-block">
            <p className="narrative-text">{text}</p>
          </div>
        ))}
      </section>

      {/* Bölüm 3: Intro Transition */}
      <section className="intro-section">
        <Intro />
      </section>
    </div>
  );
}