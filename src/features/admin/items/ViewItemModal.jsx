import {
  FaTimes,
  FaEdit,
  FaUser,
  FaCalendarAlt,
  FaTag,
  FaBox,
  FaBarcode,
  FaDollarSign,
  FaWeightHanging,
  FaBuilding,
  FaCube,
} from "react-icons/fa";
import { getImageUrl } from "../../../utils/helpers";

export default function ViewItemModal({ item, isOpen, onClose, onEdit }) {
  if (!isOpen || !item) return null;

  const isActive =
    item.status === true || item.status === 1 || item.is_active === true;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Item Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <div className="p-6">
            {/* Header with Image */}
            <div className="flex gap-6 flex-wrap md:flex-nowrap mb-6 pb-6 border-b">
              {item.image_url ? (
                <img
                  src={getImageUrl(item.image_url)}
                  alt={item.item_name}
                  className="w-32 h-32 object-cover rounded-lg shadow"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <FaBox className="text-gray-400 text-4xl" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {item.item_name}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
                  <FaTag size={12} /> Code:{" "}
                  <span className="font-mono">{item.item_code}</span>
                </div>
                {item.barcode && (
                  <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
                    <FaBarcode size={12} /> Barcode: {item.barcode}
                  </div>
                )}
                {item.description && (
                  <p className="mt-3 text-gray-600">{item.description}</p>
                )}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category Information */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Category
                </p>
                <p className="font-medium text-gray-800">
                  {item.category_name || "-"}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Sub Category
                </p>
                <p className="font-medium text-gray-800">
                  {item.sub_category_name || "-"}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <FaBuilding size={10} /> Brand
                </p>
                <p className="font-medium text-gray-800">
                  {item.brand_name || "-"}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <FaUser size={10} /> Supplier
                </p>
                <p className="font-medium text-gray-800">
                  {item.supplier_name || "-"}
                </p>
              </div>

              {/* Identification */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Serial Number
                </p>
                <p className="font-mono text-sm">{item.serial_number || "-"}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Batch Number
                </p>
                <p className="font-medium">{item.batch_number || "-"}</p>
              </div>

              {/* Pricing */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <FaDollarSign size={10} /> Cost Price
                </p>
                <p className="font-medium text-gray-800">
                  ${parseFloat(item.cost_price || 0).toFixed(2)}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <FaDollarSign size={10} /> List Price
                </p>
                <p className="font-medium text-gray-800">
                  ${parseFloat(item.list_price || 0).toFixed(2)}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <FaDollarSign size={10} /> Average Price
                </p>
                <p className="font-medium text-gray-800">
                  ${parseFloat(item.avg_price || 0).toFixed(2)}
                </p>
              </div>

              {/* Units */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <FaWeightHanging size={10} /> Unit Pack
                </p>
                <p className="font-medium">{item.unit_pack || "-"}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <FaCube size={10} /> Unit of Measure
                </p>
                <p className="font-medium">{item.unit_of_measure || "-"}</p>
              </div>

              {/* Classification */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Group Code
                </p>
                <p className="font-medium">{item.group_code || "-"}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Type Code
                </p>
                <p className="font-medium">{item.type_code || "-"}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  Price Level
                </p>
                <p className="font-medium">{item.price_level || "-"}</p>
              </div>

              {/* Audit Information */}
              <div className="md:col-span-2 border-t pt-4 mt-2">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Audit Information
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <FaUser size={10} /> Created By
                    </p>
                    <p className="font-medium text-gray-800">
                      {item.created_by_name || `User #${item.created_by}`}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <FaCalendarAlt size={10} /> Created Date
                    </p>
                    <p className="text-sm text-gray-800">
                      {item.created_at
                        ? new Date(item.created_at).toLocaleString()
                        : "-"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <FaCalendarAlt size={10} /> Last Updated
                    </p>
                    <p className="text-sm text-gray-800">
                      {item.updated_at
                        ? new Date(item.updated_at).toLocaleString()
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white flex justify-end gap-3 p-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEdit();
              }}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:opacity-90 transition flex items-center gap-2"
            >
              <FaEdit size={14} />
              Edit Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
