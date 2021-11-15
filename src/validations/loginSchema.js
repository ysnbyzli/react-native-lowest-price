import * as yup from 'yup';

let loginSchema = yup.object().shape({
  username: yup.string().required('Username is a required field'),
  password: yup.string().required('Password is a required field').min(6),
});

export default loginSchema;
