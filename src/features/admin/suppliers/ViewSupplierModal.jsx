import {
  FaTimes,
  FaEdit,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaBarcode,
  FaMoneyBill,
  FaStickyNote,
  FaCalendarAlt,
} from "react-icons/fa";

export default function ViewSupplierModal({
  supplier,
  isOpen,
  onClose,
  onEdit,
}) {
  if (!isOpen || !supplier) return null;

  // Determine status display from either is_active (boolean) or status (string)
  const isActive =
    supplier.is_active === true ||
    supplier.is_active === 1 ||
    supplier.status === "active";
  const statusText = isActive ? "Active" : "Inactive";
  const statusColor = isActive
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Supplier Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Code */}
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaUser size={12} /> Code
                </p>
                <p className="font-mono text-gray-800">{supplier.sup_code}</p>
              </div>

              {/* Name */}
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaUser size={12} /> Name
                </p>
                <p className="font-medium text-gray-800">
                  {supplier.fname} {supplier.lname}
                </p>
              </div>

              {/* Email */}
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaEnvelope size={12} /> Email
                </p>
                <p className="text-gray-800">{supplier.email}</p>
              </div>

              {/* Phone */}
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaPhone size={12} /> Phone
                </p>
                <p className="text-gray-800">{supplier.phone}</p>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaMapMarkerAlt size={12} /> Address
                </p>
                <p className="text-gray-800">{supplier.address || "-"}</p>
              </div>

              {/* City */}
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaCity size={12} /> City
                </p>
                <p className="text-gray-800">{supplier.city || "-"}</p>
              </div>

              {/* Tax Code */}
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaBarcode size={12} /> Tax Code
                </p>
                <p className="text-gray-800">{supplier.Taxcode || "-"}</p>
              </div>

              {/* Current Balance */}
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaMoneyBill size={12} /> Current Balance
                </p>
                <p className="text-gray-800 font-medium">
                  LKR{parseFloat(supplier.currentBalance || 0).toFixed(2)}
                </p>
              </div>

              {/* Status */}
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
                >
                  {statusText}
                </span>
              </div>

              {/* Remarks */}
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaStickyNote size={12} /> Remarks
                </p>
                <p className="text-gray-800">{supplier.remarks || "-"}</p>
              </div>

              {/* Created By */}
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaUser size={12} /> Created By
                </p>
                <p className="text-gray-800">
                  {supplier.created_by_name || `User #${supplier.created_by}`}
                </p>
              </div>

              {/* Created At */}
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaCalendarAlt size={12} /> Created Date
                </p>
                <p className="text-gray-800">
                  {supplier.created_at
                    ? new Date(supplier.created_at).toLocaleString()
                    : "-"}
                </p>
              </div>

              {/* Updated At */}
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaCalendarAlt size={12} /> Last Updated
                </p>
                <p className="text-gray-800">
                  {supplier.updated_at
                    ? new Date(supplier.updated_at).toLocaleString()
                    : "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 p-4 border-t">
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
              Edit Supplier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
