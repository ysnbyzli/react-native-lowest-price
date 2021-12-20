import * as yup from 'yup';

let changePasswordSchema = yup.object().shape({
  password: yup.string().required('Password is a required field').min(8),
  passwordRepeat: yup
    .string()
    .required('Password repeat is a required field')
    .min(8)
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default changePasswordSchema;
