export interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  category: string;
  description: string;
  coverImage: string;
  isbn: string;
  publishedDate: string;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  totalCopies: number;
  availableCopies: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  membershipType: 'basic' | 'premium';
  joinDate: string;
  borrowedBooks: number;
  maxBorrowLimit: number;
}

export interface Rental {
  id: string;
  bookId: string;
  userId: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'borrowed' | 'returned' | 'overdue';
  renewalCount: number;
  maxRenewals: number;
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'system' | 'event' | 'maintenance';
  isImportant: boolean;
}

export interface CartItem {
  bookId: string;
  addedDate: string;
}