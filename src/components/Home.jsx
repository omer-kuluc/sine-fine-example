import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Intro from './Intro';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);

  const phrases = [
    "Life.",
    "a new reality.",
    "a digital legacy.",
    "your own frequency.",
    "a world without limits.",
    "your future.",
    "Sine Fine."
  ];

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const sections = self.selector('.text-section');

      // Her bir kelime/cümle için fütüristik geçiş
      sections.forEach((section, i) => {
        const phrase = section.querySelector('.phrase-wrapper');

        gsap.fromTo(phrase,
          {
            clipPath: 'inset(0 100% 0 0)',
            x: 50,
            filter: 'blur(20px) brightness(2)',
            opacity: 0
          },
          {
            clipPath: 'inset(0 0% 0 0)',
            x: 0,
            filter: 'blur(0px) brightness(1)',
            opacity: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              end: "top 20%",
              scrub: 1,
              toggleActions: "play reverse play reverse",
            }
          }
        );
      });

      // Intro Bölümüne gelindiğinde CHOOSE yazısını ve diğerlerini gizle, Intro'yu başlat
      ScrollTrigger.create({
        trigger: ".intro-section",
        start: "top 80%",
        onEnter: () => {
          gsap.to(stickyRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.5 });
          // Intro içindeki portalları görünür yap (CSS class yardımıyla)
          document.querySelector('.intro-body')?.classList.add('is-ready');
        },
        onLeaveBack: () => {
          gsap.to(stickyRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.5 });
          document.querySelector('.intro-body')?.classList.remove('is-ready');
        }
      });

      // Background Transition
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: ".intro-section",
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
        backgroundColor: "#f5f0e8",
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="home-container" ref={containerRef}>
      {/* Background Grid - Fütüristik Hava İçin */}
      <div className="cyber-grid"></div>

      <div className="sticky-ui" ref={stickyRef}>
        <div className="choose-label">PROTOCOL: INITIALIZING</div>
        <h2 className="fixed-choose">CHOOSE</h2>
        <div className="scan-line"></div>
      </div>

      <div className="content-scroll">
        <section className="hero-landing">
          <div className="hero-decoration">
            <span className="deco-line"></span>
            <span className="deco-text">SINE FINE SYSTEM v2.0</span>
            <span className="deco-line"></span>
          </div>
          <p className="hero-sub">PREPARE FOR TRANSFUSION</p>
        </section>

        {phrases.map((phrase, i) => (
          <section key={i} className="text-section">
            <div className="phrase-wrapper">
              <span className="phrase-text">{phrase}</span>
            </div>
          </section>
        ))}
      </div>

      <div className="intro-section">
        <Intro />
      </div>
    </div>
  );
}