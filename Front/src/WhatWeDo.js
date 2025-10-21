import React from 'react';
import { FaSearch, FaCalendarAlt, FaHandsHelping, FaTasks, FaFileInvoice, FaLightbulb, FaHandshake } from 'react-icons/fa'; // Updated Icons from react-icons
import { motion } from 'framer-motion'; // For animations
import { useInView } from 'react-intersection-observer'; // For scroll-triggered animations

function FeatureCard({ icon, title, description }) {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only animate once
    threshold: 0.2, // Trigger when 20% of the element is visible
  });

  return (
    <motion.div
      ref={ref}
      className="flex items-start gap-5 mt-10 max-md:mt-8" // Reduced margin top
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="text-3xl text-[#D4451E]">{icon}</div> {/* Icon aligned on the left */}
      
      <div className="flex flex-col">
        <h3 className="text-3xl font-bold text-neutral-700 max-sm:text-xl">{title}</h3>
        <p className="mt-4 text-xl leading-[1.5] text-neutral-700 max-md:text-lg max-sm:text-base">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function WhatWeDo() {
  const features = [
    {
      icon: <FaSearch className="text-[#D4451E]" />, // Custom red color for the icon
      title: "Talent Search",
      description:
       "Our team connects you with the best creative talent, ensuring every project is delivered by experienced professionals who understand your needs."
    },
    {
      icon: <FaCalendarAlt className="text-[#D4451E]" />, // Custom red color for the icon
      title: "Project Scheduling",
      description:
        "Stay organized with our integrated scheduling tools, allowing you to manage all tasks and deadlines efficiently, from order submission to final delivery."
    },
    {
      icon: <FaTasks className="text-[#D4451E]" />, // Changed to FaTasks for Order Management
      title: "Order Management",
      description:
        "Submit, track, and manage all your graphic design, video production, and photography orders through a paperless platform, providing transparency and easy monitoring."
    },
    {
      icon: <FaFileInvoice className="text-[#D4451E]" />, // Changed to FaFileInvoice for Quotes and Invoicing
      title: "Quotes and Invoicing",
      description:
        "Easily generate quotes for your media projects and manage invoicing directly within the platform, simplifying the administrative side of production."
    },
    {
      icon: <FaHandsHelping className="text-[#D4451E]" />, // Changed to FaHandsHelping to represent "Dynamic Creative Partnerships"
      title: " Creative Partnerships",
      description:
        "We create collaborative partnerships that drive innovation and adapt to your evolving project needs."
    },
    
    {
      icon: <FaHandshake className="text-[#D4451E]" />, // Changed to FaHandshake for Access to Professional Service
      title: "Access to Professional Service",
      description:
        "Take advantage of our partnerships with communication agencies and audiovisual production companies, as well as our equipment rental services to meet all your production needs."
    }
  ];

  return (
    <section
      className="pt-16 pb-60 max-md:pb-24 bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/bg.png')", // Set your background image here
        marginLeft: '20px',
        marginRight: '20px',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="container mx-auto px-5 relative">
        <div className="text-center">
          <p className="text-sm text-[#D4451E]">
            About Us - Our Services
          </p>

          {/* Title and the new text */}
          <h1 className="mt-6 text-7xl font-semibold uppercase text-neutral-900 max-md:text-4xl max-sm:text-3xl">
            What We Do
          </h1>
          <p className="mt-4 text-lg leading-[1.8] text-neutral-700 max-md:text-base max-sm:text-sm">
            At Studio 6.0, we specialize in supporting your content creation process.
            Here’s a look at the key services we provide:
          </p>
        </div>

        {/* Adjusted spacing */}
        <div className="self-stretch mt-5 max-w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"> {/* Flex changed to Grid for better alignment */}
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatWeDo;
