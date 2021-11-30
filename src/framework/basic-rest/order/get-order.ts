import http from "@framework/utils/http";

export const fetchOrder = async (id: string) => {
  const { data } = await http.get(`/orders/${id}`);
  console.log("order response",data)
  return data;
};
// export const useOrderQuery = (id: string) => {
//   return useQuery<Order, Error>([API_ENDPOINTS.ORDER, id], () =>
//     fetchOrder(id)
//   );
// };
