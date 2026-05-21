import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

export default function DeleteConfirmationModal({
  isOpen,
  category,
  onConfirm,
  onClose,
}) {
  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <FaExclamationTriangle className="text-red-600 text-xl" />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">
              Delete Category
            </h3>

            <p className="text-center text-gray-600 mb-6">
              Are you sure you want to delete the category{" "}
              <strong className="text-red-600">"{category.name}"</strong>?
              <br />
              <span className="text-sm text-gray-500">
                This action cannot be undone.
              </span>
            </p>

            {category.products_count > 0 && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 text-center">
                  ⚠️ Warning: This category has {category.products_count}{" "}
                  product(s). Deleting it may affect these products.
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Delete Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
