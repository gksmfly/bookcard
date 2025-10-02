import React, { useState } from 'react';
import { HelpCircle, MessageCircle, Phone, Mail, ChevronDown, ChevronUp, Send } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const SupportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact'>('faq');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    category: 'general',
    subject: '',
    message: ''
  });

  const faqs: FAQ[] = [
    {
      id: '1',
      question: '도서 대여는 어떻게 하나요?',
      answer: '도서 검색 페이지에서 원하는 책을 찾아 대여 신청 버튼을 클릭하시면 됩니다. 로그인이 필요하며, 대여 가능한 도서만 신청할 수 있습니다.',
      category: 'rental'
    },
    {
      id: '2',
      question: '대여 기간은 얼마나 되나요?',
      answer: '기본 대여 기간은 2주(14일)입니다. 최대 2회까지 연장 가능하며, 1회 연장 시 1주일이 추가됩니다.',
      category: 'rental'
    },
    {
      id: '3',
      question: '연체료는 얼마인가요?',
      answer: '연체료는 하루당 100원입니다. 연체 기간이 길어질수록 누적되므로 반납 예정일을 꼭 확인해주세요.',
      category: 'rental'
    },
    {
      id: '4',
      question: '회원가입은 어떻게 하나요?',
      answer: '상단 메뉴의 회원가입 버튼을 클릭하여 필요한 정보를 입력하시면 됩니다. 이메일 인증 후 바로 이용 가능합니다.',
      category: 'account'
    },
    {
      id: '5',
      question: '비밀번호를 잊어버렸어요.',
      answer: '로그인 페이지의 "비밀번호 찾기" 링크를 클릭하여 등록된 이메일로 재설정 링크를 받으실 수 있습니다.',
      category: 'account'
    },
    {
      id: '6',
      question: '도서 반납은 어떻게 하나요?',
      answer: '내 서재 페이지에서 대여중인 도서 목록을 확인하고 반납 버튼을 클릭하시면 됩니다. 온라인으로 간편하게 처리됩니다.',
      category: 'return'
    }
  ];

  const categories = [
    { id: 'all', label: '전체' },
    { id: 'rental', label: '대여 관련' },
    { id: 'account', label: '계정 관리' },
    { id: 'return', label: '반납 관련' },
    { id: 'payment', label: '결제/요금' }
  ];

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const handleFAQToggle = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.');
    setContactForm({
      name: '',
      email: '',
      category: 'general',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">고객센터</h1>
          <p className="text-gray-600">궁금한 점이 있으시면 언제든지 문의해주세요</p>
        </div>

        {/* 연락처 정보 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">전화 문의</h3>
            <p className="text-gray-600 text-sm mb-2">평일 09:00 - 18:00</p>
            <p className="text-blue-600 font-medium">1588-1234</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">이메일 문의</h3>
            <p className="text-gray-600 text-sm mb-2">24시간 접수 가능</p>
            <p className="text-green-600 font-medium">support@myshelf.com</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">실시간 채팅</h3>
            <p className="text-gray-600 text-sm mb-2">평일 09:00 - 18:00</p>
            <button className="text-purple-600 font-medium hover:text-purple-700">
              채팅 시작하기
            </button>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('faq')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'faq'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                자주 묻는 질문
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'contact'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                1:1 문의하기
              </button>
            </nav>
          </div>

          {activeTab === 'faq' && (
            <div className="p-6">
              {/* FAQ 카테고리 필터 */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ 목록 */}
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => handleFAQToggle(faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <HelpCircle className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900">{faq.question}</span>
                      </div>
                      {expandedFAQ === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    
                    {expandedFAQ === faq.id && (
                      <div className="px-6 pb-4">
                        <div className="pl-8 text-gray-700 leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="p-6">
              <form onSubmit={handleContactSubmit} className="max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이름 *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="이름을 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이메일 *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="이메일을 입력하세요"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    문의 유형 *
                  </label>
                  <select
                    required
                    value={contactForm.category}
                    onChange={(e) => setContactForm({...contactForm, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 font-medium"
                  >
                    <option value="general">일반 문의</option>
                    <option value="rental">대여 관련</option>
                    <option value="account">계정 관련</option>
                    <option value="technical">기술적 문제</option>
                    <option value="suggestion">개선 제안</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    제목 *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="문의 제목을 입력하세요"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    문의 내용 *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="문의 내용을 자세히 입력해주세요"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Send className="w-4 h-4" />
                  <span>문의 보내기</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportPage;