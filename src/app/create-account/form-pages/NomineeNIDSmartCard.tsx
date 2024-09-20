import { useAppDispatch } from "@/redux/hooks";
import { nextPage, prevPage } from "@/redux/slices/currentPageSlice";
import ImageUpload from "@/components/ImageUpload";

const NomineeNIDSmartCard: React.FC = () => {
	const dispatch = useAppDispatch();

	return (
		<>
			<h1 className="font-semibold text-xl md:text-2xl">Nominee NID or SmartCard info:</h1>
			<form
				onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
					event.preventDefault();
				}}
				className="flex flex-col grow gap-5 w-full md:w-2/3"
				action=""
				method=""
			>
				<ImageUpload label="Front side:" name="frontSide" />
				<ImageUpload label="Back side:" name="backSide" />
				<div className="flex flex-col border-green-500 border-2 p-3">
					<h1 className="font-semibold">Detected information:</h1>
					<div>
						<label htmlFor="name">Name:</label>
					</div>
					<div>
						<label htmlFor="nidSmartCard">NID/SmartCard number:</label>
					</div>
				</div>
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

export default NomineeNIDSmartCard;
