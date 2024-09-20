import { useAppDispatch } from "@/redux/hooks";
import { nextPage, prevPage } from "@/redux/slices/currentPageSlice";

const Final: React.FC = () => {
	const dispatch = useAppDispatch();

	return (
		<>
			<h1 className="font-semibold text-xl md:text-2xl place-self-center">
				Congratulations!
			</h1>
			<div className="flex flex-col grow gap-5 w-full md:w-2/3 place-self-center items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width=""
					height=""
					fill="currentColor"
					className="w-auto md:w-96 fill-green-500 bi bi-check2-circle"
					viewBox="0 0 16 16"
				>
					<path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
					<path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
				</svg>
				<span className="text-xl">Profile created successfully!</span>
				<span className="text-xl">You can now create new DPS.</span>
			</div>
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
						// onClick={() => dispatch(nextPage())}
						// onClick={handleNext}
						// disabled={loadingState.disabled}
						className="flex text-white justify-center items-center p-2 w-32 bg-green-500 rounded-md disabled:bg-green-300 hover:bg-green-700"
					>
						{/* {loadingState.buttonText} */}
						Home
					</button>
				</div>
			</div>
		</>
	);
};

export default Final;
