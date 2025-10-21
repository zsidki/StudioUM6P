import React, { useState, useRef, useEffect } from 'react';
import Layout from './Layout';
const theme = 'theme1';
const SAP = () => {
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

      <div className="sap">
        {/* Hero Section */}
        <div className="relative w-full h-[660px] overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="/assets/SAP/SAP+D1.jpg"
            alt="SAP Hero"
          />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-4xl font-semibold">SAP+D</h1>
            <p className="text-xl">School of Architecture, Planning & Design</p>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="border-gray-400 my-8" />

        {/* About Section */}
        <div className="p-8">
          <div className="max-w-screen-lg mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">About</h2>
              <p className="text-lg">La School of Architecture, Planning & Design (SAP+D) est une école d’innovation en Architecture, Planification Urbaine/ Territoriale et Design à travers l’éducation, la recherche-action et le développement de solutions intelligentes répondant aux défis africains et marocains. L'École vise à contribuer au développement architectural, urbain et territorial résilient, durable et intelligent au niveau national et africain en explorant les différents contextes géographiques, socio-culturels, techniques et environnementaux. </p>
            </div>
            
          </div>
        </div>

        {/* Media Gallery */}
        <div className="p-8 flex flex-col gap-8">
          {/* Large Images */}
          <div className="w-full flex flex-wrap gap-6 justify-center">
            <div
              className="relative overflow-hidden w-full h-[700px] cursor-pointer mx-2"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/SAP/SAP+D4.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/SAP/SAP+D4.jpg"
                alt="Large Image 1"
              />
            </div>
            <div
              className="relative overflow-hidden w-full h-[700px] cursor-pointer mx-2"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/SAP/SAP+D9.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/SAP/SAP+D9.jpg"
                alt="Large Image 2"
              />
            </div>
          </div>

          {/* Small Images in Pairs */}
          <div className="grid grid-cols-2 gap-6">
            <div
              className="relative overflow-hidden w-full h-[500px] cursor-pointer"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/SAP/SAP+D2.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/SAP/SAP+D2.jpg"
                alt="Small Image 1"
              />
            </div>
            <div
              className="relative overflow-hidden w-full h-[500px] cursor-pointer"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/SAP/SAP+D3.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/SAP/SAP+D3.jpg"
                alt="Small Image 2"
              />
            </div>
            <div
              className="relative overflow-hidden w-full h-[500px] cursor-pointer"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/SAP/SAP+D5.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/SAP/SAP+D5.jpg"
                alt="Small Image 3"
              />
            </div>
            <div
              className="relative overflow-hidden w-full h-[500px] cursor-pointer"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/SAP/SAP+D6.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/SAP/SAP+D6.jpg"
                alt="Small Image 4"
              />
            </div>
            <div
              className="relative overflow-hidden w-full h-[500px] cursor-pointer"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/SAP/SAP+D7.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/SAP/SAP+D7.jpg"
                alt="Small Image 5"
              />
            </div>
            <div
              className="relative overflow-hidden w-full h-[500px] cursor-pointer"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/SAP/SAP+D8.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/SAP/SAP+D8.jpg"
                alt="Small Image 6"
              />
            </div>
            <div
              className="relative overflow-hidden w-full h-[500px] cursor-pointer"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/SAP/SAP+D10.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/SAP/SAP+D10.jpg"
                alt="Small Image 7"
              />
            </div>
            <div
              className="relative overflow-hidden w-full h-[500px] cursor-pointer"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/SAP/SAP+D18.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/SAP/SAP+D18.jpg"
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

export default SAP;
