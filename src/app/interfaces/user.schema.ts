import * as yup from "yup";

export const userSchemaRegister = yup.object({
  name: yup.string().min(4).max(10).required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .max(10)
    .required()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/,
      "Password at least 6 char, one uppercase & number"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
  referral: yup.string().min(9).max(9).optional(),
});

export const userSchemaResetPassword = yup.object({
  password: yup
    .string()
    .max(10)
    .required()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/,
      "Password at least 6 char, one uppercase & number"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
})

export const userSchemaLogin = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .max(10)
    .required()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/,
      "Password at least 6 char, one uppercase & number"
    ),
});
