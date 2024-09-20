import mongoose from "mongoose";

const connectDB = async () => {
	const connectionString: string | undefined | any = process.env.DB_CONNECTION_STRING;

	mongoose
		.connect(connectionString)
		.then(() => console.log("Database connection established"))
		.catch((error: any) => console.log(error.message));
};

export default connectDB;
