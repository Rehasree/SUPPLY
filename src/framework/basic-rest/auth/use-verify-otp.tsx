import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useUI } from "@contexts/ui.context";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
export interface VerifyOtpType {
  phone:string|null;
  code: string;
  type: number,

}
async function VerifyOTP(input: VerifyOtpType) {
    console.log('data',input)
   const rep= http.post(API_ENDPOINTS.VERIFYOTP, input);
   console.log("rep",rep)
   return rep;
//   return {
//     ok: true,
//     message: "OTP Verified successfully!",
//   };
}
export const useVerifyOtpMutation = () => {
    const {authorize,closeModal} = useUI()
    return useMutation((input: VerifyOtpType) => VerifyOTP(input), {
    onSuccess: (_data:any) => {
        console.log("data otp",_data)
        localStorage.setItem("auth_token",_data.data.token)
        localStorage.setItem("user_id",_data.data.user_id)
        localStorage.setItem("is_new_user",_data.data.is_new_user)
        authorize();
        toast("Login Successful!",
        {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        closeModal();
    },
    onError: (data) => {
      console.log(data, "OTP verification failed");
    },
  });
};
