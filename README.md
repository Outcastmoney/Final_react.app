# News Explorer

A responsive news application that allows users to search for articles and save them for later reading. Built with React and powered by the NewsAPI.

## Live Demo

🚀 **[View Live Application](https://your-deployed-app-url.netlify.app)** *(Update this link after deployment)*

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
- **Netlify** - Deployment platform

## Features

- 🔍 Search for news articles by keyword
- 💾 Save articles for later reading
- 📱 Fully responsive design (320px+)
- 🎨 Modern UI with hover effects
- ⚡ Fast loading with optimized images
- 🔗 External links open in new tabs

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

The application uses NewsAPI for fetching news articles. The API key is configured in the application constants.
