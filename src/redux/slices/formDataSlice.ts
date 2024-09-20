import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type FormDataType = {
	email: string;
	phone: string;
	photo64: string;
	personal: {
		name: string;
		gender: string;
		dob: string;
		nidSmartCard: string;
		nameFather: string;
		nameMother: string;
		nameSpouse: string;
	};
	income: {
		occupation: string;
		organization: string;
		designation: string;
		profession: string;
		monthlyIncome: string;
		etinNumber: string;
	};
	presentAddress: {
		v_t_r_h_f: string;
		s_up_b_o: string;
		s_d: string;
		c_d: string;
		t_u: string;
		postOffice: string;
	};
	permanentAddress: {
		v_t_r_h_f: string;
		s_up_b_o: string;
		s_d: string;
		c_d: string;
		t_u: string;
		postOffice: string;
	};
	officeAddress: {
		v_t_r_h_f: string;
		s_up_b_o: string;
		s_d: string;
		c_d: string;
		t_u: string;
		postOffice: string;
	};
	accountAndOther: {
		preferredAddress: string;
		accountNumber: string;
		accountPurpose: string;
		preferredBranch: string;
	};
	fatca: {
		fatca1: boolean;
		fatca2: boolean;
		fatca3: boolean;
		fatca4: boolean;
		fatca5: boolean;
		fatca6: boolean;
	};
	nomineePersonal: {
		name: string;
		gender: string;
		dob: string;
		nidSmartCard: string;
		nameFather: string;
		nameMother: string;
		phone: string;
		mtbAccount: boolean;
	};
	nomineeAddress: {
		v_t_r_h_f: string;
		s_up_b_o: string;
		s_d: string;
		c_d: string;
		t_u: string;
		postOffice: string;
	};
};

const initialState: FormDataType = {
	email: "",
	phone: "",
	photo64: "",
	personal: {
		name: "",
		gender: "",
		dob: "",
		nidSmartCard: "",
		nameFather: "",
		nameMother: "",
		nameSpouse: "",
	},
	income: {
		occupation: "",
		organization: "",
		designation: "",
		profession: "",
		monthlyIncome: "",
		etinNumber: "",
	},
	presentAddress: {
		v_t_r_h_f: "",
		s_up_b_o: "",
		s_d: "",
		c_d: "",
		t_u: "",
		postOffice: "",
	},
	permanentAddress: {
		v_t_r_h_f: "",
		s_up_b_o: "",
		s_d: "",
		c_d: "",
		t_u: "",
		postOffice: "",
	},
	officeAddress: {
		v_t_r_h_f: "",
		s_up_b_o: "",
		s_d: "",
		c_d: "",
		t_u: "",
		postOffice: "",
	},
	accountAndOther: {
		preferredAddress: "",
		accountNumber: "",
		accountPurpose: "",
		preferredBranch: "",
	},
	fatca: {
		fatca1: false,
		fatca2: false,
		fatca3: false,
		fatca4: false,
		fatca5: false,
		fatca6: false,
	},
	nomineePersonal: {
		name: "",
		gender: "",
		dob: "",
		nidSmartCard: "",
		nameFather: "",
		nameMother: "",
		phone: "",
		mtbAccount: false,
	},
	nomineeAddress: {
		v_t_r_h_f: "",
		s_up_b_o: "",
		s_d: "",
		c_d: "",
		t_u: "",
		postOffice: "",
	},
};

