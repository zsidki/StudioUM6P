import React, { useState } from 'react';

// Portfolio items data
const portfolioItems = [
  { id: 1, category: 'Graphic Design', src: 'assets/GD/KV_Square.jpg' },
  { id: 2, category: 'Graphic Design', src: 'assets/GD/KV_RED.jpg' },
  { id: 3, category: 'Graphic Design', src: 'assets/GD/Piste 1.jpg' },
  { id: 4, category: 'Graphic Design', src: 'assets/GD/Assiciates-digital-Meeting.jpg' },
  { id: 5, category: 'Graphic Design', src: 'assets/GD/EPFL 100 PHD.jpg' },
  { id: 6, category: 'Graphic Design', src: 'assets/GD/GALA-INVITAION.jpg' },
  { id: 7, category: 'Graphic Design', src: 'assets/GD/KV_Rawafid.jpg' },
  { id: 8, category: 'Graphic Design', src: 'assets/GD/RIHLA_2.jpg' },
  { id: 9, category: 'Graphic Design', src: 'assets/GD/studio-07.jpg' },
  { id: 10, category: 'Graphic Design', src: 'assets/GD/studio-02.jpg' },
  { id: 11, category: 'Graphic Design', src: 'assets/GD/studio-03.jpg' },
  { id: 12, category: 'Graphic Design', src: 'assets/GD/studio-04.jpg' },
  { id: 13, category: 'Graphic Design', src: 'assets/GD/studio-05.jpg' },
  { id: 14, category: 'Graphic Design', src: 'assets/GD/studio-06.jpg' },
  { 
    id: 30, 
    category: 'Video Production', 
    videoSrc: 'https://www.youtube.com/embed/SVgLa9387uU',
    name: 'EP 01 - 16x9'
  },
  { 
    id: 31, 
    category: 'Video Production', 
    videoSrc: 'https://www.youtube.com/embed/rJZ5Um7XGic',
    name: 'EP 02 - 16x9'
  },
  { 
    id: 32, 
    category: 'Video Production', 
    videoSrc: 'https://www.youtube.com/embed/IvH5viej-V0',
    name: 'President jpo_1'
  },
  { 
    id: 33, 
    category: 'Video Production', 
    videoSrc: 'https://www.youtube.com/embed/A14-s3knOqM',
    name: 'UM6P Générique'
  },
  { 
    id: 34, 
    category: 'Video Production', 
    videoSrc: 'https://www.youtube.com/embed/XWyv9_OHsaA',
    name: 'Vision 2030 Trailer'
  },
  { id: 18, category: 'Photography', src: 'assets/P/1337_15.jpg' },
  { id: 19, category: 'Photography', src: 'assets/P/Doors Of Heaven6.jpg' },
  { id: 20, category: 'Photography', src: 'assets/P/Facades1.jpg' },
  { id: 21, category: 'Photography', src: 'assets/P/Facades3.jpg' },
  { id: 22, category: 'Photography', src: 'assets/P/ISSB-P3.jpg' },
  { id: 23, category: 'Photography', src: 'assets/P/ISSB-P9.jpg' },
  { id: 24, category: 'Photography', src: 'assets/P/MUSCULATION10.jpg' },
  { id: 25, category: 'Photography', src: 'assets/P/PERGOLA35.jpg' },
  { id: 26, category: 'Photography', src: 'assets/P/SAP+D17.jpg' },
  { id: 27, category: 'Photography', src: 'assets/P/SHBM6.jpg' },
  { id: 28, category: 'Photography', src: 'assets/P/SHBM25.jpg' },
  { id: 29, category: 'Photography', src: 'assets/P/STUDENT CENTER30.jpg' },
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  // Filter items based on the selected category
  const filteredItems = portfolioItems.filter(item =>
    selectedCategory === 'All' || item.category === selectedCategory
  );

  // Handle image click for full view
  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-full h-auto">
<div className="relative w-full h-[60vh] mb-4 overflow-hidden">
  <video
    src="assets/portfoliovid3.mp4"
    autoPlay
    loop
    muted
    className="w-full h-full object-cover"
  />
</div>


      {/* Category filter buttons */}
      <div className="text-center mb-4">
        {['All', 'Graphic Design', 'Video Production', 'Photography'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`py-1 px-6 rounded-full border text-black hover:text-white hover:bg-custom-red transition-all mx-1 ${selectedCategory === category ? 'border-custom-red bg-custom-red text-white' : 'border-gray-400'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Portfolio items grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredItems.map(item => (
          <div key={item.id} className="portfolio-item relative group">
            {item.category === 'Video Production' ? (
              <iframe
                src={item.videoSrc}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={item.name}
                className="w-full h-[400px] rounded"
              />
            ) : (
              <img
                src={item.src}
                alt={`Portfolio ${item.id}`}
                className="w-full h-auto rounded transition-transform duration-300 transform group-hover:scale-105 cursor-pointer"
                onClick={() => handleImageClick(item.src)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Modal for full view image */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full p-8">
            <img
              src={selectedImage}
              alt="Full View"
              className="w-full h-full object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-3xl hover:text-red-500"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
