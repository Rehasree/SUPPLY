import { Product } from "@framework/types";
import http from "@framework/utils/http";
//import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";
var id:any;
if (typeof window !== 'undefined'){
    id= localStorage.getItem("user_id")
}
export const fetchChatRooms = async () => {
	const data:any  = await http.get(`/user/${id}`); 
	return data as Product[] ;
};
export const useChatRoomQuery = async(options:any ) => {
    
    return useQuery<Product[], Error>(
        [`/user/${id}`, options],
        fetchChatRooms
      )
};
