import * as Yup from 'yup';

const validEmailMessage = 'Vui lòng nhập đúng email';
const requiredErrorMessage = 'Trường này là bắt buộc';
const minPasswordMessage = 'Mật khẩu có ít nhất 6 ký tự';
const maxPasswordMessage = 'Mật khẩu tối đa 20 ký tự';
const confirmPasswordMessage = 'Mật khẩu không trùng khớp';
const passwordMinSix = 'Mật khẩu tối thiểu 6 ký tự';
const passwordMaxTwenty = 'Mật khẩu tối đa 20 ký tự';
const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/;
const validPasswordMessage =
  'Tối thiểu 6 ký tự. Ít nhất 1 chữ in hoa, 1 chữ thường và 1 chữ số';
const loginSchema = Yup.object().shape({
  user: Yup.string().required(requiredErrorMessage),
  password: Yup.string()
    .min(6, minPasswordMessage)
    .max(20, maxPasswordMessage)
    .required(requiredErrorMessage),
});

const validatePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, passwordMinSix)
    .max(20, passwordMaxTwenty)
    .matches(regexPassword, validPasswordMessage)
    .required(requiredErrorMessage),
  confirmPassword: Yup.string()
    .required(requiredErrorMessage)
    .oneOf([Yup.ref('password'), null], confirmPasswordMessage),
});

const validateInputSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, passwordMinSix)
    .max(20, passwordMaxTwenty)
    .matches(regexPassword, validPasswordMessage)
    .required(requiredErrorMessage),
});

const validationInfoAccountSchema = Yup.object().shape({
  birthday: Yup.string().required('Vui lòng chọn ngày sinh'),
  phone_number: Yup.string()
    .matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
      'Số điện thoại không đúng định dạng',
    )
    .required('Yêu cầu nhập số điện thoại'),
  name: Yup.string().required('Yêu cầu nhập họ và tên'),
  address: Yup.string().required('Yêu cầu nhập địa chỉ'),
});
const validationWarrantyHome = Yup.object().shape({
  orderDate: Yup.string().required('Vui lòng chọn ngày đặt lịch'),
  orderTime: Yup.string().required('Vui lòng chọn thời gian đặt lịch'),
});

const validateFormInforSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng điền họ tên'),
  phone: Yup.string().matches(
    /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
    'Số điện thoại không đúng định dạng',
  ),
});

const validateEmailShema = Yup.object().shape({
  email: Yup.string()
    .matches(regexEmail, validEmailMessage)
    .required(requiredErrorMessage),
});

export {
  loginSchema,
  validatePasswordSchema,
  validationInfoAccountSchema,
  validationWarrantyHome,
  validateFormInforSchema,
  validateEmailShema,
  validateInputSchema,
};
