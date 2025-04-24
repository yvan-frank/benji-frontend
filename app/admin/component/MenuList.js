'use client'
import React, {useEffect, useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Pencil,
    Trash2,
    Eye,
    Plus,
    ChevronDown,
    ChevronUp,
    Filter,
    Search, LoaderCircle
} from 'lucide-react';
import {useGetAllMenu} from "@/hooks/api/useCategory";
import AddMenu from "@/app/admin/component/AddMenu";

const MenuList = () => {

    const {data, isFetching} = useGetAllMenu()
    const [menus, setMenus] = useState(data || []);
    const [open, setOpen] = useState(false);

    useEffect(() => {
       if (!isFetching) {
           setMenus(data)
       }
    }, [isFetching]);


    const [expandedMenu, setExpandedMenu] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredMenus = menus.filter(menu => {
        const matchesSearch = menu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            menu.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || menu.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const toggleExpand = (id) => {
        setExpandedMenu(expandedMenu === id ? null : id);
    };

    const deleteMenu = (id) => {
        setMenus(menus.filter(menu => menu.id_menu !== id));
    };

    return (
        <div className="">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-3xl font-bold text-amber-900">Menu Management</h3>
                    <button
                        type="button"
                        disabled={open}
                        onClick={() => setOpen(true)}
                        className="flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors">
                        <Plus size={18}/>
                        <span>New Menu</span>
                    </button>
                </div>
                {
                    open ? (
                        <AddMenu onClose={() => setOpen(false)} />
                    ):(
                        <>
                            {/* Filters */}
                            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Search className="text-amber-500" size={18}/>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="pl-10 w-full rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-amber-500 py-2 px-3"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Filter className="text-amber-500" size={18}/>
                                        <select
                                            className="rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-amber-500 py-2 px-3 flex-1"
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                        >
                                            <option value="all">All status</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>

                                    <div className="text-right text-sm text-amber-600">
                                        {filteredMenus.length} {filteredMenus.length > 1 ? 'menus found' : 'menu found'}
                                    </div>
                                </div>
                            </div>

                            {/* Menu List */}
                            <div className="space-y-4">
                                {isFetching && (
                                    <div className="w-full p-4 h-24 bg-amber-50 rounded-lg flex justify-center items-center">
                                        <LoaderCircle className="animate-spin"/>
                                    </div>
                                )}
                                <AnimatePresence>
                                    {filteredMenus.map((menu) => (
                                        <motion.div
                                            key={menu.id_menu}
                                            initial={{opacity: 0, y: 20}}
                                            animate={{opacity: 1, y: 0}}
                                            exit={{opacity: 0, x: -20}}
                                            transition={{duration: 0.3}}
                                            className="bg-white rounded-xl shadow-sm overflow-hidden"
                                        >
                                            <div
                                                className="p-4 cursor-pointer flex justify-between items-center hover:bg-amber-50 transition-colors"
                                                onClick={() => toggleExpand(menu.id_menu)}
                                            >
                                                <div>
                                                    <h3 className="font-semibold text-amber-900">{menu.name}</h3>
                                                    <p className="text-sm text-amber-700">{menu.description}</p>
                                                </div>

                                                <div className="flex items-center space-x-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            menu.status === 'active'
                                                ? 'bg-amber-100 text-amber-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                          {menu.status === 'active' ? 'Active' : 'Inactive'}
                                        </span>
                                                    {expandedMenu === menu.id_menu ? (
                                                        <ChevronUp className="text-amber-500"/>
                                                    ) : (
                                                        <ChevronDown className="text-amber-500"/>
                                                    )}
                                                </div>
                                            </div>

                                            <AnimatePresence>
                                                {expandedMenu === menu.id_menu && (
                                                    <motion.div
                                                        initial={{height: 0, opacity: 0}}
                                                        animate={{height: 'auto', opacity: 1}}
                                                        exit={{height: 0, opacity: 0}}
                                                        transition={{duration: 0.3}}
                                                        className="border-t border-amber-100"
                                                    >
                                                        <div className="p-4">
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                                <div>
                                                                    <h4 className="text-xs font-medium text-zinc-700 font-semibold uppercase tracking-wider">Item</h4>
                                                                    <p className="text-amber-900">{menu.items}</p>
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-xs font-medium text-zinc-700 font-semibold uppercase tracking-wider">Created
                                                                        At</h4>
                                                                    <p className="text-amber-900">
                                                                        {new Date(menu.createdAt).toDateString()}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-xs font-medium text-zinc-700 font-semibold uppercase tracking-wider">Last
                                                                        modified</h4>
                                                                    <p className="text-amber-900">-</p>
                                                                </div>
                                                            </div>

                                                            <div
                                                                className="flex justify-end space-x-2 pt-3 border-t border-amber-100">
                                                                <button
                                                                    className="flex items-center space-x-1 text-amber-600 hover:text-amber-800 p-2 rounded-lg hover:bg-amber-100 transition-colors">
                                                                    <Eye size={16}/>
                                                                    <span>Show</span>
                                                                </button>
                                                                <button
                                                                    className="flex items-center space-x-1 text-sky-600 hover:text-amber-800 p-2 rounded-lg hover:bg-amber-100 transition-colors">
                                                                    <Pencil size={16}/>
                                                                    <span>Edit</span>
                                                                </button>
                                                                <button
                                                                    className="flex items-center space-x-1 text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                                                    onClick={() => deleteMenu(menu.id)}
                                                                >
                                                                    <Trash2 size={16}/>
                                                                    <span>Delete</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))}
                                    {!isFetching && filteredMenus.length === 0 && (
                                        <motion.div
                                            initial={{opacity: 0, y: 20}}
                                            animate={{opacity: 1, y: 0}}
                                            exit={{opacity: 0, x: -20}}
                                            transition={{duration: 0.3}}
                                            className="bg-white rounded-xl shadow-sm overflow-hidden"
                                        >
                                            <div className="h-10 flex justify-center items-center">
                                    <span>No {searchTerm && <span
                                        className="bg-amber-600 text-white rounded-full px-2">{searchTerm}</span>} data found</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default MenuList;