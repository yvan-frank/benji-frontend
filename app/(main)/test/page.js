"use client";
import { BASE_URL } from "@/lib/url";
import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react'

export default function page() {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);
  
useEffect(() => {
  setLoading(true);
  axios
    .get(`${BASE_URL}/menu/category`)
    .then((response) => {
      console.log(response.data);
      setFood(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
      setLoading(false);
    });
}, []);

  return (
    <div>
      <table className="mt-8 w-full">
  <thead className="w-full bg-[#FCFCFD] border-dashed border-t border-gray-300">
    <tr className="w-full">
      <th className="py-5 text-gray-500 uppercase font-light text-left px-4">Image</th>
      <th className="py-5 text-gray-500 uppercase font-light text-left px-4">Name</th>
      <th className="py-5 text-gray-500 uppercase font-light text-left px-4">Price</th>
      <th className="py-5 text-gray-500 uppercase font-light text-left px-4">Description</th>
      <th className="py-5 text-gray-500 uppercase font-light text-left px-4">Actions</th>
    </tr>
  </thead>
  <tbody>
    {food.map((category, categoryIndex) => (
      <React.Fragment key={categoryIndex}>
        {/* Optional: Display category name as a row */}
        <tr className="bg-gray-50">
          <td colSpan="5" className="py-3 px-4 font-medium text-gray-700">
            {category.name}
          </td>
        </tr>
        
        {/* Display items in this category */}
        {category.items.map((item) => (
          <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
            {/* Image */}
            <td className="py-4 px-4">
              {item.image_url && (
                <img 
                  src={item.image_url} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) => {
                    e.target.src = '/assets/Img1.jpg'; // Fallback image
                  }}
                />
              )}
            </td>
            
            {/* Name */}
            <td className="py-4 px-4 font-medium text-gray-900">
              {item.name}
            </td>
            
            {/* Price */}
            <td className="py-4 px-4">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'XAF' // Assuming CFA francs
              }).format(item.price / 100)} {/* Divide by 100 if price is in cents */}
            </td>
            
            {/* Description */}
            <td className="py-4 px-4 text-gray-600">
              {item.description || 'No description'}
            </td>
            
            {/* Actions */}
            <td className="py-4 px-4">
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </React.Fragment>
    ))}
  </tbody>
</table>
    </div>
  )
}
