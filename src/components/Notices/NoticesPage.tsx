import React, { useState } from 'react';
import { Bell, Calendar, Tag, ChevronRight, Search } from 'lucide-react';
import { mockNotices } from '../../data/mockData';

const NoticesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotice, setSelectedNotice] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: '전체', count: mockNotices.length },
    { id: 'system', label: '시스템', count: mockNotices.filter(n => n.type === 'system').length },
    { id: 'event', label: '이벤트', count: mockNotices.filter(n => n.type === 'event').length },
    { id: 'maintenance', label: '점검', count: mockNotices.filter(n => n.type === 'maintenance').length }
  ];

  const filteredNotices = mockNotices.filter(notice => {
    const matchesCategory = selectedCategory === 'all' || notice.type === selectedCategory;
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getNoticeIcon = (type: string) => {
    switch (type) {
      case 'event':
        return '🎉';
      case 'maintenance':
        return '🔧';
      default:
        return '📢';
    }
  };

  const getNoticeTypeLabel = (type: string) => {
    switch (type) {
      case 'event':
        return '이벤트';
      case 'maintenance':
        return '시스템점검';
      default:
        return '일반';
    }
  };

  const selectedNoticeData = selectedNotice ? mockNotices.find(n => n.id === selectedNotice) : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">공지사항</h1>
          <p className="text-gray-600">MyShelf의 최신 소식과 이벤트 정보를 확인하세요</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 사이드바 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              {/* 검색 */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="공지사항 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* 카테고리 */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">카테고리</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span>{category.label}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        selectedCategory === category.id
                          ? 'bg-blue-200 text-blue-800'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 메인 컨텐츠 */}
          <div className="lg:col-span-3">
            {selectedNotice ? (
              /* 공지사항 상세 */
              <div className="bg-white rounded-xl shadow-md">
                <div className="p-6 border-b border-gray-200">
                  <button
                    onClick={() => setSelectedNotice(null)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    <span>목록으로 돌아가기</span>
                  </button>
                  
                  {selectedNoticeData && (
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-2xl">{getNoticeIcon(selectedNoticeData.type)}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            selectedNoticeData.type === 'event' 
                              ? 'bg-green-100 text-green-800'
                              : selectedNoticeData.type === 'maintenance'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {getNoticeTypeLabel(selectedNoticeData.type)}
                          </span>
                          {selectedNoticeData.isImportant && (
                            <span className="bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
                              중요
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        {selectedNoticeData.title}
                      </h1>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(selectedNoticeData.date).toLocaleDateString('ko-KR')}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  {selectedNoticeData && (
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {selectedNoticeData.content}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* 공지사항 목록 */
              <div className="space-y-4">
                {filteredNotices.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-md p-12 text-center">
                    <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">공지사항이 없습니다</h3>
                    <p className="text-gray-600">검색 조건을 변경해보세요.</p>
                  </div>
                ) : (
                  filteredNotices.map((notice) => (
                    <div 
                      key={notice.id}
                      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                      onClick={() => setSelectedNotice(notice.id)}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <span className="text-xl">{getNoticeIcon(notice.type)}</span>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                  notice.type === 'event' 
                                    ? 'bg-green-100 text-green-800'
                                    : notice.type === 'maintenance'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {getNoticeTypeLabel(notice.type)}
                                </span>
                                {notice.isImportant && (
                                  <span className="bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
                                    중요
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                              {notice.title}
                            </h3>
                            
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                              {notice.content}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(notice.date).toLocaleDateString('ko-KR')}</span>
                              </div>
                              
                              <div className="flex items-center space-x-1 text-blue-600 group-hover:text-blue-700">
                                <span className="text-sm font-medium">자세히 보기</span>
                                <ChevronRight className="w-4 h-4" />
                              </div>
                            </div>
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

export default NoticesPage;