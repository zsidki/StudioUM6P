import React, { useState, useRef, useEffect } from 'react';
import Layout from './Layout';
const theme = 'theme1';
const DeepTechSummit = () => {
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
      <div className="deep-tech-summit">
        {/* Hero Section */}
        <div className="relative w-full h-[600px] overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/assets/DEEP.mp4"
            muted
            autoPlay
            loop
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
          </div>
        </div>

        {/* Media Gallery */}
        <div className="p-8 flex flex-wrap gap-6 justify-center">
          {/* Images in the same line */}
          <div className="flex flex-wrap gap-4 justify-center">
          <div
              className="relative overflow-hidden cursor-pointer w-[calc(50%-1rem)] h-[400px]"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/_OFL4280.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/_OFL4280.jpg"
                alt="Image 2"
              />
            </div>
            <div
              className="relative overflow-hidden cursor-pointer w-[calc(50%-1rem)] h-[400px]"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/_OFL4377.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/_OFL4377.jpg"
                alt="Image 2"
              />
            </div>
            <div
              className="relative overflow-hidden cursor-pointer w-full h-[700px]"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/_OFL495733k.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/_OFL495733k.jpg"
                alt="Image 3"
              />
            </div>
            <div
              className="relative overflow-hidden cursor-pointer w-[calc(50%-1rem)] h-[400px]"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/0194.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/0194.jpg"
                alt="Image 4"
              />
            </div>
            <div
              className="relative overflow-hidden cursor-pointer w-[calc(50%-1rem)] h-[400px]"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/0069336.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/0069336.jpg"
                alt="Image 5"
              />
            </div>
            <div
              className="relative overflow-hidden cursor-pointer w-full h-[700px]"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/0015.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/0015.jpg"
                alt="Image 6"
              />
            </div>

            <div
              className="relative overflow-hidden cursor-pointer w-full h-[700px]"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/_OFL535633k.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/_OFL535633k.jpg"
                alt="Image 8"
              />
            </div>
            <div
              className="relative overflow-hidden cursor-pointer w-[calc(50%-1rem)] h-[400px]"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/h.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/h.jpg"
                alt="Image 9"
              />
            </div>
            <div
              className="relative overflow-hidden cursor-pointer w-[calc(50%-1rem)] h-[400px]"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/_OFL4362.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/_OFL4362.jpg"
                alt="Image 10"
              />
            </div>
            <div
              className="relative overflow-hidden cursor-pointer w-full h-[700px]"
              onClick={() => handleMediaClick({ type: 'image', src: '/assets/0021336.jpg' })}
            >
              <img
                className="w-full h-full object-cover"
                src="/assets/0021336.jpg"
                alt="Image 11"
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

export default DeepTechSummit;
