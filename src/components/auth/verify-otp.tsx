import Button from "@components/ui/button";
import Input from "@components/ui/input";
import Logo from "@components/ui/logo";
import { useForm } from "react-hook-form";
import { useUI } from "@contexts/ui.context";
import { useTranslation } from "next-i18next";
import {VerifyOtpType ,useVerifyOtpMutation} from '@framework/auth/use-verify-otp'
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { toast } from "react-toastify";
const VerifyOTP = () => {
	const { t } = useTranslation();
	const { setModalView, openModal, closeModal } = useUI();
    const { mutate: VerifyOTP ,isLoading} = useVerifyOtpMutation();
    //const {mutate:ResendOtp}
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<VerifyOtpType>();
	function handleSignIn() {
		setModalView("LOGIN_VIEW");
		return openModal();
	}
    let phoneNum = localStorage?.getItem("phone")
    let user_type= 0
	function onSubmit({ code,phone=phoneNum,type=user_type}: VerifyOtpType) {
		VerifyOTP({
            phone,
			code,
            type
        });
		console.log(code,phone,type,"data");
	}
    async function OTP(){
        const input= {
            phone:localStorage.getItem("phone"),
            email:localStorage.getItem("email")
        }
        const resp=await http.post(API_ENDPOINTS.RESENTOTP, input);
        toast("OTP resent",
        {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        console.log("resp",resp)
    }
	return (
		<div className="py-6 px-5 sm:p-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
			<div className="text-center mb-9 pt-2.5">
				<div onClick={closeModal}>
					<Logo />
				</div>
				<p className="text-sm md:text-base text-body mt-3 sm:mt-4 mb-8 sm:mb-10">
					Verify OTP
				</p>
			</div>
			<form
				onSubmit={handleSubmit((data) => onSubmit(data))}
				className="flex flex-col justify-center"
				noValidate
			>
				<Input
					labelKey="forms:Enter OTP"
					type="num"
					variant="solid"
					className="mb-4"
					{...register("code", {
						required: `${t("forms:OTP-required")}`,
						pattern: {
							value:/^\d{4}$/,
							message: t("forms:Please enter correct OTP"),
						},
					})}
                    placeholder="Enter 4 digit code"
					errorKey={errors.code?.message}
				/>
                <div className="flex items-center justify-center">

						<div className="flex ms-auto">
							<button
								type="button"
                                onClick={OTP}
								className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
							>
								Resend OTP
							</button>
						</div>
					</div>
                    <br/>
				<Button loading={isLoading} type="submit" className="h-11 md:h-12 w-full mt-2">
					Verify OTP
				</Button>
			</form>
			<div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-10 mb-6 sm:mb-7">
				<hr className="w-full border-gray-300" />
				<span className="absolute -top-2.5 px-2 bg-white">
					{t("common:text-or")}
				</span>
			</div>
			<div className="text-sm sm:text-base text-body text-center">
				{t("common:text-back-to")}{" "}
				<button
					type="button"
					className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
					onClick={handleSignIn}
				>
					{t("common:text-login")}
				</button>
			</div>
		</div>
	);
};

export default VerifyOTP;
