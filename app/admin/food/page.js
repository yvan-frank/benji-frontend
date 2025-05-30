"use client";
import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { BASE_URL } from "@/lib/url";
import axios from "axios";
import AddFood from "./component/AddFood";

export default function Page() {
  const [food, setFood] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/menu/category`)
      .then((response) => {
        setFood(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching food:", error);
        setLoading(false);
      });
  };

  const allItems = food.flatMap((category) =>
    category.items.map((item) => ({
      ...item,
      categoryName: category.name,
      categoryId: category.id,
    }))
  );

  const filteredItems = allItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddClick = () => {
    setEditItem(null);
    setIsOpen(true);
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setIsOpen(true);
  };

  const handleFormClose = () => {
    setIsOpen(false);
    setEditItem(null);
    fetchData();
  };

  return (
    <div className="w-full">
      {isOpen ? (
        <AddFood onClose={handleFormClose} editData={editItem} />
      ) : (
        <div className="w-full bg-white rounded-md shadow-sm px-4 py-7">
          <div className="flex justify-between">
            <h1 className="font-[poppins] text-3xl font-semibold text-gray-600">
              All Available Food
            </h1>
            <button
              className="flex items-center cursor-pointer space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
              onClick={handleAddClick}
            >
              <Plus size={18} />
              <span>Add Food</span>
            </button>
          </div>

          <div className="flex justify-between items-center mb-4 lg:pt-12">
            <input
              type="text"
              placeholder="Search food..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border px-3 py-2 rounded w-1/2"
            />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border px-3 py-2 rounded"
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          <table className="mt-4 w-full">
            <thead className="bg-[#FCFCFD] border-dashed border-t border-gray-300">
              <tr>
                <th className="py-5 text-gray-500 uppercase font-light text-left px-4">Image</th>
                <th className="py-5 text-center text-gray-500 uppercase font-light px-4">Name</th>
                <th className="py-5 text-center text-gray-500 uppercase font-light px-4">Price</th>
                <th className="py-5 text-center text-gray-500 uppercase font-light px-4">Category</th>
                <th className="py-5 text-center text-gray-500 uppercase font-light px-4">Status</th>
                <th className="py-5 text-center text-gray-500 uppercase font-light px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <tr key={index} className="border-t border-gray-200 animate-pulse">
                    {[...Array(6)].map((_, i) => (
                      <td key={i} className="px-4 py-4 text-center">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No food found.
                  </td>
                </tr>
              ) : (
                paginatedItems.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-t border-gray-200 ${index % 2 === 1 ? "bg-[#FCFCFD]" : ""}`}
                  >
                    <td className="px-4 py-4">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/assets/Img1.jpg";
                        }}
                      />
                    </td>
                    <td className="px-4 py-4 text-center">{item.name}</td>
                    <td className="px-4 py-4 text-center">{item.price} £</td>
                    <td className="px-4 py-4 text-center">{item.categoryName}</td>
                    <td className="px-4 py-4 text-center capitalize">{item.status}</td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {!loading && totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === idx + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
