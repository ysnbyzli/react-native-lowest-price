import * as yup from 'yup';

let addProductSchema = yup.object().shape({
  title: yup.string().required('Title is a required field').min(3),
  market: yup.string().required('Market is a required field').min(3),
  barcod: yup.string().required('Barcod is a required field').min(8),
});

export default addProductSchema;
