import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Vector1 from '../Images/freepik__background__89079.png';
import Vector2 from '../Images/freepik__adjust__58488.png';
import Footer from './Footer';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "aliceBlue" }}>
      {/* Hero Section */}
      <div className="upper_home">
        <div className="upper_home_inner">
          <h1 className="upper_heading">Stay Informed with Daily News</h1>
          <p className="upper_para">
            Your go-to source for the latest updates from around the world. From politics to technology, 
            we bring you accurate and timely news at your fingertips.
          </p>
          <p className="upper_quote">"News is the first rough draft of history." - Philip L. Graham</p>  
          <div className="home_upper_buttons">
            <button onClick={() => navigate('/news')}>Latest News</button>
            <button onClick={() => navigate('/upload')}>Start A Trial</button>
          </div>
        </div>  
      </div>

      {/* News Info Section */}
      <div className="home_news_main">
        <div className="news_side_vector">
          <img src={Vector1} alt="News Vector" />
        </div>
        <div className="news_side_text">
          <h1>Get the Latest News Instantly</h1>
          <p>
            Stay ahead with breaking news and insights from around the world. 
            Access <strong>global affairs, regional updates, technology, health, finance, and more.</strong>
          </p>
          <div className="news_button">
            <button onClick={() => navigate('/news')}>Go to News</button>
          </div>
        </div>
      </div>

      {/* Article Writing Section */}
      <div className="home_news_main reverse">
        <div className="news_side_vector">
          <img src={Vector2} alt="Upload Articles" />
        </div>
        <div className="news_side_text">
          <h1>Share Your Knowledge with the World</h1>
          <p>
            Express your thoughts and expertise by writing articles on a variety of topics, including:
          </p>
          <ul className="article_topics">
            <li>Current Affairs & Politics</li>
            <li>Science & Technology</li>
            <li>Health & Wellness</li>
            <li>Business & Finance</li>
            <li>Sports & Entertainment</li>
            <li>Education & Research</li>
          </ul>
          <p>
            Once published, your articles will be available for other users to read, engage with, and gain knowledge from. 
            Contribute today and make an impact!
          </p>
          <div className="news_button">
            <button onClick={() => navigate('/articles')}>Go to Articles</button>
            <button onClick={() => navigate('/upload')} style={{ marginLeft: "10px" }}>Upload +</button>
          </div>
        </div>
      </div>
     <Footer/>
    </div>
  );
}

export default Home;
