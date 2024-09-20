type ImageUploadType = {
	label: string;
	name: string;
};

const ImageUpload: React.FC<ImageUploadType> = ({ name, label }) => {
	return (
		<>
			<div className="flex flex-col">
				<label className="md:text-lg" htmlFor={name}>
					{label}
				</label>
				<div className="hidden md:flex flex-col gap-2 items-center justify-center border border-dashed border-black min-h-64">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						fill="black"
						className="bi bi-card-image"
						viewBox="0 0 16 16"
					>
						<path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
						<path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z" />
					</svg>
					<span>Drag and drop image</span>
				</div>
				<button className="flex border border-gray-300 justify-center items-center mt-2 p-2 w-32 hover:border-indigo-800 hover:text-indigo-800 disabled:border-gray-300 disabled:text-gray-300">
					Upload
				</button>
			</div>
		</>
	);
};

export default ImageUpload;
