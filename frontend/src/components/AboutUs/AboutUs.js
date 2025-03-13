import React from 'react';
import './AboutUs.css'; // Import the CSS file

const AboutUs = () => {
  return (
    <div className="about-us">
      <h1 className="about-us-title">About Us</h1>
      <p className="about-us-description">
        Welcome to our platform, where learning meets innovation. We are dedicated to providing high-quality courses and videos designed to help you achieve your personal and professional goals. Whether you're looking to upskill, explore new interests, or stay ahead in your career, our platform offers a wide range of content curated by industry experts.
      </p>
      <p className="about-us-description">
        Our mission is to make learning accessible, engaging, and enjoyable for everyone. We believe that education should be a journey of discovery, and we strive to create an environment where learners of all backgrounds can thrive. With a focus on quality, security, and user experience, we are committed to delivering the best possible learning experience.
      </p>
      <p className="about-us-description">
        Join our growing community of learners and take the first step toward achieving your dreams. With our secure video platform, you can stream high-quality content anytime, anywhere, and on any device. Let us help you unlock your full potential.
      </p>

      <div className="about-us-features">
        <h2 className="features-title">Why Choose Us?</h2>
        <ul className="features-list">
          <li><strong>Secure & Reliable:</strong> Our platform uses advanced encryption to ensure your data and content are always protected.</li>
          <li><strong>Expert-Curated Content:</strong> Access courses and videos created by industry leaders and experts.</li>
          <li><strong>User-Friendly Interface:</strong> Enjoy a seamless learning experience with our intuitive and easy-to-navigate platform.</li>
          <li><strong>Multi-Device Access:</strong> Learn on the go with support for all devices, including smartphones, tablets, and desktops.</li>
          <li><strong>Affordable & Flexible:</strong> Choose from a variety of subscription plans to suit your budget and learning needs.</li>
        </ul>
      </div>

   
    </div>
  );
};

export default AboutUs;