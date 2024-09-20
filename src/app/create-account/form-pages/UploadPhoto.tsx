import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { nextPage, prevPage } from "@/redux/slices/currentPageSlice";
import imageCompression from "browser-image-compression";
import ImageUpload from "@/components/ImageUpload";
import { setPhoto64 } from "@/redux/slices/formDataSlice";
import { updateUser } from "@/actions/userActions";

const UploadPhoto: React.FC = () => {
	const email = useAppSelector((state) => state.formData.email);
	const [base64Image, setBase64Image] = useState<string | null>(null);

	const dispatch = useAppDispatch();

	const [loadingState, setLoadingState] = useState({
		disabled: false,
		buttonText: "Next",
	});

	const [submissionError, setSubmissionError] = useState("");

	const convertToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	};

	const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setSubmissionError((s) => (s = ""));
		const photoFile: File | undefined | any = event.target.files?.[0];

		try {
			const options = {
				maxSizeMB: 1,
				maxWidthOrHeight: 420,
				useWebWorker: true,
			};

			const compressedImage = await imageCompression(photoFile, options);
			const imageToBase64 = await convertToBase64(compressedImage);
			console.log(imageToBase64);
			setBase64Image(imageToBase64);
		} catch (error) {
			setSubmissionError((s) => (s = "Image upload failed"));
		}
	};

	const handleNext = async () => {
		setSubmissionError((s) => (s = ""));
		if (base64Image) {
			setLoadingState((l) => ({
				...l,
				disabled: true,
				buttonText: "Loading...",
			}));
			const user = await updateUser(email.trim().toLowerCase(), {
				photo64: base64Image,
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
			setSubmissionError((s) => (s = "No photo"));
		}
	};

	return (
		<>
			<h1 className="font-semibold text-xl md:text-2xl">Upload photo:</h1>
			<form
				onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
					event.preventDefault();
				}}
				className="flex flex-col grow gap-5 w-full md:w-2/3"
				action=""
				method=""
			>
				<ImageUpload label="Image size must not exceed 25 MB" name="photo" />
				<input
					type="file"
					accept="image/*"
					name="photo"
					id="photo"
					onChange={handlePhotoChange}
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
						// onClick={() => dispatch(nextPage())}
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

export default UploadPhoto;
