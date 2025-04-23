import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import NewsDetailPage from './pages/NewsDetailPage';
import StockNewsPage from './pages/StockNewsPage';
import ProfilePage from './pages/ProfilePage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/news/:id" element={<NewsDetailPage />} />
              <Route path="/stock-news" element={<StockNewsPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/article/:articleUrl" 
                element={
                  <ProtectedRoute>
                    <ArticlePage />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;