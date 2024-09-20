"use client";
import { useAppSelector } from "@/redux/hooks";
import NavBar from "@/components/NavBar";
import Initial from "./form-pages/Initial";
import NIDSmartCard from "./form-pages/NIDSmartCard";
import UploadPhoto from "./form-pages/UploadPhoto";
import Personal from "./form-pages/Personal";
import Income1 from "./form-pages/Income1";
import Income2 from "./form-pages/Income2";
import PresentAddress from "./form-pages/PresentAddress";
import PermanentAddress from "./form-pages/PermanentAddress";
import OfficeAddress from "./form-pages/OfficeAddress";
import AccountAndOther from "./form-pages/AccountAndOther";
import FATCA from "./form-pages/FATCA";
import NomineeNIDSmartCard from "./form-pages/NomineeNIDSmartCard";
import NomineeUploadPhoto from "./form-pages/NomineeUploadPhoto";
import NomineePersonal from "./form-pages/NomineePersonal";
import NomineeAddress from "./form-pages/NomineeAddress";
import ApplicantSignature from "./form-pages/ApplicantSignature";
import PrivacyConsent from "./form-pages/PrivacyConsent";
import Final from "./form-pages/Final";

const CreateAccount: React.FC = () => {
	const currentPage = useAppSelector((state) => state.currentPage.value);

	const formPages = [
		<Initial />,
		<NIDSmartCard />,
		<UploadPhoto />,
		<Personal />,
		<Income1 />,
		<Income2 />,
		<PresentAddress />,
		<PermanentAddress />,
		<OfficeAddress />,
		<AccountAndOther />,
		<FATCA />,
		<NomineeNIDSmartCard />,
		<NomineeUploadPhoto />,
		<NomineePersonal />,
		<NomineeAddress />,
		<ApplicantSignature />,
		<PrivacyConsent />,
		<Final />,
	];

	return (
		<>
			<div className="flex flex-col bg-gray-100 min-h-screen">
				<NavBar />
				<div className="flex flex-col relative bg-white grow p-5 shadow-lg place-self-center w-screen md:w-3/6 md:my-5">
					<div className="absolute bg-indigo-800 top-5 right-5 p-2 rounded-md">
						<span className="text-white text-sm">
							{currentPage + 1}/{formPages.length}
						</span>
					</div>
					<div className="flex flex-col grow gap-5">{formPages[currentPage]}</div>
				</div>
			</div>
		</>
	);
};

export default CreateAccount;
