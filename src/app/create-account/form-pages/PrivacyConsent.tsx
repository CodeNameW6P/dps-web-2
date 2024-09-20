import { useAppDispatch } from "@/redux/hooks";
import { nextPage, prevPage } from "@/redux/slices/currentPageSlice";
import Link from "next/link";

const PrivacyConsent: React.FC = () => {
	const CONSENT =
		"I hereby agree and consent to Mutual Trust Bank collecting, using, processing and disclosing me and my shareholder's, director's and authorized officer's personal information including but not limited to sensitive personal data as stated in the application form and/or account opening form for the purposes.";

	const dispatch = useAppDispatch();

	return (
		<>
			<h1 className="font-semibold text-xl md:text-2xl">Privacy consent:</h1>
			<form
				onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
					event.preventDefault();
				}}
				className="flex flex-col grow gap-5 w-full md:w-2/3"
				action=""
				method=""
			>
				<span className="text-justify">{CONSENT}</span>
				<Link className="text-green-500 text-justify underline" href="">
					Please refer to Mutual Trust Bank General Terms and Conditions for CASA
				</Link>
			</form>
			{/* <span className="text-red-500 place-self-center md:hidden">{submissionError}</span> */}
			<div className="flex mt-10 justify-between">
				<button
					onClick={() => dispatch(prevPage())}
					className="flex text-white justify-center items-center p-2 w-32 bg-red-500 rounded-md disabled:bg-red-300 hover:bg-red-700"
				>
					Back
				</button>
				<div className="flex items-center gap-5">
					{/* <span className="hidden text-red-500 md:flex">{submissionError}</span> */}
					<button
						onClick={() => dispatch(nextPage())}
						// onClick={handleNext}
						// disabled={loadingState.disabled}
						className="flex text-white justify-center items-center p-2 w-32 bg-green-500 rounded-md disabled:bg-green-300 hover:bg-green-700"
					>
						{/* {loadingState.buttonText} */}
						Next
					</button>
				</div>
			</div>
		</>
	);
};

export default PrivacyConsent;
