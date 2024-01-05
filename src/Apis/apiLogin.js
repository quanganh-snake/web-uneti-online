import axios from "axios";
import {
  tokenFailure,
  tokenStart,
  tokenSuccess,
} from "../Services/Redux/Slice/authSlice.js";
import {
  userFailure,
  userStart,
  userSuccess,
} from "../Services/Redux/Slice/userSlice.js";
import http from "../Configs/http.js";

// data token
export const tokenSVLogin = async (user, dispatch) => {
  dispatch(tokenStart());

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt/Login`,
      user,
    );
    if (res.status === 200) {
      dispatch(tokenSuccess(res.data));
      return res.data;
    }
  } catch (error) {
    dispatch(tokenFailure());
  }
};

export const tokenGVLogin = async (user, dispatch) => {
  dispatch(tokenStart());

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwtGV/LoginGV`,
      user,
    );
    if (res.status === 200) {
      dispatch(tokenSuccess(res.data));
      return res.data;
    }
  } catch (error) {
    dispatch(tokenFailure());
  }
};

// data user
export const userSVLogin = async (username, dispatch) => {
  dispatch(userStart());
  try {
    const res = await http.post(
      `/SP_MC_MaSinhVien/Load_Web_App_Para`,
      username,
    );
    if (res.status === 200) {
      dispatch(userSuccess(res.data?.body[0]));
      return res.data?.body[0];
    }
  } catch (error) {
    dispatch(userFailure());
  }
};

export const userGVLogin = async (user, dispatch, navigate) => {
  dispatch(userStart());
  try {
    const res = await http.post(`/SP_HT_USER_GIANGVIEN/Load_MaND_HRM`, user);
    if (res.status === 200) {
      dispatch(userSuccess(res.data?.body[0]));
      navigate("/uneti");
      return res.data?.body[0];
    }
  } catch (error) {
    dispatch(userFailure());
  }
};

export const refreshDataToken = async (refreshToken = "") => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt/RefreshToken`,
      { refreshToken },
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
