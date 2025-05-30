import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {BASE_URL} from "@/lib/url";
import {sleep} from "@/lib/utils";

//example use
const useCategory = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            await sleep(500)
            return await axios
                .get(BASE_URL + "/categories")
                .then((res) => res.data)
        }
    })
}
const useGetFullMenu = (menu_id) => {
    return useQuery({
        queryKey: ["full_menu"],
        queryFn: async () => {
            await sleep(500)
            return await axios
                .get(BASE_URL + "/menu/" + menu_id)
                .then((res) => res.data)
        },
        enabled: !!menu_id
    })
}
const useGetAllMenu = () => {
    return useQuery({
        queryKey: ["all_menu"],
        queryFn: async () => {
            await sleep(500)
            return await axios
                .get(BASE_URL + "/menu/category")
                .then((res) => res.data)
        }
    })
}

export {
    useCategory,
    useGetFullMenu,
    useGetAllMenu
}