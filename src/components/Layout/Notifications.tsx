type Props = { onClose: () => void };

export default function Notifications({ onClose }: Props) {
  // 샘플 알림 데이터
  const items = [
    { id: 1, text: "『데미안』 반납 예정일이 3일 남았어요." },
    { id: 2, text: "신간 『클린 아키텍처』가 입고되었습니다." },
  ];

  return (
    <div className="relative">
      <div className="absolute right-4 mt-2 w-80 rounded-xl bg-white p-3 text-gray-900 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">알림</span>
          <button className="text-sm text-blue-600" onClick={onClose}>
            닫기
          </button>
        </div>
        <ul className="space-y-2 max-h-64 overflow-auto">
          {items.map((n) => (
            <li
              key={n.id}
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
            >
              {n.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
