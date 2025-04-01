import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaVolumeUp, FaPause } from "react-icons/fa";
import '../App.css';

const LostFound = () => {
  const [file, setFile] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: '', description: '', whereFound: '', whenFound: '',
  });
  const [uploaderDetails, setUploaderDetails] = useState({
    name: '', mobile: '',
  });
  const [message, setMessage] = useState('');
  const [lostItems, setLostItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [playingStates, setPlayingStates] = useState({});
  const [activeSection, setActiveSection] = useState('found'); // New state for navigation

  useEffect(() => {
    fetchLostItems();
  }, []);

  const fetchLostItems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/lost&found/lost');
      setLostItems(response.data);
    } catch (error) {
      console.error('Error fetching lost items:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !productDetails.name || !uploaderDetails.name || !uploaderDetails.mobile || 
        !productDetails.whereFound || !productDetails.whenFound) {
      setMessage('Please fill all required fields and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('media', file);
    formData.append('productName', productDetails.name);
    formData.append('description', productDetails.description);
    formData.append('whereFound', productDetails.whereFound);
    formData.append('whenFound', productDetails.whenFound);
    formData.append('uploaderName', uploaderDetails.name);
    formData.append('mobile', uploaderDetails.mobile);

    try {
      const response = await axios.post('http://localhost:8080/api/lost&found/found', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(response.data.message);
      setFile(null);
      setProductDetails({ name: '', description: '', whereFound: '', whenFound: '' });
      setUploaderDetails({ name: '', mobile: '' });
      fetchLostItems();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Upload failed.');
    }
  };

  const toggleAudio = (itemId, text) => {
    const isPlaying = playingStates[itemId];
    if (!isPlaying) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US";
      speech.rate = 1;
      speech.pitch = 1;
      speech.onend = () => setPlayingStates(prev => ({ ...prev, [itemId]: false }));
      window.speechSynthesis.speak(speech);
      setPlayingStates(prev => ({ ...prev, [itemId]: true }));
    } else {
      window.speechSynthesis.pause();
      setPlayingStates(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const filteredItems = lostItems.filter(item =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.whereFound.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lf-container">
      <div className="lf-nav-buttons">
        <button 
          className={`lf-nav-btn ${activeSection === 'lost' ? 'active' : ''}`}
          onClick={() => setActiveSection('lost')}
        >
          Lost Something?
        </button>
        <button 
          className={`lf-nav-btn ${activeSection === 'found' ? 'active' : ''}`}
          onClick={() => setActiveSection('found')}
        >
          Found Something?
        </button>
      </div>

      {activeSection === 'found' && (
        <section className="lf-section">
          <h2 className="lf-title">Report a Found Item</h2>
          <form className="lf-form" onSubmit={handleSubmit}>
            <input type="file" accept="image/jpeg,image/png,video/mp4,video/webm" onChange={handleFileChange} />
            <input type="text" placeholder="Product Name *" value={productDetails.name} onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })} required />
            <textarea placeholder="Product Description" value={productDetails.description} onChange={(e) => setProductDetails({ ...productDetails, description: e.target.value })} />
            <input type="text" placeholder="Where Found *" value={productDetails.whereFound} onChange={(e) => setProductDetails({ ...productDetails, whereFound: e.target.value })} required />
            <input type="datetime-local" value={productDetails.whenFound} onChange={(e) => setProductDetails({ ...productDetails, whenFound: e.target.value })} required />
            <input type="text" placeholder="Your Name *" value={uploaderDetails.name} onChange={(e) => setUploaderDetails({ ...uploaderDetails, name: e.target.value })} required />
            <input type="tel" placeholder="Mobile Number *" value={uploaderDetails.mobile} onChange={(e) => setUploaderDetails({ ...uploaderDetails, mobile: e.target.value })} required />
            <button type="submit" disabled={!file}>Upload Found Item</button>
            {message && <p className="lf-message">{message}</p>}
          </form>
        </section>
      )}

      {activeSection === 'lost' && (
        <section className="lf-section">
          <h2 className="lf-title">Lost Items</h2>
          <input
            type="text"
            className="lf-search"
            placeholder="Search lost items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredItems.length === 0 ? (
            <p className="lf-no-items">No lost items found.</p>
          ) : (
            <div className="lf-items-grid">
              {filteredItems.map(item => (
                <div key={item._id} className="lf-item-card">
                  
                  {item.mediaUrl.includes('.mp4') || item.mediaUrl.includes('.webm') ? (
                    <video src={item.mediaUrl} controls className="lf-media" />
                  ) : (
                    <img src={item.mediaUrl} alt={item.productName} className="lf-media" />
                  )}
                  <div className="lf-item-details">
                    <h3>{item.productName}</h3>
                    <p><strong>Description:</strong> {item.description || 'N/A'}</p>
                    <p><strong>Where Found:</strong> {item.whereFound}</p>
                    <p><strong>When Found:</strong> {new Date(item.whenFound).toLocaleString()}</p>
                    <p><strong>Found by:</strong> {item.uploaderName}</p>
                    <p><strong>Mobile:</strong> {item.mobile}</p>
                    <p><strong>Uploaded:</strong> {new Date(item.time).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default LostFound;