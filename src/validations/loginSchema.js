import * as yup from 'yup';

let loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(6),
});

export default loginSchema;
