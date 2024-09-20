import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
	setPermanentV_T_R_H_F,
	setPermanentS_UP_B_O,
	setPermanentS_D,
	setPermanentC_D,
	setPermanentT_U,
	setPermanentPostOffice,
} from "@/redux/slices/formDataSlice";
import {
	setPermanentV_T_R_H_FError,
	setPermanentS_UP_B_OError,
	setPermanentS_DError,
	setPermanentC_DError,
	setPermanentT_UError,
	setPermanentPostOfficeError,
} from "@/redux/slices/formErrorSlice";
import { nextPage, prevPage } from "@/redux/slices/currentPageSlice";
import { useState } from "react";
import { findUser, updateUser } from "@/actions/userActions";
import TextInput from "@/components/TextInput";

const PermanentAddress: React.FC = () => {
	const email = useAppSelector((state) => state.formData.email);

	const permanentV_T_R_H_F = useAppSelector((state) => state.formData.permanentAddress.v_t_r_h_f);
	const permanentS_UP_B_O = useAppSelector((state) => state.formData.permanentAddress.s_up_b_o);
	const permanentS_D = useAppSelector((state) => state.formData.permanentAddress.s_d);
	const permanentC_D = useAppSelector((state) => state.formData.permanentAddress.c_d);
	const permanentT_U = useAppSelector((state) => state.formData.permanentAddress.t_u);
	const permanentPostOffice = useAppSelector(
		(state) => state.formData.permanentAddress.postOffice
	);

	const permanentV_T_R_H_FError = useAppSelector(
		(state) => state.formError.permanentV_T_R_H_FError
	);
	const permanentS_UP_B_OError = useAppSelector(
		(state) => state.formError.permanentS_UP_B_OError
	);
	const permanentS_DError = useAppSelector((state) => state.formError.permanentS_DError);
	const permanentC_DError = useAppSelector((state) => state.formError.permanentC_DError);
	const permanentT_UError = useAppSelector((state) => state.formError.permanentT_UError);
	const permanentPostOfficeError = useAppSelector(
		(state) => state.formError.permanentPostOfficeError
	);

	const dispatch = useAppDispatch();

	const setPresentValues = async () => {
		const user = await findUser({ email: email.trim().toLowerCase() });
		if (user) {
			dispatch(setPermanentV_T_R_H_F(user.presentAddress.v_t_r_h_f));
			dispatch(setPermanentS_UP_B_O(user.presentAddress.s_up_b_o));
			dispatch(setPermanentS_D(user.presentAddress.s_d));
			dispatch(setPermanentC_D(user.presentAddress.c_d));
			dispatch(setPermanentT_U(user.presentAddress.t_u));
			dispatch(setPermanentPostOffice(user.presentAddress.postOffice));
		}
	};

	const setPermanentValues = async () => {
		const user = await findUser({ email: email.trim().toLowerCase() });
		if (user) {
			dispatch(setPermanentV_T_R_H_F(user.permanentAddress.v_t_r_h_f));
			dispatch(setPermanentS_UP_B_O(user.permanentAddress.s_up_b_o));
			dispatch(setPermanentS_D(user.permanentAddress.s_d));
			dispatch(setPermanentC_D(user.permanentAddress.c_d));
			dispatch(setPermanentT_U(user.permanentAddress.t_u));
			dispatch(setPermanentPostOffice(user.permanentAddress.postOffice));
		}
	};

	const [loadingState, setLoadingState] = useState({
		disabled: false,
		buttonText: "Next",
	});

	const [submissionError, setSubmissionError] = useState("");

	const handleSameAsPresent = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked === true) {
			setPresentValues();
		} else {
			setPermanentValues();
		}
	};

	const handlePermanentV_T_R_H_FChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPermanentV_T_R_H_F(event.target.value));
	};

	const handlePermanentS_UP_B_OChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPermanentS_UP_B_O(event.target.value));
	};

	const handlePermanentS_DChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPermanentS_D(event.target.value));
	};

	const handlePermanentC_DChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPermanentC_D(event.target.value));
	};

	const handlePermanentT_UChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPermanentT_U(event.target.value));
	};

	const handlePermanentPostOfficeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPermanentPostOffice(event.target.value));
	};

	const validatePermanentV_T_R_H_F = (permanentV_T_R_H_F: string) => {
		if (!permanentV_T_R_H_F || permanentV_T_R_H_F === "" || permanentV_T_R_H_F === null) {
			dispatch(setPermanentV_T_R_H_FError("Village/Town/Road/House/Flat can't be empty"));
			return false;
		} else {
			dispatch(setPermanentV_T_R_H_FError(""));
			return true;
		}
	};

	const validatePermanentS_UP_B_O = (permanentS_UP_B_O: string) => {
		if (!permanentS_UP_B_O || permanentS_UP_B_O === "" || permanentS_UP_B_O === null) {
			dispatch(
				setPermanentS_UP_B_OError("Sector/Union parishad/Block/Others can't be empty")
			);
			return false;
		} else {
			dispatch(setPermanentS_UP_B_OError(""));
			return true;
		}
	};

	const validatePermanentS_D = (permanentS_D: string) => {
		if (!permanentS_D || permanentS_D === "" || permanentS_D === null) {
			dispatch(setPermanentS_DError("State/Division can't be empty"));
			return false;
		} else {
			dispatch(setPermanentS_DError(""));
			return true;
		}
	};

	const validatePermanentC_D = (permanentC_D: string) => {
		if (!permanentC_D || permanentC_D === "" || permanentC_D === null) {
			dispatch(setPermanentC_DError("City/District can't be empty"));
			return false;
		} else {
			dispatch(setPermanentC_DError(""));
			return true;
		}
	};

	const validatePermanentT_U = (permanentT_U: string) => {
		if (!permanentT_U || permanentT_U === "" || permanentT_U === null) {
			dispatch(setPermanentT_UError("Thana/Upazila can't be empty"));
			return false;
		} else {
			dispatch(setPermanentT_UError(""));
			return true;
		}
	};

	const validatePermanentPostOffice = (permanentPostOffice: string) => {
		if (!permanentPostOffice || permanentPostOffice === "" || permanentPostOffice === null) {
			dispatch(setPermanentPostOfficeError("Post office can't be empty"));
			return false;
		} else {
			dispatch(setPermanentPostOfficeError(""));
			return true;
		}
	};

	const handleNext = async () => {
		setSubmissionError((s) => (s = ""));
		if (
			validatePermanentV_T_R_H_F(permanentV_T_R_H_F.trim()) &&
			validatePermanentS_UP_B_O(permanentS_UP_B_O.trim()) &&
			validatePermanentS_D(permanentS_D.trim()) &&
			validatePermanentC_D(permanentC_D.trim()) &&
			validatePermanentT_U(permanentT_U.trim()) &&
			validatePermanentPostOffice(permanentPostOffice.trim())
		) {
			setLoadingState((l) => ({
				...l,
				disabled: true,
				buttonText: "Loading...",
			}));
			const user = await updateUser(email.trim().toLowerCase(), {
				permanentAddress: {
					v_t_r_h_f: permanentV_T_R_H_F.trim(),
					s_up_b_o: permanentS_UP_B_O.trim(),
					s_d: permanentS_D.trim(),
					c_d: permanentC_D.trim(),
					t_u: permanentT_U.trim(),
					postOffice: permanentPostOffice.trim(),
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
			<h1 className="font-semibold text-xl md:text-2xl">Permanent address details:</h1>
			<form
				onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
					event.preventDefault();
				}}
				className="flex flex-col grow gap-5 w-full md:w-2/3"
				action=""
				method=""
			>
				<div className="flex flex-row gap-5 items-center md:text-lg">
					<input
						className="text-gray-500 focus:outline-none"
						onChange={handleSameAsPresent}
						type="checkbox"
						name="sameAsPresent"
						id="sameAsPresent"
					/>
					<span>Same as present address</span>
				</div>
				<TextInput
					label="Village/Town/Road/House/Flat:"
					name="permanentV_T_R_H_F"
					value={permanentV_T_R_H_F}
					handleChange={handlePermanentV_T_R_H_FChange}
					error={permanentV_T_R_H_FError}
					hint="Example (for metropolitan area): Flat - 3B, House - 294, Road - 32. Example (for rural area): Care of Md. Shafiqul Alam, Village - Mithamoin, House - 5."
				/>
				<TextInput
					label="Sector/Union parishad/Block/Others:"
					name="permanentS_UP_B_O"
					value={permanentS_UP_B_O}
					handleChange={handlePermanentS_UP_B_OChange}
					error={permanentS_UP_B_OError}
					hint="Example (for metropolitan area): Block - B, Sector - 8. Example (for rural area): Laximpur."
				/>
				<TextInput
					label="State/Division:"
					name="permanentS_D"
					value={permanentS_D}
					handleChange={handlePermanentS_DChange}
					error={permanentS_DError}
				/>
				<TextInput
					label="City/District:"
					name="permanentC_D"
					value={permanentC_D}
					handleChange={handlePermanentC_DChange}
					error={permanentC_DError}
				/>
				<TextInput
					label="Thana/Upazila"
					name="permanentT_U"
					value={permanentT_U}
					handleChange={handlePermanentT_UChange}
					error={permanentT_UError}
				/>
				<TextInput
					label="Post office:"
					name="permanentPostOffice"
					value={permanentPostOffice}
					handleChange={handlePermanentPostOfficeChange}
					error={permanentPostOfficeError}
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

export default PermanentAddress;
