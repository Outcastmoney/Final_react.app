import React, { createContext, useContext, useState } from 'react';

const SavedArticlesContext = createContext();

export const useSavedArticles = () => {
  const context = useContext(SavedArticlesContext);
  if (!context) {
    throw new Error('useSavedArticles must be used within a SavedArticlesProvider');
  }
  return context;
};

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
    const articleId = article.url || article.title;
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
