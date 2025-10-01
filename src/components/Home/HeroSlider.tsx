import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BookOpen, Star, TrendingUp } from 'lucide-react';

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
};

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      title: 'MyShelf와 함께하는 독서 여행',
      subtitle: '언제 어디서나 원하는 책을 쉽게 대여하세요',
      image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop',
      cta: '도서 검색',
      to: '/search',
      icon: BookOpen
    },
    {
      id: 2,
      title: '이달의 추천 도서',
      subtitle: '큐레이션된 양질의 도서들을 만나보세요',
      image: 'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop',
      cta: '대여 신청',
      to: '/rental',
      icon: Star
    },
    {
      id: 3,
      title: '지금 인기 있는 책',
      subtitle: '다른 회원들이 가장 많이 읽는 베스트셀러',
      image: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop',
      cta: '리뷰/추천',
      to: '/reviews',
      icon: TrendingUp
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (i: number) => setCurrentSlide(i);
  const goToPrevious = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  const goToNext = () => setCurrentSlide(prev => (prev + 1) % slides.length);

  const s = slides[currentSlide];
  const Icon = s.icon;

  return (
    <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out"
        style={{ backgroundImage: `url(${s.image})`, transform: `scale(1.05)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

      <div className="relative z-10 flex flex-col justify-center h-full px-8 lg:px-16">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-blue-200 text-sm font-medium uppercase tracking-wider">MyShelf</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">{s.title}</h2>
          <p className="text-lg lg:text-xl text-gray-200 mb-8 leading-relaxed">{s.subtitle}</p>

          <Link
            to={s.to}
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span>{s.cta}</span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 z-10"
        aria-label="이전 슬라이드"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 z-10"
        aria-label="다음 슬라이드"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-white shadow-lg' : 'bg-white/40 hover:bg-white/60'}`}
            aria-label={`슬라이드 ${idx + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
