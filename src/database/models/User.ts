import mongoose from "mongoose";

const defaultString = {
	type: String,
	default: "",
};

const defaultBoolean = {
	type: Boolean,
	default: false,
};

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: String,
			required: true,
			unique: true,
		},
		photo64: {
			type: String,
			default: ""
		},
		personal: {
			name: defaultString,
			gender: defaultString,
			dob: defaultString,
			nidSmartCard: defaultString,
			nameFather: defaultString,
			nameMother: defaultString,
			nameSpouse: defaultString,
		},
		income: {
			occupation: defaultString,
			organization: defaultString,
			designation: defaultString,
			profession: defaultString,
			monthlyIncome: defaultString,
			etinNumber: defaultString,
		},
		presentAddress: {
			v_t_r_h_f: defaultString,
			s_up_b_o: defaultString,
			s_d: defaultString,
			c_d: defaultString,
			t_u: defaultString,
			postOffice: defaultString,
		},
		permanentAddress: {
			v_t_r_h_f: defaultString,
			s_up_b_o: defaultString,
			s_d: defaultString,
			c_d: defaultString,
			t_u: defaultString,
			postOffice: defaultString,
		},
		officeAddress: {
			v_t_r_h_f: defaultString,
			s_up_b_o: defaultString,
			s_d: defaultString,
			c_d: defaultString,
			t_u: defaultString,
			postOffice: defaultString,
		},
		accountAndOther: {
			preferredAddress: defaultString,
			accountNumber: defaultString,
			accountPurpose: defaultString,
			preferredBranch: defaultString,
		},
		fatca: {
			fatca1: defaultBoolean,
			fatca2: defaultBoolean,
			fatca3: defaultBoolean,
			fatca4: defaultBoolean,
			fatca5: defaultBoolean,
			fatca6: defaultBoolean,
		},
		nomineePersonal: {
			name: defaultString,
			gender: defaultString,
			dob: defaultString,
			nidSmartCard: defaultString,
			nameFather: defaultString,
			nameMother: defaultString,
			phone: defaultString,
			mtbAccount: defaultBoolean,
		},
		nomineeAddress: {
			v_t_r_h_f: defaultString,
			s_up_b_o: defaultString,
			s_d: defaultString,
			c_d: defaultString,
			t_u: defaultString,
			postOffice: defaultString,
		},
	},
	{ timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