export const formDataSlice = createSlice({
	name: "formData",
	initialState,
	reducers: {
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		setPhone: (state, action: PayloadAction<string>) => {
			state.phone = action.payload;
		},
		setPhoto64: (state, action: PayloadAction<string>) => {
			state.photo64 = action.payload;
		},
		setName: (state, action: PayloadAction<string>) => {
			state.personal.name = action.payload;
		},
		setGender: (state, action: PayloadAction<string>) => {
			state.personal.gender = action.payload;
		},
		setDOB: (state, action: PayloadAction<string>) => {
			state.personal.dob = action.payload;
		},
		setNIDSmartCard: (state, action: PayloadAction<string>) => {
			state.personal.nidSmartCard = action.payload;
		},
		setNameFather: (state, action: PayloadAction<string>) => {
			state.personal.nameFather = action.payload;
		},
		setNameMother: (state, action: PayloadAction<string>) => {
			state.personal.nameMother = action.payload;
		},
		setNameSpouse: (state, action: PayloadAction<string>) => {
			state.personal.nameSpouse = action.payload;
		},
		setOccupation: (state, action: PayloadAction<string>) => {
			state.income.occupation = action.payload;
		},
		setOrganization: (state, action: PayloadAction<string>) => {
			state.income.organization = action.payload;
		},
		setDesignation: (state, action: PayloadAction<string>) => {
			state.income.designation = action.payload;
		},
		setProfession: (state, action: PayloadAction<string>) => {
			state.income.profession = action.payload;
		},
		setMonthlyIncome: (state, action: PayloadAction<string>) => {
			state.income.monthlyIncome = action.payload;
		},
		setETINNumber: (state, action: PayloadAction<string>) => {
			state.income.etinNumber = action.payload;
		},
		setPresentV_T_R_H_F: (state, action: PayloadAction<string>) => {
			state.presentAddress.v_t_r_h_f = action.payload;
		},
		setPresentS_UP_B_O: (state, action: PayloadAction<string>) => {
			state.presentAddress.s_up_b_o = action.payload;
		},
		setPresentS_D: (state, action: PayloadAction<string>) => {
			state.presentAddress.s_d = action.payload;
		},
		setPresentC_D: (state, action: PayloadAction<string>) => {
			state.presentAddress.c_d = action.payload;
		},
		setPresentT_U: (state, action: PayloadAction<string>) => {
			state.presentAddress.t_u = action.payload;
		},
		setPresentPostOffice: (state, action: PayloadAction<string>) => {
			state.presentAddress.postOffice = action.payload;
		},
		setPermanentV_T_R_H_F: (state, action: PayloadAction<string>) => {
			state.permanentAddress.v_t_r_h_f = action.payload;
		},
		setPermanentS_UP_B_O: (state, action: PayloadAction<string>) => {
			state.permanentAddress.s_up_b_o = action.payload;
		},
		setPermanentS_D: (state, action: PayloadAction<string>) => {
			state.permanentAddress.s_d = action.payload;
		},
		setPermanentC_D: (state, action: PayloadAction<string>) => {
			state.permanentAddress.c_d = action.payload;
		},
		setPermanentT_U: (state, action: PayloadAction<string>) => {
			state.permanentAddress.t_u = action.payload;
		},
		setPermanentPostOffice: (state, action: PayloadAction<string>) => {
			state.permanentAddress.postOffice = action.payload;
		},
		setOfficeV_T_R_H_F: (state, action: PayloadAction<string>) => {
			state.officeAddress.v_t_r_h_f = action.payload;
		},
		setOfficeS_UP_B_O: (state, action: PayloadAction<string>) => {
			state.officeAddress.s_up_b_o = action.payload;
		},
		setOfficeS_D: (state, action: PayloadAction<string>) => {
			state.officeAddress.s_d = action.payload;
		},
		setOfficeC_D: (state, action: PayloadAction<string>) => {
			state.officeAddress.c_d = action.payload;
		},
		setOfficeT_U: (state, action: PayloadAction<string>) => {
			state.officeAddress.t_u = action.payload;
		},
		setOfficePostOffice: (state, action: PayloadAction<string>) => {
			state.officeAddress.postOffice = action.payload;
		},
		setPreferredAddress: (state, action: PayloadAction<string>) => {
			state.accountAndOther.preferredAddress = action.payload;
		},
		setAccountNumber: (state, action: PayloadAction<string>) => {
			state.accountAndOther.accountNumber = action.payload;
		},
		setAccountPurpose: (state, action: PayloadAction<string>) => {
			state.accountAndOther.accountPurpose = action.payload;
		},
		setPreferredBranch: (state, action: PayloadAction<string>) => {
			state.accountAndOther.preferredBranch = action.payload;
		},
		setFATCA1: (state, action: PayloadAction<boolean>) => {
			state.fatca.fatca1 = action.payload;
		},
		setFATCA2: (state, action: PayloadAction<boolean>) => {
			state.fatca.fatca2 = action.payload;
		},
		setFATCA3: (state, action: PayloadAction<boolean>) => {
			state.fatca.fatca3 = action.payload;
		},
		setFATCA4: (state, action: PayloadAction<boolean>) => {
			state.fatca.fatca4 = action.payload;
		},
		setFATCA5: (state, action: PayloadAction<boolean>) => {
			state.fatca.fatca5 = action.payload;
		},
		setFATCA6: (state, action: PayloadAction<boolean>) => {
			state.fatca.fatca6 = action.payload;
		},
		setNomineeName: (state, action: PayloadAction<string>) => {
			state.nomineePersonal.name = action.payload;
		},
		setNomineeGender: (state, action: PayloadAction<string>) => {
			state.nomineePersonal.gender = action.payload;
		},
		setNomineeDOB: (state, action: PayloadAction<string>) => {
			state.nomineePersonal.dob = action.payload;
		},
		setNomineeNIDSmartCard: (state, action: PayloadAction<string>) => {
			state.nomineePersonal.nidSmartCard = action.payload;
		},
		setNomineeNameFather: (state, action: PayloadAction<string>) => {
			state.nomineePersonal.nameFather = action.payload;
		},
		setNomineeNameMother: (state, action: PayloadAction<string>) => {
			state.nomineePersonal.nameMother = action.payload;
		},
		setNomineePhone: (state, action: PayloadAction<string>) => {
			state.nomineePersonal.phone = action.payload;
		},
		setNomineeMTBAccount: (state, action: PayloadAction<boolean>) => {
			state.nomineePersonal.mtbAccount = action.payload;
		},
		setNomineeV_T_R_H_F: (state, action: PayloadAction<string>) => {
			state.nomineeAddress.v_t_r_h_f = action.payload;
		},
		setNomineeS_UP_B_O: (state, action: PayloadAction<string>) => {
			state.nomineeAddress.s_up_b_o = action.payload;
		},
		setNomineeS_D: (state, action: PayloadAction<string>) => {
			state.nomineeAddress.s_d = action.payload;
		},
		setNomineeC_D: (state, action: PayloadAction<string>) => {
			state.nomineeAddress.c_d = action.payload;
		},
		setNomineeT_U: (state, action: PayloadAction<string>) => {
			state.nomineeAddress.t_u = action.payload;
		},
		setNomineePostOffice: (state, action: PayloadAction<string>) => {
			state.nomineeAddress.postOffice = action.payload;
		},
	},
});

