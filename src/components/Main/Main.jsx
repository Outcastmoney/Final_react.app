import { useState } from 'react'
import SearchForm from '../SearchForm/SearchForm'
import NewsCardsList from '../NewsCardsList/NewsCardsList'
import About from '../About/About'
import { searchNews } from '../../utils/newsApi'
import './Main.css'

function Main({ isLoggedIn }) {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [keyword, setKeyword] = useState('')

  const handleSearch = async (searchKeyword) => {
    setIsLoading(true)
    setSearchPerformed(true)
    setKeyword(searchKeyword)
    
    try {
      const data = await searchNews(searchKeyword)
      setArticles(data.articles || [])
    } catch (error) {
      console.error('Error fetching news:', error)
      setArticles([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="main">
      <section className="search">
        <div className="search__container">
          <h1 className="search__title">What's going on in the world?</h1>
          <p className="search__subtitle">
            Find the latest news on any topic and save them in your personal account.
          </p>
          <SearchForm onSearch={handleSearch} />
        </div>
      </section>
      
      {searchPerformed && (
        <NewsCardsList 
          articles={articles} 
          isLoading={isLoading} 
          keyword={keyword}
          isLoggedIn={isLoggedIn}
        />
      )}
      
      <About />
    </div>
  )
}

export default Main
