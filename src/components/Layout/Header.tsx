import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notifications from "./Notifications";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const [openCart, setOpenCart] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-blue-600 text-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* 로고/타이틀 - 클릭 시 홈으로 */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 focus:outline-none"
          aria-label="Go Home"
        >
          <span className="text-2xl">📘</span>
          <span className="font-bold text-xl">MyShelf</span>
          <span className="ml-2 text-xs opacity-80">온라인 도서 대여 시스템</span>
        </button>

        {/* 네비게이션 */}
        <nav className="hidden md:flex items-center gap-5">
          <Link to="/" className="hover:underline">
            홈
          </Link>
          <Link to="/search" className="hover:underline">
            도서 검색
          </Link>
          <Link to="/rental" className="hover:underline">
            대여 신청
          </Link>
          <Link to="/myshelf" className="hover:underline">
            내 서재
          </Link>
          <Link to="/reviews" className="hover:underline">
            리뷰/추천
          </Link>
          <Link to="/notices" className="hover:underline">
            공지사항
          </Link>
          <Link to="/support" className="hover:underline">
            고객센터
          </Link>
        </nav>

        {/* 우측 아이콘 */}
        <div className="flex items-center gap-3">
          {/* 알림 */}
          <button
            onClick={() => {
              setOpenNoti((v) => !v);
              setOpenCart(false);
            }}
            className="relative rounded-full bg-white/10 px-3 py-1 hover:bg-white/20"
            aria-label="알림"
          >
            🔔
            <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs">
              2
            </span>
          </button>

          {/* 장바구니 */}
          <button
            onClick={() => {
              setOpenCart((v) => !v);
              setOpenNoti(false);
            }}
            className="rounded-full bg-white/10 px-3 py-1 hover:bg-white/20"
            aria-label="장바구니"
          >
            🛒
          </button>

          <Link
            to="/login"
            className="rounded-xl bg-white text-blue-600 px-3 py-1 font-semibold hover:bg-blue-50"
          >
            로그인
          </Link>
          <Link
            to="/signup"
            className="rounded-xl bg-white/0 border border-white/70 px-3 py-1 hover:bg-white/10"
          >
            회원가입
          </Link>
        </div>
      </div>

      {/* 패널들 */}
      {openNoti && <Notifications onClose={() => setOpenNoti(false)} />}
      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
    </header>
  );
}
