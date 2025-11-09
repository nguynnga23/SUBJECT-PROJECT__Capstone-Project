import { useState } from "react";
import { PiWarningCircleLight } from "react-icons/pi";

function PopupDelete({ isOpen, onConfirm, onCancel, message }) {
  const [closing, setClosing] = useState(false);

  if (!isOpen && !closing) return null;

  const handleClose = (action) => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      action();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div
        className={`bg-white rounded-2xl shadow-xl w-80 sm:w-96 p-6 text-center transition-all ${
          closing ? "animate-slide-out" : "animate-slide-in"
        }`}
      >
        <div className="flex justify-center mb-3">
          <div className="bg-red-100 p-2 rounded-full">
            <PiWarningCircleLight color="red" size={25} />
          </div>
        </div>

        <h2 className="text-lg font-semibold text-red-600 mb-2">
          Xác nhận xóa
        </h2>
        <p className="text-gray-700 mb-5 text-sm">
          {message || "Bạn có chắc chắn muốn xóa dữ liệu này không?"}
        </p>

        <div className="flex justify-center gap-3 text-sm">
          <button
            onClick={() => handleClose(onCancel)}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Hủy
          </button>
          <button
            onClick={() => handleClose(onConfirm)}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupDelete;
