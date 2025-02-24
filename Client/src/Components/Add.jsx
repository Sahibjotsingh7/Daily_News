import React, { useState, useEffect } from "react";

const AdComponent = () => {
  const [ad, setAd] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const randomnumber = Math.floor(Math.random() * (100 - 10 + 1) + 10);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${randomnumber}`) // Example API
      .then((response) => response.json())
      .then((data) => {
        setAd({
          image: data.thumbnail, // Using product image as ad
          url: "https://example.com", // Sample URL
        });
      })
      .catch((error) => console.error("Error fetching ad:", error));
  }, []);

  // Close ad function
  const closeAd = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null; // Hide ad when closed

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "10px",
        border: "solid black 2px",
        position: "relative",
        width: "320px",
        padding: "10px",
        display: "inline-block",
        background:"aliceblue"
      }}
    >
      {/* Close Button */}
      <button
        onClick={closeAd}
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          background: "gray",
          color: "white",
          border: "none",
          padding : "5px",
          cursor: "pointer",
          fontSize: "16px",
          borderRadius:"5px",
        }}
      >
       Close ad &times;
      </button>

      {ad ? (
        <a href={ad.url} target="_blank" rel="noopener noreferrer">
          <img
            src={ad.image}
            alt="Advertisement"
            style={{
              width: "300px",
              height: "100px",
            }}
          />
        </a>
      ) : (
        <p>Loading ad...</p>
      )}
    </div>
  );
};

export default AdComponent;
