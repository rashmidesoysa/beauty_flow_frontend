import { useState, useEffect } from "react";
import { FaTimes, FaSpinner, FaImage, FaTrash } from "react-icons/fa";
import { itemApi } from "../../../api/item";
import { categoryApi } from "../../../api/category";
import { subcategoryApi } from "../../../api/subcategory";
import { brandApi } from "../../../api/brand";
import { supplierApi } from "../../../api/supplier";
import { getImageUrl } from "../../../utils/helpers";
import { showAlert } from "../../../utils/alert";

export default function ItemModal({ mode, item, isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [loadingRelations, setLoadingRelations] = useState(true);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    serial_number: "",
    batch_number: "",
    barcode: "",
    supplier_id: "",
    brand_id: "",
    category_id: "",
    sub_category_id: "",
    cost_price: "",
    list_price: "",
    avg_price: "",
    unit_pack: "",
    unit_of_measure: "",
    group_code: "",
    type_code: "",
    price_level: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch relationships data
  useEffect(() => {
    const fetchRelations = async () => {
      try {
        setLoadingRelations(true);
        const [catRes, brandRes, supRes] = await Promise.all([
          categoryApi.getAll(),
          brandApi.getAll(),
          supplierApi.getAll(),
        ]);
        setCategories(catRes.data.data || catRes.data);
        setBrands(brandRes.data.data || brandRes.data);
        setSuppliers(supRes.data.suppliers || supRes.data.data || supRes.data);
      } catch (error) {
        console.error("Error fetching relations:", error);
      } finally {
        setLoadingRelations(false);
      }
    };
    fetchRelations();
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
    if (mode === "edit" && item) {
      setFormData({
        item_name: item.item_name || "",
        description: item.description || "",
        serial_number: item.serial_number || "",
        batch_number: item.batch_number || "",
        barcode: item.barcode || "",
        supplier_id: item.supplier_id || "",
        brand_id: item.brand_id || "",
        category_id: item.category_id || "",
        sub_category_id: item.sub_category_id || "",
        cost_price: item.cost_price || "",
        list_price: item.list_price || "",
        avg_price: item.avg_price || "",
        unit_pack: item.unit_pack || "",
        unit_of_measure: item.unit_of_measure || "",
        group_code: item.group_code || "",
        type_code: item.type_code || "",
        price_level: item.price_level || "",
        image: null,
      });
      setImagePreview(item.image_url ? getImageUrl(item.image_url) : null);
    } else {
      setFormData({
        item_name: "",
        description: "",
        serial_number: "",
        batch_number: "",
        barcode: "",
        supplier_id: "",
        brand_id: "",
        category_id: "",
        sub_category_id: "",
        cost_price: "",
        list_price: "",
        avg_price: "",
        unit_pack: "",
        unit_of_measure: "",
        group_code: "",
        type_code: "",
        price_level: "",
        image: null,
      });
      setImagePreview(null);
    }
    setErrors({});
  }, [mode, item]);

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
      submitData.append("item_name", formData.item_name);
      if (formData.description)
        submitData.append("description", formData.description);
      if (formData.serial_number)
        submitData.append("serial_number", formData.serial_number);
      if (formData.batch_number)
        submitData.append("batch_number", formData.batch_number);
      if (formData.barcode) submitData.append("barcode", formData.barcode);
      if (formData.supplier_id)
        submitData.append("supplier_id", formData.supplier_id);
      if (formData.brand_id) submitData.append("brand_id", formData.brand_id);
      submitData.append("category_id", formData.category_id);
      if (formData.sub_category_id)
        submitData.append("sub_category_id", formData.sub_category_id);
      if (formData.cost_price)
        submitData.append("cost_price", formData.cost_price);
      if (formData.list_price)
        submitData.append("list_price", formData.list_price);
      if (formData.avg_price)
        submitData.append("avg_price", formData.avg_price);
      if (formData.unit_pack)
        submitData.append("unit_pack", formData.unit_pack);
      if (formData.unit_of_measure)
        submitData.append("unit_of_measure", formData.unit_of_measure);
      if (formData.group_code)
        submitData.append("group_code", formData.group_code);
      if (formData.type_code)
        submitData.append("type_code", formData.type_code);
      if (formData.price_level)
        submitData.append("price_level", formData.price_level);
      if (formData.image) submitData.append("image", formData.image);

      if (mode === "add") {
        await itemApi.create(submitData);
        await showAlert.success("Success", "Item created successfully");
      } else {
        await itemApi.update(item.id, submitData);
        await showAlert.success("Success", "Item updated successfully");
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
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">
              {mode === "add" ? "Add New Item" : "Edit Item"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Information */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1 font-medium">
                  Item Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.item_name}
                  onChange={(e) =>
                    setFormData({ ...formData, item_name: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 ${errors.item_name ? "border-red-500" : "border-gray-300"}`}
                  required
                />
                {errors.item_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.item_name[0]}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1 font-medium">
                  Description
                </label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Category Selection */}
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
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
                  disabled={loadingRelations}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category_id[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Sub Category
                </label>
                <select
                  value={formData.sub_category_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sub_category_id: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  disabled={!formData.category_id}
                >
                  <option value="">Select Sub Category</option>
                  {subcategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand & Supplier */}
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Brand
                </label>
                <select
                  value={formData.brand_id}
                  onChange={(e) =>
                    setFormData({ ...formData, brand_id: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Select Brand</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Supplier
                </label>
                <select
                  value={formData.supplier_id}
                  onChange={(e) =>
                    setFormData({ ...formData, supplier_id: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map((sup) => (
                    <option key={sup.id} value={sup.id}>
                      {sup.fname} {sup.lname}
                    </option>
                  ))}
                </select>
              </div>

              {/* Identification */}
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Serial Number
                </label>
                <input
                  type="text"
                  value={formData.serial_number}
                  onChange={(e) =>
                    setFormData({ ...formData, serial_number: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
                {errors.serial_number && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.serial_number[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Batch Number
                </label>
                <input
                  type="text"
                  value={formData.batch_number}
                  onChange={(e) =>
                    setFormData({ ...formData, batch_number: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Barcode
                </label>
                <input
                  type="text"
                  value={formData.barcode}
                  onChange={(e) =>
                    setFormData({ ...formData, barcode: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
                {errors.barcode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.barcode[0]}
                  </p>
                )}
              </div>

              {/* Pricing */}
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Cost Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.cost_price}
                  onChange={(e) =>
                    setFormData({ ...formData, cost_price: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  List Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.list_price}
                  onChange={(e) =>
                    setFormData({ ...formData, list_price: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Average Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.avg_price}
                  onChange={(e) =>
                    setFormData({ ...formData, avg_price: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Inventory Units */}
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Unit Pack
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.unit_pack}
                  onChange={(e) =>
                    setFormData({ ...formData, unit_pack: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Unit of Measure
                </label>
                <input
                  type="text"
                  value={formData.unit_of_measure}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      unit_of_measure: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  placeholder="e.g., Pcs, Kg, Box"
                />
              </div>

              {/* Classification */}
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Group Code
                </label>
                <input
                  type="text"
                  value={formData.group_code}
                  onChange={(e) =>
                    setFormData({ ...formData, group_code: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Type Code
                </label>
                <input
                  type="text"
                  value={formData.type_code}
                  onChange={(e) =>
                    setFormData({ ...formData, type_code: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Price Level
                </label>
                <input
                  type="text"
                  value={formData.price_level}
                  onChange={(e) =>
                    setFormData({ ...formData, price_level: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1 font-medium">
                  Item Image
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
                      <FaTrash size={10} />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-pink-500 hover:bg-pink-50 transition">
                      <FaImage
                        className="mx-auto text-gray-400 mb-2"
                        size={24}
                      />
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
                  <p className="text-red-500 text-sm mt-1">{errors.image[0]}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Saving...
                  </>
                ) : mode === "add" ? (
                  "Create Item"
                ) : (
                  "Update Item"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
