import { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { supplierApi } from "../../../api/supplier";
import { showAlert } from "../../../utils/alert";
import SupplierModal from "./SupplierModal";
import ViewSupplierModal from "./ViewSupplierModal";

export default function SuppliersList() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [modalMode, setModalMode] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await supplierApi.getAll();
      let data = response.data.suppliers || response.data.data || response.data;

      // Ensure each supplier has is_active field (default to true/active)
      if (Array.isArray(data)) {
        data = data.map((sup) => ({
          ...sup,
          is_active: sup.is_active !== undefined ? sup.is_active : true,
        }));
      }

      setSuppliers(data);
    } catch (error) {
      await showAlert.error("Error", "Failed to load suppliers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter(
    (sup) =>
      sup.fname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sup.lname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sup.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sup.phone?.includes(searchTerm) ||
      sup.sup_code?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const paginated = filteredSuppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = async (supplier) => {
    const result = await showAlert.confirmDelete(
      `${supplier.fname} ${supplier.lname}`,
    );
    if (result.isConfirmed) {
      try {
        await supplierApi.delete(supplier.id);
        await showAlert.success("Deleted!", "Supplier removed.");
        fetchSuppliers();
      } catch (error) {
        await showAlert.error(
          "Error",
          error.response?.data?.message || "Delete failed",
        );
      }
    }
  };

  const handleStatusToggle = async (supplier) => {
    // Convert is_active (boolean) to status string for API
    const currentStatus = supplier.is_active ? "active" : "inactive";
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    console.log("Toggling status:", {
      id: supplier.id,
      currentStatus,
      newStatus,
      isActive: supplier.is_active,
    });

    try {
      const response = await supplierApi.updateStatus(supplier.id, newStatus);
      console.log("Status update response:", response.data);

      await showAlert.success(
        "Status Updated",
        `Supplier marked as ${newStatus}`,
      );
      fetchSuppliers(); // Refresh the list
    } catch (error) {
      console.error("Status update error:", error);
      await showAlert.error(
        "Error",
        error.response?.data?.message || "Status update failed",
      );
    }
  };

  const StatusBadge = ({ isActive }) => {
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
      >
        {isActive ? "Active" : "Inactive"}
      </span>
    );
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Suppliers
          </h1>
          <p className="text-gray-500 mt-1">Manage your suppliers</p>
        </div>
        <button
          onClick={() => {
            setSelectedSupplier(null);
            setModalMode("add");
          }}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:opacity-90"
        >
          <FaPlus size={16} /> Add Supplier
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone or supplier code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Balance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginated.length === 0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No suppliers found
                      </td>
                    </tr>
                  ) : (
                    paginated.map((sup, idx) => (
                      <tr key={sup.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {(currentPage - 1) * itemsPerPage + idx + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-700">
                          {sup.sup_code}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {sup.fname} {sup.lname}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {sup.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {sup.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          LKR{parseFloat(sup.currentBalance || 0).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleStatusToggle(sup)}
                            className="flex items-center gap-2 hover:opacity-80 transition"
                          >
                            {sup.is_active ? (
                              <FaToggleOn className="text-green-600 text-xl" />
                            ) : (
                              <FaToggleOff className="text-gray-400 text-xl" />
                            )}
                            <StatusBadge isActive={sup.is_active} />
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedSupplier(sup);
                                setModalMode("view");
                              }}
                              className="text-blue-600 hover:text-blue-800 transition"
                              title="View"
                            >
                              <FaEye size={18} />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedSupplier(sup);
                                setModalMode("edit");
                              }}
                              className="text-green-600 hover:text-green-800 transition"
                              title="Edit"
                            >
                              <FaEdit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(sup)}
                              className="text-red-600 hover:text-red-800 transition"
                              title="Delete"
                            >
                              <FaTrash size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(
                    currentPage * itemsPerPage,
                    filteredSuppliers.length,
                  )}{" "}
                  of {filteredSuppliers.length}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Prev
                  </button>
                  <span className="px-3 py-1 text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {modalMode === "add" && (
        <SupplierModal
          mode="add"
          isOpen
          onClose={() => setModalMode(null)}
          onSuccess={fetchSuppliers}
        />
      )}
      {modalMode === "edit" && selectedSupplier && (
        <SupplierModal
          mode="edit"
          supplier={selectedSupplier}
          isOpen
          onClose={() => {
            setModalMode(null);
            setSelectedSupplier(null);
          }}
          onSuccess={fetchSuppliers}
        />
      )}
      {modalMode === "view" && selectedSupplier && (
        <ViewSupplierModal
          supplier={selectedSupplier}
          isOpen
          onClose={() => {
            setModalMode(null);
            setSelectedSupplier(null);
          }}
          onEdit={() => setModalMode("edit")}
        />
      )}
    </div>
  );
}
