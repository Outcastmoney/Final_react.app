import { useState } from 'react'
import NewsCard from '../NewsCard/NewsCard'
import Preloader from '../Preloader/Preloader'
import './NewsCardsList.css'

function NewsCardsList({ articles, isLoading, keyword }) {
  const [visibleCards, setVisibleCards] = useState(3)

  const showMoreCards = () => {
    setVisibleCards(prev => prev + 3)
  }

  if (isLoading) {
    return <Preloader />
  }

  if (articles.length === 0) {
    return (
      <section className="news-cards">
        <div className="news-cards__container">
          <div className="news-cards__not-found">
            <div className="news-cards__not-found-icon"></div>
            <h3 className="news-cards__not-found-title">Nothing found</h3>
            <p className="news-cards__not-found-text">
              Sorry, but nothing matched your search terms.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="news-cards">
      <div className="news-cards__container">
        <h2 className="news-cards__title">Search results</h2>
        <div className="news-cards__list">
          {articles.slice(0, visibleCards).map((article, index) => (
            <NewsCard 
              key={`${article.url}-${index}`} 
              article={article} 
              keyword={keyword}
            />
          ))}
        </div>
        {visibleCards < articles.length && (
          <button 
            className="news-cards__show-more" 
            onClick={showMoreCards}
          >
            Show more
          </button>
        )}
      </div>
    </section>
  )
}

export default NewsCardsList
