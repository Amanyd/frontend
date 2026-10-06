// @ts-nocheck
/* eslint-disable */
import './home.css';
import HeroScripts from './HeroScripts';

export default function HomePage() {
  return (
    <>


      {/* PostHog Analytics */}{/* Reddit Pixel */}{/* JSON-LD Structured Data */} <div className="bg-bg min-h-screen antialiased overflow-x-hidden" data-astro-cid-j7pv25f6="">  {/* intentionally empty */} <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-6 max-md:px-4 pointer-events-none" data-astro-cid-5blmo7yk=""> <nav className="w-full max-w-[1184px] pointer-events-auto border border-border bg-bg/95 backdrop-blur-sm rounded-2xl shadow-xs overflow-hidden" data-nav-inner="" data-astro-cid-5blmo7yk=""> {/* Full-width bar. Inner wrapper matches the main content container
       (1232px) so the navbar's left/right gutters align with every
       section below it. Layout is flex [logo | links | cta cluster]:
       with seven links the row is too wide to lock to the bar's true
       centre inside 1232px (the old 1fr/auto/1fr grid forced equal side
       columns and drove "Products" into the Login button), so the links
       centre in the space BETWEEN logo and cluster instead — equal
       flanking gaps, and the columns can never overlap. */} <div className="w-full" data-astro-cid-5blmo7yk=""> <div className="flex items-center justify-between w-full py-3.5 px-8 max-md:px-5" data-astro-cid-5blmo7yk=""> {/* Logo */} <a href="https://supermemory.ai/" className="nav-tap flex items-center gap-2.5 shrink-0 justify-self-start" data-astro-cid-5blmo7yk=""> <span className="logo-hover max-xl:w-[175px] max-xl:h-5" data-astro-cid-tvrurpns=""> <svg viewBox="0 0 210 24" fill="none" width="210" height="24" data-astro-cid-tvrurpns=""> <g clipPath="url(#logo-icon-praq2q)" className="logo-icon" data-astro-cid-tvrurpns=""> <path className="logo-stroke logo-stroke-1" d="M29.3388 9.46767H18.448V0.00146484H14.9293V10.2725C14.9293 11.3634 15.36 12.411 16.1254 13.183L25.018 22.151L27.506 19.6419L20.938 13.0183H29.3408V9.46975L29.3388 9.46767Z" fill="#0B1015" stroke="#0B1015" strokeWidth="0.5" data-astro-cid-tvrurpns=""></path> <path className="logo-stroke logo-stroke-2" d="M1.82839 4.36056L8.39633 10.9842H-0.00646973V14.5328H10.8843V23.999H14.403V13.728C14.403 12.637 13.9723 11.5894 13.2069 10.8175L4.31635 1.85147L1.82839 4.36056Z" fill="#0B1015" stroke="#0B1015" strokeWidth="0.5" data-astro-cid-tvrurpns=""></path> </g> <g className="logo-text" data-astro-cid-tvrurpns=""><text x="38" y="20" fill="#0B1015" fontFamily="var(--font-display), sans-serif" fontSize="20" fontWeight="700" letterSpacing="-0.5px">AeroMentor</text></g> <defs data-astro-cid-tvrurpns=""> <clipPath id="logo-icon-praq2q" data-astro-cid-tvrurpns=""> <rect width="29.6" height="24" fill="white" transform="translate(-0.006)" data-astro-cid-tvrurpns=""></rect> </clipPath> <clipPath id="logo-text-praq2q" data-astro-cid-tvrurpns=""> <rect width="159" height="18" fill="white" transform="translate(40.087 6)" data-astro-cid-tvrurpns=""></rect> </clipPath> </defs> </svg> </span> </a> {/* Nav links (hidden on mobile). Sits in the centre column of
           the grid, so its midpoint is the bar's midpoint. */} <div className="hidden xl:flex flex-1 min-w-0 items-center justify-center gap-5 px-4" data-astro-cid-5blmo7yk=""></div> {/* Right side: Login + Register (desktop) / Hamburger
           (mobile). `justify-self-end` pins this cluster to the right
           edge of its grid column so the spacing between Start
           Building and the nav's right edge equals the spacing between
           the logo and the nav's left edge. */} <div className="flex items-center gap-4 shrink-0" data-astro-cid-5blmo7yk=""> {/* Login dropdown (desktop only) */} <a href="/login" className="nav-tap flex items-center justify-center h-10 px-5 border border-border bg-[#fafafa] font-body text-[15px] font-medium tracking-[-0.01em] text-text hidden xl:flex rounded-md" data-astro-cid-5blmo7yk="">Login</a> {/* Register CTA (desktop only) — matches Hero primary CTA.
             Split-button: filled-blue label + 44px arrow slot, with
             bg-color hover, arrow nudge on hover, and press scale. */} <a href="/register" className="nav-btn-primary hidden xl:flex" data-astro-cid-5blmo7yk=""> <span className="nav-btn-primary-label" data-astro-cid-5blmo7yk="">Register</span> <span className="nav-btn-primary-arrow" aria-hidden="true" data-astro-cid-5blmo7yk=""> <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" data-astro-cid-5blmo7yk=""><path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" data-astro-cid-5blmo7yk=""></path></svg> </span> </a> {/* Mobile menu button — hamburger ↔ close icon cross-fade via
             data-open. Both SVGs stack in the same slot; CSS animates
             opacity + scale on each. */} <button type="button" className="mobile-toggle nav-tap xl:hidden flex items-center justify-center w-10 h-10 -mr-2 text-text" aria-label="Toggle menu" aria-expanded="false" data-mobile-toggle="" data-open="false" data-astro-cid-5blmo7yk=""> <span className="mobile-toggle-slot" data-astro-cid-5blmo7yk=""> <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mobile-toggle-icon mobile-toggle-icon--menu" data-astro-cid-5blmo7yk=""> <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" data-astro-cid-5blmo7yk=""></path> </svg> <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mobile-toggle-icon mobile-toggle-icon--close" data-astro-cid-5blmo7yk=""> <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" data-astro-cid-5blmo7yk=""></path> </svg> </span> </button> </div> </div> {/* Mobile menu drawer.
         Uses the grid-rows `0fr → 1fr` trick to animate height without
         knowing the content height in advance. The outer .mobile-menu
         is always in the DOM (no display:none); its data-open attribute
         flips grid-template-rows from 0fr to 1fr, and the inner wrapper
         clips overflow during the transition so links don't reflow. */} <div className="mobile-menu xl:hidden border-t border-border" data-mobile-menu="" data-open="false" data-astro-cid-5blmo7yk=""> <div className="mobile-menu-inner" data-astro-cid-5blmo7yk=""> <div className="flex flex-col py-4 px-6 gap-1" data-astro-cid-5blmo7yk=""> {/* Primary CTA, full width — tucked at the bottom of the
               mobile drawer so the menu doesn't take the page's primary
   action off-screen. Same visual family as the desktop nav
                CTA (.nav-btn-primary), just stretched. */} <a href="/register" className="nav-btn-primary mobile-nav-cta mt-3 flex" data-astro-cid-5blmo7yk=""> <span className="nav-btn-primary-label" data-astro-cid-5blmo7yk="">Register</span> <span className="nav-btn-primary-arrow" aria-hidden="true" data-astro-cid-5blmo7yk=""> <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" data-astro-cid-5blmo7yk=""><path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" data-astro-cid-5blmo7yk=""></path></svg> </span> </a> </div> </div> </div> </div> </nav> </div>  <main className="relative z-[2] flex flex-col items-center w-full" data-astro-cid-j7pv25f6=""> {/* Hero — FULL BLEED, outside container.
			     Pad-top clears the fixed navbar; Hero owns its own breathing room.
			     The ASCII hands plate now lives INSIDE the Hero, above the
			     headline, so there's no separate band below. */} <div className="w-full pt-[76px]" data-astro-cid-j7pv25f6=""> <section className="hero-wrap relative z-[1] w-full flex flex-col items-stretch text-center pt-4 max-md:pt-3 overflow-hidden rounded-b-2xl border-b border-border shadow-xs" style={{ minHeight: '100vh' }} data-astro-cid-bbe6dxrz=""> <img src="/images/navv.jpg" alt="AeroMentor Hero" className="absolute inset-0 w-full h-full object-cover object-center z-[-2] rounded-b-2xl" fetchPriority="high" /> <div className="absolute inset-0 w-full h-full bg-white/65 z-[-1] rounded-b-2xl"></div> {/* Hero dot backdrop — WebGL ordered-dither halftone.
       A fragment shader renders a grid of dots whose survival is gated by a
       Bayer 8×8 ordered-dither threshold compared against a smooth radial
       intensity field (densest at the bottom-center, fading toward the top).
       Same technique as mem0's hero — softer, more organic scatter than any
       CSS mask. Falls back to no backdrop if WebGL isn't available. */} <canvas className="hero-dots rounded-b-2xl" data-hero-dots="" aria-hidden="true" data-astro-cid-bbe6dxrz="" width="1896" height="931"></canvas> {/* Centered content block — fills the remaining vertical space and centers
       its children vertically. */} <div className="hero-center flex-1 flex flex-col items-center justify-center px-6 max-md:px-4 pt-12 max-md:pt-8 pb-8 max-md:pb-6" data-astro-cid-bbe6dxrz="">
              {/* Headline.
         Line wrap is intentional, not browser-balanced:
           - xl (≥1280): single line, brain mid-sentence
           - <xl: forced break after "cloud" so line 2 reads
             `for [brain] agents.` — brain anchors the second line
             with "for" and "agents" flanking it symmetrically.
         The <br className="xl:hidden"/> implements the break; on xl+ the
         <br/> is `display: none` so the browser flows it as one line. */} <h1 className="hero-step hero-headline font-heading font-medium text-text max-w-[920px]
             text-[72px] leading-[1.04] tracking-[-0.058em]
             xl:max-w-[1100px]
             max-xl:text-[60px]
             max-lg:text-[44px] max-lg:tracking-[-0.05em]
             max-md:text-[42px] max-md:leading-[1.06] max-md:tracking-[-0.046em]" data-astro-cid-bbe6dxrz="">
                AI-driven training<br className="xl:hidden" data-astro-cid-bbe6dxrz="" /> for <span className="inline-block align-baseline" aria-hidden="true"> <svg viewBox="0 0 30 24" fill="none" className="inline-block h-[0.82em] w-auto align-[-0.08em] mx-1 text-text" aria-hidden="true"> <path d="M29.3388 9.46767H18.448V0.00146484H14.9293V10.2725C14.9293 11.3634 15.36 12.411 16.1254 13.183L25.018 22.151L27.506 19.6419L20.938 13.0183H29.3408V9.46975L29.3388 9.46767Z" fill="currentColor"></path> <path d="M1.82839 4.36056L8.39633 10.9842H-0.00646973V14.5328H10.8843V23.999H14.403V13.728C14.403 12.637 13.9723 11.5894 13.2069 10.8175L4.31635 1.85147L1.82839 4.36056Z" fill="currentColor"></path> </svg> </span> Naval engineers<span className="text-blue" data-astro-cid-bbe6dxrz="">.</span> </h1> {/* Subhead */} <p className="hero-step hero-subhead max-w-[600px] font-body text-text-muted
             text-[15px] leading-[1.6] tracking-[-0.012em]
             max-md:text-[14px] max-md:max-w-[420px]" style={{ textWrap: 'pretty' }} data-astro-cid-bbe6dxrz="">
                AeroMentor gives your training programs state-of-the-art AI assistance, smart quizzes,
                personalized progress tracking, and instant RAG-based feedback. Built for modern aviation.
              </p> {/* CTA group: 400px wide on desktop, contains a 2-col equal-width button
         row + npx pill + a quiet "personal supermemory" link beneath.
         On mobile the columns collapse to a stack (still equal width). */} <div className="hero-step hero-cta-group cta-group flex flex-col items-stretch gap-3" data-astro-cid-bbe6dxrz=""> {/* Two equal-width CTAs */} <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1 max-md:gap-2.5" data-astro-cid-bbe6dxrz=""> <a href="/register" className="btn-primary" data-astro-cid-bbe6dxrz=""> <span className="btn-primary-label" data-astro-cid-bbe6dxrz="">Register</span> <span className="btn-primary-arrow" aria-hidden="true" data-astro-cid-bbe6dxrz=""> <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" data-astro-cid-bbe6dxrz=""><path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" data-astro-cid-bbe6dxrz=""></path></svg> </span> </a> <a href="mailto:amaninsane139@gmail.com" target="_blank" rel="noopener" className="btn-secondary justify-center" data-astro-cid-bbe6dxrz=""> <span data-astro-cid-bbe6dxrz="">Talk to the team</span> </a> </div> </div> {/* Customer logo ticker{/* Customer logo ticker — lives inside `.hero-center` so it shares the
         staggered entrance and breathes with the rest of the hero copy. */}
              <div className="hero-step hero-ticker-step w-full" data-astro-cid-bbe6dxrz="">
                <div className="hero-ticker" aria-label="Companies using Aeromentor" data-astro-cid-3rtzm5mn="">
                  <p className="hero-ticker-eyebrow font-body" data-astro-cid-3rtzm5mn="">
                    Trusted by elite engineers at
                  </p>
                  <div className="font-heading text-2xl mt-3 font-medium text-text" data-astro-cid-3rtzm5mn="">
                    Naval Institute of Aviation Technology
                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>
        {/* Main content container */}
        <div className="w-full max-w-[1232px] px-6 max-md:px-4 py-12" data-astro-cid-j7pv25f6="">
            <div className="w-full flex flex-col items-center gap-10" data-astro-cid-j7pv25f6="">
              <section className="w-full border border-border rounded-2xl overflow-hidden bg-bg shadow-xs" id="catalog-section" data-astro-cid-p4n2ralz="">
                <div className="w-full bg-bg" data-astro-cid-p4n2ralz="">
                  {/* Two-column catalog:
         LEFT  = eyebrow + heading + sub + numbered spine + active-card text
         RIGHT = full-height plinth (illustration), with peek card below */}
                  <div className="catalog-grid" data-catalog="" data-interval="5000" data-astro-cid-p4n2ralz="">
                    {/* LEFT COLUMN */}
                    <div className="catalog-left" data-astro-cid-p4n2ralz="">
                      <div className="catalog-heading" data-astro-cid-p4n2ralz="">
                        <h2 className="catalog-heading-title font-heading" style={{ textWrap: 'balance' }} data-astro-cid-p4n2ralz="">
                          All the tools to build the perfect training program
                          <span className="text-blue" data-astro-cid-p4n2ralz="">for your cadets.</span>
                        </h2>
                        <p className="catalog-heading-sub font-body" data-astro-cid-p4n2ralz="">
                          Focused tools for evaluating, tracking, indexing, and enhancing cadet performance.
                        </p>
                      </div>
                      <ol className="catalog-spine-list" role="tablist" data-astro-cid-p4n2ralz="">
                        <li className="catalog-spine-row" data-astro-cid-p4n2ralz="">
                          <button type="button" className="catalog-spine-item" data-spine-btn="" data-index="0" aria-label="View Continual Learning" aria-current="true" role="tab" data-astro-cid-p4n2ralz="">
                            <span className="catalog-spine-num font-mono" data-astro-cid-p4n2ralz="">01</span>
                            <span className="catalog-spine-title font-heading" data-astro-cid-p4n2ralz="">Continual Learning &amp; Tracking</span>
                            <span className="catalog-spine-dot" aria-hidden="true" data-astro-cid-p4n2ralz=""></span>
                            <span className="catalog-spine-progress" aria-hidden="true" data-astro-cid-p4n2ralz="">
                              <span className="catalog-spine-progress-fill" data-progress-fill="" data-astro-cid-p4n2ralz=""></span>
                            </span>
                          </button>
                        </li>
                        <li className="catalog-spine-row" data-astro-cid-p4n2ralz="">
                          <button type="button" className="catalog-spine-item" data-spine-btn="" data-index="1" aria-label="View Instant RAG Feedback" aria-current="false" role="tab" data-astro-cid-p4n2ralz="">
                            <span className="catalog-spine-num font-mono" data-astro-cid-p4n2ralz="">02</span>
                            <span className="catalog-spine-title font-heading" data-astro-cid-p4n2ralz="">Instant RAG Feedback</span>
                            <span className="catalog-spine-dot" aria-hidden="true" data-astro-cid-p4n2ralz=""></span>
                            <span className="catalog-spine-progress" aria-hidden="true" data-astro-cid-p4n2ralz="">
                              <span className="catalog-spine-progress-fill" data-progress-fill="" data-astro-cid-p4n2ralz=""></span>
                            </span>
                          </button>
                        </li>
                        <li className="catalog-spine-row" data-astro-cid-p4n2ralz="">
                          <button type="button" className="catalog-spine-item" data-spine-btn="" data-index="2" aria-label="View Aviation Manuals" aria-current="false" role="tab" data-astro-cid-p4n2ralz="">
                            <span className="catalog-spine-num font-mono" data-astro-cid-p4n2ralz="">03</span>
                            <span className="catalog-spine-title font-heading" data-astro-cid-p4n2ralz="">Aviation Manuals</span>
                            <span className="catalog-spine-dot" aria-hidden="true" data-astro-cid-p4n2ralz=""></span>
                            <span className="catalog-spine-progress" aria-hidden="true" data-astro-cid-p4n2ralz="">
                              <span className="catalog-spine-progress-fill" data-progress-fill="" data-astro-cid-p4n2ralz=""></span>
                            </span>
                          </button>
                        </li>
                        <li className="catalog-spine-row" data-astro-cid-p4n2ralz="">
                          <button type="button" className="catalog-spine-item" data-spine-btn="" data-index="3" aria-label="View Officer Profiles" aria-current="false" role="tab" data-astro-cid-p4n2ralz="">
                            <span className="catalog-spine-num font-mono" data-astro-cid-p4n2ralz="">04</span>
                            <span className="catalog-spine-title font-heading" data-astro-cid-p4n2ralz="">Officer Profiles</span>
                            <span className="catalog-spine-dot" aria-hidden="true" data-astro-cid-p4n2ralz=""></span>
                            <span className="catalog-spine-progress" aria-hidden="true" data-astro-cid-p4n2ralz="">
                              <span className="catalog-spine-progress-fill" data-progress-fill="" data-astro-cid-p4n2ralz=""></span>
                            </span>
                          </button>
                        </li>
                      </ol>
                    </div>
                    {/* RIGHT COLUMN: plinth (illustration) → text card → peek card */}
                    <div className="catalog-right" data-astro-cid-p4n2ralz="">
                      <div className="catalog-stage" data-stage="" data-astro-cid-p4n2ralz="">
                        <article className="catalog-card" data-card="" data-index="0" aria-hidden="false" data-astro-cid-p4n2ralz="">
                          <div className="catalog-card-plinth" data-astro-cid-p4n2ralz="">
                            <img src="/Supermemory_files/Memory%20Router_fIE5.svg" alt="" className="catalog-card-illustration" loading="eager" decoding="async" data-astro-cid-p4n2ralz="" />
                          </div>
                        </article>
                        <article className="catalog-card" data-card="" data-index="1" aria-hidden="true" data-astro-cid-p4n2ralz="">
                          <div className="catalog-card-plinth" data-astro-cid-p4n2ralz="">
                            <img src="/Supermemory_files/Document%20Retrieval_fIE5.svg" alt="" className="catalog-card-illustration" loading="lazy" decoding="async" data-astro-cid-p4n2ralz="" />
                          </div>
                        </article>
                        <article className="catalog-card" data-card="" data-index="2" aria-hidden="true" data-astro-cid-p4n2ralz="">
                          <div className="catalog-card-plinth" data-astro-cid-p4n2ralz="">
                            <img src="/Supermemory_files/File%20Systems_fIE5.svg" alt="" className="catalog-card-illustration" loading="lazy" decoding="async" data-astro-cid-p4n2ralz="" />
                          </div>
                        </article>
                        <article className="catalog-card" data-card="" data-index="3" aria-hidden="true" data-astro-cid-p4n2ralz="">
                          <div className="catalog-card-plinth" data-astro-cid-p4n2ralz="">
                            <img src="/Supermemory_files/User%20Profiles_fIE5.svg" alt="" className="catalog-card-illustration" loading="lazy" decoding="async" data-astro-cid-p4n2ralz="" />
                          </div>
                        </article>

                      </div>
                      {/* Active card text, lives under the plinth on the right.
             Crossfades in lockstep with the plinth. No card stroke / no
             background fill — it sits flush on the page bg. */}
                      <div className="catalog-text-stage" data-astro-cid-p4n2ralz="">
                        <div className="catalog-text-card" data-text-card="" data-index="0" aria-hidden="false" data-astro-cid-p4n2ralz="">
                          <p className="catalog-text-eyebrow font-mono" data-astro-cid-p4n2ralz="">
                            01 · PROGRESS
                          </p>
                          <h3 className="catalog-text-title font-heading" data-astro-cid-p4n2ralz="">
                            Continual Learning &amp; Tracking
                          </h3>
                          <p className="catalog-text-desc font-body" data-astro-cid-p4n2ralz="">
                            State-of-the-art training memory that tracks every cadet's progress. Automatically identifies knowledge gaps and adapts the curriculum based on individual learning curves.
                          </p>
                        </div>
                        <div className="catalog-text-card" data-text-card="" data-index="1" aria-hidden="true" data-astro-cid-p4n2ralz="">
                          <p className="catalog-text-eyebrow font-mono" data-astro-cid-p4n2ralz="">
                            02 · RETRIEVAL
                          </p>
                          <h3 className="catalog-text-title font-heading" data-astro-cid-p4n2ralz="">
                            Instant RAG Feedback
                          </h3>
                          <p className="catalog-text-desc font-body" data-astro-cid-p4n2ralz="">
                            Hybrid search and structured context across thousands of aviation manuals at sub-300ms latency. Provides cadets with precise, verifiable answers during quizzes and simulations.
                          </p>
                        </div>
                        <div className="catalog-text-card" data-text-card="" data-index="2" aria-hidden="true" data-astro-cid-p4n2ralz="">
                          <p className="catalog-text-eyebrow font-mono" data-astro-cid-p4n2ralz="">
                            03 · FILESYSTEMS
                          </p>
                          <h3 className="catalog-text-title font-heading" data-astro-cid-p4n2ralz="">
                            Aviation Manuals
                          </h3>
                          <p className="catalog-text-desc font-body" data-astro-cid-p4n2ralz="">
                            A unified filesystem mount for all your technical documentation. Standard operating procedures, safety guidelines, and aircraft specs are automatically indexed and searchable.
                          </p>
                        </div>
                        <div className="catalog-text-card" data-text-card="" data-index="3" aria-hidden="true" data-astro-cid-p4n2ralz="">
                          <p className="catalog-text-eyebrow font-mono" data-astro-cid-p4n2ralz="">
                            04 · PROFILES
                          </p>
                          <h3 className="catalog-text-title font-heading" data-astro-cid-p4n2ralz="">
                            Officer Profiles
                          </h3>
                          <p className="catalog-text-desc font-body" data-astro-cid-p4n2ralz="">
                            Comprehensive behavioral and performance profiles that stay coherent across training modules. Evaluators get a complete view of each officer's strengths and areas for improvement.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="w-full border border-border rounded-2xl overflow-hidden bg-bg shadow-xs" id="faq" aria-labelledby="faq-heading" data-astro-cid-z6gx6xcw="">
                <div className="w-full bg-bg" data-faq-root="" data-astro-cid-z6gx6xcw="">
                  {/* Asymmetric header bar: eyebrow + heading left, filter pills right */}
                  <div className="faq-header flex items-end justify-between gap-8 px-8 max-md:px-4 pt-14 pb-10 max-md:pt-10 max-md:pb-7 max-md:flex-col max-md:items-start max-md:gap-6 border-b border-border" data-astro-cid-z6gx6xcw="">
                    <div className="flex flex-col gap-3 max-w-[640px]" data-astro-cid-z6gx6xcw="">
                      <h2 id="faq-heading" className="font-heading text-[44px] font-medium tracking-[-0.04em] leading-[1.05] text-text max-lg:text-[36px] max-md:text-[28px]" style={{ textWrap: 'balance' }} data-astro-cid-z6gx6xcw="">
                        The fine print,
                        <span className="text-blue" data-astro-cid-z6gx6xcw="">in plain English.</span>
                      </h2>
                    </div>
                  </div>
                  {/* Accordion: full-width rows separated by hairlines, single-open behavior */}
                  <ol className="faq-list list-none" role="list" data-astro-cid-z6gx6xcw="">
                    <li className="faq-row" data-faq-row="" data-open="false" data-faq-category="billing" data-first="true" data-astro-cid-z6gx6xcw="">
                      <button type="button" className="faq-q w-full flex items-center justify-between gap-6 px-8 max-md:px-4 py-5 text-left transition-colors duration-200" aria-expanded="false" aria-controls="faq-a-01" id="faq-q-01" data-faq-trigger="" data-astro-cid-z6gx6xcw="">
                        <div className="flex items-baseline gap-5 min-w-0" data-astro-cid-z6gx6xcw="">
                          <span className="faq-num font-mono text-[12px] text-text-dim shrink-0 w-7" data-astro-cid-z6gx6xcw="">01</span>
                          <span className="faq-q-text font-heading text-[18px] font-medium tracking-[-0.01em] leading-[1.35] text-text max-md:text-[16px]" data-astro-cid-z6gx6xcw="">
                            What training modules are included?
                          </span>
                        </div>
                        <span className="faq-toggle shrink-0 inline-flex items-center justify-center w-5 h-5" aria-hidden="true" data-astro-cid-z6gx6xcw="">
                          <svg viewBox="0 0 10 10" className="w-3 h-3" data-astro-cid-z6gx6xcw="">
                            <line className="faq-toggle-h" x1="1.5" y1="5" x2="8.5" y2="5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" data-astro-cid-z6gx6xcw=""></line>
                            <line className="faq-toggle-v" x1="5" y1="1.5" x2="5" y2="8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" data-astro-cid-z6gx6xcw=""></line>
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-a-01" role="region" aria-labelledby="faq-q-01" data-faq-panel="" data-astro-cid-z6gx6xcw="">
                        <div className="faq-a-inner" data-astro-cid-z6gx6xcw="">
                          <div className="faq-a px-8 max-md:px-4 pb-7 max-md:pb-5 flex flex-col gap-3.5 max-w-[860px]" style={{ paddingLeft: 'calc(2rem + 28px + 1.25rem)' }} data-astro-cid-z6gx6xcw="">
                            <p className="font-body text-[15.5px] leading-[1.65] text-text max-md:text-[14.5px]" data-astro-cid-z6gx6xcw="">
                              Aeromentor includes all fundamental modules for naval aviators, from basic flight ops to advanced tactical queries. Everything is accessible via our single unified platform.
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="faq-row" data-faq-row="" data-open="false" data-faq-category="billing" data-first="false" data-astro-cid-z6gx6xcw="">
                      <button type="button" className="faq-q w-full flex items-center justify-between gap-6 px-8 max-md:px-4 py-5 text-left transition-colors duration-200" aria-expanded="false" aria-controls="faq-a-02" id="faq-q-02" data-faq-trigger="" data-astro-cid-z6gx6xcw="">
                        <div className="flex items-baseline gap-5 min-w-0" data-astro-cid-z6gx6xcw="">
                          <span className="faq-num font-mono text-[12px] text-text-dim shrink-0 w-7" data-astro-cid-z6gx6xcw="">02</span>
                          <span className="faq-q-text font-heading text-[18px] font-medium tracking-[-0.01em] leading-[1.35] text-text max-md:text-[16px]" data-astro-cid-z6gx6xcw="">
                            Is my base's training data secure?
                          </span>
                        </div>
                        <span className="faq-toggle shrink-0 inline-flex items-center justify-center w-5 h-5" aria-hidden="true" data-astro-cid-z6gx6xcw="">
                          <svg viewBox="0 0 10 10" className="w-3 h-3" data-astro-cid-z6gx6xcw="">
                            <line className="faq-toggle-h" x1="1.5" y1="5" x2="8.5" y2="5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" data-astro-cid-z6gx6xcw=""></line>
                            <line className="faq-toggle-v" x1="5" y1="1.5" x2="5" y2="8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" data-astro-cid-z6gx6xcw=""></line>
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-a-02" role="region" aria-labelledby="faq-q-02" data-faq-panel="" data-astro-cid-z6gx6xcw="">
                        <div className="faq-a-inner" data-astro-cid-z6gx6xcw="">
                          <div className="faq-a px-8 max-md:px-4 pb-7 max-md:pb-5 flex flex-col gap-3.5 max-w-[860px]" style={{ paddingLeft: 'calc(2rem + 28px + 1.25rem)' }} data-astro-cid-z6gx6xcw="">
                            <p className="font-body text-[15.5px] leading-[1.65] text-text max-md:text-[14.5px]" data-astro-cid-z6gx6xcw="">
                              Absolutely. Aeromentor is deployed with strict access controls. Your naval docs, manuals, and institutional knowledge are isolated and only queryable by authorized cadets and instructors.
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="faq-row" data-faq-row="" data-open="false" data-faq-category="billing" data-first="false" data-astro-cid-z6gx6xcw="">
                      <button type="button" className="faq-q w-full flex items-center justify-between gap-6 px-8 max-md:px-4 py-5 text-left transition-colors duration-200" aria-expanded="false" aria-controls="faq-a-03" id="faq-q-03" data-faq-trigger="" data-astro-cid-z6gx6xcw="">
                        <div className="flex items-baseline gap-5 min-w-0" data-astro-cid-z6gx6xcw="">
                          <span className="faq-num font-mono text-[12px] text-text-dim shrink-0 w-7" data-astro-cid-z6gx6xcw="">03</span>
                          <span className="faq-q-text font-heading text-[18px] font-medium tracking-[-0.01em] leading-[1.35] text-text max-md:text-[16px]" data-astro-cid-z6gx6xcw="">
                            Can instructors track cadet progress?
                          </span>
                        </div>
                        <span className="faq-toggle shrink-0 inline-flex items-center justify-center w-5 h-5" aria-hidden="true" data-astro-cid-z6gx6xcw="">
                          <svg viewBox="0 0 10 10" className="w-3 h-3" data-astro-cid-z6gx6xcw="">
                            <line className="faq-toggle-h" x1="1.5" y1="5" x2="8.5" y2="5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" data-astro-cid-z6gx6xcw=""></line>
                            <line className="faq-toggle-v" x1="5" y1="1.5" x2="5" y2="8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" data-astro-cid-z6gx6xcw=""></line>
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-a-03" role="region" aria-labelledby="faq-q-03" data-faq-panel="" data-astro-cid-z6gx6xcw="">
                        <div className="faq-a-inner" data-astro-cid-z6gx6xcw="">
                          <div className="faq-a px-8 max-md:px-4 pb-7 max-md:pb-5 flex flex-col gap-3.5 max-w-[860px]" style={{ paddingLeft: 'calc(2rem + 28px + 1.25rem)' }} data-astro-cid-z6gx6xcw="">
                            <p className="font-body text-[15.5px] leading-[1.65] text-text max-md:text-[14.5px]" data-astro-cid-z6gx6xcw="">
                              Yes. Instructors can monitor module completion, review specific technical queries made by cadets, and dynamically adjust simulator scenarios to address knowledge gaps.
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="faq-row" data-faq-row="" data-open="false" data-faq-category="billing" data-first="false" data-astro-cid-z6gx6xcw="">
                      <button type="button" className="faq-q w-full flex items-center justify-between gap-6 px-8 max-md:px-4 py-5 text-left transition-colors duration-200" aria-expanded="false" aria-controls="faq-a-04" id="faq-q-04" data-faq-trigger="" data-astro-cid-z6gx6xcw="">
                        <div className="flex items-baseline gap-5 min-w-0" data-astro-cid-z6gx6xcw="">
                          <span className="faq-num font-mono text-[12px] text-text-dim shrink-0 w-7" data-astro-cid-z6gx6xcw="">04</span>
                          <span className="faq-q-text font-heading text-[18px] font-medium tracking-[-0.01em] leading-[1.35] text-text max-md:text-[16px]" data-astro-cid-z6gx6xcw="">
                            How often are the training materials updated?
                          </span>
                        </div>
                        <span className="faq-toggle shrink-0 inline-flex items-center justify-center w-5 h-5" aria-hidden="true" data-astro-cid-z6gx6xcw="">
                          <svg viewBox="0 0 10 10" className="w-3 h-3" data-astro-cid-z6gx6xcw="">
                            <line className="faq-toggle-h" x1="1.5" y1="5" x2="8.5" y2="5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" data-astro-cid-z6gx6xcw=""></line>
                            <line className="faq-toggle-v" x1="5" y1="1.5" x2="5" y2="8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" data-astro-cid-z6gx6xcw=""></line>
                          </svg>
                        </span>
                      </button>
                      <div className="faq-a-wrap" id="faq-a-04" role="region" aria-labelledby="faq-q-04" data-faq-panel="" data-astro-cid-z6gx6xcw="">
                        <div className="faq-a-inner" data-astro-cid-z6gx6xcw="">
                          <div className="faq-a px-8 max-md:px-4 pb-7 max-md:pb-5 flex flex-col gap-3.5 max-w-[860px]" style={{ paddingLeft: 'calc(2rem + 28px + 1.25rem)' }} data-astro-cid-z6gx6xcw="">
                            <p className="font-body text-[15.5px] leading-[1.65] text-text max-md:text-[14.5px]" data-astro-cid-z6gx6xcw="">
                              Our custom engine pulls in data from updated naval manuals and aviation best practices in real time, ensuring all training scenarios reflect the latest operational standards.
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>
              </section>
            </div>
          </div>
        </main>
        <footer className="footer-drenched relative z-10 overflow-hidden rounded-t-2xl border-t border-border shadow-xs" data-astro-cid-sz7xmlte="" style={{ backgroundImage: 'url(/images/after.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Top band: editorial copy + link columns. Editorial flex-grows 1.4,
       column container flex-grows 2 → editorial gets ~41% of width. */}
          <div className="footer-top" data-astro-cid-sz7xmlte="" style={{ justifyContent: 'space-between', width: '100%' }}>
            <div className="footer-editorial" data-astro-cid-sz7xmlte="">
              <div className="footer-editorial-stack" data-astro-cid-sz7xmlte="">
                <div className="flex items-center gap-4 mb-4">
                  <img src="/images/crest.webp" alt="Crest" className="h-20 w-auto object-contain" loading="lazy" decoding="async" />
                  <img src="/images/niat.webp" alt="NIAT Logo" className="h-20 w-auto object-contain" loading="lazy" decoding="async" />
                </div>
                <h2 className="footer-h2" style={{ fontSize: '36px', lineHeight: 1.2 }} data-astro-cid-sz7xmlte="">
                  N.I.A.T
                </h2>
                <p className="font-heading text-lg font-medium text-white/90 mt-1" data-astro-cid-sz7xmlte="">
                  Naval Institute of Aeronautical Technology
                </p>
                <p className="footer-sub mt-4 text-white/80" style={{ maxWidth: '420px', lineHeight: 1.6 }} data-astro-cid-sz7xmlte="">
                  The premier aviation technical training establishment of the Indian Navy, providing high-quality technical training related to naval aviation and maintenance of air assets.
                </p>
              </div>
            </div>
            <div className="footer-col" data-astro-cid-sz7xmlte="" style={{ flex: 'none' }}>
              <div className="footer-col-label" data-astro-cid-sz7xmlte="">
                PAGES
              </div>
              <div className="footer-col-links" data-astro-cid-sz7xmlte="">
                <a href="/home" className="footer-link" data-astro-cid-sz7xmlte="">
                  Home </a><a href="/dashboard" className="footer-link" data-astro-cid-sz7xmlte="">
                  Dashboard </a><a href="/courses" className="footer-link" data-astro-cid-sz7xmlte="">
                  Courses </a><a href="/quizzes" className="footer-link" data-astro-cid-sz7xmlte="">
                  Quizzes </a><a href="/login" className="footer-link" data-astro-cid-sz7xmlte="">
                  Login </a><a href="/register" className="footer-link" data-astro-cid-sz7xmlte="">
                  Register
                </a>
              </div>
            </div>
          </div>
          {/* © row, right-aligned. Sits above the wordmark. */}
          <div className="footer-copy-row" data-astro-cid-sz7xmlte="">
            <span className="footer-copy footer-copy-full" data-astro-cid-sz7xmlte="">
              © 2026 · AEROMENTOR INC. · ALL RIGHTS RESERVED
            </span>
            <span className="footer-copy footer-copy-short" data-astro-cid-sz7xmlte="">
              © 2026 · AEROMENTOR INC.
            </span>
          </div>
          {/* Giant ghosted wordmark — stretched to full width.
       The brand glyph badge floats on top, optically centered. */}
          <div className="footer-wordmark-wrap" data-astro-cid-sz7xmlte="">
            <div className="footer-wordmark" aria-hidden="true" data-astro-cid-sz7xmlte="" style={{ color: 'rgba(255, 255, 255, 0.25)', textShadow: '0 4px 24px rgba(255,255,255,0.1)' }}>
              Aeromentor.
            </div>
            <a href="/home" className="footer-mark-badge" aria-label="Aeromentor" data-astro-cid-sz7xmlte="">
              <svg viewBox="0 0 30 24" className="footer-mark-glyph" fill="none" aria-hidden="true" data-astro-cid-sz7xmlte="">
                <path className="footer-mark-stroke footer-mark-stroke-1" d="M29.3388 9.46767H18.448V0.00146484H14.9293V10.2725C14.9293 11.3634 15.36 12.411 16.1254 13.183L25.018 22.151L27.506 19.6419L20.938 13.0183H29.3408V9.46975L29.3388 9.46767Z" fill="#0562EF" stroke="#0562EF" strokeWidth="0.5" data-astro-cid-sz7xmlte=""></path>
                <path className="footer-mark-stroke footer-mark-stroke-2" d="M1.82839 4.36056L8.39633 10.9842H-0.00646973V14.5328H10.8843V23.999H14.403V13.728C14.403 12.637 13.9723 11.5894 13.2069 10.8175L4.31635 1.85147L1.82839 4.36056Z" fill="#0562EF" stroke="#0562EF" strokeWidth="0.5" data-astro-cid-sz7xmlte=""></path>
              </svg>
            </a>
          </div>
        </footer>





      </div>
      <HeroScripts />
    </>
  );
}
