import { Book, Notice, Review, Rental } from '../types';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: '데미안',
    author: '헤르만 헤세',
    publisher: '민음사',
    category: '문학',
    description: '성장의 아픔과 자아 찾기를 그린 고전 문학의 걸작',
    coverImage: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    isbn: '978-89-374-0001-1',
    publishedDate: '2020-03-15',
    rating: 4.5,
    reviewCount: 128,
    isAvailable: true,
    totalCopies: 5,
    availableCopies: 2
  },
  {
    id: '2',
    title: '클린 코드',
    author: '로버트 C. 마틴',
    publisher: '인사이트',
    category: 'IT/프로그래밍',
    description: '애자일 소프트웨어 장인 정신의 바이블',
    coverImage: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    isbn: '978-89-6626-311-7',
    publishedDate: '2021-01-20',
    rating: 4.8,
    reviewCount: 95,
    isAvailable: true,
    totalCopies: 3,
    availableCopies: 1
  },
  {
    id: '3',
    title: '사피엔스',
    author: '유발 하라리',
    publisher: '김영사',
    category: '역사/철학',
    description: '인류의 역사를 새롭게 조명한 베스트셀러',
    coverImage: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    isbn: '978-89-349-7077-4',
    publishedDate: '2019-11-25',
    rating: 4.7,
    reviewCount: 203,
    isAvailable: false,
    totalCopies: 4,
    availableCopies: 0
  },
  {
    id: '4',
    title: '주식투자 절대원칙',
    author: '박영옥',
    publisher: '스마트북스',
    category: '경제/경영',
    description: '성공적인 주식투자를 위한 실전 가이드',
    coverImage: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    isbn: '978-89-308-1234-5',
    publishedDate: '2023-02-10',
    rating: 4.3,
    reviewCount: 67,
    isAvailable: true,
    totalCopies: 6,
    availableCopies: 3
  }
];

export const mockNotices: Notice[] = [
  {
    id: '1',
    title: '시스템 정기 점검 안내',
    content: '더 나은 서비스를 위한 시스템 정기 점검을 실시합니다. 2024년 2월 15일 새벽 2시~6시까지 서비스 이용이 제한됩니다.',
    date: '2024-02-10',
    type: 'maintenance',
    isImportant: true
  },
  {
    id: '2',
    title: '신규 도서 100권 입고 소식',
    content: '다양한 분야의 신간 도서 100권이 새롭게 입고되었습니다. 베스트셀러부터 전문서적까지 다양한 도서를 만나보세요!',
    date: '2024-02-08',
    type: 'event',
    isImportant: false
  },
  {
    id: '3',
    title: '겨울 독서 이벤트',
    content: '겨울 시즌을 맞아 독서 이벤트를 진행합니다. 3권 이상 대여 시 연장 횟수가 1회 추가됩니다.',
    date: '2024-02-05',
    type: 'event',
    isImportant: false
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    bookId: '1',
    userId: 'user1',
    userName: '독서왕김씨',
    rating: 5,
    comment: '정말 감동적인 작품이었습니다. 성장의 과정을 아름답게 그려낸 소설이네요.',
    date: '2024-02-10',
    likes: 15
  },
  {
    id: '2',
    bookId: '2',
    userId: 'user2',
    userName: '코드마스터',
    rating: 5,
    comment: '프로그래머라면 꼭 읽어야 할 필독서입니다. 실무에 바로 적용할 수 있는 내용들이 가득해요.',
    date: '2024-02-09',
    likes: 23
  },
  {
    id: '3',
    bookId: '3',
    userId: 'user3',
    userName: '역사애호가',
    rating: 4,
    comment: '인류사에 대한 새로운 관점을 제시하는 흥미로운 책입니다. 다소 어려운 부분도 있지만 읽을 가치가 있어요.',
    date: '2024-02-08',
    likes: 18
  }
];

export const categories = [
  '전체',
  '문학',
  'IT/프로그래밍',
  '역사/철학',
  '경제/경영',
  '자기계발',
  '과학',
  '예술',
  '요리',
  '여행',
  '건강',
  '육아/교육'
];