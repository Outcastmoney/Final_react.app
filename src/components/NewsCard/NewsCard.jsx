import { useSavedArticles } from '../../hooks/useSavedArticles'
import './NewsCard.css'
import saveIcon from '../../images/save.png'
import savedIcon from '../../images/saved.png'

function NewsCard({ article, keyword, isLoggedIn }) {
  const { saveArticle, removeArticle, isArticleSaved } = useSavedArticles()
  const isSaved = isArticleSaved(article)

  const handleBookmarkClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!isLoggedIn) {
      return // Do nothing if not logged in
    }
    
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
        <div className="news-card__bookmark-container">
          <button 
            className={`news-card__bookmark-button ${isSaved ? 'news-card__bookmark-button_saved' : ''} ${!isLoggedIn ? 'news-card__bookmark-button_disabled' : ''}`}
            onClick={handleBookmarkClick}
            disabled={!isLoggedIn}
            aria-label={!isLoggedIn ? 'Sign in to save' : (isSaved ? 'Remove bookmark' : 'Bookmark article')}
          >
            <img 
              src={isSaved ? savedIcon : saveIcon}
              alt={isSaved ? 'Saved' : 'Save'}
              className="news-card__bookmark-icon"
            />
          </button>
          {!isLoggedIn && (
            <div className="news-card__sign-in-tooltip">
              <span className="news-card__sign-in-text">
                Sign in to save
              </span>
            </div>
          )}
        </div>
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
