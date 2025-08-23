import './Preloader.css'

function Preloader() {
  return (
    <section className="preloader">
      <div className="preloader__container">
        <div className="preloader__spinner">
          <div className="preloader__circle"></div>
        </div>
        <p className="preloader__text">Searching for news...</p>
      </div>
    </section>
  )
}

export default Preloader
