import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import SavedNews from './components/SavedNews/SavedNews'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
  return (
    <div className="page">
      <Router>
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/saved-news" element={<SavedNews />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
