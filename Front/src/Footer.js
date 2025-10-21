import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-custom-red text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Logo */}
        <div className="mb-4 md:mb-0 text-center">
          <img src="/assets/Logo Studio6.0 cobrand UM6P White.svg" alt="Logo" className="h-12 md:h-16 mb-4 md:mb-0" /> {/* Adjust logo height */}
        </div>
        
        {/* Contact Information */}
        <div className="md:text-left ">
          <h2 className="text-lg font-bold mb-2">Contact</h2>
          <hr className="border-white my-2 w-full" style={{ maxWidth: '4%', backgroundColor: 'white', height: '3px' }} />
          <p className="mb-2">Lot 660, Hay Moulay Rachid Ben Guerir, 43150, Morocco</p>
          <hr className="border-white my-2 w-full" style={{ maxWidth: '40%' }} /> {/* White line after address */}
          <p className="mb-2">Email: Studio6@um6p.ma</p>
          <hr className="border-white my-2 w-full" style={{ maxWidth: '40%' }} /> {/* White line after Email */}
          <p className="mb-2">Phone: +212 123 456 789</p>
          <hr className="border-white my-2 w-full" /> {/* White line after Phone */}
        </div>

        {/* Copyright Information */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-white text-sm font-medium">© 2024 Built by Comm’s Office - UM6P. All rights reserved.</p>
          {/* Social Media Icons */}
          <div className="flex justify-center md:justify-end">
            <a href="#" className="text-white hover:text-gray-400">
              <img src="/assets/fcb.png" alt="Facebook" className="h-6 w-auto mr-4" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <img src="/assets/linkdin.png" alt="LinkedIn" className="h-6 w-auto mr-4" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <img src="/assets/ig.png" alt="Instagram" className="h-6 w-auto mr-4" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <img src="/assets/x.png" alt="Twitter" className="h-6 w-auto mr-4" />
            </a>
            {/* Add more social media icons as needed */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