export const {
	setEmail,
	setPhone,
	setPhoto64,
	setName,
	setGender,
	setDOB,
	setNIDSmartCard,
	setNameFather,
	setNameMother,
	setNameSpouse,
	setOccupation,
	setOrganization,
	setDesignation,
	setProfession,
	setMonthlyIncome,
	setETINNumber,
	setPresentV_T_R_H_F,
	setPresentS_UP_B_O,
	setPresentS_D,
	setPresentC_D,
	setPresentT_U,
	setPresentPostOffice,
	setPermanentV_T_R_H_F,
	setPermanentS_UP_B_O,
	setPermanentS_D,
	setPermanentC_D,
	setPermanentT_U,
	setPermanentPostOffice,
	setOfficeV_T_R_H_F,
	setOfficeS_UP_B_O,
	setOfficeS_D,
	setOfficeC_D,
	setOfficeT_U,
	setOfficePostOffice,
	setPreferredAddress,
	setAccountNumber,
	setAccountPurpose,
	setPreferredBranch,
	setFATCA1,
	setFATCA2,
	setFATCA3,
	setFATCA4,
	setFATCA5,
	setFATCA6,
	setNomineeName,
	setNomineeGender,
	setNomineeDOB,
	setNomineeNIDSmartCard,
	setNomineeNameFather,
	setNomineeNameMother,
	setNomineePhone,
	setNomineeMTBAccount,
	setNomineeV_T_R_H_F,
	setNomineeS_UP_B_O,
	setNomineeS_D,
	setNomineeC_D,
	setNomineeT_U,
	setNomineePostOffice,
} = formDataSlice.actions;
export default formDataSlice.reducer;
