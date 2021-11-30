import Input from "@components/ui/input";
import { useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import { useCheckoutMutation,GetPaymentData } from "@framework/checkout/use-checkout";
import {usePaymentverifyMutation} from "@framework/verifyPayment/verifyPayment";
import { useCart } from "@contexts/cart/cart.context";
import Button from "@components/ui/button";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";

interface CheckoutInputType {
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

function loadRazorPay(src:any){
    return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
        resolve(true);
    };
    script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
}

const CheckoutForm: React.FC = () => {
	const { t } = useTranslation();
	const { mutate: updateUser, isLoading } = useCheckoutMutation();
	const { items } = useCart();
	let supplier_id;
	if (typeof window !== 'undefined'){
		 supplier_id= localStorage.getItem("supplied_id")
	}
	console.log('supplier',supplier_id)
	const obj:any={}
	const products:any =[];
	items?.map(info=>{
		var final:any=[];
		obj.item = info.id,
		obj.item = obj.item.substring(0,24)
		obj.quantity= info.quantity
		const len  = Object.keys(info.attributes).length;
		var attr:any={};
		for(let i=0;i<len;i++){
			attr.type=Object.keys(info.attributes)[i];
			attr.option= Object.values(info.attributes)[i];
			final.push({...attr});
		}
		obj.variant = final
		products.push({...obj})
	})
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CheckoutInputType>();

	register("products", {
		required: "forms:products-required",
		value:products
	});
	register("expected_date",{
		required:"form:expected_date-required",
		value:"2020-06-27T15:48:46.579Z"
	})
	register("payment_method",{
		required:"form:payment_method-required",
		value:"PAYMENT_GATEWAY"
	})
	register("allow_modifications",{
		required:"form:allow_modifications-required",
		value:true
	})
	register("buyer_id",{
		value:"5ef2e7fbc1ac2131422f3601"
	})
	register("supplier_id",{
		value:String(supplier_id)
	})
	const PaymentData = GetPaymentData();
	async function displayRazorpay() {
		const res = await loadRazorPay(
		  "https://checkout.razorpay.com/v1/checkout.js"
		);
		if (!res) {
		 alert("Razorpay SDK failed to load. Are you online?");
		 return;
	   }
	   const options = {
		 key: 'rzp_test_yBuuw3E8BIMPuh',
		 currency: 'INR',
		 name: "SUPPLY'S",
		 description: "Product",
		 order_id: PaymentData?.id,
		 notes:PaymentData?.notes,
		 offer_id:PaymentData?.offer_id,
		 entity:PaymentData?.entity,
		 receipt:PaymentData?.receipt,
		 handler: function(response:any) {
		    if(response){
				const VerifyPaymentData={
					razorpay_payment_id: String(response.razorpay_payment_id),
					razorpay_order_id: String(response.razorpay_order_id),
					razorpay_signature:String( response.razorpay_signature),
					order_id:String(localStorage.getItem("Payment_order_id"))
				}
				usePaymentverifyMutation(VerifyPaymentData).then((response) => {
					localStorage.setItem("order_created","false");
					toast(response,
						{
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
					})
					// Router.push({
					// 	pathname: ROUTES.ORDER,
					// 	query: { id: '61924dc7fe9e0a76794a9d48' }
					// })
			  })
		    }
		 },
		 prefill: {
		   name: "Reha",
		   email:"rehasreekoneru@gmail.com",
		   phone_number:  "8341655595",
		 }
	   };
	   const paymentObject = (window as any).Razorpay(options);
	   paymentObject.open();
	}  
	

	function onSubmit(input: CheckoutInputType) {
		updateUser(input);
		const order_created = localStorage.getItem("order_created");
		const payment_method = localStorage.getItem("payment_method")
		console.log("order created ",order_created)
		if(order_created=== "true" ){
			console.log("order created ")
				if(payment_method ==="CASH_ON_DELIVERY"){
					toast("Order placed successfully!",
						{
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
					})
					//Router.push(ROUTES.ORDER);	
					// Router.push({
					// 	pathname: ROUTES.ORDER,
					// 	query: { id: '61924dc7fe9e0a76794a9d48' }
					// })
					//Router.push(ROUTES.ORDER, `id`,`61924dc7fe9e0a76794a9d48`)
				}else{
					displayRazorpay();	
				}
		}
		
		
	}

	return (
		<>
		<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
			{t("text-shipping-address")}
		</h2>
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full mx-auto flex flex-col justify-center "
			noValidate
		>
			<div className="flex flex-col space-y-4 lg:space-y-5">
				<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
				</div>
				
				<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
				<Input
					labelKey="Address line"
					{...register("delivery_address.address_line", {
						required: "forms:address-required-address_line",
					})}
					errorKey={errors.delivery_address?.address_line?.message}
					variant="solid"
					className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
				/>

				<Input
					className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
					labelKey="Area"
					{...register("delivery_address.area", {
						required: "forms:address-required-area",
					})}
					errorKey={errors.delivery_address?.area?.message}
					variant="solid"
				/>

				<Input
					className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
					labelKey="City"
					{...register("delivery_address.city", {
						required: "forms:address-required-city",
					})}
					errorKey={errors.delivery_address?.city?.message}
					variant="solid"
				/>			

				</div>
				
				<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
				<Input
				className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
					labelKey="State"
					{...register("delivery_address.state", {
						required: "forms:address-required-state",
					})}
					errorKey={errors.delivery_address?.state?.message}
					variant="solid"
				/>

				
				<Input
					className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
					labelKey="Zip Code"
					{...register("delivery_address.pincode", {
						required: "forms:address-required-pincode"
					})}
					errorKey={errors.delivery_address?.pincode?.message}
					variant="solid"
				/>			

				</div>
			
				{/* <div className="relative flex items-center ">
					<CheckBox labelKey="forms:label-save"  />
				</div> */}
				<TextArea
					labelKey="forms:label-order-notes"
					{...register("note_for_supplier")}
					placeholderKey="forms:placeholder-order-notes"
					className="relative pt-3 xl:pt-6"
				/>
				<div className="flex w-full">
					<Button
						className="w-full sm:w-auto"
						loading={isLoading}
						disabled={isLoading}
					>
						{t("common:button-place-order")}
					</Button>
				</div>
			</div>
		</form>
	</>
	);
};

export default CheckoutForm;
