import * as Yup from "yup";

export const signImSchema = Yup.object({
  name: Yup.string()
    .min(2, "User Name must greater than 2")
    .max(50, "Length exceeds")
    .required("Please enter the User Name"),
  password: Yup.string()
    .min(2, "Password must greater than 2")
    .max(100, "Length exceeds")
    .required("Please enter the Password"),
});


export const forgotPassword = Yup.object({
  email: Yup.string().email().required("Please enter the Email"),
});
export const UpAdminSchema = Yup.object({
  password: Yup.string()
  .when({
    is: (password) => password,
    then: Yup.string()
      .required("Please enter the Password")
      .min(5, "Your password must be at least 5 characters long"),
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      //   "Please enter atleast 1 uppercase,1 lowercase and 1 digit."
      // ),
    otherwise: Yup.string().notRequired(),
  }),
  new_password: Yup.string()
  .when({
    is: (new_password) => new_password,
    then: Yup.string()
      .required("Please enter the Password")
      .min(5, "Your password must be at least 5 characters long"),
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      //   "Please enter atleast 1 uppercase,1 lowercase and 1 digit."
      // ),
    otherwise: Yup.string().notRequired(),
  }),
 
  confirm_password: Yup.string()
    .when("new_password", {
      is: (new_password) => new_password,
      then: Yup.string().required("Please enter the Password again"),
      otherwise: Yup.string().notRequired(),
    })
    .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
});