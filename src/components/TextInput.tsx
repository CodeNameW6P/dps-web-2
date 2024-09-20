import { useState } from "react";

type TextInputType = {
	name: string;
	label: string;
	type?: string;
	value?: string;
	handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	error?: string;
	hint?: string;
};

const TextInput: React.FC<TextInputType> = ({
	name,
	label,
	type = "text",
	value,
	handleChange,
	disabled = false,
	error,
	hint,
}) => {
	const [hrClassName, setHRClassName] = useState("border-gray-300");

	const handleFocus = () => {
		setHRClassName((h) => (h = "border-indigo-800"));
	};

	const handleBlur = () => {
		setHRClassName((h) => (h = "border-gray-300"));
	};

	return (
		<>
			<div className="flex flex-col md:text-lg">
				<label htmlFor={name}>{label}</label>
				<input
					onFocus={handleFocus}
					onBlur={handleBlur}
					className="text-gray-500 focus:outline-none"
					type={type}
					name={name}
					id={name}
					value={value}
					onChange={handleChange}
					disabled={disabled}
				/>
				<hr className={hrClassName} />
				<span className="text-red-500">{error}</span>
				<span className="text-gray-500 text-justify">{hint}</span>
			</div>
		</>
	);
};

export default TextInput;
