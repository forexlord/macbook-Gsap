import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import { performanceImages, performanceImgPositions } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Performance = () => {
  const sectionRef = useRef(null);
  const isDesktop = useMediaQuery({ query: "(min-width: 1025px)" });

  useGSAP(
    () => {
      // Content paragraph: fade in and move up as it scrolls into view
      gsap.fromTo(
        ".content p",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".content p",
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        },
      );

      // Desktop only: images animate into positions via scrubbed timeline (skip p5)
      if (isDesktop) {
        const imagePositions = performanceImgPositions.filter(
          (pos) => pos.id !== "p5",
        );

        const tl = gsap.timeline({
          defaults: { ease: "power1.inOut", duration: 2, overwrite: "auto" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        imagePositions.forEach((pos) => {
          const toVars = {
            opacity: 1,
            y: 0,
            duration: 1,
          };
          if (pos.left != null) toVars.left = `${pos.left}%`;
          if (pos.right != null) toVars.right = `${pos.right}%`;
          if (pos.bottom != null) toVars.bottom = `${pos.bottom}%`;
          if (pos.transform != null) toVars.transform = pos.transform;

          tl.fromTo(`.${pos.id}`, { opacity: 0, y: 80 }, toVars, 0);
        });
      }
    },
    { scope: sectionRef, dependencies: [isDesktop] },
  );

  useEffect(() => {
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section id="performance" ref={sectionRef}>
      <h2>Next-Gen graphics Performance. Game on.</h2>
      <div className="wrapper">
        {performanceImages.map(({ id, src }) => (
          <img key={id} className={id} src={src} alt={id} />
        ))}
      </div>
      <div className="content">
        <p>
          Discover blazing-fast frame rates and stunning visuals powered by the
          latest GPU architecture. With next-level ray tracing and AI-enhanced
          graphics technologies,
          <span className="text-white">
            gaming feels more immersive and realistic than ever
          </span>
          . Whether you're exploring vast open worlds or dominating in
          competitive arenas, experience every moment with incredible detail,
          smoothness, and responsiveness that elevate your play to new heights.
        </p>
      </div>
    </section>
  );
};

export default Performance;
