import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, Star, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { mockBooks } from '../../data/mockData';
import { Book } from '../../types';

const RentalPage: React.FC = () => {
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [rentalPeriod, setRentalPeriod] = useState(14);

  const availableBooks = mockBooks.filter(book => book.isAvailable);

  const handleBookSelect = (bookId: string) => {
    setSelectedBooks(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const handleRentalSubmit = () => {
    if (selectedBooks.length === 0) {
      alert('대여할 도서를 선택해주세요.');
      return;
    }
    alert(`${selectedBooks.length}권의 도서 대여 신청이 완료되었습니다.`);
    setSelectedBooks([]);
  };

  const getRentalEndDate = () => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + rentalPeriod);
    return endDate.toLocaleDateString('ko-KR');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">대여 신청</h1>
          <p className="text-gray-600">원하는 도서를 선택하여 대여 신청하세요</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 도서 목록 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">대여 가능한 도서</h2>
              <div className="space-y-4">
                {availableBooks.map((book) => (
                  <div 
                    key={book.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                      selectedBooks.includes(book.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleBookSelect(book.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <img 
                        src={book.coverImage} 
                        alt={book.title}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {book.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                              {book.author} · {book.publisher}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>{book.rating}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{book.reviewCount}명</span>
                              </div>
                              <span>재고: {book.availableCopies}권</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            {selectedBooks.includes(book.id) && (
                              <CheckCircle className="w-6 h-6 text-blue-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 대여 신청 정보 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">대여 신청 정보</h2>
              
              {/* 선택된 도서 */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">선택된 도서 ({selectedBooks.length}권)</h3>
                {selectedBooks.length === 0 ? (
                  <p className="text-gray-500 text-sm">선택된 도서가 없습니다.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedBooks.map(bookId => {
                      const book = mockBooks.find(b => b.id === bookId);
                      return book ? (
                        <div key={bookId} className="flex items-center space-x-2 text-sm">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                          <span className="truncate">{book.title}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
              </div>

              {/* 대여 기간 설정 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  대여 기간
                </label>
                <select
                  value={rentalPeriod}
                  onChange={(e) => setRentalPeriod(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={7}>1주일 (7일)</option>
                  <option value={14}>2주일 (14일)</option>
                  <option value={21}>3주일 (21일)</option>
                  <option value={30}>1개월 (30일)</option>
                </select>
              </div>

              {/* 반납 예정일 */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-900">반납 예정일</span>
                </div>
                <p className="text-blue-800 font-medium">{getRentalEndDate()}</p>
              </div>

              {/* 주의사항 */}
              <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-1">주의사항</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• 연체 시 하루당 100원의 연체료가 부과됩니다</li>
                      <li>• 최대 2회까지 연장 가능합니다</li>
                      <li>• 도서 분실 시 정가의 2배를 배상해야 합니다</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 대여 신청 버튼 */}
              <button
                onClick={handleRentalSubmit}
                disabled={selectedBooks.length === 0}
                className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 ${
                  selectedBooks.length > 0
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {selectedBooks.length > 0 
                  ? `${selectedBooks.length}권 대여 신청하기`
                  : '도서를 선택해주세요'
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalPage;