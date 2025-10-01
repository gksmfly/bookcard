import React from 'react';
import { Star, Users, Calendar } from 'lucide-react';
import { Book } from '../../types';

interface BookCardProps {
  book: Book;
  onBookClick?: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onBookClick }) => {
  const percent =
    Math.max(0, Math.min(100, (book.availableCopies / Math.max(1, book.totalCopies)) * 100));

  return (
    <div
      className="bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group transform hover:-translate-y-1"
      onClick={() => onBookClick?.(book)}
    >
      {/* 책 커버 이미지 (라운드 제거) */}
      <div className="relative h-48 overflow-hidden rounded-none">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover rounded-none group-hover:scale-110 transition-transform duration-300"
          draggable={false}
        />

        {/* 대여 가능 여부 배지 */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              book.isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {book.isAvailable ? '대여 가능' : '대여중'}
          </span>
        </div>

        {/* 평점 배지 */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full flex items-center space-x-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{book.rating}</span>
        </div>
      </div>

      {/* 책 정보 */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
          {book.title}
        </h3>

        <p className="text-gray-600 text-sm mb-1">저자: {book.author}</p>

        <p className="text-gray-500 text-xs mb-3">
          출판사: {book.publisher} · {book.category}
        </p>

        <p className="text-gray-700 text-sm line-clamp-2 mb-3">{book.description}</p>

        {/* 하단 정보 */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>{book.reviewCount}명 평가</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(book.publishedDate).getFullYear()}</span>
          </div>
        </div>

        {/* 재고 정보 */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              재고: {book.availableCopies}/{book.totalCopies}권
            </span>
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
