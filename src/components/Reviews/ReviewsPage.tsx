import React, { useMemo, useState } from 'react';
import { Star, ThumbsUp, MessageCircle, Filter, TrendingUp, Award } from 'lucide-react';
import { mockBooks, mockReviews } from '../../data/mockData';

const ReviewsPage: React.FC = () => {
  // 탭: 리뷰 / 추천
  const [activeTab, setActiveTab] = useState<'reviews' | 'recommendations'>('reviews');

  // 필터/정렬
  const [sortBy, setSortBy] = useState<'latest' | 'helpful' | 'rating'>('latest');
  const [filterRating, setFilterRating] = useState<'all' | '5' | '4' | '3'>('all');
  const [showFilters, setShowFilters] = useState(false);

  // 리뷰 별 아이콘 렌더
  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, idx) => (
      <Star
        key={idx}
        className={`w-4 h-4 ${
          idx < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));

  // 가공 데이터
  const filteredReviews = useMemo(() => {
    let list = [...mockReviews];
    if (filterRating !== 'all') {
      const thr = Number(filterRating);
      list = list.filter((r) => r.rating >= thr);
    }
    switch (sortBy) {
      case 'helpful':
        list.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // latest
        list.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    }
    return list;
  }, [sortBy, filterRating]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">리뷰 & 추천</h1>
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <Filter className="w-4 h-4" />
          고급 필터
        </button>
      </div>
      <p className="mt-1 text-gray-600">다른 독자들의 리뷰와 추천 도서를 확인해보세요.</p>

      {/* 상단 탭 */}
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setActiveTab('reviews')}
          className={`rounded-lg px-4 py-2 text-sm ${
            activeTab === 'reviews'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          리뷰
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`rounded-lg px-4 py-2 text-sm ${
            activeTab === 'recommendations'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          추천
        </button>
      </div>

      {/* 🔧 기본 필터 바 (여기 select에 스타일 강제 적용) */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {/* 평점 필터 */}
        <div className="relative">
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value as any)}
            className="w-40 appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-900 outline-none ring-blue-500 focus:ring"
          >
            <option value="all">모든 평점</option>
            <option value="5">5점</option>
            <option value="4">4점 이상</option>
            <option value="3">3점 이상</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            ▾
          </span>
        </div>

        {/* 정렬 */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-40 appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-900 outline-none ring-blue-500 focus:ring"
          >
            <option value="latest">최신순</option>
            <option value="helpful">도움순</option>
            <option value="rating">평점순</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            ▾
          </span>
        </div>
      </div>

      {/* 🔧 확장 필터 (토글) */}
      {showFilters && (
        <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-gray-200 bg-white p-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">카테고리</label>
            <div className="relative">
              <select className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-900 outline-none ring-blue-500 focus:ring">
                <option>전체</option>
                <option>문학</option>
                <option>IT/프로그래밍</option>
                <option>경제/경영</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">▾</span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">기간</label>
            <div className="relative">
              <select className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-900 outline-none ring-blue-500 focus:ring">
                <option>전체</option>
                <option>이번 주</option>
                <option>이번 달</option>
                <option>올해</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">▾</span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">정렬 기준</label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-900 outline-none ring-blue-500 focus:ring"
              >
                <option value="latest">최신순</option>
                <option value="helpful">도움순</option>
                <option value="rating">평점순</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">▾</span>
            </div>
          </div>
        </div>
      )}

      {/* 콘텐츠 */}
      <div className="mt-8">
        {activeTab === 'reviews' ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredReviews.map((r) => (
              <div key={r.id} className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">{renderStars(r.rating)}</div>
                  <span className="text-xs text-gray-500">
                    {new Date(r.date).toLocaleDateString('ko-KR')}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">{r.title}</h3>
                <p className="mt-1 text-sm text-gray-700">{r.content}</p>
                <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                  <span className="inline-flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {r.likes ?? 0}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {r.comments ?? 0}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // recommendations
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {mockBooks.slice(0, 9).map((b) => (
              <div key={b.id} className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">{b.category}</span>
                </div>
                <div className="font-semibold text-gray-900">{b.title}</div>
                <div className="text-sm text-gray-600">저자: {b.author}</div>
                <div className="mt-2 inline-flex items-center gap-1 text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4" />
                  추천 지수 {b.rating.toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
