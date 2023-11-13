import { UserSignInInput } from "../../types/user";
import * as yup from "yup";

export const defaultLoginValues: UserSignInInput = {
  email: "",
  password: "",
};

export const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Email Format is not correct"),
  password: yup.string().required("Password is required"),
});
