import { useContext } from 'react';
import { SavedArticlesContext } from '../contexts/SavedArticlesContext.js';

export const useSavedArticles = () => {
  const context = useContext(SavedArticlesContext);
  if (!context) {
    throw new Error('useSavedArticles must be used within a SavedArticlesProvider');
  }
  return context;
};
