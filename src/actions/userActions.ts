"use server";
import connectDB from "@/database/connectDB";
import User from "@/database/models/User";

export const createUser = async (formData: any) => {
	await connectDB();
	try {
		const user = await User.create(formData);
		if (user) {
			return JSON.parse(JSON.stringify(user));
		} else {
			return false;
		}
	} catch (error: any) {
		console.log(error.message);
		return false;
	}
};

export const findUser = async (formData: any) => {
	await connectDB();
	try {
		const user = await User.findOne(formData);
		if (user) {
			return JSON.parse(JSON.stringify(user));
		} else {
			return false;
		}
	} catch (error: any) {
		console.log(error.message);
		return false;
	}
};

export const updateUser = async (email: string, formData: any) => {
	await connectDB();
	try {
		const user = await User.updateOne({ email: email }, formData);
		if (user) {
			return JSON.parse(JSON.stringify(user));
		} else {
			return false;
		}
	} catch (error: any) {
		console.log(error.message);
		return false;
	}
};
