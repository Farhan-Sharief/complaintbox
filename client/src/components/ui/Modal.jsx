export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-gray-900 p-6 rounded-2xl w-96 border border-gray-800 shadow-xl">
        {children}
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-400 hover:text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}