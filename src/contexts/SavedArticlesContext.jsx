import React, { useState } from 'react';
import { SavedArticlesContext } from './SavedArticlesContext.js';

export const SavedArticlesProvider = ({ children }) => {
  const [savedArticles, setSavedArticles] = useState([]);

  const saveArticle = (article, keyword) => {
    const articleWithId = {
      ...article,
      id: article.url || `${article.title}_${Date.now()}`,
      keyword: keyword,
      savedAt: new Date().toISOString()
    };
    
    setSavedArticles(prev => {
      const exists = prev.find(saved => saved.url === article.url || saved.title === article.title);
      if (exists) return prev;
      return [...prev, articleWithId];
    });
  };

  const removeArticle = (article) => {
    setSavedArticles(prev => prev.filter(saved => 
      saved.url !== article.url && saved.title !== article.title
    ));
  };

  const isArticleSaved = (article) => {
    return savedArticles.some(saved => saved.url === article.url || saved.title === article.title);
  };

  const getUniqueKeywords = () => {
    const keywords = savedArticles.map(article => article.keyword).filter(Boolean);
    return [...new Set(keywords)];
  };

  const value = {
    savedArticles,
    saveArticle,
    removeArticle,
    isArticleSaved,
    getUniqueKeywords
  };

  return (
    <SavedArticlesContext.Provider value={value}>
      {children}
    </SavedArticlesContext.Provider>
  );
};
