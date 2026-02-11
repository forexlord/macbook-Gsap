import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const videoRef = useRef(null);

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

      // Scroll-driven volume: fade in as user scrolls to video, fade out as they scroll past
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
            video.volume = vol;
            video.muted = vol === 0;
          },
        });
      }
    }
  }, [isTablet]);

  return (
    <section id="showcase">
      <div className="media">
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
