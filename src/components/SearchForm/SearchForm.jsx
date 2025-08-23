import { useState } from 'react'
import './SearchForm.css'

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!keyword.trim()) {
      setError('Please enter a keyword')
      return
    }
    
    setError('')
    onSearch(keyword.trim())
  }

  const handleInputChange = (e) => {
    setKeyword(e.target.value)
    if (error) {
      setError('')
    }
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__input-container">
        <input
          type="text"
          className={`search-form__input ${error ? 'search-form__input_error' : ''}`}
          placeholder="Enter topic"
          value={keyword}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="search-form__button">
          Search
        </button>
      </div>
      {error && <span className="search-form__error">{error}</span>}
    </form>
  )
}

export default SearchForm
