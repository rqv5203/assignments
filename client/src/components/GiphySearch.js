import React, { useState } from 'react';
import axios from 'axios';
import './GiphySearch.css';

const GiphySearch = () => {
  const [search, setSearch] = useState('');
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //const GIPHY_API_KEY = process.env.REACT_APP_GIPHY_KEY;
  //console.log('Giphy API Key:', GIPHY_API_KEY);
  const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/search';

  const searchGifs = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(GIPHY_API_URL, {
        params: {
          api_key: process.env.REACT_APP_GIPHY_KEY,
          q: search,
          limit: 20,
          rating: 'g'
        }
      });

      setGifs(response.data.data);
    } catch (err) {
      setError('Failed to fetch GIFs. Please try again.');
      console.error('Error fetching GIFs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="giphy-search">
      <form onSubmit={searchGifs} className="search-form">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for GIFs..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="gif-grid">
          {gifs.map((gif) => (
            <div key={gif.id} className="gif-item">
              <img
                src={gif.images.fixed_height.url}
                alt={gif.title}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GiphySearch; 