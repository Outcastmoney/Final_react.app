import './About.css'

function About({ userAvatar, onAvatarClick, isLoggedIn }) {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__content">
          <div className="about__image">
            {isLoggedIn ? (
              <button
                className="about__avatar-button"
                onClick={onAvatarClick}
                type="button"
              >
                <img 
                  src={userAvatar || "/src/images/placeholder.png"}
                  alt="Author" 
                  className="about__author-photo"
                  onError={(e) => {
                    e.target.src = "/src/images/placeholder.png";
                  }}
                />
              </button>
            ) : (
              <img 
                src="/src/images/placeholder.png"
                alt="Author" 
                className="about__author-photo"
              />
            )}
          </div>
          <div className="about__text">
            <h2 className="about__title">About the author</h2>
            <p className="about__description">
              This project is a news aggregator that allows users to search for articles on any topic and save them to their personal collection. Built with React and modern web technologies, it provides a clean and intuitive interface for discovering and organizing news content.
            </p>
            <p className="about__description">
              The application demonstrates responsive design principles, semantic HTML structure, and follows BEM methodology for CSS organization. It integrates with news APIs to provide real-time content and includes features like article saving, search functionality, and mobile-optimized layouts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About
