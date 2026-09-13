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

export const profileSchema = yup.object({
  name: yup.string().transform(trim).min(2, 'Name too short').max(150, 'Name is too long').required('Name is required'),
  email: yup.string().transform(trim).email('Invalid email').max(150, 'Email is too long').required('Email is required'),
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
});

const requiredCheckbox = (message) =>
  yup.boolean().oneOf([true], message).required(message);

export const speakerSubmissionSchema = yup.object({
  fullName: yup.string().transform(trim).min(2, 'Full name is required').max(200, 'Full name is too long').required('Full name is required'),
  contactEmail: yup.string().transform(trim).email('Invalid email').max(150, 'Email is too long').required('Contact email is required'),
  preferredName: yup.string().transform(trim).max(200).optional(),
  title: yup.string().max(50).optional(),
  designation: yup.string().max(200).optional(),
  organization: yup.string().max(200).optional(),
  nationality: yup.string().max(100).optional(),
  uaeResident: yup.string().max(10).optional(),
  contactPhone: yup.string().max(30).optional(),
  instagram: yup.string().max(300).optional(),
  facebook: yup.string().max(300).optional(),
  linkedin: yup.string().max(300).optional(),
  youtube: yup.string().max(300).optional(),
  twitter: yup.string().max(300).optional(),
  shortBio: yup.string().max(10000).optional(),
  topics: yup.array().of(
    yup.object({
      topic: yup.string().max(300).optional(),
      abstract: yup.string().max(5000).optional(),
      sessionLecture: yup.boolean().optional(),
      sessionWorkshop: yup.boolean().optional(),
    })
  ).max(4).optional(),
  agreementScientific: requiredCheckbox('You must confirm your presentation is scientific/non-commercial'),
  agreementPhotoBio: requiredCheckbox('You must consent to photo and bio usage'),
  agreementPresentation: requiredCheckbox('You must agree to provide your final presentation by the deadline'),
  agreementDataStorage: requiredCheckbox('You must consent to data storage and processing'),
  profileCompleteConfirmed: requiredCheckbox('You must confirm your profile is complete before saving'),
});
