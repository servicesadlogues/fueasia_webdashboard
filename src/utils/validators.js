import * as yup from 'yup';
import { validateMobileNumber } from './mobile';

const trim = (value) => (value == null ? value : String(value).trim());

export const registrationSchema = yup.object({
  gender: yup.string().oneOf(['male', 'female'], 'Please select gender').required('Gender is required'),
  dob: yup.date()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .nullable()
    .notRequired()
    .test('valid-dob', 'Please select a valid date of birth', (value) => {
      if (value == null) return true;
      return value instanceof Date && !Number.isNaN(value.getTime());
    })
    .test('min-dob', 'Please enter a valid date of birth', (value) => {
      if (value == null) return true;
      return value >= new Date('1900-01-01');
    })
    .test('age', 'You must be at least 18 years old', (value) => {
      if (value == null) return true;
      const maxDob = new Date();
      maxDob.setFullYear(maxDob.getFullYear() - 18);
      return value <= maxDob;
    }),
  name: yup.string().transform(trim).min(2, 'Name too short').max(150, 'Name is too long').required('Name is required'),
  email: yup.string().transform(trim).email('Invalid email').max(150, 'Email is too long').required('Email is required'),
  mobile: yup.string().transform(trim)
    .required('Mobile is required')
    .max(20, 'Invalid mobile number')
    .test('mobile-by-country', function (value) {
      const message = validateMobileNumber(value, this.parent.mobileCountryCode);
      return message ? this.createError({ message }) : true;
    }),
  mobileCountryCode: yup.string().max(10).optional(),
  alternateNumber: yup.string().max(20).optional(),
  institute: yup.string().max(200).optional(),
  designation: yup.string().max(100).optional(),
  address: yup.string().max(2000).optional(),
  city: yup.string().max(100).optional(),

  medicalNumber: yup.string().transform(trim).max(100).required('Medical number is required'),
  country: yup.string().transform(trim).max(100).required('Country is required'),
  issuingAuthority: yup.string().transform(trim).max(200).required('Issuing authority is required'),

  speciality: yup.string().oneOf(['dermatologist', 'plastic_surgeon', 'other'], 'Please select a speciality').required('Please select a speciality'),
  specialityOther: yup.string().max(100).when('speciality', {
    is: 'other',
    then: (s) => s.transform(trim).required('Please specify your speciality'),
    otherwise: (s) => s.optional(),
  }),
  otherAssociations: yup.array().of(yup.string().max(200)).max(20).optional(),
  refNo: yup.string().max(100).optional(),

  certifyCheck: yup.boolean().oneOf([true], 'You must certify the information').required(),
  termsCheck: yup.boolean().oneOf([true], 'You must agree to terms and conditions').required(),
});
