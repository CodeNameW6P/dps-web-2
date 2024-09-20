import { useAppDispatch } from "@/redux/hooks";
import * as formDataReducers from "@/redux/slices/formDataSlice";
import { findUser } from "@/actions/userActions";
import { useEffect } from "react";

type FormValueSetterTypes = {
	email: string;
	phone: string;
};

const FormValueSetter: React.FC<FormValueSetterTypes> = ({ email, phone }) => {
	const dispatch = useAppDispatch();

	const setFormValues = async () => {
		const user = await findUser({
			email: email.trim().toLowerCase(),
			phone: phone.trim(),
		});
		if (user) {
			// personal
			dispatch(formDataReducers.setName(user.personal.name));
			dispatch(formDataReducers.setGender(user.personal.gender));
			dispatch(formDataReducers.setDOB(user.personal.dob));
			dispatch(formDataReducers.setNIDSmartCard(user.personal.nidSmartCard));
			dispatch(formDataReducers.setNameFather(user.personal.nameFather));
			dispatch(formDataReducers.setNameMother(user.personal.nameMother));
			dispatch(formDataReducers.setNameSpouse(user.personal.nameSpouse));

			// income
			dispatch(formDataReducers.setOccupation(user.income.occupation));
			dispatch(formDataReducers.setOrganization(user.income.organization));
			dispatch(formDataReducers.setDesignation(user.income.designation));
			dispatch(formDataReducers.setProfession(user.income.profession));
			dispatch(formDataReducers.setMonthlyIncome(user.income.monthlyIncome));
			dispatch(formDataReducers.setETINNumber(user.income.etinNumber));

			// presentAddress
			dispatch(formDataReducers.setPresentV_T_R_H_F(user.presentAddress.v_t_r_h_f));
			dispatch(formDataReducers.setPresentS_UP_B_O(user.presentAddress.s_up_b_o));
			dispatch(formDataReducers.setPresentS_D(user.presentAddress.s_d));
			dispatch(formDataReducers.setPresentC_D(user.presentAddress.c_d));
			dispatch(formDataReducers.setPresentT_U(user.presentAddress.t_u));
			dispatch(formDataReducers.setPresentPostOffice(user.presentAddress.postOffice));

			// permanentAddress
			dispatch(formDataReducers.setPermanentV_T_R_H_F(user.permanentAddress.v_t_r_h_f));
			dispatch(formDataReducers.setPermanentS_UP_B_O(user.permanentAddress.s_up_b_o));
			dispatch(formDataReducers.setPermanentS_D(user.permanentAddress.s_d));
			dispatch(formDataReducers.setPermanentC_D(user.permanentAddress.c_d));
			dispatch(formDataReducers.setPermanentT_U(user.permanentAddress.t_u));
			dispatch(formDataReducers.setPermanentPostOffice(user.permanentAddress.postOffice));

			// officeAddress
			dispatch(formDataReducers.setOfficeV_T_R_H_F(user.officeAddress.v_t_r_h_f));
			dispatch(formDataReducers.setOfficeS_UP_B_O(user.officeAddress.s_up_b_o));
			dispatch(formDataReducers.setOfficeS_D(user.officeAddress.s_d));
			dispatch(formDataReducers.setOfficeC_D(user.officeAddress.c_d));
			dispatch(formDataReducers.setOfficeT_U(user.officeAddress.t_u));
			dispatch(formDataReducers.setOfficePostOffice(user.officeAddress.postOffice));

			// accountAndOther
			dispatch(formDataReducers.setPreferredAddress(user.accountAndOther.preferredAddress));
			dispatch(formDataReducers.setAccountNumber(user.accountAndOther.accountNumber));
			dispatch(formDataReducers.setAccountPurpose(user.accountAndOther.accountPurpose));
			dispatch(formDataReducers.setPreferredBranch(user.accountAndOther.preferredBranch));

			// fatca
			dispatch(formDataReducers.setFATCA1(user.fatca.fatca1));
			dispatch(formDataReducers.setFATCA2(user.fatca.fatca2));
			dispatch(formDataReducers.setFATCA3(user.fatca.fatca3));
			dispatch(formDataReducers.setFATCA4(user.fatca.fatca4));
			dispatch(formDataReducers.setFATCA5(user.fatca.fatca5));
			dispatch(formDataReducers.setFATCA6(user.fatca.fatca6));

			// nomineePersonal
			dispatch(formDataReducers.setNomineeName(user.nomineePersonal.name));
			dispatch(formDataReducers.setNomineeGender(user.nomineePersonal.gender));
			dispatch(formDataReducers.setNomineeDOB(user.nomineePersonal.dob));
			dispatch(formDataReducers.setNomineeNIDSmartCard(user.nomineePersonal.nidSmartCard));
			dispatch(formDataReducers.setNomineeNameFather(user.nomineePersonal.nameFather));
			dispatch(formDataReducers.setNomineeNameMother(user.nomineePersonal.nameMother));
			dispatch(formDataReducers.setNomineePhone(user.nomineePersonal.phone));

			// nomineeAddress
			dispatch(formDataReducers.setNomineeV_T_R_H_F(user.nomineeAddress.v_t_r_h_f));
			dispatch(formDataReducers.setNomineeS_UP_B_O(user.nomineeAddress.s_up_b_o));
			dispatch(formDataReducers.setNomineeS_D(user.nomineeAddress.s_d));
			dispatch(formDataReducers.setNomineeC_D(user.nomineeAddress.c_d));
			dispatch(formDataReducers.setNomineeT_U(user.nomineeAddress.t_u));
			dispatch(formDataReducers.setNomineePostOffice(user.nomineeAddress.postOffice));
		}
	};

	useEffect(() => {
		setFormValues();
	}, []);

	return <></>;
};

export default FormValueSetter;
