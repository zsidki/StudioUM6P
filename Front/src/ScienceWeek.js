import React, { useState, useRef, useEffect } from 'react';
import Layout from './Layout';
const theme = 'theme1';
const ScienceWeek = () => {
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
        <div className="relative w-full h-[600px] overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/assets/SW/SWvid.mp4"
            muted
            autoPlay
            loop
          />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-4xl font-semibold">Science Week</h1>
            <p className="text-xl">Breaking Barriers, Advancing Knowledge</p>
          </div>

        </div>

        {/* Horizontal Line */}
        <hr className="border-gray-400 my-8" />

        {/* About Section */}
        <div className="p-8">
          <div className="max-w-screen-lg mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">About</h2>
              <p className="text-lg">Scientific research, excellence in teaching, and the dissemination of knowledge are at the heart of UM6P's missions. The UM6P Science Week (WOS) is an annual event focused on a recurring theme: 'At the Frontiers of Science.'

                WOS features a central interdisciplinary symposium, along with major conferences, reading circles, exhibitions, and more. The goal of this major annual event is to position UM6P on the global knowledge map by showcasing the latest advancements in the university's fields. Renowned speakers, gathered in Benguerir for a week, engage in discussions with students to share, stimulate, and break down knowledge barriers.

                Primarily organized for UM6P students, WOS aims to equip them with tools to reflect, question the world, and transcend disciplinary silos, embodying the spirit of a polytechnic university.</p>
            </div>
          </div>
        </div>

        {/* Media Gallery */}
        <div className="p-8 flex flex-col gap-6 items-center">
          <div
            className="relative overflow-hidden w-full  cursor-pointer"
            onClick={() => handleMediaClick({ type: 'video', src: '/assets/SW/SW1.mp4' })}
          >
            <video
              className="w-full h-full object-cover"
              src="/assets/SW/SW1.mp4"
              muted
              autoPlay
              loop
            />
          </div>
          <div
            className="relative overflow-hidden w-full  cursor-pointer"

            src="/assets/SW/SW Feb 20-26 2023- Best of.mp4"

            onClick={() => handleMediaClick({ type: 'video', src: '/assets/SW/SW2.mp4' })}
          >
            <video
              className="w-full h-full object-cover"
              src="/assets/SW/SW2.mp4"
              muted
              autoPlay
              loop
            />
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

export default ScienceWeek;
