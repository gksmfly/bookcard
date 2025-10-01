import React from 'react';
import { Star, TrendingUp, Calendar, ChevronRight } from 'lucide-react';
import HeroSlider from './HeroSlider';
import BookCard from './BookCard';
import { mockBooks, mockNotices } from '../../data/mockData';
import { Book } from '../../types';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const handleBookClick = (book: Book) => {
    console.log('책 클릭:', book);
    // 실제로는 도서 상세 페이지로 이동
  };

  const recommendedBooks = mockBooks.filter(book => book.rating >= 4.5);
  const newBooks = [...mockBooks].sort((a, b) => 
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 히어로 슬라이더 */}
      <section className="mb-12">
        <HeroSlider />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 추천 도서 섹션 */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">추천 도서</h2>
                <p className="text-gray-600">큐레이션된 양질의 도서들</p>
              </div>
            </div>
            
            <button 
              onClick={() => onPageChange('search')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <span>전체 보기</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedBooks.map((book) => (
              <BookCard 
                key={book.id} 
                book={book} 
                onBookClick={handleBookClick}
              />
            ))}
          </div>
        </section>

        {/* 최신 도서 섹션 */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">최신 입고 도서</h2>
                <p className="text-gray-600">새롭게 추가된 신간 도서들</p>
              </div>
            </div>
            
            <button 
              onClick={() => onPageChange('search')}
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
            >
              <span>전체 보기</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newBooks.slice(0, 4).map((book) => (
              <BookCard 
                key={book.id} 
                book={book} 
                onBookClick={handleBookClick}
              />
            ))}
          </div>
        </section>

        {/* 공지사항 섹션 */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">공지사항</h2>
                <p className="text-gray-600">최신 소식과 이벤트 안내</p>
              </div>
            </div>
            
            <button 
              onClick={() => onPageChange('notices')}
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              <span>전체 보기</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockNotices.slice(0, 3).map((notice) => (
              <div 
                key={notice.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 cursor-pointer border-l-4 border-blue-500"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    notice.type === 'event' 
                      ? 'bg-green-100 text-green-800'
                      : notice.type === 'maintenance'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {notice.type === 'event' ? '이벤트' : 
                     notice.type === 'maintenance' ? '시스템' : '일반'}
                  </span>
                  
                  {notice.isImportant && (
                    <span className="bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
                      중요
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                  {notice.title}
                </h3>
                
                <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                  {notice.content}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(notice.date).toLocaleDateString('ko-KR')}
                  </span>
                  
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    자세히 보기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            지금 바로 MyShelf와 함께 독서를 시작하세요!
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            수천 권의 도서 중에서 원하는 책을 찾아 언제든지 대여할 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onPageChange('search')}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              도서 검색하기
            </button>
            <button 
              onClick={() => onPageChange('signup')}
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              회원가입하기
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;