/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useRef, useEffect } from 'react';
import Layout from './Layout';

const Gitex = () => {
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
  const theme = 'theme1'; 

  return (
    <Layout theme={theme}>
    <div className="deep-tech-summit">
      {/* Hero Section */}
      <div className="relative w-full h-[555px] overflow-hidden">
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/GITEX/Gitexvid.mp4"
          muted
          autoPlay
          loop
        />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-4xl font-semibold">Gitex</h1>
          <p className="text-xl">The largest Tech & Startups event in Africa.</p>
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="border-gray-400 my-8" />

      {/* About Section */}
      <div className="p-8">
        <div className="max-w-screen-lg mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">About</h2>
            <p className="text-lg">From May 29th to 31st, University Mohammed VI Polytechnic (UM6P) participated in GITEX AFRICA 2024, held under the High Patronage of His Majesty King Mohammed VI in Marrakech. As the exclusive R&D partner, UM6P showcased over 15 entities and programs ranging from Health to DeepTech. On the first day, President Mr. Hicham El Habti participated in a panel titled “Fireside Chat: Bridging science and technology: Concrete Gateways for progress,” discussing AI's impact on job roles, employment prospects, and traditional jobs. The session also explored how governments and big tech companies can support African youth. Additionally, several UM6P representatives spoke at various side events, highlighting their ecosystems' projects addressing African challenges.</p>
          </div>
          
        </div>
      </div>

      {/* Media Gallery */}
      <div className="p-8 flex flex-col gap-6 items-center">
        {/* First Row of Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            className="relative overflow-hidden cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/GITEX/DSC06871.jpeg' })}
          >
            <img 
              className="w-full h-full object-cover"
              src="/assets/GITEX/DSC06871.jpeg" 
              alt="Gitex Image 1"
            />
          </div>
          <div 
            className="relative overflow-hidden cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/GITEX/DSC06873.jpeg' })}
          >
            <img 
              className="w-full h-full object-cover"
              src="/assets/GITEX/DSC06873.jpeg"
              alt="Gitex Image 2"
            />
          </div>
          <div 
            className="relative overflow-hidden cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/GITEX/DSC06875.jpeg' })}
          >
            <img 
              className="w-full h-full object-cover"
              src="/assets/GITEX/DSC06875.jpeg"
              alt="Gitex Image 3"
            />
          </div>
        </div>

        {/* Second Row - Large Image */}
        <div 
          className="relative overflow-hidden w-full cursor-pointer"
          onClick={() => handleMediaClick({ type: 'image', src: '/assets/GITEX/DSC06857.jpeg' })}
        >
          <img 
            className="w-full h-[500px] object-cover"
            src="/assets/GITEX/DSC06857.jpeg"
            alt="Gitex Large Image"
          />
        </div>

        {/* Third Row of Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            className="relative overflow-hidden cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/GITEX/DSC06879.jpeg' })}
          >
            <img 
              className="w-full h-full object-cover"
              src="/assets/GITEX/DSC06879.jpeg"
              alt="Gitex Image 4"
            />
          </div>
          <div 
            className="relative overflow-hidden cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/GITEX/DSC06893.jpeg' })}
          >
            <img 
              className="w-full h-full object-cover"
              src="/assets/GITEX/DSC06893.jpeg"
              alt="Gitex Image 5"
            />
          </div>
          <div 
            className="relative overflow-hidden cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/GITEX/DSC06898.jpeg' })}
          >
            <img 
              className="w-full h-full object-cover"
              src="/assets/GITEX/DSC06898.jpeg"
              alt="Gitex Image 6"
            />
          </div>
        </div>

        {/* Additional Large Images */}
        <div 
          className="relative overflow-hidden w-full cursor-pointer"
          onClick={() => handleMediaClick({ type: 'image', src: '/assets/GITEX/DSC07553.jpg' })}
        >
          <img 
            className="w-full h-[500px] object-cover"
            src="/assets/GITEX/DSC07553.jpg"
            alt="Gitex Large Image"
          />
        </div>
        <div 
          className="relative overflow-hidden w-full cursor-pointer"
          onClick={() => handleMediaClick({ type: 'image', src: '/assets/GITEX/DSC07592.jpg' })}
        >
          <img 
            className="w-full h-[500px] object-cover"
            src="/assets/GITEX/DSC07592.jpg"
            alt="Gitex Large Image"
          />
        </div>
        <div 
          className="relative overflow-hidden w-full cursor-pointer"
          onClick={() => handleMediaClick({ type: 'image', src: '/assets/GITEX/DSC07579.jpg' })}
        >
          <img 
            className="w-full h-[500px] object-cover"
            src="/assets/GITEX/DSC07579.jpg"
            alt="Gitex Large Image"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <div 
            className="relative overflow-hidden cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/GITEX/DSC06887.jpeg' })}
          >
            <img 
              className="w-full h-full object-cover"
              src="/assets/GITEX/DSC06887.jpeg"
              alt="Gitex Image 4"
            />
          </div>
          <div 
            className="relative overflow-hidden cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/GITEX/DSC06882.jpeg' })}
          >
            <img 
              className="w-full h-full object-cover"
              src="/assets/GITEX/DSC06882.jpeg"
              alt="Gitex Image 5"
            />
          </div>
          
        </div>
      </div>

      {/* Modal for media */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-4/5 h-4/5">
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

export default Gitex;
