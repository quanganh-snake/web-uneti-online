import mammoth from "mammoth";

export const compareStrings = (str1, str2) => {
	return str1.trim() === str2.trim();
};

export const changeSlug = (dataString = "") => {
	if (dataString !== "") {
		//Đổi chữ hoa thành chữ thường
		let slug = dataString.toLowerCase();
		//Đổi ký tự có dấu thành không dấu
		slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
		slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
		slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
		slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
		slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
		slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
		slug = slug.replace(/đ/gi, "d");
		//Xóa các ký tự đặt biệt
		slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, "");
		//Đổi khoảng trắng thành ký tự gạch ngang
		slug = slug.replace(/ /gi, "-");
		//Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
		//Phòng trường hợp người nhập vào quá nhiều ký tự trắng
		slug = slug.replace(/\-\-\-\-\-/gi, "-");
		slug = slug.replace(/\-\-\-\-/gi, "-");
		slug = slug.replace(/\-\-\-/gi, "-");
		slug = slug.replace(/\-\-/gi, "-");
		//Xóa các ký tự gạch ngang ở đầu và cuối
		slug = "@" + slug + "@";
		slug = slug.replace(/\@\-|\-\@|\@/gi, "");
		//In slug ra textbox có id “slug”
		return slug;
	} else {
		return {
			errorCode: "UNETI_404",
			message: "ERROR: Invalid data string provided!",
		};
	}
};

export const convertDataFileToBase64 = (dataFile) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => {
			const base64String = reader.result;
			resolve(base64String);
		};

		reader.onerror = (error) => {
			reject(error);
		};

		if (dataFile) {
			reader.readAsDataURL(dataFile);
		} else {
			reject(new Error("File not provided."));
		}
	});
};

export const convertBufferToBase64 = (buffer) => {
	let binary = "";
	let bytes = new Uint8Array(buffer);
	let len = bytes.byteLength;
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);
};

export const convertDocxToText = (arrayBuffer) => {
	return new Promise((resolve, reject) => {
		const options = {
			convertImage: mammoth.images.inline((element) => {
				return element.read("base64").then((image) => {
					return {
						src: `data:${element.contentType};base64,${image}`,
					};
				});
			}),
		};

		mammoth
			.extractRawText({ arrayBuffer: arrayBuffer }, options)
			.then((result) => {
				resolve(result.value);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
