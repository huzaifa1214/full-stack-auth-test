import axios from "axios";
import { UserSignInInput, UserSignUpInput } from "../types/user";

const { REACT_APP_API_BASE_URL } = process.env;

export const signUp = async (data: UserSignUpInput) => {
  return axios.post(`${REACT_APP_API_BASE_URL}/auth/signup`, data);
};
export const login = async (data: UserSignInInput) => {
  return axios.post(`${REACT_APP_API_BASE_URL}/auth/login`, data);
};
