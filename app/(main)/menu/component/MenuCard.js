import React from 'react';
import {CheckIcon, ClockIcon} from "lucide-react";
import Link from "next/link";

const MenuCard = ({ menu }) => {
    return (
        <div className="w-80 mx-auto max-h-96 h-full">
            {/* Carte principale */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                {/* En-tête avec gradient */}
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-white">{menu.name}</h2>
                            <p className="text-amber-50 mt-1">{menu.description}</p>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white bg-opacity-20 text-sm font-medium text-purple-600">
                          {menu.status === 'active' ? (
                              <>
                                  <CheckIcon className="h-4 w-4 mr-1" />
                                  Active
                              </>
                          ) : (
                              'Inactive'
                          )}
                        </span>
                    </div>
                </div>

                {/* Corps de la carte */}
                <div className="p-6">
                    {/* Métadonnées */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center">
                            <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <div>
                                <p className="text-xs text-gray-500">Créé le</p>
                                <p className="text-sm font-medium">
                                    {new Date(menu.created_at).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>

                        {menu.modified_at && (
                            <div className="flex items-center">
                                <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                                <div>
                                    <p className="text-xs text-gray-500">Modifié le</p>
                                    <p className="text-sm font-medium">
                                        {new Date(menu.modified_at).toLocaleDateString('fr-FR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pied de carte avec actions */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                    <Link
                        href={`/menu/${menu.id_menu}`}
                        className="px-4 py-2 text-sm font-medium text-zinc-700 bg-zinc-200 rounded-lg hover:bg-zinc-300
                        transition-colors"
                    >
                        Show détails
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MenuCard;
