import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function AboutUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      className="py-10 bg-[#FAFAFA]"
      style={{
        fontFamily:
          "Red Hat Display, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif",
      }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-stretch justify-between px-5 gap-8">
        {/* Left Section with Image */}
        <div className="w-full md:w-5/12 flex items-center">
          <div className="relative w-full h-full">
            <img
              src="/assets/PERGOLA9.jpg"
              alt="Business Meeting"
              className="object-cover w-full h-full rounded-lg"
              style={{ display: "block", height: '100%', maxHeight: '100%' }} // Ensures no extra space around the image
            />
          </div>
        </div>

        {/* Right Section - Text & Vision */}
        <div className="w-full md:w-7/12 flex flex-col justify-between space-y-6">
          <div className="flex-grow">
            <p
              className="text-sm"
              style={{
                color: "#D4451E",
                margin: 0, // Ensure no margin
              }}
            >
              About Us - Our Mission
            </p>
            <header className="text-4xl md:text-5xl font-semibold text-black leading-tight">
              <h1>
                <span className="font-bold">The Most Leading</span>
                <br />
                <span>Solution for You</span>
              </h1>
            </header>

            <p className="text-gray-600 text-base leading-relaxed border-l-4 pl-4 border-red-600 mt-4">
              At Studio 6.0, our mission is to provide a streamlined, efficient
              platform that simplifies the media production process for the entire
              UM6P community. We are committed to delivering top-quality services
              in graphic design, video production, and photography, ensuring that
              our users can focus on their creativity while we handle the
              logistics.
              <br />
              Our goal is to support UM6P’s growing content creation needs,
              fostering collaboration and innovation across departments. With an
              emphasis on efficiency, accessibility, and high standards, Studio
              6.0 is your trusted partner for turning ideas into impactful
              visuals.
            </p>
          </div>

          {/* Vision Work Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base font-normal text-gray-700">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-red-600">✔</span> Expert guidance for
                every project
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✔</span> Skilled consultants
                guiding your projects
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✔</span> A dedicated team of
                experienced professionals
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-red-600">✔</span> Partnerships with
                industry-leading agencies
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✔</span> Media production and
                equipment rentals
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600">✔</span> Strategic advice for
                optimizing your content
              </li>
            </ul>
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="w-auto px-6 py-3 text-lg font-semibold text-white rounded-xl"
              style={{ backgroundColor: "#D4451E" }}
              onClick={scrollToContact}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
