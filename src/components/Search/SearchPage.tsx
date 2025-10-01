import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid2x2 as Grid, List, Star, Calendar } from 'lucide-react';
import BookCard from '../Home/BookCard';
import { mockBooks, categories } from '../../data/mockData';
import { Book } from '../../types';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('title');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedBooks = useMemo(() => {
    let books = [...mockBooks];

    // 카테고리 필터링
    if (selectedCategory !== '전체') {
      books = books.filter(book => book.category === selectedCategory);
    }

    // 검색어 필터링
    if (searchTerm) {
      books = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.publisher.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 정렬
    books.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'rating':
          return b.rating - a.rating;
        case 'date':
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        default:
          return 0;
      }
    });

    return books;
  }, [searchTerm, selectedCategory, sortBy]);

  const handleBookClick = (book: Book) => {
    console.log('책 상세 정보:', book);
    // 실제로는 도서 상세 모달이나 페이지로 이동
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">도서 검색</h1>
          <p className="text-gray-600">원하는 책을 쉽게 찾아보세요</p>
        </div>

        {/* 검색 및 필터 바 */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* 검색창 */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="책 제목, 저자, 출판사로 검색하세요..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* 카테고리 선택 */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* 필터 토글 버튼 */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Filter className="w-5 h-5" />
              <span>필터</span>
            </button>
          </div>

          {/* 확장 필터 */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    정렬 기준
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="title">제목순</option>
                    <option value="author">저자순</option>
                    <option value="rating">평점순</option>
                    <option value="date">출간일순</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    대여 가능 여부
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="all">전체</option>
                    <option value="available">대여 가능</option>
                    <option value="borrowed">대여중</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    평점
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="all">전체</option>
                    <option value="4.5">4.5점 이상</option>
                    <option value="4.0">4.0점 이상</option>
                    <option value="3.5">3.5점 이상</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 결과 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            총 <span className="font-semibold text-blue-600">{filteredAndSortedBooks.length}</span>권의 도서를 찾았습니다
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 검색 결과 */}
        {filteredAndSortedBooks.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="mb-4">
              <Search className="w-12 h-12 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-600 mb-4">다른 검색어나 필터로 다시 시도해보세요.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('전체');
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              검색 초기화
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAndSortedBooks.map((book) => (
              <BookCard 
                key={book.id} 
                book={book} 
                onBookClick={handleBookClick}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedBooks.map((book) => (
              <div 
                key={book.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 cursor-pointer"
                onClick={() => handleBookClick(book)}
              >
                <div className="flex items-start space-x-6">
                  <img 
                    src={book.coverImage} 
                    alt={book.title}
                    className="w-20 h-28 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          {book.title}
                        </h3>
                        
                        <div className="text-gray-600 mb-2">
                          <p>저자: {book.author}</p>
                          <p>출판사: {book.publisher} · {book.category}</p>
                        </div>
                        
                        <p className="text-gray-700 mb-4 line-clamp-2">
                          {book.description}
                        </p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{book.rating}</span>
                            <span>({book.reviewCount}명)</span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(book.publishedDate).getFullYear()}</span>
                          </div>
                          
                          <span>재고: {book.availableCopies}/{book.totalCopies}권</span>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                          book.isAvailable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {book.isAvailable ? '대여 가능' : '대여중'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;