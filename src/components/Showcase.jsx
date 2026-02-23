import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const videoRef = useRef(null);
  const userAllowedSoundRef = useRef(false);
  const soundEnabledAtRef = useRef(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const enableSound = () => {
    const video = videoRef.current;
    if (video) {
      userAllowedSoundRef.current = true;
      soundEnabledAtRef.current = Date.now();
      setSoundEnabled(true);
      // Order matters: unmute and set volume in same user gesture, then play
      video.muted = false;
      video.volume = 1;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  useGSAP(() => {
    if (!isTablet) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#showcase",
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      });

      timeline
        .to(".mask img", {
          transform: "scale(1.1)",
        })
        .to(".content", {
          opacity: 1,
          y: 0,
          ease: "power1.in",
        });

      // Scroll-driven volume: only unmute if user has clicked "Enable sound" (browser requires user gesture)
      const video = videoRef.current;
      if (video) {
        ScrollTrigger.create({
          trigger: "#showcase",
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            let vol = 0;
            if (p <= 0.15) vol = p / 0.15;
            else if (p <= 0.75) vol = 1;
            else vol = (1 - p) / 0.25;

            const allowUnmute = userAllowedSoundRef.current;
            // Don't override unmute for 400ms after user clicks so they actually hear sound (scroll handler can fire immediately and re-mute)
            const justEnabled = allowUnmute && Date.now() - soundEnabledAtRef.current < 400;
            if (!justEnabled) {
              video.volume = vol;
              video.muted = vol === 0 || !allowUnmute;
            }

            // If video was paused (e.g. by browser after failed unmute), resume when back in view
            if (vol > 0 && video.paused) {
              video.play().catch(() => {});
            }
          },
        });
      }
    }
  }, [isTablet]);

  return (
    <section id="showcase">
      <div className="media relative">
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/dbs0p6jc9/video/upload/v1770848243/new_rvu9yr.mp4"
          crossOrigin="anonymous"
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
        />
        {!soundEnabled && (
          <button
            type="button"
            onClick={enableSound}
            className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-sm text-white backdrop-blur-sm hover:bg-black/80"
            aria-label="Enable sound"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
              <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
            </svg>
            Enable sound
          </button>
        )}
        <div className="mask">
          <img src="/mask-logo.svg" alt="m4-chip" />
        </div>
      </div>

      <div className="content">
        <div className="wrapper">
          <div className="lg:max-w-md">
            <h2>Rocket Chip</h2>

            <div className="space-y-5 mt-7 pe-10">
              <p>
                Introducing {""}
                <span className="text-white">
                  M4, the next generation of Apple Silicon
                </span>
                . M4 Powers
              </p>
              <p>
                Blazing fast, energy efficient, and crafted for revolutionary AI
                experiences—the M4 chip unlocks possibilities previously
                unimaginable. With a fusion of incredible performance and
                seamless multitasking, it empowers creators, gamers, and
                professionals to break new ground, effortlessly handling
                demanding workflows, graphics-intensive tasks, and next-level
                intelligence. Experience the future of computing, driven by
                unrivaled innovation.
              </p>
              <p>
                The M4 chip is the next generation of Apple Silicon. It is
                crafted for revolutionary AI experiences—the M4 chip unlocks
                possibilities previously unimaginable. With a fusion of
                incredible performance and seamless multitasking, it empowers
                creators, gamers, and professionals to break new ground,
                effortlessly handling demanding workflows, graphics-intensive
                tasks, and next-level intelligence. Experience the future of
                computing, driven by unrivaled innovation.
              </p>
              <p className="text-primary">
                Learn More about Apple Intelligence
              </p>
            </div>
          </div>

          <div className="max-w-3xs space-y-14">
            <div className="space-y-2">
              <p>Up to</p>
              <h3>4x faster</h3>
              <p>pro rendering performance than M2</p>
            </div>

            <div className="space-y-2">
              <p>Up to</p>
              <h3>1.5x faster</h3>
              <p>CPU performance than M2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
