import * as yup from 'yup';

let loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(8),
});

export default loginSchema;
