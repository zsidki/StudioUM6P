import React, { useState, useRef, useEffect } from 'react';
import Layout from './Layout';
const theme = 'theme1';
const Ferme = () => {
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

      <div className="ferme">
        {/* Hero Section */}
        <div className="relative w-full h-[660px] overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="/assets/ferme/_DPH2296.jpg" // Replace with the correct image path
            alt="Ferme Hero"
          />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-4xl font-semibold">Ferme experimentale</h1>
            <p className="text-xl">Agriculture and Sustainability</p>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="border-gray-400 my-8" />

        {/* About Section */}
        <div className="p-8">
          <div className="max-w-screen-lg mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">About</h2>
              <p className="text-lg">Description about the ferme project.</p>
            </div>
            <div className="flex flex-wrap justify-between">
              <div className="w-full sm:w-1/3 mb-4">
                <h3 className="text-xl font-semibold">Client</h3>
                <p>Client Name</p>
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
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/ferme/_DPH2310.jpg' })} // Replace with the correct image path
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/ferme/_DPH2310.jpg" // Replace with the correct image path
                alt="Large Image 2"
              />
            </div>
          </div>

          {/* Small Images in Pairs */}
          <div className="grid grid-cols-2 gap-6">
            <div
              className="relative overflow-hidden w-full h-[500px] cursor-pointer"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/ferme/_DPH2321.jpg' })} // Replace with the correct image path
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/ferme/_DPH2321.jpg" // Replace with the correct image path
                alt="Small Image 1"
              />
            </div>
            <div
              className="relative overflow-hidden w-full h-[500px] cursor-pointer"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/ferme/_DPH2340.jpg' })} // Replace with the correct image path
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/ferme/_DPH2340.jpg" // Replace with the correct image path
                alt="Small Image 2"
              />
            </div>
          </div>

          {/* Additional Media */}
          <div className="grid grid-cols-2 gap-6">
            <div
              className="relative overflow-hidden w-full h-[500px] cursor-pointer"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/ferme/_DPH2350.jpg' })} // Replace with the correct image path
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/ferme/_DPH2350.jpg" // Replace with the correct image path
                alt="Additional Image 1"
              />
            </div>
            <div
              className="relative overflow-hidden w-full h-[500px] cursor-pointer"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/ferme/_DPH2355AK.jpg' })} // Replace with the correct image path
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/ferme/_DPH2355AK.jpg" // Replace with the correct image path
                alt="Additional Image 2"
              />
            </div>
            <div
              className="relative overflow-hidden w-full h-[500px] cursor-pointer"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/ferme/_DPH2360AK.jpg' })} // Replace with the correct image path
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/ferme/_DPH2360AK.jpg" // Replace with the correct image path
                alt="Additional Image 3"
              />
            </div>
            <div
              className="relative overflow-hidden w-full h-[500px] cursor-pointer"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/ferme/_DPH2364AK.jpg' })} // Replace with the correct image path
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/ferme/_DPH2364AK.jpg" // Replace with the correct image path
                alt="Additional Image 4"
              />
            </div>

            <div
              className="relative overflow-hidden w-full h-[500px] cursor-pointer"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/ferme/_DPH2372AK.jpg' })} // Replace with the correct image path
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/ferme/_DPH2372AK.jpg" // Replace with the correct image path
                alt="Additional Image 6"
              />
            </div>
            <div
              className="relative overflow-hidden w-full h-[500px] cursor-pointer"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/ferme/_DPH2377AK.jpg' })} // Replace with the correct image path
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/ferme/_DPH2377AK.jpg" // Replace with the correct image path
                alt="Additional Image 7"
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
export default Ferme;
