import React, { useState } from 'react';
import {
  BookOpen, Search, ShoppingCart, Bell, User, Menu, X, Home, Star, MessageCircle, HelpCircle
} from 'lucide-react';
import Notifications, { NotificationItem } from './Notifications';
import CartDrawer, { CartItem } from './CartDrawer';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // 🔔/🛒 상태 + 샘플 데이터
  const [openNoti, setOpenNoti] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 'n1', text: '『데미안』 반납 예정일이 3일 남았어요.' },
    { id: 'n2', text: '신간 『클린 아키텍처』가 입고되었습니다.' },
  ]);
  const [cart, setCart] = useState<CartItem[]>([
    { id: 'c1', title: '클린 코드', author: '로버트 C. 마틴' },
    { id: 'c2', title: '데미안', author: '헤르만 헤세' },
  ]);

  // 조작 함수
  const clearNotifications = () => setNotifications([]);
  const removeCartItem = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);
  const goCheckout = () => {
    setOpenCart(false);
    onPageChange('rental');
  };

  const NavButton: React.FC<{ to: string; icon?: React.ReactNode; label: string }> = ({ to, icon, label }) => (
    <button
      onClick={() => onPageChange(to)}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 ${
        currentPage === to ? 'bg-white/15' : ''
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <header className="sticky top-0 z-40 bg-blue-600 text-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        
        {/* 📘 로고: 클릭 시 홈으로 */}
        <button
          onClick={() => onPageChange('home')}
          className="flex items-center gap-2 focus:outline-none"
          aria-label="Go Home"
        >
          <span className="text-2xl">📘</span>
          <span className="font-bold text-xl">MyShelf</span>
          <span className="ml-2 text-xs opacity-80">온라인 도서 대여 시스템</span>
        </button>

        {/* 데스크탑 내비 */}
        <nav className="hidden md:flex items-center gap-1">
          <NavButton to="home" icon={<Home className="w-4 h-4" />} label="홈" />
          <NavButton to="search" icon={<Search className="w-4 h-4" />} label="도서 검색" />
          <NavButton to="rental" icon={<ShoppingCart className="w-4 h-4" />} label="대여 신청" />
          <NavButton to="myshelf" icon={<BookOpen className="w-4 h-4" />} label="내 서재" />
          <NavButton to="reviews" icon={<Star className="w-4 h-4" />} label="리뷰/추천" />
          <NavButton to="notices" icon={<MessageCircle className="w-4 h-4" />} label="공지사항" />
          <NavButton to="support" icon={<HelpCircle className="w-4 h-4" />} label="고객센터" />
        </nav>

        {/* 우측 아이콘 */}
        <div className="flex items-center gap-2">
          {/* 🔔 알림 */}
          <button
            onClick={() => { setOpenNoti(v => !v); setOpenCart(false); }}
            className="relative rounded-full bg-white/10 px-3 py-1 hover:bg-white/20"
            aria-label="알림"
          >
            <Bell className="w-4 h-4" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs">
                {notifications.length}
              </span>
            )}
          </button>

          {/* 🛒 장바구니 */}
          <button
            onClick={() => { setOpenCart(v => !v); setOpenNoti(false); }}
            className="relative rounded-full bg-white/10 px-3 py-1 hover:bg-white/20"
            aria-label="장바구니"
          >
            <ShoppingCart className="w-4 h-4" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white text-blue-700 px-1 text-xs">
                {cart.length}
              </span>
            )}
          </button>

          {/* 로그인/회원가입 */}
          <button
            onClick={() => onPageChange('login')}
            className="hidden md:inline-flex rounded-xl bg-white text-blue-600 px-3 py-1 font-semibold hover:bg-blue-50"
          >
            로그인
          </button>
          <button
            onClick={() => onPageChange('signup')}
            className="hidden md:inline-flex rounded-xl border border-white/70 px-3 py-1 hover:bg-white/10"
          >
            회원가입
          </button>

          {/* 모바일 토글 */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden rounded-lg bg-white/10 p-2 hover:bg-white/20"
            aria-label="메뉴"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 🔔 알림 패널 */}
      {openNoti && (
        <Notifications
          items={notifications}
          onClose={() => setOpenNoti(false)}
          onClear={clearNotifications}
        />
      )}

      {/* 🛒 장바구니 패널 */}
      <CartDrawer
        open={openCart}
        items={cart}
        onClose={() => setOpenCart(false)}
        onRemove={removeCartItem}
        onClear={clearCart}
        onCheckout={goCheckout}
      />

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/20 bg-blue-600/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-3 grid grid-cols-2 gap-2">
            {[
              { to: 'home', label: '홈', icon: <Home className="w-4 h-4" /> },
              { to: 'search', label: '도서 검색', icon: <Search className="w-4 h-4" /> },
              { to: 'rental', label: '대여 신청', icon: <ShoppingCart className="w-4 h-4" /> },
              { to: 'myshelf', label: '내 서재', icon: <BookOpen className="w-4 h-4" /> },
              { to: 'reviews', label: '리뷰/추천', icon: <Star className="w-4 h-4" /> },
              { to: 'notices', label: '공지사항', icon: <MessageCircle className="w-4 h-4" /> },
              { to: 'support', label: '고객센터', icon: <HelpCircle className="w-4 h-4" /> },
              { to: 'login', label: '로그인', icon: <User className="w-4 h-4" /> },
              { to: 'signup', label: '회원가입', icon: <User className="w-4 h-4" /> },
            ].map(({ to, label, icon }) => (
              <button
                key={to}
                onClick={() => { onPageChange(to); setMobileOpen(false); }}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10 ${
                  currentPage === to ? 'bg-white/15' : ''
                }`}
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
