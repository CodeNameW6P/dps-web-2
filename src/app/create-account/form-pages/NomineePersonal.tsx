import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { nextPage, prevPage } from "@/redux/slices/currentPageSlice";
import {
	setNomineeName,
	setNomineeGender,
	setNomineeDOB,
	setNomineeNIDSmartCard,
	setNomineeNameFather,
	setNomineeNameMother,
	setNomineePhone,
} from "@/redux/slices/formDataSlice";
import {
	setNomineeNameError,
	setNomineeGenderError,
	setNomineeDOBError,
	setNomineeNIDSmartCardError,
	setNomineeNameFatherError,
	setNomineeNameMotherError,
	setNomineePhoneError,
} from "@/redux/slices/formErrorSlice";
import { useState } from "react";
import { updateUser } from "@/actions/userActions";
import TextInput from "@/components/TextInput";

const NomineePersonal: React.FC = () => {
	const email = useAppSelector((state) => state.formData.email);

	const nomineeName = useAppSelector((state) => state.formData.nomineePersonal.name);
	const nomineeGender = useAppSelector((state) => state.formData.nomineePersonal.gender);
	const nomineeDOB = useAppSelector((state) => state.formData.nomineePersonal.dob);
	const nomineeNIDSmartCard = useAppSelector(
		(state) => state.formData.nomineePersonal.nidSmartCard
	);
	const nomineeNameFather = useAppSelector((state) => state.formData.nomineePersonal.nameFather);
	const nomineeNameMother = useAppSelector((state) => state.formData.nomineePersonal.nameMother);
	const nomineePhone = useAppSelector((state) => state.formData.nomineePersonal.phone);
	const nomineeNTBAccount = useAppSelector((state) => state.formData.nomineePersonal.mtbAccount);

	const nomineeNameError = useAppSelector((state) => state.formError.nomineeNameError);
	const nomineeGenderError = useAppSelector((state) => state.formError.nomineeGenderError);
	const nomineeDOBError = useAppSelector((state) => state.formError.nomineeDOBError);
	const nomineeNIDSmartCardError = useAppSelector(
		(state) => state.formError.nomineeNIDSmartCardError
	);
	const nomineeNameFatherError = useAppSelector(
		(state) => state.formError.nomineeNameFatherError
	);
	const nomineeNameMotherError = useAppSelector(
		(state) => state.formError.nomineeNameMotherError
	);
	const nomineePhoneError = useAppSelector((state) => state.formError.nomineePhoneError);

	const dispatch = useAppDispatch();

	const [loadingState, setLoadingState] = useState({
		disabled: false,
		buttonText: "Next",
	});

	const [submissionError, setSubmissionError] = useState("");

	const handleNomineeNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setNomineeName(event.target.value));
	};

	const handleNomineeDOBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setNomineeDOB(event.target.value));
	};

	const handleNomineeGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setNomineeGender(event.target.value));
	};

	const handleNomineeNIDSmartCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setNomineeNIDSmartCard(event.target.value));
	};

	const handleNomineeNameFatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setNomineeNameFather(event.target.value));
	};

	const handleNomineeNameMotherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setNomineeNameMother(event.target.value));
	};

	const handleNomineePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setNomineePhone(event.target.value));
	};

	const validateNomineeName = (name: string) => {
		if (!name || name === "" || name === null) {
			dispatch(setNomineeNameError("Name can't be empty"));
			return false;
		} else {
			dispatch(setNomineeNameError(""));
			return true;
		}
	};

	const validateNomineeGender = (gender: string) => {
		if (!gender || gender === "" || gender === null) {
			dispatch(setNomineeGenderError("Please select a gender"));
			return false;
		} else {
			dispatch(setNomineeGenderError(""));
			return true;
		}
	};

	const validateNomineeDOB = (dob: string) => {
		if (!dob || dob === "" || dob === null) {
			dispatch(setNomineeDOBError("Please enter your date of birth"));
			return false;
		} else {
			dispatch(setNomineeDOBError(""));
			return true;
		}
	};

	const validateNomineeNIDSmartCard = (nidSmartCard: string) => {
		if (!nidSmartCard || nidSmartCard === "" || nidSmartCard === null) {
			dispatch(setNomineeNIDSmartCardError("NID/SmartCard number can't be empty"));
			return false;
		} else {
			dispatch(setNomineeNIDSmartCardError(""));
			return true;
		}
	};

	const validateNomineeNameFather = (nameFather: string) => {
		if (!nameFather || nameFather === "" || nameFather === null) {
			dispatch(setNomineeNameFatherError("Father's name can't be empty"));
			return false;
		} else {
			dispatch(setNomineeNameFatherError(""));
			return true;
		}
	};

	const validateNomineeNameMother = (nameMother: string) => {
		if (!nameMother || nameMother === "" || nameMother === null) {
			dispatch(setNomineeNameMotherError("Mother's name can't be empty"));
			return false;
		} else {
			dispatch(setNomineeNameMotherError(""));
			return true;
		}
	};

	const validateNomineePhone = (phone: string) => {
		if (!phone || phone === "" || phone === null) {
			dispatch(setNomineePhoneError("Phone number can't be empty"));
			return false;
		} else if (!/^\d+$/.test(phone)) {
			dispatch(setNomineePhoneError("Please enter a valid phone number"));
			return false;
		} else {
			dispatch(setNomineePhoneError(""));
			return true;
		}
	};

	const handleNext = async () => {
		setSubmissionError((s) => (s = ""));
		if (
			validateNomineeName(nomineeName.trim()) &&
			validateNomineeGender(nomineeGender.trim()) &&
			validateNomineeDOB(nomineeDOB.trim()) &&
			validateNomineeNIDSmartCard(nomineeNIDSmartCard.trim()) &&
			validateNomineeNameFather(nomineeNameFather.trim()) &&
			validateNomineeNameMother(nomineeNameMother.trim()) &&
			validateNomineePhone(nomineePhone.trim())
		) {
			setLoadingState((l) => ({
				...l,
				disabled: true,
				buttonText: "Loading...",
			}));
			const user = await updateUser(email.trim().toLowerCase(), {
				nomineePersonal: {
					name: nomineeName.trim(),
					gender: nomineeGender.trim(),
					dob: nomineeDOB.trim(),
					nidSmartCard: nomineeNIDSmartCard.trim(),
					nameFather: nomineeNameFather.trim(),
					nameMother: nomineeNameMother.trim(),
					phone: nomineePhone.trim(),
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
			<h1 className="font-semibold text-xl md:text-2xl">Nominee details:</h1>
			<form
				onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
					event.preventDefault();
				}}
				className="flex flex-col grow gap-5 w-full md:w-2/3"
				action=""
				method=""
			>
				<TextInput
					label="Name:"
					name="nomineeName"
					value={nomineeName}
					handleChange={handleNomineeNameChange}
					error={nomineeNameError}
				/>
				<div className="flex flex-col md:text-lg">
					<label htmlFor="nomineeGender">Gender:</label>
					<div className="flex flex-row gap-5 items-center">
						<input
							className="text-gray-500 focus:outline-none"
							type="radio"
							name="nomineeGender"
							id="male"
							value="male"
							onChange={handleNomineeGenderChange}
							checked={nomineeGender === "male" ? true : false}
						/>
						<span>Male</span>
						<input
							className="text-gray-500 focus:outline-none"
							type="radio"
							name="nomineeGender"
							id="female"
							value="female"
							onChange={handleNomineeGenderChange}
							checked={nomineeGender === "female" ? true : false}
						/>
						<span>Female</span>
					</div>
					<span className="text-red-500">{nomineeGenderError}</span>
				</div>
				<TextInput
					label="Date of birth:"
					name="nomineeDOB"
					value={nomineeDOB}
					handleChange={handleNomineeDOBChange}
					error={nomineeDOBError}
					type="date"
				/>
				<TextInput
					label="NID/SmartCard number:"
					name="nomineeNIDSmartCard"
					value={nomineeNIDSmartCard}
					handleChange={handleNomineeNIDSmartCardChange}
					error={nomineeNIDSmartCardError}
				/>
				<TextInput
					label="Father's name:"
					name="nomineeNameFather"
					value={nomineeNameFather}
					handleChange={handleNomineeNameFatherChange}
					error={nomineeNameFatherError}
				/>
				<TextInput
					label="Mother's name:"
					name="nomineeNameMother"
					value={nomineeNameMother}
					handleChange={handleNomineeNameMotherChange}
					error={nomineeNameMotherError}
				/>
				<TextInput
					label="Nominee phone:"
					name="nomineePhone"
					value={nomineePhone}
					handleChange={handleNomineePhoneChange}
					error={nomineePhoneError}
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

export default NomineePersonal;
