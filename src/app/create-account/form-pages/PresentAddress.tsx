import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
	setPresentV_T_R_H_F,
	setPresentS_UP_B_O,
	setPresentS_D,
	setPresentC_D,
	setPresentT_U,
	setPresentPostOffice,
} from "@/redux/slices/formDataSlice";
import {
	setPresentV_T_R_H_FError,
	setPresentS_UP_B_OError,
	setPresentS_DError,
	setPresentC_DError,
	setPresentT_UError,
	setPresentPostOfficeError,
} from "@/redux/slices/formErrorSlice";
import { nextPage, prevPage } from "@/redux/slices/currentPageSlice";
import { useState } from "react";
import { updateUser } from "@/actions/userActions";
import TextInput from "@/components/TextInput";

const PresentAddress: React.FC = () => {
	const email = useAppSelector((state) => state.formData.email);

	const presentV_T_R_H_F = useAppSelector((state) => state.formData.presentAddress.v_t_r_h_f);
	const presentS_UP_B_O = useAppSelector((state) => state.formData.presentAddress.s_up_b_o);
	const presentS_D = useAppSelector((state) => state.formData.presentAddress.s_d);
	const presentC_D = useAppSelector((state) => state.formData.presentAddress.c_d);
	const presentT_U = useAppSelector((state) => state.formData.presentAddress.t_u);
	const presentPostOffice = useAppSelector((state) => state.formData.presentAddress.postOffice);

	const presentV_T_R_H_FError = useAppSelector((state) => state.formError.presentV_T_R_H_FError);
	const presentS_UP_B_OError = useAppSelector((state) => state.formError.presentS_UP_B_OError);
	const presentS_DError = useAppSelector((state) => state.formError.presentS_DError);
	const presentC_DError = useAppSelector((state) => state.formError.presentC_DError);
	const presentT_UError = useAppSelector((state) => state.formError.presentT_UError);
	const presentPostOfficeError = useAppSelector(
		(state) => state.formError.presentPostOfficeError
	);

	const dispatch = useAppDispatch();

	const [loadingState, setLoadingState] = useState({
		disabled: false,
		buttonText: "Next",
	});

	const [submissionError, setSubmissionError] = useState("");

	const handlePresentV_T_R_H_FChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPresentV_T_R_H_F(event.target.value));
	};

	const handlePresentS_UP_B_OChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPresentS_UP_B_O(event.target.value));
	};

	const handlePresentS_DChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPresentS_D(event.target.value));
	};

	const handlePresentC_DChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPresentC_D(event.target.value));
	};

	const handlePresentT_UChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPresentT_U(event.target.value));
	};

	const handlePresentPostOfficeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPresentPostOffice(event.target.value));
	};

	const validatePresentV_T_R_H_F = (presentV_T_R_H_F: string) => {
		if (!presentV_T_R_H_F || presentV_T_R_H_F === "" || presentV_T_R_H_F === null) {
			dispatch(setPresentV_T_R_H_FError("Village/Town/Road/House/Flat can't be empty"));
			return false;
		} else {
			dispatch(setPresentV_T_R_H_FError(""));
			return true;
		}
	};

	const validatePresentS_UP_B_O = (presentS_UP_B_O: string) => {
		if (!presentS_UP_B_O || presentS_UP_B_O === "" || presentS_UP_B_O === null) {
			dispatch(setPresentS_UP_B_OError("Sector/Union parishad/Block/Others can't be empty"));
			return false;
		} else {
			dispatch(setPresentS_UP_B_OError(""));
			return true;
		}
	};

	const validatePresentS_D = (presentS_D: string) => {
		if (!presentS_D || presentS_D === "" || presentS_D === null) {
			dispatch(setPresentS_DError("State/Division can't be empty"));
			return false;
		} else {
			dispatch(setPresentS_DError(""));
			return true;
		}
	};

	const validatePresentC_D = (presentC_D: string) => {
		if (!presentC_D || presentC_D === "" || presentC_D === null) {
			dispatch(setPresentC_DError("City/District can't be empty"));
			return false;
		} else {
			dispatch(setPresentC_DError(""));
			return true;
		}
	};

	const validatePresentT_U = (presentT_U: string) => {
		if (!presentT_U || presentT_U === "" || presentT_U === null) {
			dispatch(setPresentT_UError("Thana/Upazila can't be empty"));
			return false;
		} else {
			dispatch(setPresentT_UError(""));
			return true;
		}
	};

	const validatePresentPostOffice = (presentPostOffice: string) => {
		if (!presentPostOffice || presentPostOffice === "" || presentPostOffice === null) {
			dispatch(setPresentPostOfficeError("Post office can't be empty"));
			return false;
		} else {
			dispatch(setPresentPostOfficeError(""));
			return true;
		}
	};

	const handleNext = async () => {
		setSubmissionError((s) => (s = ""));
		if (
			validatePresentV_T_R_H_F(presentV_T_R_H_F.trim()) &&
			validatePresentS_UP_B_O(presentS_UP_B_O.trim()) &&
			validatePresentS_D(presentS_D.trim()) &&
			validatePresentC_D(presentC_D.trim()) &&
			validatePresentT_U(presentT_U.trim()) &&
			validatePresentPostOffice(presentPostOffice.trim())
		) {
			setLoadingState((l) => ({
				...l,
				disabled: true,
				buttonText: "Loading...",
			}));
			const user = await updateUser(email.trim().toLowerCase(), {
				presentAddress: {
					v_t_r_h_f: presentV_T_R_H_F.trim(),
					s_up_b_o: presentS_UP_B_O.trim(),
					s_d: presentS_D.trim(),
					c_d: presentC_D.trim(),
					t_u: presentT_U.trim(),
					postOffice: presentPostOffice.trim(),
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
			<h1 className="font-semibold text-xl md:text-2xl">Present address details:</h1>
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
					name="presentV_T_R_H_F"
					value={presentV_T_R_H_F}
					handleChange={handlePresentV_T_R_H_FChange}
					error={presentV_T_R_H_FError}
					hint="Example (for metropolitan area): Flat - 3B, House - 294, Road - 32. Example (for rural area): Care of Md. Shafiqul Alam, Village - Mithamoin, House - 5."
				/>
				<TextInput
					label="Sector/Union parishad/Block/Others:"
					name="presentS_UP_B_O"
					value={presentS_UP_B_O}
					handleChange={handlePresentS_UP_B_OChange}
					error={presentS_UP_B_OError}
					hint="Example (for metropolitan area): Block - B, Sector - 8. Example (for rural area): Laximpur."
				/>
				<TextInput
					label="State/Division:"
					name="presentS_D"
					value={presentS_D}
					handleChange={handlePresentS_DChange}
					error={presentS_DError}
				/>
				<TextInput
					label="City/District:"
					name="presentC_D"
					value={presentC_D}
					handleChange={handlePresentC_DChange}
					error={presentC_DError}
				/>
				<TextInput
					label="Thana/Upazila"
					name="presentT_U"
					value={presentT_U}
					handleChange={handlePresentT_UChange}
					error={presentT_UError}
				/>
				<TextInput
					label="Post office:"
					name="presentPostOffice"
					value={presentPostOffice}
					handleChange={handlePresentPostOfficeChange}
					error={presentPostOfficeError}
				/>
			</form>
			<span className="text-red-500 place-self-center md:hidden">{submissionError}</span>
			<div className="flex mt-10 justify-between">
				<button
					onClick={() => dispatch(prevPage())}
					className="flex border border-gray-300 justify-center items-center p-2 w-32 hover:border-indigo-800 hover:text-indigo-800 disabled:border-gray-300 disabled:text-gray-300"
					>
					Back
				</button>
				<div className="flex items-center gap-5">
					<span className="hidden text-red-500 md:flex">{submissionError}</span>
					<button
						onClick={handleNext}
						disabled={loadingState.disabled}
						className="flex border border-gray-300 justify-center items-center p-2 w-32 hover:border-indigo-800 hover:text-indigo-800 disabled:border-gray-300 disabled:text-gray-300"
					>
						{loadingState.buttonText}
					</button>
				</div>
			</div>
		</>
	);
};

export default PresentAddress;
