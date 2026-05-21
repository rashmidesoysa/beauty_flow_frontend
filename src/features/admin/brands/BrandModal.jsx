import { useState, useEffect } from "react";
import { FaTimes, FaSpinner, FaImage, FaTrash } from "react-icons/fa";
import { brandApi } from "../../../api/brand";
import { categoryApi } from "../../../api/category";
import { subcategoryApi } from "../../../api/subcategory";
import { getImageUrl } from "../../../utils/helpers";
import { showAlert } from "../../../utils/alert";

export default function BrandModal({
  mode,
  brand,
  isOpen,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [formData, setFormData] = useState({
    category_id: "",
    sub_category_id: "",
    name: "",
    description: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getAll();
        setCategories(response.data.data || response.data);
      } catch (error) {
        await showAlert.error("Error", "Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (formData.category_id) {
      const fetchSubcategories = async () => {
        try {
          const response = await subcategoryApi.getAll();
          const allSubs = response.data.data || response.data;
          const filtered = allSubs.filter(
            (sub) => sub.category_id == formData.category_id,
          );
          setSubcategories(filtered);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      };
      fetchSubcategories();
    } else {
      setSubcategories([]);
    }
  }, [formData.category_id]);

  // Populate form when editing
  useEffect(() => {
    if (mode === "edit" && brand) {
      setFormData({
        category_id: brand.category_id || "",
        sub_category_id: brand.sub_category_id || "",
        name: brand.name || "",
        description: brand.description || "",
        image: null,
      });
      setImagePreview(brand.image_url ? getImageUrl(brand.image_url) : null);
    } else {
      setFormData({
        category_id: "",
        sub_category_id: "",
        name: "",
        description: "",
        image: null,
      });
      setImagePreview(null);
    }
    setErrors({});
  }, [mode, brand]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showAlert.error("Error", "Image size should be less than 2MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        showAlert.error("Error", "Please upload an image file");
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const submitData = new FormData();
      submitData.append("category_id", formData.category_id);
      if (formData.sub_category_id)
        submitData.append("sub_category_id", formData.sub_category_id);
      submitData.append("name", formData.name);
      if (formData.description)
        submitData.append("description", formData.description);
      if (formData.image) submitData.append("image", formData.image);

      if (mode === "add") {
        await brandApi.create(submitData);
        await showAlert.success("Success", "Brand created successfully");
      } else {
        await brandApi.update(brand.id, submitData);
        await showAlert.success("Success", "Brand updated successfully");
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
              {mode === "add" ? "Add Brand" : "Edit Brand"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6">
            {/* Category Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category_id: e.target.value,
                    sub_category_id: "",
                  })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 ${errors.category_id ? "border-red-500" : "border-gray-300"}`}
                required
                disabled={loadingCategories}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.category_id[0]}
                </p>
              )}
            </div>

            {/* Subcategory Dropdown (optional) */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">
                Subcategory (optional)
              </label>
              <select
                value={formData.sub_category_id}
                onChange={(e) =>
                  setFormData({ ...formData, sub_category_id: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                disabled={!formData.category_id}
              >
                <option value="">Select subcategory (optional)</option>
                {subcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                required
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name[0]}</p>
              )}
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">
                Description
              </label>
              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Image */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">
                Image (optional)
              </label>
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg border-2 border-pink-300"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-pink-500 hover:bg-pink-50 transition">
                    <FaImage className="mx-auto text-gray-400 mb-2" size={24} />
                    <span className="text-sm text-gray-500">
                      Click to upload image
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      JPG, PNG, GIF (Max 2MB)
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </label>
              )}
              {errors.image && (
                <p className="mt-1 text-sm text-red-500">{errors.image[0]}</p>
              )}
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
