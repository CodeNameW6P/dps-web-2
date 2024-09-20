import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { nextPage, prevPage } from "@/redux/slices/currentPageSlice";
import {
	setFATCA1,
	setFATCA2,
	setFATCA3,
	setFATCA4,
	setFATCA5,
	setFATCA6,
} from "@/redux/slices/formDataSlice";
import { useState } from "react";
import { updateUser } from "@/actions/userActions";

const FATCA: React.FC = () => {
	const FATCA_H1 = "Are you a citizen of the US?";
	const FATCA_H2 = "Do you hold US green card or a lawful residence in the US?";
	const FATCA_H3 =
		"Do you have a US address (including P.O. box)/US phone number/US email address?";
	const FATCA_H4 =
		"Have you granted the power of attorney to someone who has a US address/US phone number/US email address?";
	const FATCA_H5 =
		"Have you stayed in the US for 138 days or longer during a 3-year period including the present year?";
	const FATCA_H6 =
		"Do you receive sourced from the US that is interest, dividend, rent, payment for services (salaries) or any other Fixed Determinable Annual Periodical [FDAP] income?";
	const CONSENT =
		"I hereby acknowledge that the statements given above is true, accurate and complete to the best of my knowledge. If any of these statements is identified to be false, I hereby consent MTB to treat the account as per directions of FATCA";

	const email = useAppSelector((state) => state.formData.email);

	const fatca1 = useAppSelector((state) => state.formData.fatca.fatca1);
	const fatca2 = useAppSelector((state) => state.formData.fatca.fatca2);
	const fatca3 = useAppSelector((state) => state.formData.fatca.fatca3);
	const fatca4 = useAppSelector((state) => state.formData.fatca.fatca4);
	const fatca5 = useAppSelector((state) => state.formData.fatca.fatca5);
	const fatca6 = useAppSelector((state) => state.formData.fatca.fatca6);

	const toggleOff = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			fill=""
			className="hover:fill-green-700 fill-green-500 min-w-10 bi bi-toggle2-off"
			viewBox="0 0 16 16"
		>
			<path d="M9 11c.628-.836 1-1.874 1-3a4.98 4.98 0 0 0-1-3h4a3 3 0 1 1 0 6z" />
			<path d="M5 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8m0 1A5 5 0 1 0 5 3a5 5 0 0 0 0 10" />
		</svg>
	);

	const toggleOn = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			fill=""
			className="hover:fill-green-700 fill-green-500 min-w-10 bi bi-toggle2-on"
			viewBox="0 0 16 16"
		>
			<path d="M7 5H3a3 3 0 0 0 0 6h4a5 5 0 0 1-.584-1H3a2 2 0 1 1 0-4h3.416q.235-.537.584-1" />
			<path d="M16 8A5 5 0 1 1 6 8a5 5 0 0 1 10 0" />
		</svg>
	);

	const dispatch = useAppDispatch();

	const [loadingState, setLoadingState] = useState({
		disabled: false,
		buttonText: "Next",
	});

	const [submissionError, setSubmissionError] = useState("");

	const [consentCheck, setConsentCheck] = useState(false);

	const handleFATCA1 = () => {
		dispatch(setFATCA1(!fatca1));
	};

	const handleFATCA2 = () => {
		dispatch(setFATCA2(!fatca2));
	};

	const handleFATCA3 = () => {
		dispatch(setFATCA3(!fatca3));
	};

	const handleFATCA4 = () => {
		dispatch(setFATCA4(!fatca4));
	};

	const handleFATCA5 = () => {
		dispatch(setFATCA5(!fatca5));
	};

	const handleFATCA6 = () => {
		dispatch(setFATCA6(!fatca6));
	};

	const handleConsentCheck = () => {
		setConsentCheck((c) => (c = !c));
	};

	const handleNext = async () => {
		setSubmissionError((s) => (s = ""));
		if (consentCheck === true) {
			setLoadingState((l) => ({
				...l,
				disabled: true,
				buttonText: "Loading...",
			}));
			const user = await updateUser(email.trim().toLowerCase(), {
				fatca: {
					fatca1: fatca1,
					fatca2: fatca2,
					fatca3: fatca3,
					fatca4: fatca4,
					fatca5: fatca5,
					fatca6: fatca6,
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
		} else {
			setSubmissionError("Please agree with MTB's policy");
		}
	};

	return (
		<>
			<h1 className="font-semibold text-xl md:text-2xl">FATCA declaration:</h1>
			<form
				onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
					event.preventDefault();
				}}
				className="flex flex-col grow gap-5 w-full md:w-2/3"
				action=""
				method=""
			>
				<div
					className="flex flex-row border-green-500 border-2 p-3 gap-2 justify-between items-center"
					id="fatca1"
				>
					<h1 className="text-justify">{FATCA_H1}</h1>
					<div onClick={handleFATCA1}>{fatca1 === true ? toggleOn : toggleOff}</div>
				</div>
				<div
					className="flex flex-row border-green-500 border-2 p-3 gap-2 justify-between items-center"
					id="fatca2"
				>
					<h1 className="text-justify">{FATCA_H2}</h1>
					<div onClick={handleFATCA2}>{fatca2 === true ? toggleOn : toggleOff}</div>
				</div>
				<div
					className="flex flex-row border-green-500 border-2 p-3 gap-2 justify-between items-center"
					id="fatca3"
				>
					<h1 className="text-justify">{FATCA_H3}</h1>
					<div onClick={handleFATCA3}>{fatca3 === true ? toggleOn : toggleOff}</div>
				</div>
				<div
					className="flex flex-row border-green-500 border-2 p-3 gap-2 justify-between items-center"
					id="fatca4"
				>
					<h1 className="text-justify">{FATCA_H4}</h1>
					<div onClick={handleFATCA4}>{fatca4 === true ? toggleOn : toggleOff}</div>
				</div>
				<div
					className="flex flex-row border-green-500 border-2 p-3 gap-2 justify-between items-center"
					id="fatca5"
				>
					<h1 className="text-justify">{FATCA_H5}</h1>
					<div onClick={handleFATCA5}>{fatca5 === true ? toggleOn : toggleOff}</div>
				</div>
				<div
					className="flex flex-row border-green-500 border-2 p-3 gap-2 justify-between items-center"
					id="fatca6"
				>
					<h1 className="text-justify">{FATCA_H6}</h1>
					<div onClick={handleFATCA6}>{fatca6 === true ? toggleOn : toggleOff}</div>
				</div>
				<div className="flex flex-row gap-5 items-center">
					<input
						onChange={handleConsentCheck}
						type="checkbox"
						name="consent"
						id="consent"
						checked={consentCheck}
					/>
					<span className="text-justify">{CONSENT}</span>
				</div>
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

export default FATCA;
