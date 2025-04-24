'use client'
import {useGetAllMenu} from "@/hooks/api/useCategory";
import MenuCard from "@/app/(main)/menu/component/MenuCard";

export default function Menu() {
    const {data, isFetching} = useGetAllMenu()
    return (
        <div className=" bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            {/*<ModernMenu menuData={menuData} />*/}
            {isFetching && <p>Loading...</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data && data?.map((menu) => (
                    <MenuCard key={menu.id_menu} menu={menu} />
                ))}
            </div>
        </div>
    )
}