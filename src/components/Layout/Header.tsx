import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  ShoppingCart, 
  Bell, 
  User, 
  Menu, 
  X,
  Home,
  Star,
  MessageCircle,
  HelpCircle
} from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount] = useState(3);
  const [notificationCount] = useState(2);

  const menuItems = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'search', label: '도서 검색', icon: Search },
    { id: 'rental', label: '대여 신청', icon: BookOpen },
    { id: 'myshelf', label: '내 서재', icon: BookOpen },
    { id: 'reviews', label: '리뷰/추천', icon: Star },
    { id: 'notices', label: '공지사항', icon: MessageCircle },
    { id: 'support', label: '고객센터', icon: HelpCircle }
  ];

  const handleMenuClick = (page: string) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 및 홈페이지 이름 */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleMenuClick('home')}
          >
            <div className="bg-white p-2 rounded-lg group-hover:shadow-lg transition-shadow duration-200">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">MyShelf</h1>
              <p className="text-blue-100 text-xs">온라인 도서 대여 시스템</p>
            </div>
          </div>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden lg:flex space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  currentPage === item.id
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* 오른쪽 액션 버튼들 */}
          <div className="flex items-center space-x-4">
            {/* 알림 아이콘 */}
            <button className="relative p-2 text-blue-100 hover:text-white hover:bg-blue-500 rounded-lg transition-colors duration-200">
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* 장바구니 아이콘 */}
            <button className="relative p-2 text-blue-100 hover:text-white hover:bg-blue-500 rounded-lg transition-colors duration-200">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* 사용자 메뉴 */}
            <div className="hidden sm:flex items-center space-x-2">
              <button 
                onClick={() => handleMenuClick('login')}
                className="px-4 py-2 text-blue-100 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                로그인
              </button>
              <button 
                onClick={() => handleMenuClick('signup')}
                className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors duration-200"
              >
                회원가입
              </button>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-blue-100 hover:text-white hover:bg-blue-500 rounded-lg transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-blue-700 border-t border-blue-500 py-4">
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                    currentPage === item.id
                      ? 'bg-white text-blue-600'
                      : 'text-blue-100 hover:bg-blue-600'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
              
              <hr className="border-blue-500 my-2" />
              
              <button
                onClick={() => handleMenuClick('login')}
                className="flex items-center space-x-3 px-4 py-3 text-left text-blue-100 hover:bg-blue-600 rounded-lg transition-colors duration-200"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">로그인</span>
              </button>
              
              <button
                onClick={() => handleMenuClick('signup')}
                className="flex items-center space-x-3 px-4 py-3 text-left text-blue-100 hover:bg-blue-600 rounded-lg transition-colors duration-200"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">회원가입</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;