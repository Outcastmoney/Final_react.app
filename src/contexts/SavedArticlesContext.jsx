import React, { useState, useEffect, useContext } from "react";
import { SavedArticlesContext } from "./SavedArticlesContext.js";
import { CurrentUserContext } from "./CurrentUserContext.js";

export const SavedArticlesProvider = ({ children }) => {
  const currentUser = useContext(CurrentUserContext);
  const [savedArticles, setSavedArticles] = useState([]);

  // Load user-specific saved articles when user changes
  useEffect(() => {
    if (currentUser) {
      const userSavedKey = `savedArticles_${
        currentUser.id || currentUser.email
      }`;
      const saved = localStorage.getItem(userSavedKey);
      setSavedArticles(saved ? JSON.parse(saved) : []);
    } else {
      setSavedArticles([]); // Clear articles when signed out
    }
  }, [currentUser]);

  // Save to localStorage whenever savedArticles changes (only if user is signed in)
  useEffect(() => {
    if (currentUser) {
      const userSavedKey = `savedArticles_${
        currentUser.id || currentUser.email
      }`;
      localStorage.setItem(userSavedKey, JSON.stringify(savedArticles));
    }
  }, [savedArticles, currentUser]);

  const saveArticle = (article, keyword) => {
    const articleWithId = {
      ...article,
      id: article.url || `${article.title}_${Date.now()}`,
      keyword: keyword,
      savedAt: new Date().toISOString(),
    };

    setSavedArticles((prev) => {
      const exists = prev.find(
        (saved) => saved.url === article.url || saved.title === article.title
      );
      if (exists) return prev;
      return [...prev, articleWithId];
    });
  };

  const removeArticle = (article) => {
    setSavedArticles((prev) =>
      prev.filter(
        (saved) => saved.url !== article.url && saved.title !== article.title
      )
    );
  };

  const isArticleSaved = (article) => {
    return savedArticles.some(
      (saved) => saved.url === article.url || saved.title === article.title
    );
  };

  const getUniqueKeywords = () => {
    const keywords = savedArticles
      .map((article) => article.keyword)
      .filter(Boolean);
    return [...new Set(keywords)];
  };

  const value = {
    savedArticles,
    saveArticle,
    removeArticle,
    isArticleSaved,
    getUniqueKeywords,
  };

  return (
    <SavedArticlesContext.Provider value={value}>
      {children}
    </SavedArticlesContext.Provider>
  );
};
