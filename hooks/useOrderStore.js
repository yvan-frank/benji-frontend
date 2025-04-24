import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {sleep} from "@/lib/utils";

export const useOrderStore = create(
    persist(
        (set, get) => ({
            items: [],
            total: 0,
            notes: '',
            isLoading: false,

            // Actions
            addItem: (item) => set((state) => {
                set({ isLoading: true });
                sleep(2000).then(() => set({ isLoading: false }));
                const existingItemIndex = state.items.findIndex(i => i.id_art === item.id_art);

                if (existingItemIndex >= 0) {
                    const updatedItems = [...state.items];
                    updatedItems[existingItemIndex].quantity += 1;

                    return {
                        items: updatedItems,
                        total: state.total + item.price,
                    };
                } else {
                    return {
                        items: [...state.items, { ...item, quantity: 1 }],
                        total: state.total + item.price,
                    };
                }
            }),

            removeItem: (itemId) => set((state) => {
                const itemToRemove = state.items.find(i => i.id_art === itemId);
                if (!itemToRemove) return state;

                return {
                    items: state.items.filter(i => i.id_art !== itemId),
                    total: state.total - (itemToRemove.price * itemToRemove.quantity),
                };
            }),
            increaseQuantity: (itemId) => set((state) => {
                const updatedItems = state.items.map(item =>
                    item.id_art === itemId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );

                const item = state.items.find(i => i.id_art === itemId);
                return {
                    items: updatedItems,
                    total: state.total + (item?.price || 0),
                };
            }),

            decreaseQuantity: (itemId) => set((state) => {
                const item = state.items.find(i => i.id_art === itemId);
                if (!item) return state;

                if (item.quantity <= 1) {
                    // Si quantité = 1, supprimer l'article
                    return {
                        items: state.items.filter(i => i.id_art !== itemId),
                        total: state.total - item.price,
                    };
                } else {
                    // Sinon diminuer la quantité
                    const updatedItems = state.items.map(i =>
                        i.id_art === itemId
                            ? { ...i, quantity: i.quantity - 1 }
                            : i
                    );

                    return {
                        items: updatedItems,
                        total: state.total - item.price,
                    };
                }
            }),

            updateItemNotes: (itemId, notes) => set((state) => ({
                items: state.items.map(item =>
                    item.id_art === itemId
                        ? { ...item, notes }
                        : item
                ),
            })),

            updateOrderNotes: (notes) => set({ notes }),

            clearOrder: () => set({ items: [], total: 0, notes: '' }),

            // Calculer le nombre total d'articles
            getTotalItems: () => {
                return get().items.reduce((sum, item) => sum + item.quantity, 0);
            },
        }),
        {
            name: 'order-storage', // clé de stockage unique
            storage: createJSONStorage(() => localStorage), // ou sessionStorage
            // Optionnel : sélectionner quelles parties de l'état persister
            partialize: (state) => ({
                items: state.items,
                total: state.total,
                notes: state.notes
            }),
        }
    )
);