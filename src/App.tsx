import React, { useState } from 'react';
import Header from './components/Layout/Header';
import HomePage from './components/Home/HomePage';
import SearchPage from './components/Search/SearchPage';
import RentalPage from './components/Rental/RentalPage';
import MyShelfPage from './components/MyShelf/MyShelfPage';
import ReviewsPage from './components/Reviews/ReviewsPage';
import NoticesPage from './components/Notices/NoticesPage';
import SupportPage from './components/Support/SupportPage';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'search':
        return <SearchPage />;
      case 'rental':
        return <RentalPage />;
      case 'myshelf':
        return <MyShelfPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'notices':
        return <NoticesPage />;
      case 'support':
        return <SupportPage />;
      case 'login':
        return <LoginPage onPageChange={setCurrentPage} />;
      case 'signup':
        return <SignupPage onPageChange={setCurrentPage} />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {currentPage !== 'login' && currentPage !== 'signup' && (
        <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      )}
      <main>
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;