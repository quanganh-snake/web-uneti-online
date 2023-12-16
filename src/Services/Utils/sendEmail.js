import emailjs from "emailjs-com";
import Swal from "sweetalert2";

// Using emailjs with devteam-UNETI
const SERVICE_ID = "service_uneti01";
const TEMPLATE_ID = {
	TTHC_GV: {
		id: "template_tthcgv",
		params: {
			title: "",
			nameRecive: "",
			contentSuggest: "",
			maNhanSu: "",
			nameRecive: "",
			department: "",
			contentUserSubmit: "",
			quantityFile: "",

			usernameSend: "",
			emailUserSend: "",
			phoneUserSend: "",

			emailRecive: "",
		},
	},
};
const USERID = "3tG_gPzga9PpJz8WP"; //Public Key

export const sendEmailUserSubmit = (
	title = "",
	nameRecive = "",
	contentSuggest = "",
	maNhanSu = "",
	department = "",
	contentUserSubmit = "",
	quantityFile = "",
	usernameSend = "",
	emailUserSend = "",
	phoneUserSend = "",
	emailRecive = ""
) => {
	let templateParams = {
		...TEMPLATE_ID.TTHC_GV.params,
		title: title,
		nameRecive: nameRecive,
		contentSuggest: contentSuggest,
		maNhanSu: maNhanSu,
		department: department,
		contentUserSubmit: contentUserSubmit,
		quantityFile: quantityFile,

		usernameSend: usernameSend,
		emailUserSend: emailUserSend,
		phoneUserSend: phoneUserSend,

		emailRecive: emailRecive,
	};
	emailjs
		.send(SERVICE_ID, TEMPLATE_ID.TTHC_GV.id, templateParams, USERID)
		.then(
			(response) => {
				console.log("SEND MAIL SUCCESS...: ", response);
			},
			(error) => {
				console.log("SEND MAIL FAILED...: ", error);
			}
		)
		.catch((err) => console.log(err));
};
