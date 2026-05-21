import { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { subcategoryApi } from "../../../api/subcategory";
import { getImageUrl } from "../../../utils/helpers";
import { showAlert } from "../../../utils/alert";
import SubCategoryModal from "./SubCategoryModal";
import ViewSubCategoryModal from "./ViewSubCategoryModal";

export default function SubCategoriesList() {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [modalMode, setModalMode] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // Fetch subcategories
  const fetchSubCategories = async () => {
    try {
      setLoading(true);
      const response = await subcategoryApi.getAll();
      console.log("API Response:", response.data);
      // Extract the data array from the response
      const data = response.data.data || response.data;
      setSubCategories(data);
    } catch (error) {
      console.error("Error:", error);
      await showAlert.error("Error", "Failed to load subcategories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  // Filter subcategories
  const filteredSubCategories = subCategories.filter(
    (sub) =>
      sub.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sub.description &&
        sub.description.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const totalPages = Math.ceil(filteredSubCategories.length / itemsPerPage);
  const paginatedSubCategories = filteredSubCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = async (sub) => {
    const result = await showAlert.confirmDelete(sub.name);
    if (result.isConfirmed) {
      try {
        await subcategoryApi.delete(sub.id);
        await showAlert.success("Deleted!", "Subcategory removed.");
        fetchSubCategories();
      } catch (error) {
        await showAlert.error(
          "Error",
          error.response?.data?.message || "Delete failed",
        );
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Subcategories
          </h1>
          <p className="text-gray-500 mt-1">Manage product subcategories</p>
        </div>
        <button
          onClick={() => {
            setSelectedSubCategory(null);
            setModalMode("add");
          }}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:opacity-90"
        >
          <FaPlus size={16} /> Add Subcategory
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or description..."
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
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Created By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Created Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedSubCategories.length === 0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No subcategories found
                      </td>
                    </tr>
                  ) : (
                    paginatedSubCategories.map((sub, idx) => (
                      <tr key={sub.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {(currentPage - 1) * itemsPerPage + idx + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {sub.image_url && (
                            <img
                              src={getImageUrl(sub.image_url)}
                              alt={sub.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {sub.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                            {/* Use category.name from the nested category object */}
                            {sub.category?.name ||
                              `Category #${sub.category_id}`}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                          {sub.description || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {sub.created_by_name || `User #${sub.created_by}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {sub.created_at
                            ? new Date(sub.created_at).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedSubCategory(sub);
                                setModalMode("view");
                              }}
                              className="text-blue-600 hover:text-blue-800 transition"
                              title="View"
                            >
                              <FaEye size={18} />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedSubCategory(sub);
                                setModalMode("edit");
                              }}
                              className="text-green-600 hover:text-green-800 transition"
                              title="Edit"
                            >
                              <FaEdit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(sub)}
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(
                    currentPage * itemsPerPage,
                    filteredSubCategories.length,
                  )}{" "}
                  of {filteredSubCategories.length}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <FaChevronLeft size={14} />
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
                    <FaChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {modalMode === "add" && (
        <SubCategoryModal
          mode="add"
          isOpen
          onClose={() => setModalMode(null)}
          onSuccess={fetchSubCategories}
        />
      )}

      {modalMode === "edit" && selectedSubCategory && (
        <SubCategoryModal
          mode="edit"
          subcategory={selectedSubCategory}
          isOpen
          onClose={() => {
            setModalMode(null);
            setSelectedSubCategory(null);
          }}
          onSuccess={fetchSubCategories}
        />
      )}

      {modalMode === "view" && selectedSubCategory && (
        <ViewSubCategoryModal
          subcategory={selectedSubCategory}
          isOpen
          onClose={() => {
            setModalMode(null);
            setSelectedSubCategory(null);
          }}
          onEdit={() => setModalMode("edit")}
        />
      )}
    </div>
  );
}
