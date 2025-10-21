import React, { useState, useRef, useEffect } from 'react';
import Layout from './Layout';
const theme = 'theme1';
const ISSB = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mediaSrc, setMediaSrc] = useState('');
  const [mediaType, setMediaType] = useState('');
  const videoRef = useRef(null);

  const handleMediaClick = (media) => {
    setMediaSrc(media.src);
    setMediaType(media.type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMediaSrc('');
    setMediaType('');
  };

  useEffect(() => {
    if (isModalOpen && mediaType === 'video' && videoRef.current) {
      videoRef.current.play();
    }
  }, [isModalOpen, mediaType]);

  return (
    <Layout theme={theme}><div className="issb">
      {/* Hero Section */}
      <div className="relative w-full h-[660px] overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/ISSB/ISSB-P19.jpg"
          alt="ISSB Hero"
        />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-4xl font-semibold">ISSB-P</h1>
          <p className="text-xl">Institution of Higher Education for Biological and Paramedical Sciences.</p>
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="border-gray-400 my-8" />

      {/* About Section */}
      <div className="p-8">
        <div className="max-w-screen-lg mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">About</h2>
            <p className="text-lg">The Higher Institute of Biological and Paramedical Sciences (ISSB-P) coordinates a state-of-the-art laboratory equipped with the latest instruments for Molecular and Cellular Biology, as well as Microbiology. It also includes an animal experimentation lab capable of housing mouse, rat, and rabbit models for research and training purposes. ISSB-P is actively involved in large-scale research and development, focusing on current and highly relevant topics. This includes clinical applications related to cancer, neurosciences, protein production (including monoclonal antibodies), diagnostics, therapeutics, and immunology. The institute's mission is to support research on fundamental and clinical application bases, fostering advancements in disease diagnosis, treatment, and prevention, and developing expertise for innovative solutions in medical and biological research.</p>
          </div>

        </div>
      </div>

      {/* Media Gallery */}
      <div className="p-8 flex flex-col gap-8">
        {/* Large Images */}
        <div className="w-full flex flex-wrap gap-6 justify-center">
          <div
            className="relative overflow-hidden w-full h-[700px] cursor-pointer mx-2"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/ISSB/ISSB-P10.jpg' })}
          >
            <img
              className="w-full h-full object-cover"
              src="/assets/ISSB/ISSB-P10.jpg"
              alt="Large Image 1"
            />
          </div>
          <div
            className="relative overflow-hidden w-full h-[700px] cursor-pointer mx-2"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/ISSB/ISSB-P19.jpg' })}
          >
            <img
              className="w-full h-full object-cover"
              src="/assets/ISSB/ISSB-P19.jpg"
              alt="Large Image 2"
            />
          </div>
        </div>

        {/* Small Images in Pairs */}
        <div className="grid grid-cols-2 gap-6">
          <div
            className="relative overflow-hidden w-full h-[500px] cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/ISSB/ISSB-P1.jpg' })}
          >
            <img
              className="w-full h-full object-cover"
              src="/assets/ISSB/ISSB-P1.jpg"
              alt="Small Image 1"
            />
          </div>
          <div
            className="relative overflow-hidden w-full h-[500px] cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/ISSB/ISSB-P9.jpg' })}
          >
            <img
              className="w-full h-full object-cover"
              src="/assets/ISSB/ISSB-P9.jpg"
              alt="Small Image 2"
            />
          </div>
          <div
            className="relative overflow-hidden w-full h-[500px] cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/ISSB/ISSB-P11.jpg' })}
          >
            <img
              className="w-full h-full object-cover"
              src="/assets/ISSB/ISSB-P11.jpg"
              alt="Small Image 3"
            />
          </div>
          <div
            className="relative overflow-hidden w-full h-[500px] cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/ISSB/ISSB-P17.jpg' })}
          >
            <img
              className="w-full h-full object-cover"
              src="/assets/ISSB/ISSB-P17.jpg"
              alt="Small Image 4"
            />
          </div>
          <div
            className="relative overflow-hidden w-full h-[500px] cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/ISSB/ISSB-P20.jpg' })}
          >
            <img
              className="w-full h-full object-cover"
              src="/assets/ISSB/ISSB-P20.jpg"
              alt="Small Image 5"
            />
          </div>
          <div
            className="relative overflow-hidden w-full h-[500px] cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/ISSB/ISSB-P4.jpg' })}
          >
            <img
              className="w-full h-full object-cover"
              src="/assets/ISSB/ISSB-P4.jpg"
              alt="Small Image 6"
            />
          </div>
          <div
            className="relative overflow-hidden w-full h-[500px] cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/ISSB/ISSB-P13.jpg' })}
          >
            <img
              className="w-full h-full object-cover"
              src="/assets/ISSB/ISSB-P13.jpg"
              alt="Small Image 7"
            />
          </div>
          <div
            className="relative overflow-hidden w-full h-[500px] cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/ISSB/ISSB-P21.jpg' })}
          >
            <img
              className="w-full h-full object-cover"
              src="/assets/ISSB/ISSB-P21.jpg"
              alt="Small Image 8"
            />
          </div>
        </div>
      </div>

      {/* Modal for media */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-4/5 h-4/5 max-w-screen-xl max-h-screen-xl">
            <button
              className="absolute top-2 right-2 text-white text-3xl z-50"
              onClick={closeModal}
            >
              &times;
            </button>
            {mediaType === 'video' ? (
              <video
                className="w-full h-full object-cover"
                src={mediaSrc}
                controls
                autoPlay
                loop
                ref={videoRef}
              />
            ) : (
              <img
                className="w-full h-full object-contain"
                src={mediaSrc}
                alt="Full View"
              />
            )}
          </div>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default ISSB;
