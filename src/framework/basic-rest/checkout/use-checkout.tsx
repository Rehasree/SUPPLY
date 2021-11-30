import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
export interface CheckoutInputType {
    products:{
      item:string,
      quantity:string,
      variant:{
        type:string,
        option:string,
      },
    }
    expected_date:string,
    payment_method:string,	
    delivery_address:{
      address_line:string,
      area:string,
      city:string,
      state:string,
      pincode:string,
    },
    allow_modifications:boolean,
    note_for_supplier:string,
    buyer_id:string,
    supplier_id:string,
    name:string;
}
async function checkout(input: CheckoutInputType) {
   console.log('checkout',input)
    localStorage.setItem("payment_method",input.payment_method)
    const is_new_user = localStorage.getItem('is_new_user')
    if(is_new_user){
    const NewUser={
      name:input.name,
      email:localStorage.getItem("email"),
      org_name:"SUPPLYS STORE",
      device_id:localStorage.getItem("auth_token"),
      user_type:0,
      address:input.delivery_address
    }
    const createUser =await http.post(`/user/create`,NewUser);
    console.log('create user response',createUser)
  }
   
   return http.post(API_ENDPOINTS.CHECKOUT, input);
  //return input;
}
var paymentData:any=[];
export const useCheckoutMutation = () => {
  return useMutation((input: CheckoutInputType) => checkout(input), {
    onSuccess: (data:any) => {
      localStorage.setItem("order_created","true");
      console.log(data, "Checkout success response");
      const payment=localStorage.getItem("payment_method")
      localStorage.setItem("Payment_order_id",data?.data.order_created._id) 
      if(payment==="PAYMENT_GATEWAY"){
        paymentData= data.data.payment
      }
    },
    onError: (data) => {
      toast("Error occured in placing order!",
						{
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
					})
      console.log(data, "Checkout error response");
    },
  });
};

export const GetPaymentData = () => {
	return paymentData;
};
