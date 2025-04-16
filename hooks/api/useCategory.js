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

export {
    useCategory
}