import React, {useEffect, useState} from 'react';
import {MinusIcon, PlusIcon, ShoppingCart, ShoppingCartIcon, X} from "lucide-react";
import {useOrderStore} from "@/hooks/useOrderStore";
import { motion, AnimatePresence } from 'framer-motion'


const CartButton = () => {
    const [open, setOpen] = useState(false);
    const {items, getTotalItems, total, removeItem} = useOrderStore()
    //const subtotal =

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [open]);


    return (
        <>
            <div
                onClick={() => setOpen(true)}
                className="relative bg-zinc-200 rounded-full w-10 h-10 mr-4
                        flex items-center justify-center hover:bg-zinc-300 cursor-pointer"
            >
                <ShoppingCart className="w-5 h-5"/>
                {items.length > 0 && (
                    <div className="absolute -top-2 right-0 w-5 h-5 rounded-full bg-amber-600 text-white text-xs
                            flex items-center justify-center"
                    >
                        {items.length}
                    </div>
                )}
            </div>
            {open && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 30 }}
                    className="fixed inset-0 bg-zinc-900/10"
                    onClick={() => setOpen(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-96 p-4 bg-white h-full absolute right-0"
                    >
                        {/* Header */}
                        <div className="p-4 border-b flex justify-between items-center">
                            <div className="flex items-center">
                                <ShoppingCartIcon className="h-6 w-6 text-zinc-600 mr-2" />
                                <h2 className="text-xl font-bold">Votre Commande</h2>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* List of Items */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {items.length === 0 ? (
                                <div className="text-center py-10">
                                    <p className="text-zinc-500">Votre panier est vide</p>
                                    <button className="mt-4 px-4 py-2 bg-amber-800 text-white rounded-lg">
                                        Parcourir le menu
                                    </button>
                                </div>
                            ):(
                                items.map((item) => (
                                    <div key={item.id_art} className="border rounded-lg p-3">
                                        <div className="flex justify-between">
                                            <h3 className="font-medium">{item.name}</h3>
                                            <button
                                                onClick={() => removeItem(item.id_art)}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <X className="h-4 w-4"/>
                                            </button>
                                        </div>

                                        <div className="flex justify-between items-center mt-2">
                                            <div className="flex items-center space-x-2">
                                                <button className="p-1 rounded bg-gray-100 hover:bg-gray-200">
                                                    <MinusIcon className="h-3 w-3"/>
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button className="p-1 rounded bg-gray-100 hover:bg-gray-200">
                                                    <PlusIcon className="h-3 w-3"/>
                                                </button>
                                            </div>
                                            <span
                                                className="font-medium">${total?.toFixed(2)}
                                            </span>
                                        </div>
                                        {item.notes && (
                                            <div className="mt-2 text-sm text-zinc-500 flex items-start">
                                                <span className="mr-1">🗒️</span>
                                                <p className="flex-1">{item.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                    ))
                                )}
                        </div>
                        {/*recap*/}
                        <div className="border-t p-4 bg-zinc-50 absolute bottom-0 right-0 left-0">
                            <div className="space-y-2 mb-4">
                                {/*<div className="flex justify-between">*/}
                                {/*    <span>Sous-total</span>*/}
                                {/*    <span>${subtotal.toFixed(2)}</span>*/}
                                {/*</div>*/}
                                {/*<div className="flex justify-between text-sm text-gray-500">*/}
                                {/*    <span>Taxes (10%)</span>*/}
                                {/*    <span>${tax.toFixed(2)}</span>*/}
                                {/*</div>*/}
                                <div className="flex justify-between font-bold pt-2 border-t">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                className={`w-full py-3 font-medium 
                                ${items.length === 0 ? 'bg-zinc-300 cursor-not-allowed' : 'bg-zinc-800 hover:bg-amber-600 text-white'}`}
                                disabled={items.length === 0}
                            >
                                Order now
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    )
        ;
    }
;

export default CartButton;
