import React, { useState } from 'react';
import { Star, ThumbsUp, MessageCircle, Filter, TrendingUp, Award } from 'lucide-react';
import { mockBooks, mockReviews } from '../../data/mockData';

const ReviewsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reviews' | 'recommendations'>('reviews');
  const [sortBy, setSortBy] = useState('latest');
  const [filterRating, setFilterRating] = useState('all');

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const filteredReviews = mockReviews.filter(review => {
    if (filterRating === 'all') return true;
    return review.rating >= parseInt(filterRating);
  });

  const topRatedBooks = [...mockBooks]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">리뷰 & 추천</h1>
          <p className="text-gray-600">다른 독자들의 솔직한 리뷰와 추천 도서를 확인하세요</p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">전체 리뷰</p>
                <p className="text-2xl font-bold text-gray-900">{mockReviews.length}개</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">평균 평점</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length).toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">추천 도서</p>
                <p className="text-2xl font-bold text-gray-900">{topRatedBooks.length}권</p>
              </div>
            </div>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                사용자 리뷰
              </button>
              <button
                onClick={() => setActiveTab('recommendations')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'recommendations'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                추천 도서
              </button>
            </nav>
          </div>

          {activeTab === 'reviews' && (
            <div className="p-6">
              {/* 필터 및 정렬 */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={filterRating}
                    onChange={(e) => setFilterRating(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">모든 평점</option>
                    <option value="5">5점</option>
                    <option value="4">4점 이상</option>
                    <option value="3">3점 이상</option>
                  </select>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="latest">최신순</option>
                  <option value="rating">평점순</option>
                  <option value="likes">좋아요순</option>
                </select>
              </div>

              {/* 리뷰 목록 */}
              <div className="space-y-6">
                {filteredReviews.map((review) => {
                  const book = mockBooks.find(b => b.id === review.bookId);
                  return (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start space-x-4">
                        {book && (
                          <img 
                            src={book.coverImage} 
                            alt={book.title}
                            className="w-16 h-20 object-cover rounded-lg"
                          />
                        )}
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">
                                {book?.title}
                              </h3>
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="text-sm text-gray-600">{review.userName}</span>
                                <span className="text-gray-300">•</span>
                                <span className="text-sm text-gray-500">
                                  {new Date(review.date).toLocaleDateString('ko-KR')}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                {renderStars(review.rating)}
                                <span className="text-sm text-gray-600 ml-2">
                                  {review.rating}.0
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-4 leading-relaxed">
                            {review.comment}
                          </p>
                          
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors duration-200">
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-sm">도움됨 ({review.likes})</span>
                            </button>
                            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors duration-200">
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-sm">댓글</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">이달의 추천 도서</h2>
                <p className="text-gray-600">높은 평점을 받은 도서들을 추천합니다</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topRatedBooks.map((book, index) => (
                  <div key={book.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="relative mb-4">
                      <img 
                        src={book.coverImage} 
                        alt={book.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        #{index + 1}
                      </div>
                      <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{book.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                      {book.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-2">
                      {book.author} · {book.publisher}
                    </p>
                    
                    <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                      {book.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {renderStars(Math.floor(book.rating))}
                        <span className="text-sm text-gray-600 ml-1">
                          ({book.reviewCount})
                        </span>
                      </div>
                      
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        book.isAvailable 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {book.isAvailable ? '대여가능' : '대여중'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 리뷰 작성 CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            읽은 책에 대한 리뷰를 남겨주세요!
          </h2>
          <p className="text-blue-100 mb-6">
            다른 독자들에게 도움이 되는 솔직한 리뷰를 작성해보세요.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors duration-200">
            리뷰 작성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;