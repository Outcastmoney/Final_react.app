const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://newsapi-proxy-server.vercel.app/api'
  : 'http://localhost:3001/api';

export const searchNews = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/news?q=${encodeURIComponent(query)}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status === 'error') {
      throw new Error(data.message);
    }
    
    return data;
  } catch (error) {
    console.error('News API error:', error);
    throw error;
  }
};
