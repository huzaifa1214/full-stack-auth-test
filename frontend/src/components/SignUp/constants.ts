import { UserSignUpInput } from "../../types/user";
import * as yup from "yup";

export const defaultFormValues: UserSignUpInput = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const passwordValidation = yup
  .string()
  .required("Password is required")
  .test({
    name: "password",
    test: (value: string | undefined) => {
      if (!value) {
        return false;
      }

      return (
        value.length >= 8 &&
        /[a-zA-Z]/.test(value) &&
        /\d/.test(value) &&
        /[^a-zA-Z\d]/.test(value)
      );
    },
    message:
      "Password must be Minimum length of 8 characters, Contains at least 1 special character, Contains at least 1 number., Contains at least 1 letter.",
  });

export const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email Format is not correct"),
  password: passwordValidation,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});
