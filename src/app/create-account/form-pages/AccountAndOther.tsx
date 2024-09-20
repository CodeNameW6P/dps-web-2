import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
	setPreferredAddress,
	setAccountNumber,
	setAccountPurpose,
	setPreferredBranch,
} from "@/redux/slices/formDataSlice";
import {
	setPreferredAddressError,
	setAccountNumberError,
	setAccountPurposeError,
	setPreferredBranchError,
} from "@/redux/slices/formErrorSlice";
import { nextPage, prevPage } from "@/redux/slices/currentPageSlice";
import { useState } from "react";
import { updateUser } from "@/actions/userActions";
import TextInput from "@/components/TextInput";

const AccountAndOther: React.FC = () => {
	const email = useAppSelector((state) => state.formData.email);

	const preferredAddress = useAppSelector(
		(state) => state.formData.accountAndOther.preferredAddress
	);
	const accountNumber = useAppSelector((state) => state.formData.accountAndOther.accountNumber);
	const accountPurpose = useAppSelector((state) => state.formData.accountAndOther.accountPurpose);
	const preferredBranch = useAppSelector(
		(state) => state.formData.accountAndOther.preferredBranch
	);

	const preferredAddressError = useAppSelector((state) => state.formError.preferredAddressError);
	const accountNumberError = useAppSelector((state) => state.formError.accountNumberError);
	const accountPurposeError = useAppSelector((state) => state.formError.accountPurposeError);
	const preferredBranchError = useAppSelector((state) => state.formError.preferredBranchError);

	const dispatch = useAppDispatch();

	const [loadingState, setLoadingState] = useState({
		disabled: false,
		buttonText: "Next",
	});

	const [submissionError, setSubmissionError] = useState("");

	const handlePreferredAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPreferredAddress(event.target.value));
	};

	const handleAccountNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setAccountNumber(event.target.value));
	};

	const handleAccountPurposeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setAccountPurpose(event.target.value));
	};

	const handlePreferredBranchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPreferredBranch(event.target.value));
	};

	const validatePreferredAddress = (preferredAddress: string) => {
		if (!preferredAddress || preferredAddress === "" || preferredAddress === null) {
			dispatch(setPreferredAddressError("Please select a preferred address"));
			return false;
		} else {
			dispatch(setPreferredAddressError(""));
			return true;
		}
	};

	const validateAccountNumber = (accountNumber: string) => {
		if (!accountNumber || accountNumber === "" || accountNumber === null) {
			dispatch(setAccountNumberError("Account number can't be empty"));
			return false;
		} else {
			dispatch(setAccountNumberError(""));
			return true;
		}
	};

	const validateAccountPurpose = (accountPurpose: string) => {
		if (!accountPurpose || accountPurpose === "" || accountPurpose === null) {
			dispatch(setAccountPurposeError("Account purpose can't be empty"));
			return false;
		} else {
			dispatch(setAccountPurposeError(""));
			return true;
		}
	};

	const validatePreferredBranch = (preferredBranch: string) => {
		if (!preferredBranch || preferredBranch === "" || preferredBranch === null) {
			dispatch(setPreferredBranchError("Please select a preferred branch"));
			return false;
		} else {
			dispatch(setPreferredBranchError(""));
			return true;
		}
	};

	const handleNext = async () => {
		setSubmissionError((s) => (s = ""));
		if (
			validatePreferredAddress(preferredAddress.trim()) &&
			validateAccountNumber(accountNumber.trim()) &&
			validateAccountPurpose(accountPurpose.trim()) &&
			validatePreferredBranch(preferredBranch.trim())
		) {
			setLoadingState((l) => ({
				...l,
				disabled: true,
				buttonText: "Loading...",
			}));
			const user = await updateUser(email.trim().toLowerCase(), {
				accountAndOther: {
					preferredAddress: preferredAddress.trim(),
					accountNumber: accountNumber.trim(),
					accountPurpose: accountPurpose.trim(),
					preferredBranch: preferredBranch.trim(),
				},
			});
			if (user) {
				dispatch(nextPage());
			} else {
				setSubmissionError("Internal error occured!");
			}
			setLoadingState((l) => ({
				...l,
				disabled: false,
				buttonText: "",
			}));
		}
	};

	return (
		<>
			<h1 className="font-semibold text-xl md:text-2xl">Account and other info:</h1>
			<form
				onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
					event.preventDefault();
				}}
				className="flex flex-col grow gap-5 w-full md:w-2/3"
				action=""
				method=""
			>
				<div className="flex flex-col md:text-lg">
					<label htmlFor="preferredAddress">Preferred address:</label>
					<div className="flex flex-col">
						<div className="flex flex-row gap-5">
							<input
								className="text-gray-500 focus:outline-none"
								type="radio"
								name="preferredAddress"
								id="presentAddress"
								value="presentAddress"
								onChange={handlePreferredAddressChange}
								checked={preferredAddress === "presentAddress" ? true : false}
							/>
							<span>Present address</span>
						</div>
						<div className="flex flex-row gap-5">
							<input
								className="text-gray-500 focus:outline-none"
								type="radio"
								name="preferredAddress"
								id="permanentAddress"
								value="permanentAddress"
								onChange={handlePreferredAddressChange}
								checked={preferredAddress === "permanentAddress" ? true : false}
							/>
							<span>Permanent address</span>
						</div>
						<div className="flex flex-row gap-5">
							<input
								className="text-gray-500 focus:outline-none"
								type="radio"
								name="preferredAddress"
								id="officeAddress"
								value="officeAddress"
								onChange={handlePreferredAddressChange}
								checked={preferredAddress === "officeAddress" ? true : false}
							/>
							<span>Office address</span>
						</div>
					</div>
					<span className="text-red-500">{preferredAddressError}</span>
				</div>
				<TextInput
					label="Account/Card number:"
					name="accountNumber"
					value={accountNumber}
					handleChange={handleAccountNumberChange}
					error={accountNumberError}
				/>
				<TextInput
					label="Account purpose:"
					name="accountPurpose"
					value={accountPurpose}
					handleChange={handleAccountPurposeChange}
					error={accountPurposeError}
				/>
				<TextInput
					label="Preferred branch:"
					name="preferredBranch"
					value={preferredBranch}
					handleChange={handlePreferredBranchChange}
					error={preferredBranchError}
				/>
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

export default AccountAndOther;
