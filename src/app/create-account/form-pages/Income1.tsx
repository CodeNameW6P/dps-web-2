import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
	setOccupation,
	setOrganization,
	setDesignation,
	setProfession,
} from "@/redux/slices/formDataSlice";
import {
	setOccupationError,
	setOrganizationError,
	setDesignationError,
	setProfessionError,
} from "@/redux/slices/formErrorSlice";
import { nextPage, prevPage } from "@/redux/slices/currentPageSlice";
import { useState } from "react";
import { updateUser } from "@/actions/userActions";
import TextInput from "@/components/TextInput";

const Income1: React.FC = () => {
	const email = useAppSelector((state) => state.formData.email);

	const occupation = useAppSelector((state) => state.formData.income.occupation);
	const organization = useAppSelector((state) => state.formData.income.organization);
	const designation = useAppSelector((state) => state.formData.income.designation);
	const profession = useAppSelector((state) => state.formData.income.profession);
	const monthlyIncome = useAppSelector((state) => state.formData.income.monthlyIncome);
	const etinNumber = useAppSelector((state) => state.formData.income.etinNumber);

	const occupationError = useAppSelector((state) => state.formError.occupationError);
	const organizationError = useAppSelector((state) => state.formError.organizationError);
	const designationError = useAppSelector((state) => state.formError.designationError);
	const professionError = useAppSelector((state) => state.formError.professionError);

	const dispatch = useAppDispatch();

	const [loadingState, setLoadingState] = useState({
		disabled: false,
		buttonText: "Next",
	});

	const [submissionError, setSubmissionError] = useState("");

	const handleOccupationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setOccupation(event.target.value));
	};

	const handleOrganizationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setOrganization(event.target.value));
	};

	const handleDesignationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setDesignation(event.target.value));
	};

	const handleProfessionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setProfession(event.target.value));
	};

	const validateOccupation = (occupation: string) => {
		if (!occupation || occupation === "" || occupation === null) {
			dispatch(setOccupationError("Please select an occupation"));
			return false;
		} else {
			dispatch(setOccupationError(""));
			return true;
		}
	};

	const validateOrganization = (organization: string) => {
		if (!organization || organization === "" || organization === null) {
			dispatch(setOrganizationError("Organization can't be empty"));
			return false;
		} else {
			dispatch(setOrganizationError(""));
			return true;
		}
	};

	const validateDesignation = (designation: string) => {
		if (!designation || designation === "" || designation === null) {
			dispatch(setDesignationError("Designation can't be empty"));
			return false;
		} else {
			dispatch(setDesignationError(""));
			return true;
		}
	};

	const validateProfession = (profession: string) => {
		if (!profession || profession === "" || profession === null) {
			dispatch(setProfessionError("Profession can't be empty"));
			return false;
		} else {
			dispatch(setProfessionError(""));
			return true;
		}
	};

	const handleNext = async () => {
		setSubmissionError((s) => (s = ""));
		if (
			validateOccupation(occupation.trim()) &&
			validateOrganization(organization.trim()) &&
			validateDesignation(designation.trim()) &&
			validateProfession(profession.trim())
		) {
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
				<div className="flex flex-col md:text-lg">
					<label htmlFor="occupation">Occupation:</label>
					<div className="flex flex-row gap-5 items-center">
						<input
							className="text-gray-500 focus:outline-none"
							type="radio"
							name="occupation"
							id="profession"
							value="profession"
							onChange={handleOccupationChange}
							checked={occupation === "profession" ? true : false}
						/>
						<span>Profession</span>
						<input
							className="text-gray-500 focus:outline-none"
							type="radio"
							name="occupation"
							id="business"
							value="business"
							onChange={handleOccupationChange}
							checked={occupation === "business" ? true : false}
						/>
						<span>Business</span>
					</div>
					<span className="text-red-500">{occupationError}</span>
				</div>
				<TextInput
					label="Organization name:"
					name="organization"
					value={organization}
					handleChange={handleOrganizationChange}
					error={organizationError}
				/>
				<TextInput
					label="Designation:"
					name="designation"
					value={designation}
					handleChange={handleDesignationChange}
					error={designationError}
				/>
				<TextInput
					label="Profession:"
					name="profession"
					value={profession}
					handleChange={handleProfessionChange}
					error={professionError}
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

export default Income1;
