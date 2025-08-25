import { useSavedArticles } from '../../contexts/SavedArticlesContext'
import './NewsCard.css'

function NewsCard({ article, keyword }) {
  const { saveArticle, removeArticle, isArticleSaved } = useSavedArticles()
  const isSaved = isArticleSaved(article)

  const handleBookmarkClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isSaved) {
      removeArticle(article)
    } else {
      saveArticle(article, keyword)
    }
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
          src={article.urlToImage || "/src/images/placeholder.jpg"}
          alt={article.title}
          className="news-card__image"
        />
        <button 
          className={`news-card__bookmark-button ${isSaved ? 'news-card__bookmark-button_saved' : ''}`}
          onClick={handleBookmarkClick}
          aria-label={isSaved ? 'Remove bookmark' : 'Bookmark article'}
        >
          <svg className="news-card__bookmark-icon" viewBox="0 0 24 24">
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
  );
}

export default NewsCard
