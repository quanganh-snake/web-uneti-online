import emailjs from "emailjs-com";
import Swal from "sweetalert2";

const SERVICE_ID = "service_y6b50h6";
const TEMPLATE_ID = {
	T_D_TCCB: {
		id: "template_tccbtest",
		params: {
			title: "",
			to_name: "",
			emailSend: "",
			emailRecive: "",
			message: "",
		},
	},
	T_D_DaoTao: "",
	T_D_BanGiamHieu: "",
};
const USERID = "NKyk98d-TdMsBRW7N";

export const sendEmailConfig = (department = "", title = "", name = "", emailSend = "", emailRecive = "", contents = "") => {
	let templateParams = {
		...TEMPLATE_ID.T_D_TCCB.params,
		title: title,
		to_name: name ?? emailSend,
		emailRecive: emailRecive,
		message: contents,
	};
	emailjs
		.send(SERVICE_ID, TEMPLATE_ID.T_D_TCCB.id, templateParams, USERID)
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
