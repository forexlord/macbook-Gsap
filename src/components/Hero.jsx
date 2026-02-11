import React, { useEffect, useRef } from "react";

const Hero = () => {
  const heroVideo = useRef(null);

  useEffect(() => {
    if (heroVideo.current) {
      heroVideo.current.playbackRate = 2;
    }
  }, []);
  return (
    <section id="hero">
      <div>
        <h1>MacBook Pro</h1>
        <img src="/title.png" alt="Macbook Title" />
      </div>
      <video
        ref={heroVideo}
        src="/videos/hero.mp4"
        autoPlay
        muted
        playsInline
      />
      <button>Buy Now</button>
      <p>From $199/mo. or $133/mo. for 12 months.</p>
    </section>
  );
};

export default Hero;
