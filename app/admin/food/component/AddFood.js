"use client";
import React, { useRef, useState, useEffect } from "react";
import { CloudUpload, SaveIcon, XIcon } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/lib/url";

const AddFood = ({ onClose, editData }) => {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    status: "available",
    category: "",
  });

  useEffect(() => {
    // Fetch categories on mount
    setLoading(true);
    axios
      .get(`${BASE_URL}/menu/category`)
      .then((response) => {
        setFood(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  // When editData changes (edit mode), populate form and image preview
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        price: editData.price || "",
        status: editData.status || "available",
        category: String(editData.categoryId || editData.category?.id || ""),
      });

      if (editData.image_url) {
        // Make sure image URL is absolute
        let imageUrl = editData.image_url;
        if (!imageUrl.startsWith("http")) {
          imageUrl = `${BASE_URL}${imageUrl}`;
        }
        setPreviewImage(imageUrl);
      } else {
        setPreviewImage(null);
      }

      // Clear selected file because existing image is from URL
      setSelectedFile(null);
    } else {
      // If no editData, clear form and image
      setFormData({
        name: "",
        price: "",
        status: "available",
        category: "",
      });
      setPreviewImage(null);
      setSelectedFile(null);
    }
  }, [editData]);

  const validateAndPreview = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("Only JPG, JPEG, and PNG files are allowed.");
      return;
    }

    if (file.size > maxSize) {
      setErrorMessage("File must be smaller than 5MB.");
      return;
    }

    setErrorMessage("");
    setSelectedFile(file);

    // Preview new selected file with FileReader
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) validateAndPreview(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) validateAndPreview(file);
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile && !previewImage) {
      alert("Please upload an image.");
      return;
    }

    const data = new FormData();

    // Append new file if selected, else skip (use existing image)
    if (selectedFile) {
      data.append("image", selectedFile);
    }

    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("status", formData.status);
    data.append("category", formData.category);

    try {
      if (editData) {
        // Edit mode - PUT or PATCH request to update existing menu
        // Example:
        // await axios.put(`${BASE_URL}/menu/${editData.id}`, data, {
        //   headers: { "Content-Type": "multipart/form-data" },
        // });
        alert("Menu updated successfully!");
      } else {
        // Add mode - POST request to create new menu
        // Example:
        // await axios.post(`${BASE_URL}/menu`, data, {
        //   headers: { "Content-Type": "multipart/form-data" },
        // });
        alert("Menu added successfully!");
      }

      onClose();
    } catch (error) {
      console.error("Error uploading menu:", error);
      alert("Failed to save menu. Please try again.");
    }
  };

  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editData ? "Edit menu" : "Add a menu"}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Image Upload */}
        <div className="mb-8 bg-white rounded shadow-md p-6 lg:h-[320px] h-[350px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Food Image
          </label>

          <div
            className={`border-2 border-dashed rounded-lg transition-all duration-200 
              ${
                previewImage
                  ? "border-transparent"
                  : isDragging
                  ? "border-amber-500 bg-amber-50"
                  : "border-gray-300 hover:border-amber-400"
              }`}
            onClick={() => fileInputRef.current.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            {previewImage ? (
              <div className="relative group">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-1 right-2 flex-1/2 p-2 rounded-full shadow-md  opacity-100 transition-opacity duration-200 bg-gray-100"
                >
                  <XIcon className="h-5 w-5 text-red-500" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center cursor-pointer rounded-lg">
                <div className="bg-amber-100 p-4 rounded-full mb-4">
                  <CloudUpload className="h-8 w-8 text-amber-600" />
                </div>
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-medium text-amber-600">Click here to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400">PNG, JPG, JPEG (max. 5MB)</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            )}
          </div>

          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
        </div>

        {/* Form Fields */}
        <div className="space-y-6 bg-white rounded shadow-md p-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Food Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border px-3 py-2 rounded w-full p-3 focus:outline-amber-500"
              placeholder="Enter food name..."
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="text"
              id="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="border px-3 py-2 rounded w-full p-3 focus:outline-amber-500"
              placeholder="Enter food price..."
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="border px-3 py-2 rounded w-full focus:outline-amber-500"
              required
            >
              <option value="">Select a category</option>
              {food.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <div className="mt-1 flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={formData.status === "available"}
                  onChange={() => setFormData({ ...formData, status: "available" })}
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                />
                <span className="ml-2">Available</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={formData.status === "unavailable"}
                  onChange={() => setFormData({ ...formData, status: "unavailable" })}
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                />
                <span className="ml-2">Unavailable</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t gap-4">
            <button
              type="button"
              onClick={() => onClose()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-2 text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              <SaveIcon className="h-4 w-4 mr-2" />
              {editData ? "Update menu" : "Save a menu"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
