'use client'
import React from 'react';
import { useState } from 'react';
import {useGetFullMenu} from "@/hooks/api/useCategory";
import {LoaderCircle, PlusIcon} from "lucide-react";
import {useOrderStore} from "@/hooks/useOrderStore";

const ModernMenu = ({ slug }) => {
    const [activeCategory, setActiveCategory] = useState(0);
    const [activeItem, setActiveItem] = useState(0);
    const {data: menuData, isFetching} = useGetFullMenu(slug)
    const {addItem, isLoading} = useOrderStore()

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            {isFetching ? (
                <div className="p-4 rounded-lg bg-gradient-to-br from-zinc-200 to-zinc-100 animated-pulse h-32 w-full
                text-center">
                    Loading...
                </div>
            ): (
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">{menuData.menu.name}</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{menuData.menu.description}</p>
                        <div className="mt-4 flex justify-center space-x-2">
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                              {menuData.menu.status}
                            </span>
                        </div>
                    </div>

                    {/* Category Navigation */}
                    <div className="flex overflow-x-auto pb-2 mb-8 scrollbar-hide">
                        <div className="flex space-x-4">
                            {menuData.categories.map((category, index) => (
                                <button
                                    key={category.category.id_cat}
                                    onClick={() => setActiveCategory(index)}
                                    className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
                                        activeCategory === index
                                            ? 'bg-amber-600 text-white shadow-lg'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                                    }`}
                                >
                                    {category.category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-8">
                        {menuData.categories[activeCategory] && (
                            <>
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                        {menuData.categories[activeCategory].category.name}
                                    </h2>
                                    <p className="text-gray-600">
                                        {menuData.categories[activeCategory].category.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {menuData.categories[activeCategory].items.map((item) => (
                                        <div
                                            key={item.id_art}
                                            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                                        >
                                            <div className="h-48 bg-gray-200 overflow-hidden">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div
                                                        className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-16 w-16"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={1}
                                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                                                    <span
                                                        className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                                                      {item.price.toLocaleString()} FCFA
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mb-4">{item.description}</p>
                                                <div className="flex justify-between items-center">
                                                    <span
                                                        className={`px-2 py-1 rounded text-xs font-medium ${
                                                            item.status === 'available'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}
                                                    >
                                                      {item.status}
                                                    </span>
                                                    <button
                                                        disabled={isLoading}
                                                        onClick={() => {
                                                            setActiveItem(item.id_art)
                                                            addItem(item);
                                                        }}
                                                        className="text-amber-600 hover:text-amber-800 font-medium flex items-center
                                                        cursor-pointer disabled:cursor-not-allowed"
                                                    >
                                                        Add to order
                                                        {activeItem === item.id_art && isLoading ? (
                                                            <LoaderCircle className={"animate-spin"} />
                                                        ):(
                                                            <PlusIcon />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default ModernMenu;