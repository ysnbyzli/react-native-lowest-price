import * as yup from 'yup';

let registerSchema = yup.object().shape({
  firstName: yup.string().required('First name is a required field'),
  lastName: yup.string().required('Last name is a required field'),
  username: yup.string().required('Username is a required field'),
  password: yup.string().required('Password is a required filed').min(8),
});

export default registerSchema;
