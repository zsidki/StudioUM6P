import React from 'react';
import HeroSection from './HeroSection';
import ContactUs from './ContactUs';
import Layout from './Layout';
import AboutUs from './AboutUs';
import WhatWeDo from './WhatWeDo';
import OurVission from './OurVission';

const HomePage = () => {
  return (
    <Layout >
      <HeroSection />
      <div id="about-section">
        <AboutUs />
      </div>
      <OurVission />
      <WhatWeDo />
      <div id="contact-section">
        <ContactUs />
      </div>
    </Layout>
  );
};

export default HomePage;
