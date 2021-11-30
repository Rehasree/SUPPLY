import Input from "@components/ui/input";
//import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useLoginMutation, LoginInputType } from "@framework/auth/use-login";
import { useUI } from "@contexts/ui.context";
import Logo from "@components/ui/logo";
import { ImGoogle2, ImFacebook2 } from "react-icons/im";
import { useTranslation } from "next-i18next";
const LoginForm: React.FC = () => {
	const { t } = useTranslation();
	const { setModalView, openModal, closeModal } = useUI();
	const { mutate: login, isLoading } = useLoginMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInputType>();

	function onSubmit({ email, phone }: LoginInputType) {
		login({
			email,
			phone,
			// remember_me,
		});
		console.log(email, phone ,"data");
	}
	function handelSocialLogin() {
		login({
			email: "demo@demo.com",
			phone: "1234567890",
		});
	}
	function handleSignUp() {
		setModalView("SIGN_UP_VIEW");
		return openModal();
	}
	// function OTP(){
	// 	setModalView("VERIFY_OTP");
	// 	return openModal();
	// }
	return (
		<div className="overflow-hidden bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300 py-5 px-5 sm:px-8">
			<div className="text-center mb-6 pt-2.5">
				<div onClick={closeModal}>
					<Logo />
				</div>
				<p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
					{t("common:login-helper")}
				</p>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-center"
				noValidate
			>
				<div className="flex flex-col space-y-3.5">
					<Input
						labelKey="forms:label-email"
						type="email"
						variant="solid"
						{...register("email", {
							required: `${t("forms:email-required")}`,
							pattern: {
								value:
									/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: t("forms:email-error"),
							},
						})}
						errorKey={errors.email?.message}
					/>
					<Input
						labelKey="forms:label-phone"
						type="tel"
						variant="solid"
						{...register("phone", {
							required: `${t("forms:phone-required")}`,
							pattern: {
								value:/^\d{10}$/,
								message: t("forms:phone-error"),
							},
						})}
						errorKey={errors.phone?.message}
					/>
					<div className="relative">
						<Button
							type="submit"
							loading={isLoading}
							disabled={isLoading}
							className="h-11 md:h-12 w-full mt-1.5"
						>
							GET OTP
						</Button>
					</div>
				</div>
			</form>
			<div className="flex flex-col items-center justify-center relative text-sm text-heading mt-6 mb-3.5">
				<hr className="w-full border-gray-300" />
				<span className="absolute -top-2.5 px-2 bg-white">
					{t("common:text-or")}
				</span>
			</div>
			<Button
				loading={isLoading}
				disabled={isLoading}
				className="h-11 md:h-12 w-full mt-2.5 bg-facebook hover:bg-facebookHover"
				onClick={handelSocialLogin}
			>
				<ImFacebook2 className="text-sm sm:text-base me-1.5" />
				{t("common:text-login-with-facebook")}
			</Button>
			<Button
				loading={isLoading}
				disabled={isLoading}
				className="h-11 md:h-12 w-full mt-2.5 bg-google hover:bg-googleHover"
				onClick={handelSocialLogin}
			>
				<ImGoogle2 className="text-sm sm:text-base me-1.5" />
				{t("common:text-login-with-google")}
			</Button>
			<div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
				{t("common:text-no-account")}{" "}
				<button
					type="button"
					className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
					onClick={handleSignUp}
				>
					{t("common:text-register")}
				</button>
			</div>
		</div>
	);
};

export default LoginForm;
