import React, { useState } from 'react';
import { Calendar, Clock, RotateCcw, CheckCircle, AlertTriangle, Book } from 'lucide-react';

interface BorrowedBook {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  borrowDate: string;
  dueDate: string;
  status: 'borrowed' | 'overdue' | 'returned';
  renewalCount: number;
  maxRenewals: number;
}

const MyShelfPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');

  const borrowedBooks: BorrowedBook[] = [
    {
      id: '1',
      title: '데미안',
      author: '헤르만 헤세',
      coverImage: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
      borrowDate: '2024-02-01',
      dueDate: '2024-02-15',
      status: 'borrowed',
      renewalCount: 0,
      maxRenewals: 2
    },
    {
      id: '2',
      title: '클린 코드',
      author: '로버트 C. 마틴',
      coverImage: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
      borrowDate: '2024-01-20',
      dueDate: '2024-02-10',
      status: 'overdue',
      renewalCount: 1,
      maxRenewals: 2
    },
    {
      id: '3',
      title: '사피엔스',
      author: '유발 하라리',
      coverImage: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
      borrowDate: '2024-01-10',
      dueDate: '2024-01-24',
      status: 'returned',
      renewalCount: 0,
      maxRenewals: 2
    }
  ];

  const currentBooks = borrowedBooks.filter(book => book.status !== 'returned');
  const historyBooks = borrowedBooks.filter(book => book.status === 'returned');

  const handleReturn = (bookId: string) => {
    alert(`도서 반납이 완료되었습니다.`);
  };

  const handleRenewal = (bookId: string) => {
    const book = borrowedBooks.find(b => b.id === bookId);
    if (book && book.renewalCount < book.maxRenewals) {
      alert(`도서 연장이 완료되었습니다. (${book.renewalCount + 1}/${book.maxRenewals})`);
    } else {
      alert('더 이상 연장할 수 없습니다.');
    }
  };

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (book: BorrowedBook) => {
    const daysRemaining = getDaysRemaining(book.dueDate);
    
    if (book.status === 'overdue') {
      return (
        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
          연체 ({Math.abs(daysRemaining)}일)
        </span>
      );
    } else if (daysRemaining <= 3) {
      return (
        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
          반납임박 ({daysRemaining}일)
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
          대여중 ({daysRemaining}일)
        </span>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">내 서재</h1>
          <p className="text-gray-600">대여한 도서를 관리하고 반납/연장하세요</p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Book className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">현재 대여중</p>
                <p className="text-2xl font-bold text-gray-900">{currentBooks.length}권</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">반납 임박</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentBooks.filter(book => getDaysRemaining(book.dueDate) <= 3).length}권
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">연체중</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentBooks.filter(book => book.status === 'overdue').length}권
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">총 반납</p>
                <p className="text-2xl font-bold text-gray-900">{historyBooks.length}권</p>
              </div>
            </div>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('current')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'current'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                현재 대여중 ({currentBooks.length})
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                대여 이력 ({historyBooks.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'current' ? (
              <div className="space-y-4">
                {currentBooks.length === 0 ? (
                  <div className="text-center py-12">
                    <Book className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">대여중인 도서가 없습니다</h3>
                    <p className="text-gray-600">새로운 도서를 대여해보세요!</p>
                  </div>
                ) : (
                  currentBooks.map((book) => (
                    <div key={book.id} className="border border-gray-200 rounded-lg p-4">
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
                                저자: {book.author}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>대여일: {new Date(book.borrowDate).toLocaleDateString('ko-KR')}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>반납일: {new Date(book.dueDate).toLocaleDateString('ko-KR')}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                {getStatusBadge(book)}
                                <span className="text-xs text-gray-500">
                                  연장: {book.renewalCount}/{book.maxRenewals}회
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleRenewal(book.id)}
                                disabled={book.renewalCount >= book.maxRenewals}
                                className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                  book.renewalCount >= book.maxRenewals
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                }`}
                              >
                                <RotateCcw className="w-4 h-4 inline mr-1" />
                                연장
                              </button>
                              <button
                                onClick={() => handleReturn(book.id)}
                                className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors duration-200"
                              >
                                <CheckCircle className="w-4 h-4 inline mr-1" />
                                반납
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {historyBooks.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">대여 이력이 없습니다</h3>
                    <p className="text-gray-600">첫 번째 도서를 대여해보세요!</p>
                  </div>
                ) : (
                  historyBooks.map((book) => (
                    <div key={book.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={book.coverImage} 
                          alt={book.title}
                          className="w-16 h-20 object-cover rounded-lg opacity-75"
                        />
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {book.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            저자: {book.author}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>대여: {new Date(book.borrowDate).toLocaleDateString('ko-KR')}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="w-4 h-4" />
                              <span>반납: {new Date(book.dueDate).toLocaleDateString('ko-KR')}</span>
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                              반납완료
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyShelfPage;