import {
  FaTimes,
  FaEdit,
  FaUser,
  FaCalendarAlt,
  FaTag,
  FaFolder,
} from "react-icons/fa";
import { getImageUrl } from "../../../utils/helpers";

export default function ViewSubCategoryModal({
  subcategory,
  isOpen,
  onClose,
  onEdit,
}) {
  if (!isOpen || !subcategory) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Subcategory Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <div className="p-6">
            <div className="flex gap-6 flex-wrap md:flex-nowrap">
              {subcategory.image_url && (
                <img
                  src={getImageUrl(subcategory.image_url)}
                  alt={subcategory.name}
                  className="w-32 h-32 object-cover rounded-lg shadow"
                />
              )}
              <div className="flex-1">
                <h3 className="text-2xl font-bold">{subcategory.name}</h3>
                <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
                  <FaTag size={12} /> {subcategory.slug}
                </div>
                {subcategory.category && (
                  <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
                    <FaFolder size={12} /> Parent: {subcategory.category.name}
                  </div>
                )}
                {subcategory.description && (
                  <p className="mt-3 text-gray-600">
                    {subcategory.description}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <FaUser size={12} /> Created By
                    </p>
                    <p className="font-medium">
                      {subcategory.created_by_name ||
                        `User #${subcategory.created_by}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <FaCalendarAlt size={12} /> Created Date
                    </p>
                    <p className="text-sm">
                      {subcategory.created_at
                        ? new Date(subcategory.created_at).toLocaleString()
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <FaCalendarAlt size={12} /> Last Updated
                    </p>
                    <p className="text-sm">
                      {subcategory.updated_at
                        ? new Date(subcategory.updated_at).toLocaleString()
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 p-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEdit();
              }}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold flex items-center gap-2"
            >
              <FaEdit /> Edit Subcategory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
