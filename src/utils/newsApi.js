const API_KEY = "05a9592a2a9845d7a740d37c1088952b";

// Create a simple proxy function to avoid CORS
const proxyFetch = async (url) => {
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  const response = await fetch(proxyUrl);
  const data = await response.json();
  return {
    ok: response.ok,
    json: () => JSON.parse(data.contents)
  };
};

export const searchNews = async (query) => {
  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}&language=en&sortBy=publishedAt&pageSize=100`;
    const response = await proxyFetch(url);
    
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
