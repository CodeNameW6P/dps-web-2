import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
	setOfficeV_T_R_H_F,
	setOfficeS_UP_B_O,
	setOfficeS_D,
	setOfficeC_D,
	setOfficeT_U,
	setOfficePostOffice,
} from "@/redux/slices/formDataSlice";
import {
	setOfficeV_T_R_H_FError,
	setOfficeS_UP_B_OError,
	setOfficeS_DError,
	setOfficeC_DError,
	setOfficeT_UError,
	setOfficePostOfficeError,
} from "@/redux/slices/formErrorSlice";
import { nextPage, prevPage } from "@/redux/slices/currentPageSlice";
import { useState } from "react";
import { findUser, updateUser } from "@/actions/userActions";
import TextInput from "@/components/TextInput";

const OfficeAddress: React.FC = () => {
	const email = useAppSelector((state) => state.formData.email);

	const officeV_T_R_H_F = useAppSelector((state) => state.formData.officeAddress.v_t_r_h_f);
	const officeS_UP_B_O = useAppSelector((state) => state.formData.officeAddress.s_up_b_o);
	const officeS_D = useAppSelector((state) => state.formData.officeAddress.s_d);
	const officeC_D = useAppSelector((state) => state.formData.officeAddress.c_d);
	const officeT_U = useAppSelector((state) => state.formData.officeAddress.t_u);
	const officePostOffice = useAppSelector((state) => state.formData.officeAddress.postOffice);

	const officeV_T_R_H_FError = useAppSelector((state) => state.formError.officeV_T_R_H_FError);
	const officeS_UP_B_OError = useAppSelector((state) => state.formError.officeS_UP_B_OError);
	const officeS_DError = useAppSelector((state) => state.formError.officeS_DError);
	const officeC_DError = useAppSelector((state) => state.formError.officeC_DError);
	const officeT_UError = useAppSelector((state) => state.formError.officeT_UError);
	const officePostOfficeError = useAppSelector((state) => state.formError.officePostOfficeError);

	const dispatch = useAppDispatch();

	const setPresentValues = async () => {
		const user = await findUser({ email: email.trim().toLowerCase() });
		if (user) {
			dispatch(setOfficeV_T_R_H_F(user.presentAddress.v_t_r_h_f));
			dispatch(setOfficeS_UP_B_O(user.presentAddress.s_up_b_o));
			dispatch(setOfficeS_D(user.presentAddress.s_d));
			dispatch(setOfficeC_D(user.presentAddress.c_d));
			dispatch(setOfficeT_U(user.presentAddress.t_u));
			dispatch(setOfficePostOffice(user.presentAddress.postOffice));
		}
	};

	const setPermanentValues = async () => {
		const user = await findUser({ email: email.trim().toLowerCase() });
		if (user) {
			dispatch(setOfficeV_T_R_H_F(user.permanentAddress.v_t_r_h_f));
			dispatch(setOfficeS_UP_B_O(user.permanentAddress.s_up_b_o));
			dispatch(setOfficeS_D(user.permanentAddress.s_d));
			dispatch(setOfficeC_D(user.permanentAddress.c_d));
			dispatch(setOfficeT_U(user.permanentAddress.t_u));
			dispatch(setOfficePostOffice(user.permanentAddress.postOffice));
		}
	};

	const setOfficeValues = async () => {
		const user = await findUser({ email: email.trim().toLowerCase() });
		if (user) {
			dispatch(setOfficeV_T_R_H_F(user.officeAddress.v_t_r_h_f));
			dispatch(setOfficeS_UP_B_O(user.officeAddress.s_up_b_o));
			dispatch(setOfficeS_D(user.officeAddress.s_d));
			dispatch(setOfficeC_D(user.officeAddress.c_d));
			dispatch(setOfficeT_U(user.officeAddress.t_u));
			dispatch(setOfficePostOffice(user.officeAddress.postOffice));
		}
	};

	const [loadingState, setLoadingState] = useState({
		disabled: false,
		buttonText: "Next",
	});

	const [submissionError, setSubmissionError] = useState("");

	const [formValuesAs, setFormValuesAs] = useState("");

	const handleFormValueAs = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormValuesAs((f) => (f = event.target.value));
	};

	const handleOfficeV_T_R_H_FChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setOfficeV_T_R_H_F(event.target.value));
	};

	const handleOfficeS_UP_B_OChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setOfficeS_UP_B_O(event.target.value));
	};

	const handleOfficeS_DChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setOfficeS_D(event.target.value));
	};

	const handleOfficeC_DChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setOfficeC_D(event.target.value));
	};

	const handleOfficeT_UChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setOfficeT_U(event.target.value));
	};

	const handleOfficePostOfficeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setOfficePostOffice(event.target.value));
	};

	const validateOfficeV_T_R_H_F = (officeV_T_R_H_F: string) => {
		if (!officeV_T_R_H_F || officeV_T_R_H_F === "" || officeV_T_R_H_F === null) {
			dispatch(setOfficeV_T_R_H_FError("Village/Town/Road/House/Flat can't be empty"));
			return false;
		} else {
			dispatch(setOfficeV_T_R_H_FError(""));
			return true;
		}
	};

	const validateOfficeS_UP_B_O = (officeS_UP_B_O: string) => {
		if (!officeS_UP_B_O || officeS_UP_B_O === "" || officeS_UP_B_O === null) {
			dispatch(setOfficeS_UP_B_OError("Sector/Union parishad/Block/Others can't be empty"));
			return false;
		} else {
			dispatch(setOfficeS_UP_B_OError(""));
			return true;
		}
	};

	const validateOfficeS_D = (officeS_D: string) => {
		if (!officeS_D || officeS_D === "" || officeS_D === null) {
			dispatch(setOfficeS_DError("State/Division can't be empty"));
			return false;
		} else {
			dispatch(setOfficeS_DError(""));
			return true;
		}
	};

	const validateOfficeC_D = (officeC_D: string) => {
		if (!officeC_D || officeC_D === "" || officeC_D === null) {
			dispatch(setOfficeC_DError("City/District can't be empty"));
			return false;
		} else {
			dispatch(setOfficeC_DError(""));
			return true;
		}
	};

	const validateOfficeT_U = (officeT_U: string) => {
		if (!officeT_U || officeT_U === "" || officeT_U === null) {
			dispatch(setOfficeT_UError("Thana/Upazila can't be empty"));
			return false;
		} else {
			dispatch(setOfficeT_UError(""));
			return true;
		}
	};

	const validateOfficePostOffice = (officePostOffice: string) => {
		if (!officePostOffice || officePostOffice === "" || officePostOffice === null) {
			dispatch(setOfficePostOfficeError("Post office can't be empty"));
			return false;
		} else {
			dispatch(setOfficePostOfficeError(""));
			return true;
		}
	};

	const handleNext = async () => {
		setSubmissionError((s) => (s = ""));
		if (
			validateOfficeV_T_R_H_F(officeV_T_R_H_F.trim()) &&
			validateOfficeS_UP_B_O(officeS_UP_B_O.trim()) &&
			validateOfficeS_D(officeS_D.trim()) &&
			validateOfficeC_D(officeC_D.trim()) &&
			validateOfficeT_U(officeT_U.trim()) &&
			validateOfficePostOffice(officePostOffice.trim())
		) {
			setLoadingState((l) => ({
				...l,
				disabled: true,
				buttonText: "Loading...",
			}));
			const user = await updateUser(email.trim().toLowerCase(), {
				officeAddress: {
					v_t_r_h_f: officeV_T_R_H_F.trim(),
					s_up_b_o: officeS_UP_B_O.trim(),
					s_d: officeS_D.trim(),
					c_d: officeC_D.trim(),
					t_u: officeT_U.trim(),
					postOffice: officePostOffice.trim(),
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
			<h1 className="font-semibold text-xl md:text-2xl">Office address details:</h1>
			<form
				onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
					event.preventDefault();
				}}
				className="flex flex-col grow gap-5 w-full md:w-2/3"
				action=""
				method=""
			>
				<div className="flex flex-col">
					<div className="flex flex-row gap-5 items-center">
						<input
							className="text-gray-500 focus:outline-none"
							type="radio"
							name="formValueAs"
							id="formValueAs"
							value="office"
							onChange={setOfficeValues}
							defaultChecked
						/>
						<span>New office address</span>
					</div>
					<div className="flex flex-row gap-5 items-center">
						<input
							className="text-gray-500 focus:outline-none"
							type="radio"
							name="formValueAs"
							id="formValueAs"
							value="present"
							onChange={setPresentValues}
						/>
						<span>Same as present address</span>
					</div>
					<div className="flex flex-row gap-5 items-center">
						<input
							className="text-gray-500 focus:outline-none"
							type="radio"
							name="formValueAs"
							id="formValueAs"
							value="permanent"
							onChange={setPermanentValues}
						/>
						<span>Same as permanent address</span>
					</div>
				</div>
				<TextInput
					label="Village/Town/Road/House/Flat:"
					name="officeV_T_R_H_F"
					value={officeV_T_R_H_F}
					handleChange={handleOfficeV_T_R_H_FChange}
					error={officeV_T_R_H_FError}
					hint="Example (for metropolitan area): Flat - 3B, House - 294, Road - 32. Example (for rural area): Care of Md. Shafiqul Alam, Village - Mithamoin, House - 5."
				/>
				<TextInput
					label="Sector/Union parishad/Block/Others:"
					name="officeS_UP_B_O"
					value={officeS_UP_B_O}
					handleChange={handleOfficeS_UP_B_OChange}
					error={officeS_UP_B_OError}
					hint="Example (for metropolitan area): Block - B, Sector - 8. Example (for rural area): Laximpur."
				/>
				<TextInput
					label="State/Division:"
					name="officeS_D"
					value={officeS_D}
					handleChange={handleOfficeS_DChange}
					error={officeS_DError}
				/>
				<TextInput
					label="City/District:"
					name="officeC_D"
					value={officeC_D}
					handleChange={handleOfficeC_DChange}
					error={officeC_DError}
				/>
				<TextInput
					label="Thana/Upazila"
					name="officeT_U"
					value={officeT_U}
					handleChange={handleOfficeT_UChange}
					error={officeT_UError}
				/>
				<TextInput
					label="Post office:"
					name="officePostOffice"
					value={officePostOffice}
					handleChange={handleOfficePostOfficeChange}
					error={officePostOfficeError}
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

export default OfficeAddress;
