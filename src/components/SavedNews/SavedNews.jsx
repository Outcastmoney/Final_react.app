import './SavedNews.css'

function SavedNews() {
  // TODO: Implement saved articles functionality
  const savedArticles = []

  return (
    <div className="saved-news">
      <section className="saved-news__header">
        <div className="saved-news__container">
          <p className="saved-news__subtitle">Saved articles</p>
          <h1 className="saved-news__title">
            {savedArticles.length > 0 
              ? `You have ${savedArticles.length} saved article${savedArticles.length === 1 ? '' : 's'}`
              : 'You have no saved articles yet'
            }
          </h1>
          {savedArticles.length > 0 && (
            <p className="saved-news__keywords">
              By keywords: <span className="saved-news__keywords-list">nature, travel, music</span>
            </p>
          )}
        </div>
      </section>
      
      {savedArticles.length === 0 ? (
        <section className="saved-news__empty">
          <div className="saved-news__container">
            <div className="saved-news__empty-content">
              <h2 className="saved-news__empty-title">No saved articles yet</h2>
              <p className="saved-news__empty-text">
                Start exploring news and save articles that interest you!
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="saved-news__articles">
          <div className="saved-news__container">
            <div className="saved-news__articles-list">
              {/* Saved articles will be rendered here */}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default SavedNews
