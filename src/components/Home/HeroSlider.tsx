import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Star, TrendingUp } from 'lucide-react';

type PageKey = 'search' | 'rental' | 'reviews';

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  to: PageKey; // ← 이동 대상(앱 상태 라우팅 키)
  icon: React.ComponentType<{ className?: string }>;
};

interface HeroSliderProps {
  onNavigate?: (page: PageKey) => void; // ← 부모에서 내려줄 콜백(옵션)
}

const HeroSlider: React.FC<HeroSliderProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      title: 'MyShelf와 함께하는 독서 여행',
      subtitle: '언제 어디서나 원하는 책을 쉽게 대여하세요',
      image:
        'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop',
      cta: '도서 검색',
      to: 'search',
      icon: BookOpen,
    },
    {
      id: 2,
      title: '이달의 추천 도서',
      subtitle: '큐레이션된 양질의 도서들을 만나보세요',
      image:
        'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop',
      cta: '대여 신청',
      to: 'rental',
      icon: Star,
    },
    {
      id: 3,
      title: '지금 인기 있는 책',
      subtitle: '다른 회원들이 가장 많이 읽는 베스트셀러',
      image:
        'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop',
      cta: '리뷰/추천',
      to: 'reviews',
      icon: TrendingUp,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goTo = (i: number) => setCurrentSlide(i);
  const prev = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setCurrentSlide((p) => (p + 1) % slides.length);

  const s = slides[currentSlide];
  const Icon = s.icon;

  return (
    <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out"
        style={{ backgroundImage: `url(${s.image})`, transform: 'scale(1.05)' }}
      />
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

      {/* 컨텐츠 */}
      <div className="relative z-10 flex h-full flex-col justify-center px-8 lg:px-16">
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center space-x-3">
            <div className="rounded-full bg-blue-600 p-3">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium uppercase tracking-wider text-blue-200">
              MyShelf
            </span>
          </div>

          <h2 className="mb-4 text-3xl font-bold leading-tight text-white lg:text-5xl">{s.title}</h2>
          <p className="mb-8 text-lg leading-relaxed text-gray-200 lg:text-xl">{s.subtitle}</p>

          {/* CTA 버튼 → onNavigate 호출 */}
          <button
            onClick={() => onNavigate?.(s.to)}
            className="inline-flex items-center rounded-full bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-xl"
            aria-label={s.cta}
          >
            <span>{s.cta}</span>
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>

      {/* 좌우 네비 */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/30"
        aria-label="이전 슬라이드"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/30"
        aria-label="다음 슬라이드"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex space-x-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`슬라이드 ${i + 1}`}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              i === currentSlide ? 'bg-white shadow-lg' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
