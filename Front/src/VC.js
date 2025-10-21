/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useRef, useEffect } from 'react';
import Layout from './Layout';
const theme = 'theme1';
const VC = () => {
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
    <Layout theme={theme}>

      <div className="vc">
        {/* Hero Section */}
        <div className="relative w-full h-[660px] overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="/assets/VC/_DPH2257AK.jpg"
            alt="VC Hero"
          />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-4xl font-semibold">VC</h1>
            <p className="text-xl">Innovative Solutions for Advanced Processes</p>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="border-gray-400 my-8" />

        {/* About Section */}
        <div className="p-8">
          <div className="max-w-screen-lg mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">About</h2>
              <p className="text-lg">Africa is rapidly emerging as a continent of the future, showcasing dynamic growth in sectors like agriculture, healthcare, and fintech. Despite low investment in Deep Tech, the potential is vast. The Deep Tech Summit unites key players to drive transformation, strengthen networks, and unlock innovation opportunities for a promising technological future in Africa.</p>
            </div>
            <div className="flex flex-wrap justify-between">
              <div className="w-full sm:w-1/3 mb-4">
                <h3 className="text-xl font-semibold">Client</h3>
                <p>OACE Exclusive GmbH</p>
              </div>
              <div className="w-full sm:w-1/3 mb-4">
                <h3 className="text-xl font-semibold">Services</h3>
                <p>Full-Service Production</p>
              </div>
              <div className="w-full sm:w-1/3 mb-4">
                <h3 className="text-xl font-semibold">Category</h3>
                <p>Online Ad</p>
              </div>
            </div>
          </div>
        </div>

        {/* Media Gallery */}
        <div className="p-8 flex flex-col gap-8">
          {/* Large Images */}
          <div className="w-full flex flex-wrap gap-6 justify-center">
            <div
              className="relative overflow-hidden w-full h-[700px] cursor-pointer mx-2"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/VC/_DPH2264AK.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/VC/_DPH2264AK.jpg"
                alt="Large Image 1"
              />
            </div>
            <div
              className="relative overflow-hidden w-full h-[700px] cursor-pointer mx-2"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/VC/_DPH2272AK.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/VC/_DPH2272AK.jpg"
                alt="Large Image 2"
              />
            </div>
          </div>

          {/* Small Images in Pairs */}
          <div className="grid grid-cols-2 gap-6">
            <div
              className="relative overflow-hidden w-full h-[500px] cursor-pointer"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/VC/_DPH2278AK.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/VC/_DPH2278AK.jpg"
                alt="Small Image 1"
              />
            </div>
            <div
              className="relative overflow-hidden w-full h-[500px] cursor-pointer"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/VC/_DPH2283AK.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/VC/_DPH2283AK.jpg"
                alt="Small Image 2"
              />
            </div>

          </div>
          <div className="w-full flex flex-wrap gap-6 justify-center">

            <div
              className="relative overflow-hidden w-full h-[700px] cursor-pointer mx-2"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/VC/_DPH2287AK.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/VC/_DPH2287AK.jpg"
                alt="Large Image 2"
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

export default VC;
