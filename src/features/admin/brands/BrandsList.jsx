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
import { brandApi } from "../../../api/brand";
import { getImageUrl } from "../../../utils/helpers";
import { showAlert } from "../../../utils/alert";
import BrandModal from "./BrandModal";
import ViewBrandModal from "./ViewBrandModal";

export default function BrandsList() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [modalMode, setModalMode] = useState(null); // 'add', 'edit', 'view'
  const [selectedBrand, setSelectedBrand] = useState(null);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await brandApi.getAll();
      setBrands(response.data.data || response.data);
    } catch (error) {
      await showAlert.error("Error", "Failed to load brands");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const filteredBrands = brands.filter(
    (brand) =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (brand.description &&
        brand.description.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);
  const paginatedBrands = filteredBrands.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = async (brand) => {
    const result = await showAlert.confirmDelete(brand.name);
    if (result.isConfirmed) {
      try {
        await brandApi.delete(brand.id);
        await showAlert.success("Deleted!", "Brand removed.");
        fetchBrands();
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
            Brands
          </h1>
          <p className="text-gray-500 mt-1">Manage product brands</p>
        </div>
        <button
          onClick={() => {
            setSelectedBrand(null);
            setModalMode("add");
          }}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:opacity-90"
        >
          <FaPlus size={16} /> Add Brand
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
                      Subcategory
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
                  {paginatedBrands.length === 0 ? (
                    <tr>
                      <td
                        colSpan="9"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No brands found
                      </td>
                    </tr>
                  ) : (
                    paginatedBrands.map((brand, idx) => (
                      <tr
                        key={brand.id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {(currentPage - 1) * itemsPerPage + idx + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {brand.image_url && (
                            <img
                              src={getImageUrl(brand.image_url)}
                              alt={brand.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {brand.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {brand.category?.name || `Cat #${brand.category_id}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {brand.sub_category
                            ? brand.sub_category.name
                            : brand.sub_category_id
                              ? `Sub #${brand.sub_category_id}`
                              : "-"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                          {brand.description || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {brand.created_by_name || `User #${brand.created_by}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {brand.created_at
                            ? new Date(brand.created_at).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedBrand(brand);
                                setModalMode("view");
                              }}
                              className="text-blue-600 hover:text-blue-800"
                              title="View"
                            >
                              <FaEye size={18} />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedBrand(brand);
                                setModalMode("edit");
                              }}
                              className="text-green-600 hover:text-green-800"
                              title="Edit"
                            >
                              <FaEdit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(brand)}
                              className="text-red-600 hover:text-red-800"
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
                  {Math.min(currentPage * itemsPerPage, filteredBrands.length)}{" "}
                  of {filteredBrands.length}
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
        <BrandModal
          mode="add"
          isOpen
          onClose={() => setModalMode(null)}
          onSuccess={fetchBrands}
        />
      )}
      {modalMode === "edit" && selectedBrand && (
        <BrandModal
          mode="edit"
          brand={selectedBrand}
          isOpen
          onClose={() => {
            setModalMode(null);
            setSelectedBrand(null);
          }}
          onSuccess={fetchBrands}
        />
      )}
      {modalMode === "view" && selectedBrand && (
        <ViewBrandModal
          brand={selectedBrand}
          isOpen
          onClose={() => {
            setModalMode(null);
            setSelectedBrand(null);
          }}
          onEdit={() => setModalMode("edit")}
        />
      )}
    </div>
  );
}
