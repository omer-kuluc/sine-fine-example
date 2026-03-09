import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Intro from './Intro';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const orbitContainerRef = useRef(null);
  const phraseRefs = useRef([]);
  const lineRefs = useRef([]);

  const phrases = [
    "life.", "job.", "career.", "family.", "big television.",
    "washing machine.", "good health.", "dental insurance.",
    "friends.", "future."
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
      // 1. ORBIT & BRANCHES ANIMATION
      const orbitTl = gsap.timeline({
        scrollTrigger: {
          trigger: orbitContainerRef.current,
          start: "top top",
          end: "+=350%",
          scrub: 1.5,
          pin: true,
        }
      });

      // Dalların çizilmesi ve kelimelerin uçlarda belirmesi
      lineRefs.current.forEach((line, i) => {
        if (!line) return;
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });

        orbitTl.to(line, {
          strokeDashoffset: 0,
          duration: 1,
          ease: "power2.inOut"
        }, i * 0.1);

        orbitTl.fromTo(phraseRefs.current[i],
          { opacity: 0, scale: 0, filter: "blur(10px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.5, ease: "back.out(1.7)" },
          "-=0.4"
        );
      });

      orbitTl.to(".main-choose", { scale: 0.9, opacity: 0.05, duration: 1.5 }, 0.5);

      // 2. NARRATIVE ANIMATION
      const blocks = self.selector('.narrative-block');
      blocks.forEach((block) => {
        const text = block.querySelector('p');
        gsap.fromTo(text,
          { opacity: 0, y: 40, filter: "blur(10px)", clipPath: "inset(0 0 100% 0)" },
          {
            opacity: 1, y: 0, filter: "blur(0px)", clipPath: "inset(0 0 0% 0)",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              end: "top 30%",
              scrub: 1,
            }
          }
        );
      });

      // 3. INTRO TRANSITION (Portal Kilit Açma)
      ScrollTrigger.create({
        trigger: ".intro-section",
        start: "top 60%",
        onEnter: () => {
          gsap.to(".intro-section", { opacity: 1, duration: 1.5 });
          document.querySelector('.intro-body')?.classList.add('is-ready');
        },
        onLeaveBack: () => {
          document.querySelector('.intro-body')?.classList.remove('is-ready');
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="home-container" ref={containerRef}>
      <div className="light-grid"></div>

      {/* Bölüm 1: Dallanan Seçimler */}
      <section className="orbit-container" ref={orbitContainerRef}>
        <div className="sticky-center">
          <h1 className="main-choose">CHOOSE</h1>

          <svg className="branch-svg-overlay" viewBox="0 0 800 800">
            {phrases.map((_, i) => {
              const angle = (i / phrases.length) * Math.PI * 2;
              const r = 260;
              const x2 = 400 + Math.cos(angle) * r;
              const y2 = 400 + Math.sin(angle) * r;
              return (
                <line
                  key={i}
                  ref={el => lineRefs.current[i] = el}
                  x1="400" y1="400" x2={x2} y2={y2}
                  stroke="var(--gold)"
                  strokeWidth="1"
                  opacity="0.25"
                />
              );
            })}
          </svg>

          {phrases.map((phrase, i) => {
            const angle = (i / phrases.length) * Math.PI * 2;
            const r = 280;
            const left = 50 + (Math.cos(angle) * r / 8) + "%";
            const top = 50 + (Math.sin(angle) * r / 8) + "%";
            return (
              <div
                key={i}
                ref={el => phraseRefs.current[i] = el}
                className="branch-phrase"
                style={{ left, top }}
              >
                {phrase}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bölüm 2: Anlatı Metinleri */}
      <section className="narrative-section">
        {narrativeBlocks.map((text, i) => (
          <div key={i} className="narrative-block">
            <p className="narrative-text">{text}</p>
          </div>
        ))}
      </section>

      {/* Bölüm 3: Intro Bileşeni */}
      <section className="intro-section" style={{ opacity: 0 }}>
        <Intro />
      </section>
    </div>
  );
}