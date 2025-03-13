import React from 'react';
import './Homepage.css';
import { IoArrowForwardOutline } from 'react-icons/io5'; // React icons

const Homepage = () => {
  const cardsData = [
    {
      buttonText: 'Online Courses',
      imageUrl: 'https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
    },
    {
      buttonText: 'Trending Technologies',
      imageUrl: 'https://images.unsplash.com/photo-1533903345306-15d1c30952de?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
    },
    {
      buttonText: 'Online Coaching',
      imageUrl: 'https://images.unsplash.com/photo-1545243424-0ce743321e11?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
    },
    {
      buttonText: 'Self Growth',
      imageUrl: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
    },
  ];

  return (
    <>
      {/* Hero Section (Unchanged) */}
      <section className="home">
        <div className="description">
          <h1 className="title">
            <span className="gradient-text">Grow Professionally</span> with the <span className="Bestname">Best</span>
          </h1>
          <p className="paragraph">
            In a world of endless opportunities, having the right guidance makes all the difference. We’re here to empower your journey. Unlock your potential with SecureVideo today.
          </p>
        </div>

        <div className="users-color-container">
          <span className="item" style={{ '--i': 1 }}></span>
          <img
            className="item"
            src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/274f29ce-0d3f-4ac2-a2aa-f9b7bd188b2a"
            style={{ '--i': 2 }}
            alt=""
          />
          <span className="item" style={{ '--i': 3 }}></span>
          <img
            className="item"
            src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/b8a14493-3d9f-4b9b-b93a-56d0bc7243e9"
            style={{ '--i': 4 }}
            alt=""
          />
          <img
            className="item"
            src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/03e51e1e-9750-45a5-b75e-a1e341d4562a"
            style={{ '--i': 10 }}
            alt=""
          />
          <span className="item" style={{ '--i': 11 }}></span>
          <img
            className="item"
            src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/5eb50f89-3e5a-480e-860c-8d40d3ba9ffe"
            style={{ '--i': 12 }}
            alt=""
          />
          <span className="item" style={{ '--i': 5 }}></span>
          <span className="item" style={{ '--i': 9 }}></span>
          <img
            className="item"
            src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/86c71a79-2efe-4567-8665-b1e5a1fd9735"
            style={{ '--i': 8 }}
            alt=""
          />
          <span className="item" style={{ '--i': 7 }}></span>
          <img
            className="item"
            src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/97ef9643-5202-41aa-80f0-ceeabccdd099"
            style={{ '--i': 6 }}
            alt=""
          />
        </div>
      </section>

      {/* Services Section */}
      <h2 className="section-title">Services We Offer</h2>
      <section className="services-section">
        {cardsData.map((card, index) => (
          <div className="service-card" key={index}>
            <div
              className="card-image"
              style={{ backgroundImage: `url(${card.imageUrl})` }}
            ></div>
            <div className="card-content">
              <h3>{card.buttonText}</h3>
              <div className="icon">
                <a href="#" className="iconBox">
                  <IoArrowForwardOutline className="arrow-icon" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>


    </>
  );
};

export default Homepage;