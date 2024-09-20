import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
	setNomineeV_T_R_H_F,
	setNomineeS_UP_B_O,
	setNomineeS_D,
	setNomineeC_D,
	setNomineeT_U,
	setNomineePostOffice,
} from "@/redux/slices/formDataSlice";
import {
	setNomineeV_T_R_H_FError,
	setNomineeS_UP_B_OError,
	setNomineeS_DError,
	setNomineeC_DError,
	setNomineeT_UError,
	setNomineePostOfficeError,
} from "@/redux/slices/formErrorSlice";
import { nextPage, prevPage } from "@/redux/slices/currentPageSlice";
import { useState } from "react";
import { updateUser } from "@/actions/userActions";
import TextInput from "@/components/TextInput";

const NomineeAddress: React.FC = () => {
	const email = useAppSelector((state) => state.formData.email);

	const nomineeV_T_R_H_F = useAppSelector((state) => state.formData.nomineeAddress.v_t_r_h_f);
	const nomineeS_UP_B_O = useAppSelector((state) => state.formData.nomineeAddress.s_up_b_o);
	const nomineeS_D = useAppSelector((state) => state.formData.nomineeAddress.s_d);
	const nomineeC_D = useAppSelector((state) => state.formData.nomineeAddress.c_d);
	const nomineeT_U = useAppSelector((state) => state.formData.nomineeAddress.t_u);
	const nomineePostOffice = useAppSelector((state) => state.formData.nomineeAddress.postOffice);

	const nomineeV_T_R_H_FError = useAppSelector((state) => state.formError.nomineeV_T_R_H_FError);
	const nomineeS_UP_B_OError = useAppSelector((state) => state.formError.nomineeS_UP_B_OError);
	const nomineeS_DError = useAppSelector((state) => state.formError.nomineeS_DError);
	const nomineeC_DError = useAppSelector((state) => state.formError.nomineeC_DError);
	const nomineeT_UError = useAppSelector((state) => state.formError.nomineeT_UError);
	const nomineePostOfficeError = useAppSelector(
		(state) => state.formError.nomineePostOfficeError
	);

	const dispatch = useAppDispatch();

	const [loadingState, setLoadingState] = useState({
		disabled: false,
		buttonText: "Next",
	});

	const [submissionError, setSubmissionError] = useState("");

	const handleNomineeV_T_R_H_FChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setNomineeV_T_R_H_F(event.target.value));
	};

	const handleNomineeS_UP_B_OChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setNomineeS_UP_B_O(event.target.value));
	};

	const handleNomineeS_DChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setNomineeS_D(event.target.value));
	};

	const handleNomineeC_DChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setNomineeC_D(event.target.value));
	};

	const handleNomineeT_UChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setNomineeT_U(event.target.value));
	};

	const handleNomineePostOfficeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setNomineePostOffice(event.target.value));
	};

	const validateNomineeV_T_R_H_F = (nomineeV_T_R_H_F: string) => {
		if (!nomineeV_T_R_H_F || nomineeV_T_R_H_F === "" || nomineeV_T_R_H_F === null) {
			dispatch(setNomineeV_T_R_H_FError("Village/Town/Road/House/Flat can't be empty"));
			return false;
		} else {
			dispatch(setNomineeV_T_R_H_FError(""));
			return true;
		}
	};

	const validateNomineeS_UP_B_O = (nomineeS_UP_B_O: string) => {
		if (!nomineeS_UP_B_O || nomineeS_UP_B_O === "" || nomineeS_UP_B_O === null) {
			dispatch(setNomineeS_UP_B_OError("Sector/Union parishad/Block/Others can't be empty"));
			return false;
		} else {
			dispatch(setNomineeS_UP_B_OError(""));
			return true;
		}
	};

	const validateNomineeS_D = (nomineeS_D: string) => {
		if (!nomineeS_D || nomineeS_D === "" || nomineeS_D === null) {
			dispatch(setNomineeS_DError("State/Division can't be empty"));
			return false;
		} else {
			dispatch(setNomineeS_DError(""));
			return true;
		}
	};

	const validateNomineeC_D = (nomineeC_D: string) => {
		if (!nomineeC_D || nomineeC_D === "" || nomineeC_D === null) {
			dispatch(setNomineeC_DError("City/District can't be empty"));
			return false;
		} else {
			dispatch(setNomineeC_DError(""));
			return true;
		}
	};

	const validateNomineeT_U = (nomineeT_U: string) => {
		if (!nomineeT_U || nomineeT_U === "" || nomineeT_U === null) {
			dispatch(setNomineeT_UError("Thana/Upazila can't be empty"));
			return false;
		} else {
			dispatch(setNomineeT_UError(""));
			return true;
		}
	};

	const validateNomineePostOffice = (nomineePostOffice: string) => {
		if (!nomineePostOffice || nomineePostOffice === "" || nomineePostOffice === null) {
			dispatch(setNomineePostOfficeError("Post office can't be empty"));
			return false;
		} else {
			dispatch(setNomineePostOfficeError(""));
			return true;
		}
	};

	const handleNext = async () => {
		setSubmissionError((s) => (s = ""));
		if (
			validateNomineeV_T_R_H_F(nomineeV_T_R_H_F.trim()) &&
			validateNomineeS_UP_B_O(nomineeS_UP_B_O.trim()) &&
			validateNomineeS_D(nomineeS_D.trim()) &&
			validateNomineeC_D(nomineeC_D.trim()) &&
			validateNomineeT_U(nomineeT_U.trim()) &&
			validateNomineePostOffice(nomineePostOffice.trim())
		) {
			setLoadingState((l) => ({
				...l,
				disabled: true,
				buttonText: "Loading...",
			}));
			const user = await updateUser(email.trim().toLowerCase(), {
				nomineeAddress: {
					v_t_r_h_f: nomineeV_T_R_H_F.trim(),
					s_up_b_o: nomineeS_UP_B_O.trim(),
					s_d: nomineeS_D.trim(),
					c_d: nomineeC_D.trim(),
					t_u: nomineeT_U.trim(),
					postOffice: nomineePostOffice.trim(),
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
			<h1 className="font-semibold text-xl md:text-2xl">Nominee address details:</h1>
			<form
				onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
					event.preventDefault();
				}}
				className="flex flex-col grow gap-5 w-full md:w-2/3"
				action=""
				method=""
			>
				<TextInput
					label="Village/Town/Road/House/Flat:"
					name="nomineeV_T_R_H_F"
					value={nomineeV_T_R_H_F}
					handleChange={handleNomineeV_T_R_H_FChange}
					error={nomineeV_T_R_H_FError}
					hint="Example (for metropolitan area): Flat - 3B, House - 294, Road - 32. Example (for rural area): Care of Md. Shafiqul Alam, Village - Mithamoin, House - 5."
				/>
				<TextInput
					label="Sector/Union parishad/Block/Others:"
					name="nomineeS_UP_B_O"
					value={nomineeS_UP_B_O}
					handleChange={handleNomineeS_UP_B_OChange}
					error={nomineeS_UP_B_OError}
					hint="Example (for metropolitan area): Block - B, Sector - 8. Example (for rural area): Laximpur."
				/>
				<TextInput
					label="State/Division:"
					name="nomineeS_D"
					value={nomineeS_D}
					handleChange={handleNomineeS_DChange}
					error={nomineeS_DError}
				/>
				<TextInput
					label="City/District:"
					name="nomineeC_D"
					value={nomineeC_D}
					handleChange={handleNomineeC_DChange}
					error={nomineeC_DError}
				/>
				<TextInput
					label="Thana/Upazila"
					name="nomineeT_U"
					value={nomineeT_U}
					handleChange={handleNomineeT_UChange}
					error={nomineeT_UError}
				/>
				<TextInput
					label="Post office:"
					name="nomineePostOffice"
					value={nomineePostOffice}
					handleChange={handleNomineePostOfficeChange}
					error={nomineePostOfficeError}
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

export default NomineeAddress;
