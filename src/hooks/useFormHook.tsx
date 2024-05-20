import * as Yup from 'yup';
import { useFormik } from 'formik';


export const useFormHook = (createPlayer) => {

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is Required').min(2, 'Too Short!').max(20, 'Too Long!'),
    lastname: Yup.string().required('Last Name is Required').min(2, 'Too Short!').max(20, 'Too Long!'),
    birthday: Yup.string().required('Date of Birth is Required').min(2, 'Too Short!').max(20, 'Too Long!'),
    image: Yup.string().required('Image URL is Required').min(2, 'Too Short!').max(200, 'Too Long!')
  });

  const { values, handleChange, errors, handleSubmit, touched } = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      birthday: '',
      image: '',
    },
    validationSchema,
    onSubmit: createPlayer,
  });

  return { values, handleChange, errors, handleSubmit, touched };
}