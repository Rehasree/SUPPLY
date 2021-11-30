import { useUI } from "@contexts/ui.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { ToastContainer, toast } from 'react-toastify';
export interface LoginInputType {
  email: string;
  phone: string;
  // remember_me: boolean;
}
async function login(input: LoginInputType) {
  localStorage.setItem("phone",input.phone)
  localStorage.setItem("email",input.email)
   return http.post(API_ENDPOINTS.LOGIN, input);
}
export const useLoginMutation = () => {
   const { setModalView, openModal } = useUI();
  return useMutation((input: LoginInputType) => login(input), {

    onSuccess: (data) => {
      console.log('aut_data',data.data);
      setModalView("VERIFY_OTP");
      toast("OTP sent!",
      {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
		  return openModal();
     
      // authorize();
      // closeModal();
    },
    onError: (data) => {
      console.log(data, "login error response");
    },
  });
};
