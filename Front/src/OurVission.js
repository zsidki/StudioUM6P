import React from 'react';
import { FaProjectDiagram, FaPaperPlane, FaUsers } from 'react-icons/fa';

function Vision() {
  const visionWorkData = [
    {
      icon: <FaProjectDiagram className="text-white text-3xl" />,
      title: 'Simple and efficient project management',
      description: 'Managing projects with ease and efficiency is at the core of what we do.',
    },
    {
      icon: <FaPaperPlane className="text-white text-3xl" />,
      title: 'A paperless, organized workflow',
      description: 'Streamline your workflow with a completely paperless environment.',
    },
    {
      icon: <FaUsers className="text-white text-3xl" />,
      title: 'Collaborative, creative partnerships',
      description: 'Partner with us to drive innovation and creative excellence.',
    },
  ];

  return (
    <section
      className="py-10 bg-white"
      style={{
        fontFamily:
          'Red Hat Display, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, Liberation Sans, sans-serif',
      }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-stretch justify-between px-5 gap-8">
        
        {/* Left Section with Image */}
        <div className="w-full md:w-5/12 flex items-center">
          <div className="relative w-full h-full">
            <img
              src="assets/SOS VILLAGES121.JPG"
              alt="Vision illustration"
              className="object-cover w-full h-full rounded-lg"
              style={{ height: '100%', maxHeight: '100%' }}
            />
          </div>
        </div>

        {/* Right Section - Text & Vision Items */}
        <div className="w-full md:w-7/12 flex flex-col justify-between space-y-6">
          <div className="flex-grow">
            <p className="text-sm" style={{ color: '#D4451E' }}>About Us - Our Vision</p>
            <br />
            <header className="text-4xl md:text-5xl font-semibold text-black leading-tight">
              <h1>
                <span className="font-bold">We&nbsp;Are&nbsp;Here&nbsp;to&nbsp;Help&nbsp;You</span>
                <br />
                <span>Achieve Your <span style={{ color: '#D4451E' }}>Goal</span></span>
              </h1>
            </header>

            {/* Add margin to create space between the heading and paragraph */}
            <p className="text-gray-600 text-base leading-relaxed border-l-4 pl-4 border-red-600 mt-4">
              At Studio 6.0, we are driven by a vision to empower UM6P’s ecosystem with efficient, seamless media production services that help you achieve your creative and operational goals. Our platform is designed to simplify every step of the process—from order submission to final delivery—making sure you have the tools and support you need to succeed.
              <br />
              We envision a future where every team at UM6P has access to flexible, high-quality production services, backed by partnerships with top communication and audiovisual agencies. By providing a user-friendly, collaborative environment, we aim to foster a culture of innovation and creativity across the entire university.
            </p>
          </div>

          {/* Vision Work Items */}
          <div className="grid grid-cols-1 gap-4 text-base font-normal text-gray-700">
            {visionWorkData.map((item, index) => (
              <div key={index} className="flex bg-[#F8F8F8] p-4 rounded-md">
                {/* Red Rectangle with Icon */}
                <div className="bg-[#D4451E] w-[60px] h-[60px] flex items-center justify-center rounded-md mr-4">
                  {item.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="mt-2 text-gray-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Vision;
