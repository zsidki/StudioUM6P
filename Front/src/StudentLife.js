import React, { useState, useRef, useEffect } from 'react';
import Layout from './Layout';
const theme = 'theme1'; 
const StudentLife = () => {
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
    <div className="deep-tech-summit">      {/* Hero Section */}
      <div className="relative w-full h-[660px] overflow-hidden">
        <img 
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/StudentLife/SHBM7.jpg"
          alt="Deep Tech Summit" 
        />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-4xl font-semibold">Deep Tech Summit</h1>
          <p className="text-xl">The Next Leap Forward Africa's Deep Tech Transformation</p>
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
      <div className="p-8 flex flex-wrap gap-6 justify-center">
        
        {/* Images in the same line */}
        <div className="flex flex-wrap gap-4 justify-center">
          <div 
            className="relative overflow-hidden w-[567px] h-[500px] cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/StudentLife/SHBM24.jpg' })}
          >
            <img 
              className="w-full h-full object-cover"
              src="/assets/StudentLife/SHBM24.jpg"
              alt="Image 1" 
            />
          </div>
          <div 
            className="relative overflow-hidden w-[567px] h-[500px] cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/StudentLife/SHBM30.jpg' })}
          >
            <img 
              className="w-full h-full object-cover"
              src="/assets/StudentLife/SHBM30.jpg" 
              alt="Image 2" 
            />
          </div>
          <div 
            className="relative overflow-hidden w-full h-[700px] cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/StudentLife/SHBM31.jpg' })}
          >
            <img 
              className="w-full h-full object-cover"
              src="/assets/StudentLife/SHBM31.jpg" 
              alt="Image 3" 
            />
          </div>
          <div 
            className="relative overflow-hidden w-[567px] h-[500px] cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/StudentLife/SHBM32.jpg' })}
          >
            <img 
              className="w-full h-full object-cover"
              src="/assets/StudentLife/SHBM32.jpg" 
              alt="Image 4" 
            />
          </div>
          <div 
            className="relative overflow-hidden w-[567px] h-[500px] cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/StudentLife/SHBM33.jpg' })}
          >
            <img 
              className="w-full h-full object-cover"
              src="/assets/StudentLife/SHBM33.jpg" 
              alt="Image 5" 
            />
          </div>
          
          <div 
            className="relative overflow-hidden w-full h-[700px] cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/StudentLife/SHBM44.jpg' })}
          >
            <img 
              className="w-full h-full object-cover"
              src="/assets/StudentLife/SHBM44.jpg" 
              alt="Image 7" 
            />
          </div>
          <div 
            className="relative overflow-hidden w-full h-[700px] cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/StudentLife/SHBM45.jpg' })}
          >
            <img 
              className="w-full h-full object-cover"
              src="/assets/StudentLife/SHBM45.jpg" 
              alt="Image 8" 
            />
          </div>
          <div 
            className="relative overflow-hidden w-[567px] h-[500px] cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/StudentLife/SHBM12.jpg' })}
          >
            <img 
              className="w-full h-full object-cover"
              src="/assets/StudentLife/SHBM12.jpg" 
              alt="Image 9" 
            />
          </div>
          <div 
            className="relative overflow-hidden w-[567px] h-[500px] cursor-pointer"
            onClick={() => handleMediaClick({ type: 'image', src: '/assets/StudentLife/SHBM17.jpg' })}
          >
            <img 
              className="w-full h-full object-cover"
              src="/assets/StudentLife/SHBM17.jpg" 
              alt="Image 10" 
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

export default StudentLife;
