import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";



export interface PaymentverifyInputType {
    razorpay_payment_id:string,
    razorpay_order_id:string,
    razorpay_signature:string,
    order_id:string,
}

export const  usePaymentverifyMutation=async (input: PaymentverifyInputType)=>{
      const response:any= await  http.post(API_ENDPOINTS.VERIFYPAYMENT, input);
      console.log("verify payemtn response",response)
      return response.data.message
}

