import { useState } from 'react'
import './AvatarModal.css'

function AvatarModal({ isOpen, onClose, onSave, onDelete, currentAvatar }) {
  const [imageUrl, setImageUrl] = useState(currentAvatar || '')
  const [previewUrl, setPreviewUrl] = useState(currentAvatar || '')
  const [isValidUrl, setIsValidUrl] = useState(true)

  const validateImageUrl = (url) => {
    if (!url) return false
    try {
      new URL(url)
      return /\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?.*)?$/i.test(url) || url.includes('http')
    } catch {
      return false
    }
  }

  const handleUrlChange = (e) => {
    const url = e.target.value
    setImageUrl(url)
    
    if (url && validateImageUrl(url)) {
      setPreviewUrl(url)
      setIsValidUrl(true)
    } else {
      setPreviewUrl('')
      setIsValidUrl(url === '' || validateImageUrl(url))
    }
  }

  const handleImageError = () => {
    setIsValidUrl(false)
    setPreviewUrl('')
  }

  const handleImageLoad = () => {
    setIsValidUrl(true)
  }

  const handleSave = () => {
    if (imageUrl && isValidUrl) {
      onSave(imageUrl)
      onClose()
    }
  }

  const handleDelete = () => {
    onDelete()
    onClose()
  }

  const handleClose = () => {
    setImageUrl(currentAvatar || '')
    setPreviewUrl(currentAvatar || '')
    setIsValidUrl(true)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal modal_opened">
      <div className="modal__container avatar-modal">
        <button 
          className="modal__close" 
          type="button" 
          onClick={handleClose}
        />
        <h3 className="modal__title">Update Avatar</h3>
        <form className="modal__form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <label className="modal__label">
            Image URL
            <input
              className={`modal__input ${!isValidUrl ? 'modal__input_type_error' : ''}`}
              type="url"
              name="imageUrl"
              placeholder="Enter image URL (http://... or https://...)"
              value={imageUrl}
              onChange={handleUrlChange}
              required
            />
            {!isValidUrl && (
              <span className="modal__error">Please enter a valid image URL</span>
            )}
          </label>
          
          {previewUrl && isValidUrl && (
            <div className="avatar-modal__preview">
              <p className="avatar-modal__preview-label">Preview:</p>
              <img
                src={previewUrl}
                alt="Avatar preview"
                className="avatar-modal__preview-image"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
            </div>
          )}
          
          <div className="modal__buttons">
            <button
              className={`modal__submit ${!imageUrl || !isValidUrl ? 'modal__submit_disabled' : ''}`}
              type="submit"
              disabled={!imageUrl || !isValidUrl}
            >
              Save
            </button>
            {currentAvatar && (
              <button
                className="modal__delete"
                type="button"
                onClick={handleDelete}
              >
                Delete Avatar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AvatarModal
