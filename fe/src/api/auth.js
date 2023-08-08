import { message } from "antd";
import axiosClient from "./axiosClient";
import { setItem } from "../common";

export const authLogin = async (dataLogin) => {
  try {
    const response = await axiosClient.post("auth/login", dataLogin);
    console.log(response);
    if (response && response.status == "success" && response.data) {
      if (response.data.token_info) {
        setItem("accessToken", response.data.token_info.access_token);
      }
      if (response.data.user) {
        setItem("fullName", response.data.user.full_name);
        setItem("email", response.data.user.email);
        setItem("role", response.data.user.role);
      }
      return true;
    } else {
      message.error(response.message);
      return false;
    }
  } catch (error) {
    message.error(error);
    return false;
  }
};
