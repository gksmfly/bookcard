import React from 'react';
import { X, Trash2, Calendar, BookOpen } from 'lucide-react';
import { Book, CartItem } from '../../types';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  books: Book[];
  onRemoveItem: (bookId: string) => void;
  onClearCart: () => void;
  onProceedToRental: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({
  isOpen,
  onClose,
  cartItems,
  books,
  onRemoveItem,
  onClearCart,
  onProceedToRental
}) => {
  if (!isOpen) return null;

  const cartBooks = cartItems.map(item => {
    const book = books.find(b => b.id === item.bookId);
    return { ...item, book };
  }).filter(item => item.book);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              대여 신청 목록 ({cartItems.length})
            </h2>
            <div className="flex items-center space-x-2">
              {cartItems.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  전체 삭제
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* 장바구니 목록 */}
          <div className="flex-1 overflow-y-auto">
            {cartBooks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <BookOpen className="w-12 h-12 mb-4" />
                <p className="text-center">
                  대여 신청할 도서가 없습니다<br />
                  원하는 도서를 추가해보세요
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {cartBooks.map((item) => (
                  <div
                    key={item.bookId}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <img
                      src={item.book!.coverImage}
                      alt={item.book!.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.book!.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        {item.book!.author}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {new Date(item.addedDate).toLocaleDateString('ko-KR')}
                          </span>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          item.book!.isAvailable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.book!.isAvailable ? '대여가능' : '대여중'}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => onRemoveItem(item.bookId)}
                      className="p-1 hover:bg-red-100 rounded-full text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 하단 액션 */}
          {cartBooks.length > 0 && (
            <div className="p-6 border-t border-gray-200">
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>총 선택 도서</span>
                  <span>{cartBooks.length}권</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>대여 가능</span>
                  <span className="text-green-600">
                    {cartBooks.filter(item => item.book!.isAvailable).length}권
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => {
                  onProceedToRental();
                  onClose();
                }}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                대여 신청하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPanel;