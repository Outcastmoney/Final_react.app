import { useState } from 'react'
import './NewsCard.css'

function NewsCard({ article, keyword }) {
  const [isSaved, setIsSaved] = useState(false)

  const handleSaveClick = () => {
    setIsSaved(!isSaved)
    // TODO: Implement actual save functionality
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className="news-card">
      <div className="news-card__image-container">
        <img 
          src={article.urlToImage || '/src/images/placeholder.jpg'} 
          alt={article.title}
          className="news-card__image"
        />
        <button 
          className={`news-card__save-button ${isSaved ? 'news-card__save-button_saved' : ''}`}
          onClick={handleSaveClick}
          aria-label={isSaved ? 'Remove from saved' : 'Save article'}
        >
          <svg className="news-card__save-icon" viewBox="0 0 24 24">
            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
          </svg>
        </button>
        {keyword && (
          <span className="news-card__keyword">{keyword}</span>
        )}
      </div>
      <div className="news-card__content">
        <time className="news-card__date">
          {formatDate(article.publishedAt)}
        </time>
        <h3 className="news-card__title">
          {article.title}
        </h3>
        <p className="news-card__description">
          {article.description}
        </p>
        <span className="news-card__source">
          {article.source?.name || 'Unknown Source'}
        </span>
      </div>
      <a 
        href={article.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="news-card__link"
        aria-label="Read full article"
      >
        <span className="visually-hidden">Read full article</span>
      </a>
    </article>
  )
}

export default NewsCard
