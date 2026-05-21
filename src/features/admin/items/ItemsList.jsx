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
import { itemApi } from "../../../api/item";
import { getImageUrl } from "../../../utils/helpers";
import { showAlert } from "../../../utils/alert";
import ItemModal from "./ItemModal";
import ViewItemModal from "./ViewItemModal";

export default function ItemsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [modalMode, setModalMode] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await itemApi.getAll();
      const data = response.data.data || response.data;
      setItems(data);
    } catch (error) {
      await showAlert.error("Error", "Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.item_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.item_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginated = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = async (item) => {
    const result = await showAlert.confirmDelete(item.item_name);
    if (result.isConfirmed) {
      try {
        await itemApi.delete(item.id);
        await showAlert.success("Deleted!", "Item removed.");
        fetchItems();
      } catch (error) {
        await showAlert.error(
          "Error",
          error.response?.data?.message || "Delete failed",
        );
      }
    }
  };

  const handleStatusToggle = async (item) => {
    try {
      await itemApi.updateStatus(item.id);
      await showAlert.success(
        "Status Updated",
        `Item ${item.status ? "deactivated" : "activated"} successfully`,
      );
      fetchItems();
    } catch (error) {
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
            Items
          </h1>
          <p className="text-gray-500 mt-1">Manage your inventory items</p>
        </div>
        <button
          onClick={() => {
            setSelectedItem(null);
            setModalMode("add");
          }}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:opacity-90"
        >
          <FaPlus size={16} /> Add Item
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, code or barcode..."
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
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      List Price
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
                        No items found
                      </td>
                    </tr>
                  ) : (
                    paginated.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {(currentPage - 1) * itemsPerPage + idx + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.image_url && (
                            <img
                              src={getImageUrl(item.image_url)}
                              alt={item.item_name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-700">
                          {item.item_code}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {item.item_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {item.category_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          ${parseFloat(item.list_price || 0).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleStatusToggle(item)}
                            className="flex items-center gap-2 hover:opacity-80 transition"
                          >
                            {item.status ? (
                              <FaToggleOn className="text-green-600 text-xl" />
                            ) : (
                              <FaToggleOff className="text-gray-400 text-xl" />
                            )}
                            <StatusBadge isActive={item.status} />
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedItem(item);
                                setModalMode("view");
                              }}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <FaEye size={18} />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedItem(item);
                                setModalMode("edit");
                              }}
                              className="text-green-600 hover:text-green-800"
                            >
                              <FaEdit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(item)}
                              className="text-red-600 hover:text-red-800"
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
                  {Math.min(currentPage * itemsPerPage, filteredItems.length)}{" "}
                  of {filteredItems.length}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span className="px-3 py-1">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50"
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
        <ItemModal
          mode="add"
          isOpen
          onClose={() => setModalMode(null)}
          onSuccess={fetchItems}
        />
      )}
      {modalMode === "edit" && selectedItem && (
        <ItemModal
          mode="edit"
          item={selectedItem}
          isOpen
          onClose={() => {
            setModalMode(null);
            setSelectedItem(null);
          }}
          onSuccess={fetchItems}
        />
      )}
      {modalMode === "view" && selectedItem && (
        <ViewItemModal
          item={selectedItem}
          isOpen
          onClose={() => {
            setModalMode(null);
            setSelectedItem(null);
          }}
          onEdit={() => setModalMode("edit")}
        />
      )}
    </div>
  );
}
