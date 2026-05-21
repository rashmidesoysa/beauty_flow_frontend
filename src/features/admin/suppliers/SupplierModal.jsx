import { useState, useEffect } from "react";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { supplierApi } from "../../../api/supplier";
import { showAlert } from "../../../utils/alert";

export default function SupplierModal({
  mode,
  supplier,
  isOpen,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    Taxcode: "",
    currentBalance: "",
    remarks: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === "edit" && supplier) {
      setFormData({
        fname: supplier.fname || "",
        lname: supplier.lname || "",
        email: supplier.email || "",
        phone: supplier.phone || "",
        address: supplier.address || "",
        city: supplier.city || "",
        Taxcode: supplier.Taxcode || "",
        currentBalance: supplier.currentBalance || "",
        remarks: supplier.remarks || "",
      });
    } else {
      setFormData({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        Taxcode: "",
        currentBalance: "",
        remarks: "",
      });
    }
    setErrors({});
  }, [mode, supplier]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      if (mode === "add") {
        await supplierApi.create(formData);
        await showAlert.success("Success", "Supplier created successfully");
      } else {
        await supplierApi.update(supplier.id, formData);
        await showAlert.success("Success", "Supplier updated successfully");
      }
      onSuccess();
      onClose();
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
        await showAlert.error("Validation Error", "Please check the form");
      } else {
        await showAlert.error(
          "Error",
          error.response?.data?.message || "Operation failed",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">
              {mode === "add" ? "Add Supplier" : "Edit Supplier"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={20} />
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="p-6 max-h-[80vh] overflow-y-auto"
          >
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fname}
                  onChange={(e) =>
                    setFormData({ ...formData, fname: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-pink-500"
                  required
                />
                {errors.fname && (
                  <p className="text-red-500 text-sm mt-1">{errors.fname[0]}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lname}
                  onChange={(e) =>
                    setFormData({ ...formData, lname: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-pink-500"
                  required
                />
                {errors.lname && (
                  <p className="text-red-500 text-sm mt-1">{errors.lname[0]}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-pink-500"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-pink-500"
                  required
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone[0]}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Address
                </label>
                <textarea
                  rows="2"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Tax Code
                </label>
                <input
                  type="text"
                  value={formData.Taxcode}
                  onChange={(e) =>
                    setFormData({ ...formData, Taxcode: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Current Balance
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.currentBalance}
                  onChange={(e) =>
                    setFormData({ ...formData, currentBalance: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Remarks
                </label>
                <textarea
                  rows="2"
                  value={formData.remarks}
                  onChange={(e) =>
                    setFormData({ ...formData, remarks: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Saving...
                  </>
                ) : mode === "add" ? (
                  "Create"
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
