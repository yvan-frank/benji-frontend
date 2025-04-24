'use client'
import React, {useRef, useState} from 'react';
import {CloudUpload, SaveIcon, XIcon} from "lucide-react";

const AddMenu = ({onClose}) => {
    const [previewImage, setPreviewImage] = useState(null)
    const fileInputRef = useRef(null)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'active'
    })

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleRemoveImage = () => {
        setPreviewImage(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Soumission du formulaire
        console.log({ ...formData, image: previewImage })
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add a menu</h2>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
                {/* Section Upload d'Image - Design Chic */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Menu image</label>

                    <div
                        className={`border-2 border-dashed rounded-lg ${previewImage ? 'border-transparent' : 'border-gray-300 hover:border-amber-400'} transition-all duration-200`}>
                        {previewImage ? (
                            <div className="relative group">
                                <img src={previewImage} alt="Preview" className="w-full h-64 object-cover rounded-lg"/>
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100"
                                >
                                    <XIcon className="h-5 w-5 text-red-500"/>
                                </button>
                            </div>
                        ) : (
                            <div
                                className="flex flex-col items-center justify-center p-12 text-center cursor-pointer hover:bg-gray-50 rounded-lg"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <div className="bg-amber-100 p-4 rounded-full mb-4">
                                    <CloudUpload className="h-8 w-8 text-amber-600"/>
                                </div>
                                <p className="text-sm text-gray-500 mb-1">
                                    <span className="font-medium text-amber-600">Click here to upload</span> or drag and
                                    drop
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
                </div>

                {/* Formulaire */}
                <div className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Menu title</label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-3 border"
                            placeholder="Breakfast Menu"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description"
                               className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-3 border"
                            placeholder="Describe this menu..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <div className="mt-1 flex space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    checked={formData.status === 'active'}
                                    onChange={() => setFormData({...formData, status: 'active'})}
                                    className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                                />
                                <span className="ml-2">Active</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    checked={formData.status === 'inactive'}
                                    onChange={() => setFormData({...formData, status: 'inactive'})}
                                    className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                                />
                                <span className="ml-2">Inactive</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t gap-4">
                        <button
                            onClick={() => onClose()}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                        >
                            <SaveIcon className="h-5 w-5 mr-2"/>
                            Save a menu
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddMenu;
