import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { nextPage, prevPage } from "@/redux/slices/currentPageSlice";
import { setMonthlyIncome, setETINNumber } from "@/redux/slices/formDataSlice";
import { setMonthlyIncomeError, setETINNumberError } from "@/redux/slices/formErrorSlice";
import { useState } from "react";
import { updateUser } from "@/actions/userActions";
import TextInput from "@/components/TextInput";
import ImageUpload from "@/components/ImageUpload";

const Income2: React.FC = () => {
	const email = useAppSelector((state) => state.formData.email);

	const occupation = useAppSelector((state) => state.formData.income.occupation);
	const organization = useAppSelector((state) => state.formData.income.organization);
	const designation = useAppSelector((state) => state.formData.income.designation);
	const profession = useAppSelector((state) => state.formData.income.profession);
	const monthlyIncome = useAppSelector((state) => state.formData.income.monthlyIncome);
	const etinNumber = useAppSelector((state) => state.formData.income.etinNumber);

	const monthlyIncomeError = useAppSelector((state) => state.formError.monthlyIncomeError);
	const etinNumberError = useAppSelector((state) => state.formError.etinNumberError);

	const dispatch = useAppDispatch();

	const [loadingState, setLoadingState] = useState({
		disabled: false,
		buttonText: "Next",
	});

	const [submissionError, setSubmissionError] = useState("");

	const handleMonthlyIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setMonthlyIncome(event.target.value));
	};

	const handleETINNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setETINNumber(event.target.value));
	};

	const validateMonthlyIncome = (monthlyIncome: string) => {
		if (!monthlyIncome || monthlyIncome === "" || monthlyIncome === null) {
			dispatch(setMonthlyIncomeError("Please enter your monthly income"));
			return false;
		} else {
			dispatch(setMonthlyIncomeError(""));
			return true;
		}
	};

	const handleNext = async () => {
		setSubmissionError((s) => (s = ""));
		if (validateMonthlyIncome(monthlyIncome.trim())) {
			setLoadingState((l) => ({
				...l,
				disabled: true,
				buttonText: "Loading...",
			}));
			const user = await updateUser(email.trim().toLowerCase(), {
				income: {
					occupation: occupation.trim(),
					organization: organization.trim(),
					designation: designation.trim(),
					profession: profession.trim(),
					monthlyIncome: monthlyIncome.trim(),
					etinNumber: etinNumber.trim(),
				},
			});
			if (user) {
				dispatch(nextPage());
			} else {
				setSubmissionError((s) => (s = "Internal error occured!"));
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
			<h1 className="font-semibold text-xl md:text-2xl">Income information:</h1>
			<form
				onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
					event.preventDefault();
				}}
				className="flex flex-col grow gap-5 w-full md:w-2/3"
				action=""
				method=""
			>
				<TextInput
					label="Monthly income (BDT):"
					name="monthlyIncome"
					value={monthlyIncome}
					handleChange={handleMonthlyIncomeChange}
					error={monthlyIncomeError}
				/>
				<TextInput
					label="E-TIN number (optional):"
					name="etinNumber"
					value={etinNumber}
					handleChange={handleETINNumberChange}
					error={etinNumberError}
				/>
				<ImageUpload label="E-TIN certificate (optional):" name="etinCertificate" />
				<ImageUpload label="Utility bill (optional):" name="utilityBill" />
			</form>
			<span className="text-red-500 place-self-center md:hidden">{submissionError}</span>
			<div className="flex mt-10 justify-between">
				<button
					onClick={() => dispatch(prevPage())}
					className="flex text-white justify-center items-center p-2 w-32 bg-red-500 rounded-md disabled:bg-red-300 hover:bg-red-700"
				>
					Back
				</button>
				<div className="flex items-center gap-5">
					<span className="hidden text-red-500 md:flex">{submissionError}</span>
					<button
						onClick={handleNext}
						disabled={loadingState.disabled}
						className="flex text-white justify-center items-center p-2 w-32 bg-green-500 rounded-md disabled:bg-green-300 hover:bg-green-700"
					>
						{loadingState.buttonText}
					</button>
				</div>
			</div>
		</>
	);
};

export default Income2;
