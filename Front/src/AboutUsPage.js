import React from 'react';
import AboutUs from './AboutUs'; // Import your individual components
import OurVission from './OurVission';
import WhatWeDo from './WhatWeDo';
import BackgroundSection from './BackgroundSection';

const AboutUsPage = () => {
  return (
    <div>
      <section id="background-section">
        <BackgroundSection />
      </section>
      <section id="about-us">
        <AboutUs />
      </section>
      <section id="our-vision">
        <OurVission />
      </section>
      <section id="what-we-do">
        <WhatWeDo />
      </section>

    </div>
  );
};

export default AboutUsPage;
