import React, { Fragment } from "react";

type Props = { open: boolean; onClose: () => void };

const CartDrawer: React.FC<Props> = ({ open, onClose }) => {
  if (!open) return null;

  const cart = [
    { id: 101, title: "클린 코드", author: "로버트 C. 마틴" },
    { id: 102, title: "데미안", author: "헤르만 헤세" },
  ];

  return (
    <Fragment>
      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} aria-hidden="true" />
      <aside className="fixed right-0 top-0 z-50 h-full w-[22rem] bg-white shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="font-semibold">장바구니</h2>
          <button className="text-blue-600" onClick={onClose}>닫기</button>
        </div>
        <div className="p-4 space-y-3">
          {cart.map((b) => (
            <div key={b.id} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="font-medium">{b.title}</div>
              <div className="text-sm text-gray-600">{b.author}</div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <button className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700">
            대여 신청으로 이동
          </button>
        </div>
      </aside>
    </Fragment>
  );
};

export default CartDrawer;
