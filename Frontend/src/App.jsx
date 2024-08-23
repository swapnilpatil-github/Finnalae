import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNews, setFilteredNews] = useState([]);

  // Fetch news from the backend API
  const fetchNews = async (query = '') => {
    try {
      // Replace 'http://localhost:5000' with your deployed backend link
      const response = await axios.get('https://finnalae.vercel.app/api/news/', {
        params: {
          q: query
        }
      });
      setNews(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  // Effect to fetch news on component mount or when searchTerm changes
  useEffect(() => {
    fetchNews(searchTerm);
  }, [searchTerm]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchNews(searchTerm);
  };

  return (
    <div className="App">
      <h1>News App</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for news..."
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {news.length > 0 ? (
          news.map((article, index) => (
            <li key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
              <p>{article.description}</p>
            </li>
          ))
        ) : (
          <li>No news articles found.</li>
        )}
      </ul>
    </div>
  );
}

export default App;
