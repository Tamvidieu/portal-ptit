import React from "react";
import { X } from "lucide-react";
const Dialog = ({ isOpen, onClose, children, title, maxWidth = "2xl" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black opacity-25 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
        <div
          className={`relative w-full max-w-${maxWidth} transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all`}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};
export default Dialog;
