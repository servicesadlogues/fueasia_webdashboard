import * as yup from 'yup';

// Max DOB = 18 years ago (minimum age for membership)
const maxDob = new Date();
maxDob.setFullYear(maxDob.getFullYear() - 18);

export const registrationSchema = yup.object({
  // Personal
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
      return value <= maxDob;
    }),
  name: yup.string().min(2, 'Name too short').required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobile: yup.string().min(7, 'Invalid mobile number').required('Mobile is required'),
  mobileCountryCode: yup.string().optional(),
  alternateNumber: yup.string().optional(),
  institute: yup.string().optional(),
  designation: yup.string().optional(),
  address: yup.string().optional(),
  city: yup.string().optional(),

  // Professional
  medicalNumber: yup.string().required('Medical number is required'),
  country: yup.string().required('Country is required'),
  issuingAuthority: yup.string().required('Issuing authority is required'),

  // Speciality
  speciality: yup.string().required('Please select a speciality'),
  specialityOther: yup.string().when('speciality', {
    is: 'other',
    then: (s) => s.required('Please specify your speciality'),
    otherwise: (s) => s.optional(),
  }),
  otherAssociations: yup.array().of(yup.string()).optional(),
  refNo: yup.string().optional(),

  // Payment
  certifyCheck: yup.boolean().oneOf([true], 'You must certify the information').required(),
  termsCheck: yup.boolean().oneOf([true], 'You must agree to terms and conditions').required(),
});
