import emailjs from "emailjs-com";

// Using emailjs with devteam-UNETI
const SERVICE_ID = "service_uneti01";
const TEMPLATE = {
	id: {
		tiepnhan: "template_tthcgv",
		xuly: "template_tthcgv_xuly",
		hoanthanh: "",
	},

	paramsCommon: {
		title: "",
		nameRecive: "",
		maNhanSu: "",
		nameRecive: "",
		department: "",

		contentSuggest: "",

		contentUserSubmit: "",
		quantityFile: "",

		usernameSend: "",
		emailUserSend: "",
		phoneUserSend: "",

		emailRecive: "",
	},
	paramsTiepNhan: {},
	paramsXuLy: {
		contentResponse: "",
	},
};
const USERID = "3tG_gPzga9PpJz8WP"; //Public Key

export const sendEmailUserSubmit = (
	type = "",
	title = "",
	nameRecive = "",
	contentSuggest = "",
	maNhanSu = "",
	department = "",
	contentUserSubmit = "",
	contentResponse = "",
	quantityFile = "",
	usernameSend = "",
	emailUserSend = "",
	phoneUserSend = "",
	emailRecive = ""
) => {
	let templateParams = {};

	if (type === "tiepnhan") {
		templateParams = {
			...TEMPLATE.paramsCommon,
			...TEMPLATE.paramsTiepNhan,
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
			.send(SERVICE_ID, TEMPLATE.id.tiepnhan, templateParams, USERID)
			.then(
				(response) => {
					console.log("SEND MAIL SUCCESS...: ", response);
				},
				(error) => {
					console.log("SEND MAIL FAILED...: ", error);
				}
			)
			.catch((err) => console.log(err));
		return;
	}

	if (type === "xuly") {
		templateParams = {
			...TEMPLATE.paramsCommon,
			...TEMPLATE.paramsTiepNhan,
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
			contentResponse: contentResponse,
		};

		emailjs
			.send(SERVICE_ID, TEMPLATE.id.xuly, templateParams, USERID)
			.then(
				(response) => {
					console.log("SEND MAIL XuLy SUCCESS...: ", response);
				},
				(error) => {
					console.log("SEND MAIL XuLy FAILED...: ", error);
				}
			)
			.catch((err) => console.log(err));
		return;
	}
};
