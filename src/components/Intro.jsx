import { useEffect, useRef, useMemo, useState } from 'react';
import gsap from 'gsap';

const Intro = () => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const containerRef = useRef(null);
  const modalRef = useRef(null);
  const modalOverlayRef = useRef(null);

  useEffect(() => {
    const preventDefault = (e) => {
      if (e.touches.length > 1) return;
      e.preventDefault();
    };

    document.addEventListener('touchmove', preventDefault, { passive: false });
    document.addEventListener('wheel', preventDefault, { passive: false });

    const ctx = gsap.context(() => {
    }, containerRef);

    return () => {
      document.removeEventListener('touchmove', preventDefault);
      document.removeEventListener('wheel', preventDefault);
      ctx.revert();
    };
  }, []);



  const sparklePositions = useMemo(() => [
    [15, 20], [25, 15], [8, 50], [18, 70], [30, 85], [85, 15], [92, 30], [80, 65], [90, 75], [70, 90],
    [45, 5], [55, 95], [5, 45], [95, 55], [35, 92], [65, 8], [12, 35], [88, 45], [42, 78], [58, 22],
    [22, 60], [78, 40], [50, 12], [50, 88], [38, 38], [62, 62], [10, 10], [90, 10], [10, 90], [90, 90],
    [30, 30], [70, 70], [20, 80], [80, 20], [50, 50]
  ], []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      const branches = gsap.utils.toArray('.branch-path');

      branches.forEach(p => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, visibility: 'visible' });
      });

      gsap.set(['#center-ring', '#center-ring2', '#leaf-accents', '.info-btn'], { visibility: 'visible' });
      gsap.set('#center-ring', { opacity: 0, scale: 0, transformOrigin: '720px 450px' });
      gsap.set('#center-ring2', { opacity: 0, scale: 0, transformOrigin: '720px 450px' });
      gsap.set('#leaf-accents', { opacity: 0 });
      gsap.set('.floating-symbol', { opacity: 0, y: 20, z: 0.1, rotationZ: 0.01, force3D: true });
      gsap.set('.inception-image, .big-fish-image, .coco-image', { opacity: 0 });
      gsap.set('.info-btn', { opacity: 0 });

      tl.to('#center-ring', { opacity: 0.5, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }, 0)
        .to('#center-ring2', { opacity: 0.35, scale: 1, duration: 1, ease: 'back.out(1.2)' }, 0.2)
        .to([branches[0], branches[4], branches[9], branches[15]], { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut', stagger: 0.15 }, 0.4)
        .to([branches[1], branches[2], branches[5], branches[6], branches[10], branches[11], branches[16], branches[17]], { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', stagger: 0.08 }, 1.0)
        .to(branches.slice(18, 29), { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out', stagger: 0.04 }, 1.6)
        .to([branches[29], branches[30], branches[31], branches[32]], { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut', stagger: 0.1 }, 1.2)
        .to('#leaf-accents', { opacity: 1, duration: 0.5 }, 2.4)
        .to('.brand-header', { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.inOut' }, 2.0)
        .to('.epigraph', { clipPath: 'inset(0 0 0% 0)', duration: 1.0, ease: 'power3.out' }, 2.6)
        .to('.choose-word', { clipPath: 'inset(0 0% 0 0%)', duration: 0.9, ease: 'back.out(1.2)' }, 3.2)
        .to('.floating-symbol', { opacity: 0.4, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', z: 0.1, rotationZ: 0.01, force3D: true }, 4.0)
        .to('.sparkle', { opacity: () => 0.3 + Math.random() * 0.6, y: () => -10 + Math.random() * -20, duration: () => 1 + Math.random() * 2, stagger: { amount: 2, from: 'random' } }, 3.8)
        .to('.footer-text', { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power3.out' }, 5.0)
        .to('.portal-name', { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power3.out', stagger: 0.1 }, 5.7)
        .to('.info-btn', { opacity: 0.6, duration: 0.5 }, 6.0);

      gsap.to('.choose-word', { textShadow: '0 0 80px rgba(201,168,76,0.6)', duration: 2, ease: 'sine.inOut', repeat: -1, yoyo: true });
      gsap.to('#center-ring', { scale: 1.1, opacity: 0.6, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true });
      gsap.to('#center-ring2', { rotation: 360, duration: 60, ease: 'none', repeat: -1 });
      gsap.to('.floating-symbol', { y: '-=10', duration: 2, ease: 'sine.inOut', repeat: -1, yoyo: true, z: 0.1, rotationZ: 0.01, force3D: true, stagger: { amount: 1, from: 'random' } });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // AÇILIŞ ANİMASYONU
  useEffect(() => {
    if (isInfoOpen) {
      gsap.fromTo(modalOverlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 });
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power4.out' }
      );
    }
  }, [isInfoOpen]);

  // KAPANIŞ ANİMASYONU (YUMUŞAK)
  const handleCloseInfo = () => {
    const tl = gsap.timeline({
      onComplete: () => setIsInfoOpen(false) // Animasyon bitince elementi DOM'dan kaldır
    });

    tl.to(modalRef.current, {
      opacity: 0,
      scale: 0.9,
      y: 20,
      duration: 0.4,
      ease: 'power2.in'
    })
      .to(modalOverlayRef.current, {
        opacity: 0,
        duration: 0.3
      }, "-=0.2");
  };

  const handlePortalEnter = (id) => {
    const branchPaths = containerRef.current.querySelectorAll('.branch-path');
    const symbols = containerRef.current.querySelectorAll('.floating-symbol');
    const word = containerRef.current.querySelector('.choose-word');
    gsap.to('.intro-body', { backgroundColor: '#000', duration: 1 });
    gsap.to(branchPaths, { stroke: '#415A77', duration: 0.8 });
    gsap.to([symbols, word], { color: '#E0E1DD', duration: 0.8 });
    if (id === 'portal-somnium') gsap.to('.inception-image', { opacity: 0.6, duration: 1.2 });
    else if (id === 'portal-fabula') gsap.to('.big-fish-image', { opacity: 0.6, duration: 1.2 });
    else if (id === 'portal-limen') gsap.to('.coco-image', { opacity: 0.6, duration: 1.2 });
  };

  const handlePortalLeave = () => {
    const branchPaths = containerRef.current.querySelectorAll('.branch-path');
    const symbols = containerRef.current.querySelectorAll('.floating-symbol');
    const word = containerRef.current.querySelector('.choose-word');
    gsap.to('.inception-image, .big-fish-image, .coco-image', { opacity: 0, duration: 0.8 });
    gsap.to('.intro-body', { backgroundColor: '#f5f0e8', duration: 0.8 });
    gsap.to(branchPaths, { stroke: '#c9a84c', duration: 0.8 });
    gsap.to([symbols, word], { color: '#c9a84c', duration: 0.8 });
  };

  return (
    <div className="intro-body" ref={containerRef}>
      <img className='inception-image' src="/images/somnium.jpg" alt="Inception" />
      <img className='big-fish-image' src="/images/fabula.jpg" alt="Big Fish" />
      <img className='coco-image' src="/images/limen.jpg" alt="Coco" />

      <button className="info-btn" onClick={() => setIsInfoOpen(true)}>INFO</button>

      {isInfoOpen && (
        <div className="info-modal-overlay" ref={modalOverlayRef} onClick={handleCloseInfo}>
          <div className="info-modal-content" ref={modalRef} onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseInfo}>✕</button>

            <div className="modal-header">
              <h3>SINE FINE</h3>
            </div>

            <div className="modal-divider">
              <div className="line"></div>
              <span className="symbol">✦</span>
              <div className="line"></div>
            </div>

            <div className="modal-body">
              <p className="inspired-by">Inspired by the realms of:</p>
              <ul className="movie-list">
                <li><span className="movie-name">Inception</span> <span className="movie-year">2010</span></li>
                <li><span className="movie-name">Big Fish</span> <span className="movie-year">2003</span></li>
                <li><span className="movie-name">Coco</span> <span className="movie-year">2017</span></li>
              </ul>

              <div className="disclaimer-box">
                <p>This experience is crafted for educational and non-commercial purposes only.</p>
                <p>Concept and imagery inspired by the cinematic works of their respective visionaries.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="stage">
        <svg id="branch-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <path className="branch-path" d="M720,450 Q718,380 715,310 Q712,260 700,200" strokeWidth="1.5" opacity="0.6" filter="url(#glow)" />
          <path className="branch-path" d="M715,310 Q680,280 640,240 Q610,210 570,180" strokeWidth="1" opacity="0.5" />
          <path className="branch-path" d="M715,310 Q750,280 780,250 Q810,220 840,190" strokeWidth="1" opacity="0.5" />
          <path className="branch-path" d="M700,200 Q660,170 620,150" strokeWidth="0.8" opacity="0.4" />
          <path className="branch-path" d="M700,200 Q730,165 760,145" strokeWidth="0.8" opacity="0.4" />
          <path className="branch-path" d="M640,240 Q600,220 560,215" strokeWidth="0.6" opacity="0.35" />
          <path className="branch-path" d="M640,240 Q620,200 605,175" strokeWidth="0.6" opacity="0.35" />
          <path className="branch-path" d="M780,250 Q820,230 860,225" strokeWidth="0.6" opacity="0.35" />
          <path className="branch-path" d="M780,250 Q800,215 815,185" strokeWidth="0.6" opacity="0.35" />
          <path className="branch-path" d="M720,450 Q640,445 560,440 Q480,435 400,440" strokeWidth="1.5" opacity="0.6" filter="url(#glow)" />
          <path className="branch-path" d="M560,440 Q530,400 500,360 Q480,330 460,290" strokeWidth="1" opacity="0.5" />
          <path className="branch-path" d="M560,440 Q540,480 520,510 Q500,540 475,560" strokeWidth="1" opacity="0.5" />
          <path className="branch-path" d="M500,360 Q460,340 420,330" strokeWidth="0.7" opacity="0.4" />
          <path className="branch-path" d="M500,360 Q490,320 480,295" strokeWidth="0.7" opacity="0.4" />
          <path className="branch-path" d="M460,290 Q430,270 400,265" strokeWidth="0.55" opacity="0.35" />
          <path className="branch-path" d="M460,290 Q450,255 445,225" strokeWidth="0.55" opacity="0.35" />
          <path className="branch-path" d="M520,510 Q490,530 460,545" strokeWidth="0.55" opacity="0.35" />
          <path className="branch-path" d="M520,510 Q510,545 500,570" strokeWidth="0.55" opacity="0.35" />
          <path className="branch-path" d="M720,450 Q800,445 880,440 Q960,435 1040,440" strokeWidth="1.5" opacity="0.6" filter="url(#glow)" />
          <path className="branch-path" d="M880,440 Q910,400 940,360 Q960,330 980,290" strokeWidth="1" opacity="0.5" />
          <path className="branch-path" d="M880,440 Q900,480 920,510 Q940,540 965,560" strokeWidth="1" opacity="0.5" />
          <path className="branch-path" d="M940,360 Q980,340 1020,330" strokeWidth="0.7" opacity="0.4" />
          <path className="branch-path" d="M940,360 Q950,320 960,295" strokeWidth="0.7" opacity="0.4" />
          <path className="branch-path" d="M980,290 Q1010,270 1040,265" strokeWidth="0.55" opacity="0.35" />
          <path className="branch-path" d="M980,290 Q990,255 995,225" strokeWidth="0.55" opacity="0.35" />
          <path className="branch-path" d="M920,510 Q950,530 980,545" strokeWidth="0.55" opacity="0.35" />
          <path className="branch-path" d="M920,510 Q930,545 940,570" strokeWidth="0.55" opacity="0.35" />
          <path className="branch-path" d="M720,450 Q722,530 724,610 Q726,680 728,750" strokeWidth="1.5" opacity="0.6" filter="url(#glow)" />
          <path className="branch-path" d="M724,610 Q680,640 640,670 Q600,695 560,720" strokeWidth="1" opacity="0.5" />
          <path className="branch-path" d="M724,610 Q760,640 800,665 Q840,690 875,715" strokeWidth="1" opacity="0.5" />
          <path className="branch-path" d="M640,670 Q610,690 580,700" strokeWidth="0.55" opacity="0.35" />
          <path className="branch-path" d="M800,665 Q830,685 860,695" strokeWidth="0.55" opacity="0.35" />
          <path className="branch-path" d="M728,750 Q700,770 670,785" strokeWidth="0.6" opacity="0.4" />
          <path className="branch-path" d="M728,750 Q750,765 775,780" strokeWidth="0.6" opacity="0.4" />
          <path className="branch-path" d="M720,450 Q660,390 600,330 Q550,280 500,230" strokeWidth="1.2" opacity="0.45" />
          <path className="branch-path" d="M600,330 Q560,310 520,305" strokeWidth="0.65" opacity="0.35" />
          <path className="branch-path" d="M720,450 Q780,390 840,330 Q890,280 940,230" strokeWidth="1.2" opacity="0.45" />
          <path className="branch-path" d="M840,330 Q880,310 920,305" strokeWidth="0.65" opacity="0.35" />

          <circle cx="720" cy="450" r="40" fill="none" stroke="var(--gold)" strokeWidth="0.8" opacity="0" id="center-ring" />
          <circle cx="720" cy="450" r="55" fill="none" stroke="var(--gold)" strokeWidth="0.4" strokeDasharray="4,8" opacity="0" id="center-ring2" />

          <g id="leaf-accents" opacity="0">
            {[
              { cx: 570, cy: 180, r: 3 }, { cx: 840, cy: 190, r: 3 }, { cx: 460, cy: 290, r: 2.5 }, { cx: 980, cy: 290, r: 2.5 },
              { cx: 560, cy: 720, r: 3 }, { cx: 875, cy: 715, r: 3 }, { cx: 400, cy: 440, r: 2 }, { cx: 1040, cy: 440, r: 2 }
            ].map((c, i) => (
              <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="var(--gold)" opacity={c.cx === 400 || c.cx === 1040 ? 0.4 : 0.6} />
            ))}
          </g>
        </svg>

        <div className="floating-symbol" style={{ left: '15%', top: '25%' }}>∞</div>
        <div className="floating-symbol" style={{ right: '15%', top: '25%' }}>✦</div>
        <div className="floating-symbol" style={{ left: '15%', bottom: '25%' }}>◊</div>
        <div className="floating-symbol" style={{ right: '15%', bottom: '25%' }}>※</div>
        <div className="floating-symbol" style={{ left: '50%', top: '15%', transform: 'translateX(-50%)' }}>✧</div>

        <div className="brand-header">
          <div className="label">Est. MMXXVI &nbsp;·&nbsp; A World Beyond Limits</div>
          <h1 className='brand-header-text'>SINE FINE</h1>
        </div>

        <div className="epigraph">
          <p>Every choice is a door.<br />Every door, a labyrinth.<br />Every labyrinth, a universe waiting to be born.</p>
        </div>

        <div className="choose-word">CHOOSE</div>

        <div className="portal-container" id="portal-somnium" onMouseEnter={() => handlePortalEnter('portal-somnium')} onMouseLeave={handlePortalLeave}>
          <div className="portal-name">SOMNIUM</div>
        </div>
        <div className="portal-container" id="portal-fabula" onMouseEnter={() => handlePortalEnter('portal-fabula')} onMouseLeave={handlePortalLeave}>
          <div className="portal-name">FABULA</div>
        </div>
        <div className="portal-container" id="portal-limen" onMouseEnter={() => handlePortalEnter('portal-limen')} onMouseLeave={handlePortalLeave}>
          <div className="portal-name">LIMEN</div>
        </div>

        <div className="sparkles-container">
          {sparklePositions.map((pos, i) => {
            const size = (2 + Math.random() * 4) + 'px';
            return (
              <div key={i} className="sparkle" style={{ left: `${pos[0]}%`, top: `${pos[1]}%`, width: size, height: size }} />
            );
          })}
        </div>

        <div className="footer-text"><p>sine fine &nbsp;·&nbsp; &nbsp;·&nbsp; without end</p></div>
      </div>
    </div>
  );
};

export default Intro;