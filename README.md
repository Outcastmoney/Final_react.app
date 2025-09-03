# News Explorer

A modern, responsive news application that allows users to search for articles, save them for later reading, and manage their personal news collection. Built with React and powered by the NewsAPI.

## Live Demo

🚀 **[View Live Application](https://final-react-app-mocha.vercel.app)**

## Project Overview

News Explorer is a Stage 1 frontend project featuring:
- **Modern React Architecture** - Built with React 19, hooks, and context API
- **User Authentication** - Sign up, sign in, and user profile management
- **News Search & Discovery** - Real-time news search with NewsAPI integration
- **Personal News Collection** - Save and manage favorite articles
- **Responsive Design** - Optimized for all devices (320px+)
- **Professional UI/UX** - Clean, modern interface with smooth interactions

### Quick Deployment Guide

**Option 1: Netlify Drag & Drop**
1. Build the project: `npm run build`
2. Go to [netlify.com](https://netlify.com) and create account
3. Click "Add new site" → "Deploy manually"
4. Drag the `dist/` folder to deploy
5. Update the live demo link above with your new URL

**Option 2: GitHub + Netlify (Recommended)**
1. Push code to GitHub repository
2. Connect GitHub repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

## Technologies Used

- **React 19** - Frontend framework
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and development server
- **CSS3** - Styling with BEM methodology
- **NewsAPI** - External news data source
- **Vercel** - Deployment platform

## Key Features

### Core Functionality
- 🔍 **News Search** - Search articles by keyword with real-time results
- 💾 **Save Articles** - Bookmark articles to your personal collection
- 👤 **User Authentication** - Secure sign up/sign in system
- 📰 **Saved News Page** - Dedicated page to manage saved articles
- 🗑️ **Article Management** - Delete articles from saved collection

### Technical Features
- 📱 **Fully Responsive** - Works on all devices (320px minimum width)
- 🎨 **Modern UI/UX** - Clean design with smooth hover effects
- ⚡ **Fast Performance** - Optimized loading and image handling
- 🔗 **External Navigation** - Article links open in new tabs
- 🛡️ **Error Handling** - Graceful error states and user feedback
- 📊 **Form Validation** - Real-time input validation and error messages

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd react.app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deployment

This project is configured for deployment on Netlify:

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to Netlify
3. Configure redirects for single-page application routing

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── assets/             # Images and static files
└── fonts/              # Custom font files
```

## API Configuration

The application uses NewsAPI for fetching news articles with CORS proxy support for production deployment. The API integration includes:

- **NewsAPI Integration** - Real-time news data from newsapi.org
- **CORS Handling** - Proxy solution for production deployment
- **Error Management** - Graceful handling of API failures
- **Rate Limiting** - Optimized API usage

## Stage 1 Requirements Compliance

✅ **Pull Request Submission** - Ready for PR submission  
✅ **No Build/Runtime Errors** - Clean production build  
✅ **Working News API** - Functional news search and display  
✅ **Saved News Route** - `/saved-news` accessible and functional  
✅ **Remote Deployment** - Deployed to Vercel at production URL  
✅ **Responsive Design** - 320px+ with no horizontal scroll  
✅ **BEM Methodology** - Consistent CSS naming conventions  
✅ **Semantic HTML** - Proper DOM structure throughout  
✅ **Modern Layout** - Flexbox and Grid implementations  
✅ **Vite Setup** - Modern build tooling  
✅ **Interactive Features** - Popup modals and form validation  
✅ **JSX Implementation** - React component architecture  
✅ **Project Structure** - Organized folders (components/, images/, fonts/)  
✅ **Custom Fonts** - @font-face implementations  
✅ **SVG Icons** - Scalable vector graphics  
✅ **Form Validation** - Real-time validation with focus states

## Production Deployment

The application is deployed and accessible at: **https://final-react-app-mocha.vercel.app**

### Deployment Features
- **Automatic Builds** - Connected to GitHub for CI/CD
- **HTTPS Security** - Secure connection with SSL
- **Global CDN** - Fast loading worldwide
- **Custom Domain Ready** - Easy domain configuration
