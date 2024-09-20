import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setEmail, setPhone } from "@/redux/slices/formDataSlice";
import { setEmailError, setPhoneError } from "@/redux/slices/formErrorSlice";
import { nextPage } from "@/redux/slices/currentPageSlice";
import { createUser, findUser } from "@/actions/userActions";
import { useState } from "react";
import TextInput from "@/components/TextInput";

const Initial: React.FC = () => {
	const email = useAppSelector((state) => state.formData.email);
	const phone = useAppSelector((state) => state.formData.phone);

	const emailError = useAppSelector((state) => state.formError.emailError);
	const phoneError = useAppSelector((state) => state.formError.phoneError);

	const dispatch = useAppDispatch();

	const [loadingState, setLoadingState] = useState({
		disabled: false,
		buttonText: "Next",
	});

	const [submissionError, setSubmissionError] = useState("");

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setEmail(event.target.value));
	};

	const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPhone(event.target.value));
	};

	const validateEmail = (email: string) => {
		if (!email || email === "" || email === null) {
			dispatch(setEmailError("Email can't be empty"));
			return false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			dispatch(setEmailError("Please enter a valid email"));
			return false;
		} else {
			dispatch(setEmailError(""));
			return true;
		}
	};

	const validatePhone = (phone: string) => {
		if (!phone || phone === "" || phone === null) {
			dispatch(setPhoneError("Phone number can't be empty"));
			return false;
		} else if (!/^\d+$/.test(phone)) {
			dispatch(setPhoneError("Please enter a valid phone number"));
			return false;
		} else {
			dispatch(setPhoneError(""));
			return true;
		}
	};

	const handleNext = async () => {
		setSubmissionError((s) => (s = ""));
		if (validateEmail(email.trim().toLowerCase()) && validatePhone(phone.trim())) {
			setLoadingState((l) => ({
				...l,
				disabled: true,
				buttonText: "Loading...",
			}));
			const user = await findUser({
				email: email.trim().toLowerCase(),
				phone: phone.trim(),
			});
			if (user) {
				dispatch(nextPage());
			} else {
				const user = await createUser({
					email: email.trim().toLowerCase(),
					phone: phone.trim(),
				});
				if (user) {
					dispatch(nextPage());
				} else {
					setSubmissionError("Internal error occured!");
				}
			}
			setLoadingState((l) => ({
				...l,
				disabled: false,
				buttonText: "Next",
			}));
		}
	};

	return (
		<>
			<h1 className="font-semibold text-xl md:text-2xl">Enter credentials:</h1>
			<form
				onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
					event.preventDefault();
				}}
				className="flex flex-col grow gap-5 w-full md:w-2/3"
				action=""
				method=""
			>
				<TextInput
					label="Email:"
					name="email"
					value={email}
					handleChange={handleEmailChange}
					error={emailError}
					type="email"
				/>
				<TextInput
					label="Phone number:"
					name="phone"
					value={phone}
					handleChange={handlePhoneChange}
					error={phoneError}
				/>
			</form>
			<span className="text-red-500 place-self-center md:hidden">{submissionError}</span>
			<div className="flex mt-10 justify-between">
				<button
					// onClick={() => dispatch(prevPage())}
					className="invisible border border-gray-300 justify-center items-center p-2 w-32 hover:border-indigo-800 hover:text-indigo-800 disabled:border-gray-300 disabled:text-gray-300"
				>
					Back
				</button>
				<div className="flex items-center gap-5">
					<span className="hidden text-red-500 md:flex">{submissionError}</span>
					<button
						onClick={handleNext}
						disabled={loadingState.disabled}
						// disabled={true}
						className="flex border border-gray-300 justify-center items-center p-2 w-32 hover:border-indigo-800 hover:text-indigo-800 disabled:border-gray-300 disabled:text-gray-300"
					>
						{loadingState.buttonText}
					</button>
				</div>
			</div>
		</>
	);
};

export default Initial;
