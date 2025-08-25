import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import SavedNews from './components/SavedNews/SavedNews'
import Footer from './components/Footer/Footer'
import SignInModal from './components/SignInModal/SignInModal'
import SignUpModal from './components/SignUpModal/SignUpModal'
import LoginModal from './components/LoginModal/LoginModal'
import AuthForm from './components/AuthForm/AuthForm'
import DeleteConfirmationModal from './components/DeleteConfirmationModal/DeleteConfirmationModal'
import { CurrentUserContext } from './contexts/CurrentUserContext'
import { checkToken } from './utils/auth'
import './App.css'

function App() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const openSignInModal = () => {
    setIsSignInModalOpen(true)
    setIsSignUpModalOpen(false)
    setIsLoginModalOpen(false)
  }

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true)
    setIsSignInModalOpen(false)
    setIsLoginModalOpen(false)
  }

  const openLoginModal = () => {
    setIsLoginModalOpen(true)
    setIsSignInModalOpen(false)
    setIsSignUpModalOpen(false)
  }

  const closeModals = () => {
    setIsSignInModalOpen(false)
    setIsSignUpModalOpen(false)
    setIsLoginModalOpen(false)
    setIsDeleteModalOpen(false)
    setItemToDelete(null)
  }

  const handleDeleteClick = (item) => {
    setItemToDelete(item)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = (item) => {
    // Handle delete logic here
    console.log('Deleting item:', item)
    closeModals()
  }

  const handleLoginSubmit = (token) => {
    checkToken(token)
      .then((user) => {
        setCurrentUser(user)
        setIsLoggedIn(true)
        closeModals()
      })
      .catch((err) => {
        console.error('Token validation failed:', err)
        localStorage.removeItem('jwt')
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Router>
          <Header 
            onSignInClick={openLoginModal}
            onSignUpClick={openSignUpModal}
            isLoggedIn={isLoggedIn}
          />
          <main className="content">
            <Routes>
              <Route path="/" element={<Main isLoggedIn={isLoggedIn} onDeleteClick={handleDeleteClick} />} />
              <Route path="/saved-news" element={<SavedNews isLoggedIn={isLoggedIn} onDeleteClick={handleDeleteClick} />} />
            </Routes>
          </main>
          <Footer />
          
          <SignInModal 
            isOpen={isSignInModalOpen}
            onClose={closeModals}
            onSwitchToSignUp={openSignUpModal}
          />
          
          <SignUpModal 
            isOpen={isSignUpModalOpen}
            onClose={closeModals}
            onSwitchToSignIn={openLoginModal}
          />
          
          <LoginModal 
            isOpen={isLoginModalOpen}
            onClose={closeModals}
            onSubmit={handleLoginSubmit}
            onRegisterClick={openSignUpModal}
          />
          
          <DeleteConfirmationModal 
            isOpen={isDeleteModalOpen}
            onClose={closeModals}
            onConfirm={handleDeleteConfirm}
            card={itemToDelete}
          />
        </Router>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
