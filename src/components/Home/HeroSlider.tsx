import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Star, TrendingUp } from 'lucide-react';

interface HeroSliderProps {
  onPageChange?: (page: string) => void;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ onPageChange }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: '원하는 책을 쉽게 찾아보세요',
      subtitle: '다양한 카테고리와 검색 필터로 원하는 도서를 빠르게 검색할 수 있습니다',
      image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop',
      cta: '도서 검색하기',
      action: 'search',
      icon: BookOpen
    },
    {
      id: 2,
      title: '간편한 대여 신청',
      subtitle: '클릭 한 번으로 원하는 도서를 쉽게 대여 신청할 수 있습니다',
      image: 'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop',
      cta: '대여 신청하기',
      action: 'rental',
      icon: Star
    },
    {
      id: 3,
      title: '리뷰와 추천',
      subtitle: '다른 독자들의 솔직한 리뷰와 추천 도서를 확인해보세요',
      image: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop',
      cta: '리뷰 확인하기',
      action: 'reviews',
      icon: TrendingUp
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const currentSlideData = slides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
      {/* 배경 이미지 */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out"
        style={{ 
          backgroundImage: `url(${currentSlideData.image})`,
          transform: `scale(1.05)`
        }}
      />
      
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      
      {/* 컨텐츠 */}
      <div className="relative z-10 flex flex-col justify-center h-full px-8 lg:px-16">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <span className="text-blue-200 text-sm font-medium uppercase tracking-wider">
              MyShelf
            </span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {currentSlideData.title}
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-200 mb-8 leading-relaxed">
            {currentSlideData.subtitle}
          </p>
          
          <button 
            onClick={() => onPageChange?.(currentSlideData.action)}
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span>{currentSlideData.cta}</span>
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
      
      {/* 네비게이션 버튼 */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      {/* 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white shadow-lg' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;