import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {BASE_URL} from "@/lib/url";
import {sleep} from "@/lib/utils";

export const useGetStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      await sleep(500)
      return await axios
        .get(BASE_URL + "/admin/stats")
        .then((res) => res.data)
    },
    staleTime: 1000 * 60 * 60
  })
}

export const useGetAllChartData = () => {
  return useQuery({
    queryKey: ["all_chart_data"],
    queryFn: async () => {
      await sleep(500)
      return await axios
        .get(BASE_URL + "/admin/stats/charts")
        .then((res) => res.data)
    },
    staleTime: 1000 * 60 * 60
  })
}