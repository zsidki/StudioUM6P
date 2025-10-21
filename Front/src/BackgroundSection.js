import React from "react";
import { FaArrowDown } from "react-icons/fa"; // Import arrow icon
import { motion } from "framer-motion"; // Import framer motion for animations

function BackgroundSection() {
  // Function to handle the button click (smooth scroll to "About Us" section)
  const handleScroll = () => {
    const aboutUsSection = document.getElementById("about-us");
    aboutUsSection && aboutUsSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center">
      {/* Background Image */}
      <img
        src="/assets/CC.jpg" // Update with your image path
        alt="Team working together"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

      {/* Content */}
      <motion.div
        className="relative z-20 text-center text-white px-4"
        initial={{ opacity: 0, y: -50 }} // Initial animation state
        animate={{ opacity: 1, y: 0 }} // Final animation state
        transition={{ duration: 1 }} // Animation duration
      >
        {/* Small text on top */}
        <motion.h2
          className="text-2xl font-semibold uppercase tracking-wider mb-4 max-sm:text-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Welcome to Studio6.0
        </motion.h2>

        {/* Main Title */}
        <motion.h1
          className="text-6xl font-bold uppercase mb-6 max-md:text-4xl max-sm:text-3xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Creativity in Motion
        </motion.h1>

        {/* Sub-text (Description) */}
        <motion.p
          className="text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10 max-md:text-base max-sm:text-sm"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          At Studio6.0, we specialize in photography, videomaking, and graphic
          design. Our goal is to bring your ideas to life through innovative
          visuals and high-quality production. Let's create something
          extraordinary together.
        </motion.p>

        {/* Arrow Button with hover effect */}
        <motion.div
          className="flex justify-center mt-8"
          whileHover={{ scale: 1.1 }} // Button hover animation
          whileTap={{ scale: 0.9 }} // Button tap animation
        >
          <button
            onClick={handleScroll}
            className="w-12 h-12 bg-white flex items-center justify-center rounded-full transition duration-300 hover:bg-gray-300"
          >
            <FaArrowDown className="text-black text-2xl" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default BackgroundSection;
