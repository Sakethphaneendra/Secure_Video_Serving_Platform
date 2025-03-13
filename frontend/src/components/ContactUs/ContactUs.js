import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="container">
      {/* Contact Form Section */}
      <div className="contact-form">
        <h2>Get in Touch</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" placeholder="Enter your phone number" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select id="subject">
              <option value="">Select Subject</option>
              <option value="bugs">Bugs</option>
              <option value="support">Requesting Support</option>
              <option value="review">Review</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="Enter your message"></textarea>
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>

      {/* Google Maps Section */}
   

      {/* Team Members Section */}
      <div className="team-section">
        <div className="team-header">
          <h3>Project Members</h3>
          <h2>👋 Let's Meet Our Team</h2>
        </div>
        <div className="team-members">
          <div className="team-member">
            <h3>Iron Man</h3>
            <p>Rollno: 21</p>
            <p>Ironman@gmail.com</p>
          </div>
          <div className="team-member">
            <h3>Spdier Man</h3>
            <p>Rollno: 22</p>
            <p>spidy@gmail.com</p>
          </div>
          
          {/* Add more team members here */}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;