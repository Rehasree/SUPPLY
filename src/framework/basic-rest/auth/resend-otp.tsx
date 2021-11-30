import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
//import { useMutation } from "react-query";

export async function ResendOtp() {
   const input = localStorage.getItem("phone")
   console.log('data',input)
   const rep= http.post(API_ENDPOINTS.RESENTOTP, input);
   console.log("rep",rep)
   return rep;
}
export const Resend_OTP = () => {
    const input = localStorage.getItem("phone")
    console.log('data',input)
    const rep= http.post(API_ENDPOINTS.RESENTOTP, input);
    console.log("rep",rep)
//     return useMutation(() => ResendOtp(), {
//     onSuccess: (data:any) => {
//         console.log("data otp",data)
//     },
//     onError: (data) => {
//       console.log(data, "Error occured in sending OTP");
//     },
//   });
};
