type BottomButtonsType = {
	submissionError: string | null;
	handleBack: () => void;
	handleNext: () => void;
	loadingState: {
		disabled: boolean;
		buttonText: string;
	};
};

const BottomButtons: React.FC<BottomButtonsType> = ({
	submissionError,
	handleBack,
	handleNext,
	loadingState,
}) => {
	return (
		<>
			<span className="text-red-500 place-self-center md:hidden">{submissionError}</span>
			<div className="flex mt-10 justify-between">
				<button
					onClick={handleBack}
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

export default BottomButtons;
