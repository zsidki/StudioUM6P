import React from 'react';
import { AiFillPhone, AiOutlineMail, AiOutlineGlobal } from 'react-icons/ai';

const ContactUs = () => {
  return (
    <section className="py-10 bg-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div className="container mx-auto flex flex-wrap items-center justify-between px-5 relative">
        <div className="max-w-7xl mx-auto bg-white rounded-lg mt-12 flex flex-col lg:flex-row">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 p-8">
            <p className="text-sm mb-4" style={{ color: '#D4451E' }}>Contact Us</p> {/* Added margin-bottom */}

            <h1 className="text-4xl font-bold md:text-5xl mb-6 text-black">
              Get in <span className="text-custom-red">touch</span>
            </h1>
            <p className="text-gray-600 mb-6">
              Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.
            </p>

            {/* Form */}
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Contact name"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-red-600"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Street"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-red-600"
                />
              </div>
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  placeholder="City"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-red-600"
                />
                <input
                  type="text"
                  placeholder="Postcode"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-red-600"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Contact Phone"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-red-600"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-red-600"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Let's talk about your idea"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-red-600 h-24"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Upload Additional file</label>
                <input
                  type="file"
                  className="w-full border border-dashed border-gray-300 p-3 rounded-lg focus:outline-none focus:border-red-600"
                />
                <p className="text-gray-400 text-xs mt-2">File size should not exceed 10MB</p>
              </div>

              <button
                type="submit"
                className="w-full bg-custom-red hover:bg-custom-red text-white font-bold py-3 rounded-lg transition duration-300"
              >
                SUBMIT
              </button>
            </form>

            {/* Contact Info */}
            <div className="flex items-center justify-between mt-8 text-gray-600 space-x-8">
              <div className="flex items-center space-x-2">
                <AiFillPhone className="text-custom-red" size={24} />
                <p className="text-black">+212 525 073 100</p>
              </div>
              <div className="flex items-center space-x-2">
                <AiOutlineMail className="text-custom-red" size={24} />
                <p className="text-black">Studio6@um6p.ma</p>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="w-full lg:w-1/2">
            <iframe
              title="company-location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.6457933184326!2d-7.9426074!3d32.2155387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdaf7a3feab1f407%3A0xbd50c8e7902ffbf9!2sMohammed%20VI%20Polytechnic%20University!5e0!3m2!1sen!2sma!4v1691234567890!5m2!1sen!2sma"
              width="100%"
              height="100%"
              className="h-full"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
