"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";

export default function LandingPage() {
  const { scrollY } = useScroll();
  const [layoutReady, setLayoutReady] = useState(false);
  const [startScale, setStartScale] = useState(5);
  const [startY, setStartY] = useState(0);
  const [heroHeight, setHeroHeight] = useState(800);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const placeholderRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const parallaxContainerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: parallaxProgress } = useScroll({
    target: parallaxContainerRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(parallaxProgress, [0, 1], ["-15%", "15%"]);

  const marqueeContainerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: marqueeProgress } = useScroll({
    target: marqueeContainerRef,
    offset: ["start end", "end start"]
  });
  const marqueeX = useTransform(marqueeProgress, [0, 1], ["5%", "-10%"]);

  const bentoRef = useRef<HTMLElement>(null);
  const { scrollYProgress: bentoProgress } = useScroll({
    target: bentoRef,
    offset: ["start end", "end start"]
  });
  const bentoY = useTransform(bentoProgress, [0, 1], ["-20%", "20%"]);

  const flyOutRef = useRef<HTMLElement>(null);
  const { scrollYProgress: flyOutProgress } = useScroll({
    target: flyOutRef,
    offset: ["start end", "center center"]
  });

  useEffect(() => {
    const handleResize = () => {
      let calculatedScale = 5;
      if (textRef.current) {
        const baseWidth = textRef.current.offsetWidth || 1;
        calculatedScale = (window.innerWidth - 48) / baseWidth;
        setStartScale(calculatedScale);
      }
      
      const heroEl = document.getElementById("hero");
      if (heroEl) {
        setHeroHeight(heroEl.offsetHeight);
      }
      
      if (placeholderRef.current) {
        placeholderRef.current.style.fontSize = `${24 * calculatedScale}px`;
        const rect = placeholderRef.current.getBoundingClientRect();
        const absoluteBottom = rect.bottom + window.scrollY;
        setStartY(absoluteBottom - 48);
      }
    };

    window.addEventListener("resize", handleResize);
    
    // Wait for fonts to load before measuring, fixes the incorrect right gap
    document.fonts.ready.then(() => {
      handleResize();
      setLayoutReady(true);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const footerEl = document.getElementById("main-footer");
    if (footerEl && footerEl.getBoundingClientRect().top <= 80) {
      setIsScrolled(false);
      return;
    }
    
    setIsScrolled(latest > heroHeight - 60);
  });

  const currentY = useTransform(scrollY, (v) => Math.max(0, startY - v));
  
  const maxScaleScroll = Math.max(startY + 600, 800);
  const currentScale = useTransform(scrollY, (v) => {
    const scaleProgress = Math.min(Math.max(v, 0) / maxScaleScroll, 1);
    const easeOut = 1 - Math.pow(1 - scaleProgress, 3);
    return startScale - (startScale - 1) * easeOut;
  });

  return (
    <div className="w-full bg-canvas overflow-x-hidden font-sans text-ink">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 flex justify-between items-start p-6 text-sm font-medium transition-colors duration-500 ${isScrolled ? 'text-ink' : 'text-white'}`}>
        <div className="flex-1">
          <Link href="/">
            <motion.h1 
              ref={textRef}
              className="inline-block text-2xl leading-none font-display font-black uppercase tracking-tighter origin-bottom-left select-none whitespace-nowrap"
              style={{
                y: currentY,
                scale: currentScale,
                opacity: layoutReady && startY > 0 ? 1 : 0
              }}
            >
              AEROMENTOR
            </motion.h1>
          </Link>
        </div>
        <div className="flex gap-8 flex-1 justify-center pt-1">
        </div>
        <div className="flex gap-4 flex-1 justify-end">
          <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isScrolled ? 'bg-white hover:bg-white/90' : 'hover:bg-white/10'}`} aria-label="account">
            <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                <path d="M16.4815 14.7656C15.5175 13.0737 14.0122 11.7554 12.2079 11.0229C13.1051 10.35 13.7679 9.41177 14.1023 8.34123C14.4367 7.27068 14.4258 6.12206 14.0712 5.05805C13.7165 3.99405 13.036 3.06861 12.1262 2.41282C11.2163 1.75703 10.1232 1.40414 9.00163 1.40414C7.88007 1.40414 6.78694 1.75703 5.87709 2.41282C4.96723 3.06861 4.28678 3.99405 3.93211 5.05805C3.57744 6.12206 3.56654 7.27068 3.90095 8.34123C4.23536 9.41177 4.89814 10.35 5.79538 11.0229C3.99111 11.7554 2.4858 13.0737 1.52179 14.7656C1.46206 14.8617 1.42224 14.9688 1.40472 15.0805C1.3872 15.1922 1.39232 15.3064 1.41978 15.4161C1.44724 15.5258 1.49649 15.6289 1.56459 15.7192C1.63269 15.8095 1.71825 15.8852 1.81618 15.9418C1.91412 15.9984 2.02244 16.0347 2.13469 16.0486C2.24694 16.0625 2.36084 16.0537 2.46962 16.0226C2.57839 15.9916 2.67982 15.9391 2.76787 15.8681C2.85592 15.7971 2.92881 15.7091 2.98218 15.6094C4.25624 13.4072 6.50624 12.0938 9.00163 12.0938C11.497 12.0938 13.747 13.4079 15.0211 15.6094C15.1368 15.7954 15.3202 15.9291 15.5327 15.9823C15.7452 16.0355 15.97 16.0039 16.1597 15.8944C16.3493 15.7848 16.4889 15.6058 16.549 15.3951C16.609 15.1845 16.5848 14.9587 16.4815 14.7656ZM5.34538 6.75C5.34538 6.02687 5.55982 5.31997 5.96157 4.7187C6.36333 4.11743 6.93435 3.6488 7.60245 3.37207C8.27054 3.09534 9.00569 3.02293 9.71493 3.16401C10.4242 3.30508 11.0757 3.65331 11.587 4.16464C12.0983 4.67598 12.4466 5.32746 12.5876 6.0367C12.7287 6.74595 12.6563 7.4811 12.3796 8.14919C12.1028 8.81728 11.6342 9.38831 11.0329 9.79006C10.4317 10.1918 9.72477 10.4063 9.00163 10.4063C8.03228 10.4051 7.10295 10.0196 6.41751 9.33413C5.73207 8.64869 5.3465 7.71936 5.34538 6.75Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative w-full h-screen min-h-[600px] flex flex-col justify-end overflow-hidden pt-32 pb-16 px-6">
        <Image
          src="/lol.jpg"
          alt="Indian MiG-29K"
          fill
          className="object-cover object-center absolute inset-0 z-0"
          priority
        />
        
        <div className="relative z-20 flex flex-col md:flex-row justify-between items-end w-full">
          <h2 className="text-canvas text-5xl md:text-7xl font-display font-medium tracking-tight leading-none max-w-lg">
            {/* 
              This invisible text block creates the exact natural line spacing 
              and physical space for the animated AEROMENTOR text to overlay perfectly on load.
            */}
            <span ref={placeholderRef} className="block leading-none font-black tracking-tighter invisible pb-2" style={{ fontSize: startScale ? `${24 * startScale}px` : '14vw' }}>
              AEROMENTOR
            </span>
            master the skies with intelligence
          </h2>
        </div>
      </section>



      {/* Info Section */}
      <section className="bg-canvas text-ink py-24 flex flex-col">
        <h2 className="px-6 md:px-16 text-4xl md:text-6xl font-display font-bold tracking-tight text-center max-w-5xl mx-auto leading-tight mb-20">
          Aeromentor <span className="inline-block w-24 h-10 bg-brand-coral rounded-full align-middle overflow-hidden relative"><Image src="/images/cockpit-view.png" alt="cockpit" fill className="object-cover"/></span> is crafted with cutting-edge aviation insights, so <span className="inline-block w-24 h-10 bg-brand-lavender rounded-full align-middle overflow-hidden relative"><Image src="/images/navy-jet-takeoff.png" alt="jet takeoff" fill className="object-cover"/></span> you master the skies safely, every time.
        </h2>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-3 border-t-2 border-b-2 border-ink">
          <div className="p-8 px-6 md:px-16 border-b-2 md:border-b-0 md:border-r-2 border-ink">
            <div className="relative w-10 h-10 mb-24">
              <Image src="/Lightning.svg" alt="Lightning" fill className="object-contain" />
            </div>
            <h3 className="text-2xl font-bold font-display tracking-tight mb-2">Extensive Library</h3>
            <p className="text-lg">Access a vast collection of specialized aviation resources and documents.</p>
          </div>
          <div className="p-8 px-6 md:px-16 border-b-2 md:border-b-0 md:border-r-2 border-ink">
            <div className="relative w-10 h-10 mb-24">
              <Image src="/CirclesThree.svg" alt="Circles" fill className="object-contain" />
            </div>
            <h3 className="text-2xl font-bold font-display tracking-tight mb-2">Auto Quizzes</h3>
            <p className="text-lg">Test your knowledge with instantly generated quizzes tailored to your studies.</p>
          </div>
          <div className="p-8 px-6 md:px-16">
            <div className="relative w-10 h-10 mb-24">
              <Image src="/SmileySticker.svg" alt="Smiley" fill className="object-contain" />
            </div>
            <h3 className="text-2xl font-bold font-display tracking-tight mb-2">RAG AI Chatbot</h3>
            <p className="text-lg">Get accurate, context-aware answers from our intelligent AI tutor anytime.</p>
          </div>
        </div>
      </section>

      {/* Parallax Image Section */}
      <section id="parallax-section" className="bg-canvas p-4 md:p-8 pb-16 md:pb-32">
        <div ref={parallaxContainerRef} className="relative w-full h-[70vh] md:h-[90vh] rounded-[32px] md:rounded-[48px] overflow-hidden flex flex-col justify-center items-center border-2 border-ink">
          <motion.div 
            className="absolute inset-0 z-0 w-full h-[130%]"
            style={{ y: parallaxY, top: "-15%" }}
          >
            <Image 
              src="/images/navy-jet-takeoff.png" 
              alt="Navy Jet Takeoff" 
              fill 
              className="object-cover"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/30"></div>
          </motion.div>
          
          <div className="relative z-10 text-center px-4 w-full h-full flex flex-col justify-center items-center">
            <h2 className="text-white text-6xl md:text-[8rem] font-display font-bold tracking-tighter leading-none mt-12 md:mt-24">
              Discover<br/>aerospace mastery
            </h2>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section ref={marqueeContainerRef} className="bg-canvas text-ink py-32 overflow-hidden flex items-center">
        <motion.div 
          className="whitespace-nowrap flex"
          style={{ x: marqueeX }}
        >
          <h2 className="text-[10rem] md:text-[15rem] font-display font-black tracking-tighter leading-none uppercase px-8">
            elevate your knowledge • elevate your knowledge • elevate your knowledge • elevate your knowledge • 
          </h2>
          <h2 className="text-[10rem] md:text-[15rem] font-display font-black tracking-tighter leading-none uppercase px-8" aria-hidden="true">
            elevate your knowledge • elevate your knowledge • elevate your knowledge • elevate your knowledge • 
          </h2>
        </motion.div>
      </section>

      {/* Technology Bento Grid */}
      <section ref={bentoRef} className="bg-canvas p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 w-full h-auto md:h-[90vh]">
          
          <div className="md:col-span-7 flex flex-col gap-4 md:gap-8">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 flex-1">
                <div className="bg-ink text-canvas border-2 border-ink rounded-[32px] p-8 flex flex-col justify-between relative overflow-hidden">
                  <motion.div className="absolute inset-0 w-full h-[140%] z-0" style={{ y: bentoY, top: "-20%" }}>
                    <Image src="/images/helicopter-formation.png" alt="heli" fill className="object-cover opacity-40" />
                  </motion.div>
                  <h4 className="text-6xl md:text-7xl font-display font-bold tracking-tighter z-10 drop-shadow-md">10x</h4>
                  <p className="text-2xl font-medium leading-snug z-10 drop-shadow-md">Accelerated learning speed for all fundamental modules and advanced combat scenarios.</p>
                </div>
                <div className="md:col-span-2 bg-ink text-canvas border-2 border-ink rounded-[32px] p-8 relative flex flex-col justify-end overflow-hidden">
                  <motion.div className="absolute inset-0 w-full h-[140%] z-0" style={{ y: bentoY, top: "-20%" }}>
                    <Image src="/Indian-Mig-29K-2(1).jpg" alt="jet" fill className="object-cover opacity-50" />
                  </motion.div>
                  <div className="absolute top-6 right-6 text-5xl md:text-6xl font-display font-bold z-10 drop-shadow-md">24/7</div>
                  <p className="text-2xl font-medium leading-snug mt-24 z-10 drop-shadow-md">Direct access to our intelligent AI tutor, ready to explain complex aerodynamics, advanced naval aviation concepts, and tactical navigation on demand.</p>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 flex-1">
                <div className="bg-ink text-canvas border-2 border-ink rounded-[32px] p-8 flex items-center relative overflow-hidden">
                  <motion.div className="absolute inset-0 w-full h-[140%] z-0" style={{ y: bentoY, top: "-20%" }}>
                    <Image src="/images/navy-crew-deck.png" alt="navy crew" fill className="object-cover opacity-50" />
                  </motion.div>
                  <p className="text-2xl font-medium leading-snug z-10 drop-shadow-md">Interactive quizzes that adapt dynamically to your knowledge gaps, focusing on your weakest areas to ensure comprehensive readiness.</p>
                </div>
                <div className="bg-ink text-canvas border-2 border-ink rounded-[32px] p-8 relative flex flex-col justify-between overflow-hidden">
                  <motion.div className="absolute inset-0 w-full h-[140%] z-0" style={{ y: bentoY, top: "-20%" }}>
                    <Image src="/images/aircraft-carrier.png" alt="carrier" fill className="object-cover opacity-40" />
                  </motion.div>
                  <h4 className="text-7xl font-display font-bold tracking-tighter z-10 drop-shadow-md">#1</h4>
                  <p className="text-2xl font-medium leading-snug z-10 mt-20 drop-shadow-md">Highest pass rate for naval aviation institute exams in the industry, backed by rigorous data and student performance metrics.</p>
                </div>
             </div>
          </div>

          <div className="md:col-span-5 bg-ink text-canvas border-2 border-ink rounded-[32px] p-8 flex flex-col relative overflow-hidden h-[500px] md:h-auto">
             <h3 className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-4 z-10 leading-tight">
               <span className="underline">Aeromentor</span> Accelerates your naval aviation training with cutting-edge tech.
             </h3>
             <motion.div className="absolute inset-0 w-full h-[140%] z-0" style={{ y: bentoY, top: "-20%" }}>
               <Image src="/images/cockpit-view.png" alt="cockpit" fill className="object-cover opacity-60" />
             </motion.div>
          </div>
          
        </div>
      </section>

      {/* New to Aeromentor */}
      <section id="explosion-section" ref={flyOutRef} className="bg-canvas py-48 px-6 text-center relative overflow-hidden flex flex-col justify-center min-h-screen">
        
        {/* Dynamic Flying Images */}
        {flyOutImages.map((config, index) => (
          <FloatingImage key={index} config={config} progress={flyOutProgress} />
        ))}

        <div className="relative z-10">
          <h2 className="text-7xl md:text-[10rem] font-display font-bold tracking-tighter text-ink leading-none mb-12 drop-shadow-lg">
            New to<br/>Aeromentor?
          </h2>
          <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-10 bg-canvas/80 backdrop-blur-md p-6 rounded-3xl border-2 border-ink shadow-lg">
            We'll walk you through our advanced RAG-based learning environment and how Aeromentor can enhance your naval aviation studies — with comprehensive materials, interactive AI tutoring, and rigorous exam preparation.
          </p>
          <button className="bg-ink text-canvas px-8 py-4 rounded-full font-bold hover:bg-ink/90 shadow-xl">
            start learning
          </button>
        </div>
      </section>
      
      {/* FAQs Section */}
      <section className="bg-canvas text-ink py-32 px-6 md:px-16 border-b-2 border-ink">
        <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-16 text-center">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            { q: "What is Aeromentor?", a: "Aeromentor is an advanced RAG-based AI learning platform tailored specifically for naval aviation training, providing instant answers and dynamic quizzes." },
            { q: "Who can use this platform?", a: "Currently, Aeromentor is optimized for students and instructors at the Naval Institute of Aeronautical Technology (NIAT)." },
            { q: "Is the AI tutor available 24/7?", a: "Yes, our intelligent AI tutor is available round-the-clock to assist with complex aerodynamics, combat scenarios, and navigation concepts." },
            { q: "How does the quiz system work?", a: "The platform dynamically generates interactive quizzes that adapt to your specific knowledge gaps to ensure comprehensive exam readiness." }
          ].map((faq, i) => (
            <div key={i} className="border-2 border-ink rounded-3xl p-8 bg-white shadow-md">
              <h3 className="text-2xl font-bold mb-4">{faq.q}</h3>
              <p className="font-medium text-lg opacity-80">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="main-footer" className="relative pt-24 pb-8 overflow-hidden text-canvas min-h-screen flex flex-col">
        <div className="absolute inset-0 z-0">
          <Image src="/military-mikoyan_mig_29-215220.jpeg" alt="background" fill className="object-cover" />
          <div className="absolute inset-0 bg-ink/60"></div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12 mb-32 font-medium w-full px-4 md:px-8 mt-auto">
           <div className="md:col-span-2 flex flex-col gap-6">
             <div className="flex gap-6 items-center">
               <Image src="/crest.png" alt="crest" width={120} height={120} className="object-contain" />
               <Image src="/niat.png" alt="niat" width={120} height={120} className="object-contain" />
             </div>
             <div>
               <h3 className="text-3xl font-bold mb-3 font-display tracking-tight">Naval Institute of Aeronautical Technology</h3>
               <p className="max-w-md opacity-80 leading-relaxed text-lg">
                 Established in 1956 at the Naval Base in Kochi, Kerala, NIAT is the premier aviation technical training establishment of the Indian Navy. It trains naval personnel in aeronautical engineering to maintain fixed and rotary-wing naval air assets.
               </p>
             </div>
           </div>
           
           <div>
              <p className="opacity-50 uppercase tracking-widest mb-6 font-bold text-sm">Navigation</p>
              <ul className="space-y-4 text-lg">
                <li><a href="#" className="hover:underline transition-all">Home</a></li>
                <li><a href="#hero" className="hover:underline transition-all">Platform Features</a></li>
                <li><a href="#" className="hover:underline transition-all">Training Library</a></li>
                <li><a href="#" className="hover:underline transition-all">AI Chatbot</a></li>
              </ul>
           </div>

           <div>
              <p className="opacity-50 uppercase tracking-widest mb-6 font-bold text-sm">Resources</p>
              <ul className="space-y-4 text-lg">
                <li><a href="#" className="hover:underline transition-all">About NIAT</a></li>
                <li><a href="#" className="hover:underline transition-all">FAQs</a></li>
                <li><a href="#" className="hover:underline transition-all">Contact Us</a></li>
              </ul>
           </div>
        </div>

        <div className="relative z-10 w-full select-none mb-16 px-4 md:px-8">
          <h1 className="text-[14.5vw] leading-none tracking-tighter text-canvas font-display font-black uppercase text-center whitespace-nowrap opacity-90 drop-shadow-2xl">
            AEROMENTOR
          </h1>
        </div>

        <div className="relative z-10 w-full border-t border-canvas/30"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between pt-8 text-sm opacity-70 w-full px-4 md:px-8">
           <p>All Rights Reserved | Copyright ©2026 AeroMentor</p>
           <div className="flex gap-8 mt-4 md:mt-0">
             <a href="#" className="hover:underline">Privacy Policy</a>
             <a href="#" className="hover:underline">Terms of Service</a>
           </div>
        </div>
      </footer>
    </div>
  );
}

const flyOutImages = [
  // Left side (4 images)
  { endX: "-40vw", endY: "-20vh", startRotate: -15, endRotate: 0, src: "/images/cockpit-view.png" },
  { endX: "-35vw", endY: "15vh", startRotate: 20, endRotate: 0, src: "/images/aircraft-carrier.png" },
  { endX: "-25vw", endY: "-30vh", startRotate: -5, endRotate: 0, src: "/Indian-Mig-29K-2(1).jpg" },
  { endX: "-15vw", endY: "25vh", startRotate: 12, endRotate: 0, src: "/images/navy-crew-deck.png" },
  
  // Right side (4 images)
  { endX: "40vw", endY: "20vh", startRotate: -20, endRotate: 0, src: "/images/helicopter-formation.png" },
  { endX: "35vw", endY: "-15vh", startRotate: 15, endRotate: 0, src: "/military-mikoyan_mig_29-215220.jpeg" },
  { endX: "25vw", endY: "30vh", startRotate: -10, endRotate: 0, src: "/ship.jpg" },
  { endX: "15vw", endY: "-25vh", startRotate: 8, endRotate: 0, src: "/night.jpg" },
];

function FloatingImage({ config, progress }: { config: any, progress: any }) {
  const x = useTransform(progress, [0, 1], ["0vw", config.endX]);
  const y = useTransform(progress, [0, 1], ["0vh", config.endY]);
  const rotate = useTransform(progress, [0, 1], [config.startRotate, config.endRotate]);

  return (
    <motion.div
      className="hidden md:block absolute top-[50%] left-[50%] w-32 h-40 md:w-48 md:h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white origin-center z-0"
      style={{
        x,
        y,
        rotate,
        marginLeft: "-6rem", 
        marginTop: "-8rem", 
      }}
    >
      <Image src={config.src} alt="img" fill className="object-cover" />
    </motion.div>
  );
}
