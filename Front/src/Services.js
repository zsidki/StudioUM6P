import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="mt-8 px-4 sm:px-6 lg:px-8">
    
      <section className="articles grid gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        <article className="max-w-sm mx-auto">
          <div className="article-wrapper bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105 p-6">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#D4451E', fontFamily: 'Poppins' }}>
              Photography
            </h2>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/908430/pexels-photo-908430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Photography"
                className="w-full h-60 object-cover rounded-2xl"
              />
              <span className="absolute top-2 left-2 text-white text-xl font-bold">01</span>
            </div>
            <p className="text-gray-700 mt-4" style={{ fontFamily: 'Inter' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.

            </p>
            <Link to="/photography" className="read-more inline-block mt-4 text-xs font-extrabold flex items-center" style={{ color: '#D4451E', fontFamily: 'Poppins' }}>
              LEARN MORE 
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </article>

        <article className="max-w-sm mx-auto">
          <div className="article-wrapper bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105 p-6">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#D4451E', fontFamily: 'Poppins' }}>
              Videomaking
            </h2>
            <div className="relative">
              <img
                src="https://i.pinimg.com/564x/d6/78/03/d67803de725da1c479c722c8e5d41538.jpg"
                alt="Videomaking"
                className="w-full h-60 object-cover rounded-2xl"
              />
              <span className="absolute top-2 left-2 text-white text-xl font-bold">02</span>
            </div>
            <p className="text-gray-700 mt-4" style={{ fontFamily: 'Inter' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.

            </p>
            <Link to="/videomaking" className="read-more inline-block mt-4 text-xs font-extrabold items-center" style={{ color: '#D4451E', fontFamily: 'Poppins' }}>
              LEARN MORE 
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </article>

        <article className="max-w-sm mx-auto">
          <div className="article-wrapper bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105 p-6">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#D4451E', fontFamily: 'Poppins' }}>
              Filming & Production
            </h2>
            <div className="relative">
              <img
                src="https://i.pinimg.com/564x/fb/4f/72/fb4f72195c8a7b8382d2633b0bbf7f0e.jpg"
                alt="Filming & Production"
                className="w-full h-60 object-cover rounded-2xl"
              />
              <span className="absolute top-2 left-2 text-white text-xl font-bold">03</span>
            </div>
            <p className="text-gray-700 mt-4" style={{ fontFamily: 'Inter' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.

            </p>
            <Link to="/filming-production" className="read-more inline-block mt-4 text-xs font-extrabold items-center" style={{ color: '#D4451E', fontFamily: 'Poppins' }}>
              LEARN MORE 
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </article>
      </section>
      <div className="mt-8"></div>

    </div>
  );
};

export default Services;
