const API_KEY = '05a9592a2a9845d7a740d37c1088952b';
const BASE_URL = 'https://newsapi.org/v2';

export const searchNews = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}&pageSize=100&sortBy=publishedAt`
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
