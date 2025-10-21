import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [fadeOutText, setFadeOutText] = useState(false);

  // Auto fade-out text after 10 seconds if not scrolled
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOutText(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  // Scroll listener to fade out text when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setFadeOutText(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function to navigate to AboutUs section
  const scrollToAboutUs = () => {
    const aboutSection = document.getElementById('about-section'); // Use the correct ID
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' }); // Scroll smoothly to the AboutUs section
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <style>{`
        .explore-button {
          border: none; /* Remove the border */
          color: white;
          background-color: #D4451E; /* Custom red */
          padding: 0.75rem 2rem;
          font-size: 1.25rem;
          font-weight: bold;
          transition: background-color 0.3s, color 0.3s; /* Adjust timing */
          cursor: pointer;
          display: block;
          margin: 0 auto;
          z-index: 10; /* Ensure button is clickable */
        }

        .explore-button:hover {
          background-color: #A83B17; /* Darker shade of custom red */
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem; /* Original font size */
            margin: 0 20px;
          }

          .hero-paragraph {
            font-size: 1rem; /* Original font size */
            margin: 0 20px;
          }

          .explore-button {
            font-size: 1rem;
            padding: 0.5rem 1.5rem;
          }
        }

        @media (min-width: 769px) {
          .hero-title {
            font-size: 4rem; /* Original font size */
            margin: 0 100px;
          }

          .hero-paragraph {
            font-size: 1.25rem; /* Original font size */
            margin: 0 100px;
          }

          .explore-button {
            font-size: 1.25rem;
            padding: 0.75rem 2rem;
          }
        }

        @media (min-width: 1024px) {
          .hero-title {
            font-size: 4.5rem; /* Original font size */
          }

          .hero-paragraph {
            font-size: 1.5rem; /* Original font size */
          }
        }

        .relative .explore-button-container {
          position: absolute;
          bottom: 40px;
          width: 100%;
          z-index: 10; /* Ensure the button stays above other elements */
        }

        video {
          z-index: -1; /* Ensure video stays in the background */
        }
      `}</style>

      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/assets/vidbg.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Text and animations */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: fadeOutText ? 0 : 1, y: fadeOutText ? 50 : 0 }}
        transition={{ duration: 1 }}
      >
        {/* Title */}
        <motion.h1
          className="hero-title text-white font-bold hover-effect transition-all duration-500 ease-in-out"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Studio 6.0
        </motion.h1>

        {/* Subtitle with increased size */}
        <motion.h2
          className="hero-subtitle text-white font-bold mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 1 }}
          style={{ fontSize: '2rem' }} // Increased font size
        >
          Digitalization for a More Flexible Service
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="hero-paragraph text-gray-300 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Empowering our ecosystem with agile, high-quality content solutions to elevate every voice and enhance our collective impact.
        </motion.p>
      </motion.div>

      {/* Explore Button with hover and scaling animation */}
      <div className="explore-button-container">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <button className="explore-button" onClick={scrollToAboutUs}>
            Explore
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
