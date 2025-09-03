import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import SavedNews from "./components/SavedNews/SavedNews";
import Footer from "./components/Footer/Footer";
import SignInModal from "./components/SignInModal/SignInModal";
import SignUpModal from "./components/SignUpModal/SignUpModal";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal/DeleteConfirmationModal";
import SuccessModal from "./components/SuccessModal/SuccessModal";
import AvatarModal from "./components/AvatarModal/AvatarModal";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import { SavedArticlesProvider } from "./contexts/SavedArticlesContext.jsx";
import { checkToken } from "./utils/auth";
import "./App.css";

function App() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
          // Load user-specific avatar after successful login
          const userAvatarKey = `userAvatar_${user.id || user.email}`;
          const savedAvatar = localStorage.getItem(userAvatarKey);
          if (savedAvatar) {
            setUserAvatar(savedAvatar);
          }
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
    setIsSignInModalOpen(false);
  };

  const openSignInModal = () => {
    setIsSignInModalOpen(true);
    setIsSignUpModalOpen(false);
    setIsSuccessModalOpen(false);
  };

  const openSuccessModal = () => {
    setIsSuccessModalOpen(true);
    setIsSignUpModalOpen(false);
    setIsSignInModalOpen(false);
  };

  const closeModals = () => {
    setIsSignInModalOpen(false);
    setIsSignUpModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsSuccessModalOpen(false);
    setIsAvatarModalOpen(false);
    setItemToDelete(null);
  };

  const openAvatarModal = () => {
    setIsAvatarModalOpen(true);
  };

  const handleAvatarSave = (imageUrl) => {
    setUserAvatar(imageUrl);
    if (currentUser) {
      const userAvatarKey = `userAvatar_${currentUser.id || currentUser.email}`;
      localStorage.setItem(userAvatarKey, imageUrl);
    }
  };

  const handleAvatarDelete = () => {
    setUserAvatar("");
    if (currentUser) {
      const userAvatarKey = `userAvatar_${currentUser.id || currentUser.email}`;
      localStorage.removeItem(userAvatarKey);
    }
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = (item) => {
    // Handle delete logic here
    console.log("Deleting item:", item);
    closeModals();
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    setUserAvatar(""); // Clear avatar from state when signing out
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SavedArticlesProvider>
        <div className="page">
          <Router>
            <Header
              onSignInClick={openSignInModal}
              onSignUpClick={openSignUpModal}
              onLogout={handleLogout}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />
            <main className="content">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      isLoggedIn={isLoggedIn}
                      onDeleteClick={handleDeleteClick}
                      userAvatar={userAvatar}
                      onAvatarClick={openAvatarModal}
                      currentUser={currentUser}
                    />
                  }
                />
                <Route
                  path="/saved-news"
                  element={
                    <SavedNews
                      isLoggedIn={isLoggedIn}
                      onDeleteClick={handleDeleteClick}
                    />
                  }
                />
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
              onSwitchToSignIn={openSignInModal}
              onSuccess={openSuccessModal}
            />

            <DeleteConfirmationModal
              isOpen={isDeleteModalOpen}
              onClose={closeModals}
              onConfirm={handleDeleteConfirm}
              item={itemToDelete}
            />

            <SuccessModal
              isOpen={isSuccessModalOpen}
              onClose={closeModals}
              onSignInClick={openSignInModal}
            />

            <AvatarModal
              isOpen={isAvatarModalOpen}
              onClose={closeModals}
              onSave={handleAvatarSave}
              onDelete={handleAvatarDelete}
              currentAvatar={userAvatar}
            />
          </Router>
        </div>
      </SavedArticlesProvider>
    </CurrentUserContext.Provider>
  );
}

export default App;
