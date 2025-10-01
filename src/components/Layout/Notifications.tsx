import React from 'react';

export type NotificationItem = { id: string; text: string };

type Props = {
  items: NotificationItem[];
  onClose: () => void;
  onClear: () => void;
};

const Notifications: React.FC<Props> = ({ items, onClose, onClear }) => {
  return (
    <div className="relative z-50">
      <div className="absolute right-4 mt-2 w-80 rounded-xl bg-white p-3 text-gray-900 shadow-lg">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-semibold">알림</span>
          <div className="flex items-center gap-3">
            {items.length > 0 && (
              <button className="text-sm text-gray-600 hover:text-gray-900" onClick={onClear}>
                모두 지우기
              </button>
            )}
            <button className="text-sm text-blue-600" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-6 text-center text-sm text-gray-500">
            새 알림이 없습니다.
          </div>
        ) : (
          <ul className="max-h-64 space-y-2 overflow-auto">
            {items.map((n) => (
              <li key={n.id} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
                {n.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;
