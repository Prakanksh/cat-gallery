import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCats = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search?limit=9&api_key=${process.env.REACT_APP_CAT_API_KEY}`
      );
      setCats(response.data);
    } catch (error) {
      console.error('Error fetching cat images:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div>
      <h2>Cat Gallery</h2>
      {loading && <p>Loading...</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {cats.map((cat) => (
          <img key={cat.id} src={cat.url} alt="cat" width="100%" />
        ))}
      </div>
      <button onClick={fetchCats} style={{ marginTop: '10px' }}>
        Load More
      </button>
    </div>
  );
};

export default Gallery;
