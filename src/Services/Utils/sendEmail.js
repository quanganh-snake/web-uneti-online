import emailjs from "emailjs-com";
import Swal from "sweetalert2";

// Using emailjs with devteam-UNETI
const SERVICE_ID = "service_uneti01";
const TEMPLATE_ID = {
	TTHC_GV: {
		id: "template_tthcgv",
		params: {
			title: "",
			userSend: "",
			emailSend: "",
			emailRecive: "",
			emailMessage: "",
		},
	},
};
const USERID = "3tG_gPzga9PpJz8WP"; //Public Key

export const sendEmailConfig = (title = "", userSend = "", emailSend = "", emailRecive = "", emailMessage = "") => {
	let templateParams = {
		...TEMPLATE_ID.TTHC_GV.params,
		title: title,
		userSend: userSend ? userSend : emailSend,
		emailRecive: emailRecive,
		emailMessage: emailMessage,
	};
	emailjs
		.send(SERVICE_ID, TEMPLATE_ID.TTHC_GV.id, templateParams, USERID)
		.then(
			(response) => {
				Swal.fire({
					position: "center",
					icon: "success",
					title: `Đã gửi email thông báo đến ${emailRecive}`,
					showConfirmButton: false,
					timer: 1500,
				});

				console.log("SEND MAIL SUCCESS...: ", response);
			},
			(error) => {
				console.log("SEND MAIL FAILED...: ", error);
			}
		)
		.catch((err) => console.log(err));
};
