import { useSavedArticles } from '../../hooks/useSavedArticles'
import './SavedNewsCard.css'
import trashIcon from '../../images/trash.png'

function SavedNewsCard({ article, keyword }) {
  const { removeArticle } = useSavedArticles()

  const handleDeleteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    removeArticle(article)
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
    <article className="saved-news-card">
      <div className="saved-news-card__image-container">
        <img
          src={article.urlToImage || "/src/images/placeholder.jpg"}
          alt={article.title}
          className="saved-news-card__image"
        />
        <div className="saved-news-card__delete-container">
          <button 
            className="saved-news-card__delete-button"
            onClick={handleDeleteClick}
            aria-label="Delete article"
          >
            <img 
              src={trashIcon}
              alt="Delete"
              className="saved-news-card__delete-icon"
            />
          </button>
          <div className="saved-news-card__delete-tooltip">
            <span className="saved-news-card__delete-text">
              Remove from saved
            </span>
          </div>
        </div>
        {keyword && (
          <div className="saved-news-card__title-overlay">
            <span className="saved-news-card__title-text">
              {keyword}
            </span>
          </div>
        )}
      </div>
      <div className="saved-news-card__content">
        <time className="saved-news-card__date">
          {formatDate(article.publishedAt)}
        </time>
        <h3 className="saved-news-card__title">
          {article.title}
        </h3>
        <span className="saved-news-card__source">
          {article.source?.name || 'Unknown Source'}
        </span>
      </div>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="saved-news-card__link"
        aria-label="Read full article"
      >
        <span className="visually-hidden">Read full article</span>
      </a>
    </article>
  );
}

export default SavedNewsCard
