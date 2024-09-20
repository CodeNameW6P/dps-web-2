import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { nextPage, prevPage } from "@/redux/slices/currentPageSlice";
import {
	setName,
	setGender,
	setDOB,
	setNIDSmartCard,
	setNameFather,
	setNameMother,
	setNameSpouse,
} from "@/redux/slices/formDataSlice";
import {
	setNameError,
	setGenderError,
	setDOBError,
	setNIDSmartCardError,
	setNameFatherError,
	setNameMotherError,
	setNameSpouseError,
} from "@/redux/slices/formErrorSlice";
import { useState } from "react";
import { updateUser } from "@/actions/userActions";
import FormValueSetter from "../FormValueSetter";
import TextInput from "@/components/TextInput";

const Personal: React.FC = () => {
	const email = useAppSelector((state) => state.formData.email);
	const phone = useAppSelector((state) => state.formData.phone);

	const name = useAppSelector((state) => state.formData.personal.name);
	const gender = useAppSelector((state) => state.formData.personal.gender);
	const dob = useAppSelector((state) => state.formData.personal.dob);
	const nidSmartCard = useAppSelector((state) => state.formData.personal.nidSmartCard);
	const nameFather = useAppSelector((state) => state.formData.personal.nameFather);
	const nameMother = useAppSelector((state) => state.formData.personal.nameMother);
	const nameSpouse = useAppSelector((state) => state.formData.personal.nameSpouse);

	const nameError = useAppSelector((state) => state.formError.nameError);
	const genderError = useAppSelector((state) => state.formError.genderError);
	const dobError = useAppSelector((state) => state.formError.dobError);
	const nidSmartCardError = useAppSelector((state) => state.formError.nidSmartCardError);
	const nameFatherError = useAppSelector((state) => state.formError.nameFatherError);
	const nameMotherError = useAppSelector((state) => state.formError.nameMotherError);
	const nameSpouseError = useAppSelector((state) => state.formError.nameSpouseError);

	const dispatch = useAppDispatch();

	const [loadingState, setLoadingState] = useState({
		disabled: false,
		buttonText: "Next",
	});

	const [submissionError, setSubmissionError] = useState("");

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setName(event.target.value));
	};

	const handleDOBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setDOB(event.target.value));
	};

	const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setGender(event.target.value));
	};

	const handleNIDSmartCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setNIDSmartCard(event.target.value));
	};

	const handleNameFatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setNameFather(event.target.value));
	};

	const handleNameMotherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setNameMother(event.target.value));
	};

	const handleNameSpouseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setNameSpouse(event.target.value));
	};

	const validateName = (name: string) => {
		if (!name || name === "" || name === null) {
			dispatch(setNameError("Name can't be empty"));
			return false;
		} else {
			dispatch(setNameError(""));
			return true;
		}
	};

	const validateGender = (gender: string) => {
		if (!gender || gender === "" || gender === null) {
			dispatch(setGenderError("Please select a gender"));
			return false;
		} else {
			dispatch(setGenderError(""));
			return true;
		}
	};

	const validateDOB = (dob: string) => {
		if (!dob || dob === "" || dob === null) {
			dispatch(setDOBError("Please enter your date of birth"));
			return false;
		} else {
			dispatch(setDOBError(""));
			return true;
		}
	};

	const validateNIDSmartCard = (nidSmartCard: string) => {
		if (!nidSmartCard || nidSmartCard === "" || nidSmartCard === null) {
			dispatch(setNIDSmartCardError("NID/SmartCard number can't be empty"));
			return false;
		} else {
			dispatch(setNIDSmartCardError(""));
			return true;
		}
	};

	const validateNameFather = (nameFather: string) => {
		if (!nameFather || nameFather === "" || nameFather === null) {
			dispatch(setNameFatherError("Father's name can't be empty"));
			return false;
		} else {
			dispatch(setNameFatherError(""));
			return true;
		}
	};

	const validateNameMother = (nameMother: string) => {
		if (!nameMother || nameMother === "" || nameMother === null) {
			dispatch(setNameMotherError("Mother's name can't be empty"));
			return false;
		} else {
			dispatch(setNameMotherError(""));
			return true;
		}
	};

	const handleNext = async () => {
		setSubmissionError((s) => (s = ""));
		if (
			validateName(name.trim()) &&
			validateGender(gender.trim()) &&
			validateDOB(dob.trim()) &&
			validateNIDSmartCard(nidSmartCard.trim()) &&
			validateNameFather(nameFather.trim()) &&
			validateNameMother(nameMother.trim())
		) {
			setLoadingState((l) => ({
				...l,
				disabled: true,
				buttonText: "Loading...",
			}));
			const user = await updateUser(email.trim().toLowerCase(), {
				personal: {
					name: name.trim(),
					gender: gender.trim(),
					dob: dob.trim(),
					nidSmartCard: nidSmartCard.trim(),
					nameFather: nameFather.trim(),
					nameMother: nameMother.trim(),
					nameSpouse: nameSpouse.trim(),
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
			<FormValueSetter email={email.trim().toLowerCase()} phone={phone.trim()} />
			<h1 className="font-semibold text-xl md:text-2xl">Personal details:</h1>
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
					name="name"
					value={name}
					handleChange={handleNameChange}
					error={nameError}
				/>
				<div className="flex flex-col md:text-lg">
					<label htmlFor="gender">Gender:</label>
					<div className="flex flex-row gap-5 items-center">
						<input
							className="text-gray-500 focus:outline-none"
							type="radio"
							name="gender"
							id="gender"
							value="male"
							onChange={handleGenderChange}
							checked={gender === "male" ? true : false}
						/>
						<span>Male</span>
						<input
							className="text-gray-500 focus:outline-none"
							type="radio"
							name="gender"
							id="gender"
							value="female"
							onChange={handleGenderChange}
							checked={gender === "female" ? true : false}
						/>
						<span>Female</span>
					</div>
					<span className="text-red-500">{genderError}</span>
				</div>
				<TextInput
					label="Date of birth:"
					name="dob"
					value={dob}
					handleChange={handleDOBChange}
					error={dobError}
					type="date"
				/>
				<TextInput
					label="NID/SmartCard number:"
					name="nidSmartCard"
					value={nidSmartCard}
					handleChange={handleNIDSmartCardChange}
					error={nidSmartCardError}
				/>
				<TextInput
					label="Father's name:"
					name="nameFather"
					value={nameFather}
					handleChange={handleNameFatherChange}
					error={nameFatherError}
				/>
				<TextInput
					label="Mother's name:"
					name="nameMother"
					value={nameMother}
					handleChange={handleNameMotherChange}
					error={nameMotherError}
				/>
				<TextInput
					label="Spouse's name (optional):"
					name="nameSpouse"
					value={nameSpouse}
					handleChange={handleNameSpouseChange}
					error={nameSpouseError}
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

export default Personal;
