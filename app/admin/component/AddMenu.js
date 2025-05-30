"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddMenu = ({ onClose, onSave, editData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name,
        description: editData.description,
        status: editData.status,
      });
    } else {
      reset({
        name: "",
        description: "",
        status: "active",
      });
    }
  }, [editData, reset]);

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: true })}
          placeholder="Menu name"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
        />
        {errors.name && <p className="text-red-500">Name is required</p>}

        <textarea
          {...register("description", { required: true })}
          placeholder="Description"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
        />
        {errors.description && (
          <p className="text-red-500">Description is required</p>
        )}

        <select
          {...register("status")}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <div className="flex space-x-2 mt-4">
          <button
            type="submit"
            className="bg-amber-600 text-white px-4 py-2 rounded"
          >
            {editData ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMenu;
