import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

import { tokenGVLogin, tokenSVLogin, userGVLogin, userSVLogin } from "../../Apis/apiLogin.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxiosJWT } from "../../Configs/http.js";
import { tokenSuccess } from "../../Services/Redux/Slice/authSlice.js";

function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();
	// event handlers
	const handleChangevalue = async (e) => {
		if (e.target.id === "taikhoan") {
			setUsername(e.target.value);
		}

		if (e.target.id === "matkhau") {
			setPassword(e.target.value);
		}
	};

	const checkedSinhVien = async (username, password) => {
		// Check Sinh Viên
		const userSV = {
			TC_SV_MaSinhVien: username,
			TC_SV_MaSinhVien_Pass: password,
		};
		const tokenSV = await tokenSVLogin(userSV, dispatch);
		const axiosJWT = createAxiosJWT(tokenSV, dispatch, tokenSuccess);

		if (tokenSV) {
			const accessTokenSV = tokenSV.token;
			const dataSV = await userSVLogin(axiosJWT, { TC_SV_MaSinhVien: username }, accessTokenSV, dispatch, navigate);

			if (!dataSV) {
				return null;
			}

			if (dataSV?.LoaiHinhDaoTao === "" || dataSV?.LoaiHinhDaoTao == null || dataSV?.LoaiHinhDaoTao === undefined) {
				return "Invalid-LoaiHinhDaoTao";
			}

			if (dataSV?.Email_TruongCap === "" || dataSV?.Email_TruongCap == null || dataSV?.Email_TruongCap === undefined) {
				return "Invalid-Email";
			}

			if (dataSV?.TrangThaiHocTap === "Đang học") {
				return "SV";
			} else if (dataSV?.TrangThaiHocTap === "Đã tốt nghiệp") {
				return "SV-Done";
			}
		} else {
			return null;
		}
	};

	const checkedGiangVien = async (username, password) => {
		// Check Giảng Viên
		const userGV = {
			HT_USER_TenDN: username,
			HT_USER_MK: password,
		};
		try {
			const tokenGV = await tokenGVLogin(userGV, dispatch);
			const axiosJWT = createAxiosJWT(tokenGV, dispatch, tokenSuccess);
			if (tokenGV) {
				const accessTokenGV = tokenGV.token;
				const dataGV = await userGVLogin(axiosJWT, userGV, accessTokenGV, dispatch, navigate);

				if (!dataGV) {
					return null;
				}

				if (dataGV?.LoaiTaiKhoan === "Giảng viên") {
					return "CB";
				} else {
					return null;
				}
			} else {
				return null;
			}
		} catch (error) {
			console.log([error]);
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		if (username === "" || username === null || username === undefined) {
			return toast.error("Vui lòng nhập tài khoản!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}

		if (password === "" || password === null || password === undefined) {
			return toast.error("Vui lòng nhập mật khẩu!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}

		const sinhvien = await checkedSinhVien(username, password);
		// console.log("🚀 ~ file: Login.jsx:135 ~ handleLogin ~ sinhvien:", sinhvien);
		const giangvien = await checkedGiangVien(username, password);
		// console.log("🚀 ~ file: Login.jsx:123 ~ handleLogin ~ giangvien:", giangvien);

		if (!sinhvien && !giangvien) {
			return toast.error("Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}

		if (sinhvien === "Invalid-Email") {
			return toast.error("Tài khoản của bạn thiếu thông tin email của trường cấp không thể đăng nhập. Vui lòng đợi cập nhật thông tin và quay lại sau!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		} else if (sinhvien === "Invalid-LoaiHinhDaoTao") {
			return toast.error("Tài khoản của bạn thiếu thông tin bậc đào tạo không thể đăng nhập. Vui lòng đợi cập nhật thông tin và quay lại sau!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		} else if (sinhvien === "SV-Done") {
			return toast.error("Tài khoản đã tốt nghiệp không thể sử dụng hệ thống UNETI.", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	};

	const handleEnterPressKey = (e) => {
		if (e.key === "Enter") {
			handleLogin();
		}
	};
	return (
		<section
			className={`absolute right-0 left-0 top-0 bottom-0 w-full h-full flex justify-center items-center bg-center bg-no-repeat  bg-gray-400 bg-blend-multiply px-4 lg:px-0`}
			style={{ backgroundImage: `url("/src/assets/Images/uneti-banner.png")` }}
		>
			<div className="w-[600px] p-10 bg-white rounded-xl">
				<h3 className="font-bold uppercase text-3xl text-sky-700 mb-10 text-center">Đăng nhập hệ thống UNETI</h3>
				<form onSubmit={handleLogin} onKeyDown={handleEnterPressKey} className="flex flex-col justify-center">
					<div className="flex flex-col mb-4">
						<label htmlFor="taikhoan" className="font-semibold text-sky-900">
							Tài khoản
						</label>
						<input id="taikhoan" type="text" className="px-4 py-2 border border-slate-300 rounded-full outline-none valid:bg-white" placeholder="Tài khoản" onChange={handleChangevalue} />
					</div>
					<div className="flex flex-col  mb-4">
						<label htmlFor="matkhau" className="font-semibold text-sky-900">
							Mật khẩu
						</label>
						<div className="relative">
							<input
								id="matkhau"
								type={showPassword ? "text" : "password"}
								className="px-4 py-2 border border-slate-300 w-full rounded-full outline-none valid:bg-white"
								placeholder="Mật khẩu"
								onChange={handleChangevalue}
							/>
							<span
								className="absolute right-5 top-3 cursor-pointer text-xl"
								onClick={() => {
									setShowPassword(!showPassword);
								}}
							>
								{!showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
							</span>
						</div>
					</div>
					<button type="submit" className="px-3 py-2 rounded-full bg-white text-sky-800 font-semibold border border-sky-800 hover:bg-sky-800 hover:text-white">
						Đăng nhập
					</button>
				</form>
			</div>
		</section>
	);
}

export default Login;
