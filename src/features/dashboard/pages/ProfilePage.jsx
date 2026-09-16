import { useState, useRef, useEffect, useMemo } from 'react'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { profileSchema } from '../../../utils/validators'
import { notify } from '../../../utils/notify'
import { CountrySelect, MobilePhoneField, PageHeader } from '../../../components/ui'
import Avatar from '../components/Avatar'
import { useDashboard } from '../dashboardContext'
import { SPECIALITY_OPTIONS, ASSOCIATION_OPTIONS } from '../utils/profileOptions'

const ProfilePage = () => {
  const { profile, documents, photoUrl, updateProfile } = useDashboard()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState('')
  const [medicalCertFile, setMedicalCertFile] = useState(null)
  const [pgDegreeFile, setPgDegreeFile] = useState(null)

  const photoInputRef = useRef(null)
  const medicalInputRef = useRef(null)
  const pgDegreeInputRef = useRef(null)

  const defaultValues = useMemo(() => ({
    name: profile?.name || '',
    gender: profile?.gender || 'male',
    dob: profile?.dob ? String(profile.dob).slice(0, 10) : '',
    email: profile?.email || '',
    mobileCountryCode: profile?.mobileCountryCode || '+91',
    mobile: profile?.mobile || '',
    alternateNumber: profile?.alternateNumber || '',
    institute: profile?.institute || '',
    designation: profile?.designation || '',
    address: profile?.address || '',
    city: profile?.city || '',
    medicalNumber: profile?.medicalNumber || '',
    country: profile?.country || '',
    issuingAuthority: profile?.issuingAuthority || '',
    speciality: profile?.speciality || 'dermatologist',
    specialityOther: profile?.specialityOther || '',
    otherAssociations: Array.isArray(profile?.otherAssociations) ? profile.otherAssociations : [],
    refNo: profile?.refNo || '',
  }), [profile])

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues,
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  useEffect(() => {
    if (!photoFile) {
      setPhotoPreview('')
      return undefined
    }
    const url = URL.createObjectURL(photoFile)
    setPhotoPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [photoFile])

  const speciality = useWatch({ control, name: 'speciality' })
  const countryCode = watch('mobileCountryCode') || '+91'

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      notify.error('Photo too large. Maximum file size is 5MB.')
      e.target.value = ''
      return
    }
    if (!/\.(jpe?g|png)$/i.test(file.name)) {
      notify.error('Profile photo must be a JPG or PNG image.')
      e.target.value = ''
      return
    }
    setPhotoFile(file)
  }

  const handleMedicalCertSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      notify.error('File too large. Maximum file size is 5MB.')
      e.target.value = ''
      return
    }
    if (!/\.(pdf|jpe?g|png)$/i.test(file.name)) {
      notify.error('Medical certificate must be a PDF, JPG, or PNG file.')
      e.target.value = ''
      return
    }
    setMedicalCertFile(file)
  }

  const handlePgDegreeSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      notify.error('File too large. Maximum file size is 5MB.')
      e.target.value = ''
      return
    }
    if (!/\.(pdf|jpe?g|png)$/i.test(file.name)) {
      notify.error('PG degree must be a PDF, JPG, or PNG file.')
      e.target.value = ''
      return
    }
    setPgDegreeFile(file)
  }

  const handleResetForm = () => {
    reset(defaultValues)
    setPhotoFile(null)
    setPhotoPreview('')
    setMedicalCertFile(null)
    setPgDegreeFile(null)
    if (photoInputRef.current) photoInputRef.current.value = ''
    if (medicalInputRef.current) medicalInputRef.current.value = ''
    if (pgDegreeInputRef.current) pgDegreeInputRef.current.value = ''
    notify.info('Changes discarded.')
  }

  const handleCancelEdit = () => {
    handleResetForm()
    setEditing(false)
  }

  const handleStartEdit = () => {
    setEditing(true)
  }

  const onSubmit = async (data) => {
    if (!editing) return
    setSaving(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'otherAssociations') {
          formData.append(key, JSON.stringify(value || []))
        } else if (value != null) {
          formData.append(key, value)
        }
      })

      if (photoFile) formData.append('profilePic', photoFile)
      if (medicalCertFile) formData.append('medicalCertificate', medicalCertFile)
      if (pgDegreeFile) formData.append('pgDegree', pgDegreeFile)

      await updateProfile(formData)
      notify.success('Profile updated successfully!')
      setPhotoFile(null)
      setPhotoPreview('')
      setMedicalCertFile(null)
      setPgDegreeFile(null)
      if (photoInputRef.current) photoInputRef.current.value = ''
      if (medicalInputRef.current) medicalInputRef.current.value = ''
      if (pgDegreeInputRef.current) pgDegreeInputRef.current.value = ''
      setEditing(false)
    } catch (err) {
      notify.error(err.message || 'Could not update profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const existingMedicalDoc = documents?.items?.find((item) => item.key === 'medicalCertificate')
  const existingPgDoc = documents?.items?.find((item) => item.key === 'pgDegree')

  const hasChanges = isDirty || !!photoFile || !!medicalCertFile || !!pgDegreeFile

  return (
    <div>
      <PageHeader
        title="Profile"
        subtitle={editing
          ? 'Update your personal, professional, speciality details, and documents.'
          : 'Review your submitted profile. Click Update profile to make changes.'}
        actions={!editing ? (
          <button type="button" className="btn-primary" onClick={handleStartEdit}>
            Update profile
          </button>
        ) : null}
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset disabled={!editing} className={`border-0 p-0 m-0 min-w-0${editing ? '' : ' profile-readonly'}`}>
        {/* Top Profile Summary & Photo Card */}
        <div className="section-card">
          <div className="section-header">Profile Photo</div>
          <div className="section-body flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <Avatar
                name={watch('name') || profile?.name}
                src={photoPreview || photoUrl}
                className="w-24 h-24 text-2xl border-2 border-[var(--color-border)] shadow-sm"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="ds-heading">{watch('name') || profile?.name || 'Member Profile'}</h3>
              <p className="ds-muted text-sm mt-0.5">Membership ID: <strong className="text-primary font-semibold">{profile?.membershipId}</strong></p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3">
                {editing ? (
                  <>
                    <input
                      ref={photoInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handlePhotoSelect}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      className="btn-outline !py-1.5 !px-4 text-xs"
                    >
                      {photoPreview || photoUrl ? 'Change Photo' : 'Upload Photo'}
                    </button>
                    {photoFile && (
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoFile(null)
                          if (photoInputRef.current) photoInputRef.current.value = ''
                        }}
                        className="btn-ghost !py-1.5 !px-3 text-xs text-red-600 hover:text-red-700"
                      >
                        Remove Selected
                      </button>
                    )}
                    <span className="text-xs text-gray-400">JPG or PNG, max 5MB</span>
                  </>
                ) : (
                  <span className="text-xs text-gray-400">Use Update profile to change your photo.</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="section-card">
          <div className="section-header">Personal Information</div>
          <div className="section-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="label">Gender <span className="text-red-500">*</span></label>
                <div className="flex gap-6 mt-1">
                  {['male', 'female'].map((g) => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={g}
                        {...register('gender')}
                        className="accent-primary w-4 h-4"
                      />
                      <span className="text-sm capitalize">{g}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && <p className="error-text">{errors.gender.message}</p>}
              </div>

              <div>
                <label className="label">Date of Birth</label>
                <input
                  type="date"
                  {...register('dob')}
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                  min="1900-01-01"
                  className="input-field"
                />
                {errors.dob && <p className="error-text">{errors.dob.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="label">Full Name <span className="text-red-500">*</span></label>
                <input {...register('name')} className="input-field" placeholder="Full name" />
                {errors.name && <p className="error-text">{errors.name.message}</p>}
              </div>

              <div>
                <label className="label">Mobile <span className="text-red-500">*</span></label>
                <Controller
                  name="mobile"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <MobilePhoneField
                      value={value}
                      onChange={onChange}
                      countryCode={countryCode}
                      onCountryCodeChange={(code) => setValue('mobileCountryCode', code, { shouldValidate: true })}
                      disabled={!editing}
                    />
                  )}
                />
                {errors.mobile && <p className="error-text">{errors.mobile.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="label">Email Address <span className="text-red-500">*</span></label>
                <input {...register('email')} type="email" className="input-field" placeholder="email@example.com" />
                {errors.email && <p className="error-text">{errors.email.message}</p>}
              </div>

              <div>
                <label className="label">Alternate Contact Number</label>
                <input {...register('alternateNumber')} className="input-field" placeholder="Alternate phone or mobile" />
                {errors.alternateNumber && <p className="error-text">{errors.alternateNumber.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="label">Hospital / Institute</label>
                <input {...register('institute')} className="input-field" placeholder="Hospital or Institute name" />
                {errors.institute && <p className="error-text">{errors.institute.message}</p>}
              </div>

              <div>
                <label className="label">Designation</label>
                <input {...register('designation')} className="input-field" placeholder="e.g. Senior Hair Transplant Surgeon" />
                {errors.designation && <p className="error-text">{errors.designation.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="label">Clinic / Residential Address</label>
                <input {...register('address')} className="input-field" placeholder="Street address" />
                {errors.address && <p className="error-text">{errors.address.message}</p>}
              </div>

              <div>
                <label className="label">City</label>
                <input {...register('city')} className="input-field" placeholder="City" />
                {errors.city && <p className="error-text">{errors.city.message}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="section-card">
          <div className="section-header">Professional Information</div>
          <div className="section-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="label">Medical Registration Number <span className="text-red-500">*</span></label>
                <input {...register('medicalNumber')} className="input-field" placeholder="Medical registration / license number" />
                {errors.medicalNumber && <p className="error-text">{errors.medicalNumber.message}</p>}
              </div>

              <div>
                <label className="label">Country of Practice <span className="text-red-500">*</span></label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <CountrySelect
                      value={field.value}
                      onChange={field.onChange}
                      isDisabled={!editing}
                      placeholder="Search and select country..."
                    />
                  )}
                />
                {errors.country && <p className="error-text">{errors.country.message}</p>}
              </div>
            </div>

            <div>
              <label className="label">Medical Council / Issuing Authority <span className="text-red-500">*</span></label>
              <input {...register('issuingAuthority')} className="input-field" placeholder="e.g. Medical Council of India, General Medical Council" />
              {errors.issuingAuthority && <p className="error-text">{errors.issuingAuthority.message}</p>}
            </div>
          </div>
        </div>

        {/* Speciality */}
        <div className="section-card">
          <div className="section-header">Speciality &amp; Associations</div>
          <div className="section-body">
            <div className="mb-5">
              <label className="label mb-2">Speciality <span className="text-red-500">*</span></label>
              <div className="flex flex-col gap-3">
                {SPECIALITY_OPTIONS.map(({ value, label }) => (
                  <label key={value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      value={value}
                      {...register('speciality')}
                      className="accent-primary w-4 h-4"
                    />
                    <span className="text-sm">{label}</span>
                    {value === 'other' && speciality === 'other' && (
                      <input
                        {...register('specialityOther')}
                        className="input-field max-w-xs ml-2"
                        placeholder="Please specify your speciality"
                      />
                    )}
                  </label>
                ))}
              </div>
              {errors.speciality && <p className="error-text mt-2">{errors.speciality.message}</p>}
              {errors.specialityOther && <p className="error-text mt-1">{errors.specialityOther.message}</p>}
            </div>

            <div className="mb-5">
              <p className="font-semibold text-sm mb-3">Other Medical Associations:</p>
              <div className="flex flex-col gap-2">
                {ASSOCIATION_OPTIONS.map((assoc) => (
                  <label key={assoc} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      value={assoc}
                      {...register('otherAssociations')}
                      className="accent-primary w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{assoc}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="label">Reference Number (Optional)</label>
              <input
                {...register('refNo')}
                className="input-field max-w-md"
                placeholder="Reference number if any"
              />
              {errors.refNo && <p className="error-text">{errors.refNo.message}</p>}
            </div>
          </div>
        </div>

        {/* Uploaded Documents & Updates */}
        <div className="section-card">
          <div className="section-header">Certificates &amp; Documents</div>
          <div className="section-body space-y-5">
            {/* Medical Certificate */}
            <div className="p-4 border border-[var(--color-border)] rounded-lg bg-gray-50/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <div>
                  <p className="font-medium text-sm text-gray-900">Medical Registration Certificate</p>
                  <p className="text-xs text-gray-500">
                    {existingMedicalDoc ? (
                      <>Current file: <span className="font-mono text-gray-700">{existingMedicalDoc.fileName}</span></>
                    ) : (
                      'No file currently on record.'
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {existingMedicalDoc && (
                    <a
                      href={existingMedicalDoc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline !py-1.5 !px-3 text-xs"
                    >
                      View Current
                    </a>
                  )}
                  {editing ? (
                    <>
                      <input
                        ref={medicalInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleMedicalCertSelect}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => medicalInputRef.current?.click()}
                        className="btn-primary !py-1.5 !px-3 text-xs"
                      >
                        {medicalCertFile ? 'Replace File' : existingMedicalDoc ? 'Upload New Version' : 'Upload Certificate'}
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
              {medicalCertFile && (
                <div className="flex items-center justify-between mt-2 text-xs bg-orange-50 border border-orange-200 text-orange-800 p-2 rounded">
                  <span>Selected: <strong>{medicalCertFile.name}</strong></span>
                  <button
                    type="button"
                    onClick={() => {
                      setMedicalCertFile(null)
                      if (medicalInputRef.current) medicalInputRef.current.value = ''
                    }}
                    className="text-red-500 hover:underline ml-2"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {/* PG Degree Certificate */}
            <div className="p-4 border border-[var(--color-border)] rounded-lg bg-gray-50/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <div>
                  <p className="font-medium text-sm text-gray-900">Post Graduation Degree / Certificate</p>
                  <p className="text-xs text-gray-500">
                    {existingPgDoc ? (
                      <>Current file: <span className="font-mono text-gray-700">{existingPgDoc.fileName}</span></>
                    ) : (
                      'No file currently on record.'
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {existingPgDoc && (
                    <a
                      href={existingPgDoc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline !py-1.5 !px-3 text-xs"
                    >
                      View Current
                    </a>
                  )}
                  {editing ? (
                    <>
                      <input
                        ref={pgDegreeInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handlePgDegreeSelect}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => pgDegreeInputRef.current?.click()}
                        className="btn-primary !py-1.5 !px-3 text-xs"
                      >
                        {pgDegreeFile ? 'Replace File' : existingPgDoc ? 'Upload New Version' : 'Upload Degree'}
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
              {pgDegreeFile && (
                <div className="flex items-center justify-between mt-2 text-xs bg-orange-50 border border-orange-200 text-orange-800 p-2 rounded">
                  <span>Selected: <strong>{pgDegreeFile.name}</strong></span>
                  <button
                    type="button"
                    onClick={() => {
                      setPgDegreeFile(null)
                      if (pgDegreeInputRef.current) pgDegreeInputRef.current.value = ''
                    }}
                    className="text-red-500 hover:underline ml-2"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            <p className="text-xs text-gray-400">Accepted formats: PDF, JPG, PNG. Maximum 5MB per document.</p>
          </div>
        </div>

        </fieldset>

        {editing ? (
          <div className="ds-profile-savebar">
            <div className="flex items-center gap-3">
              {hasChanges && (
                <span className="text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 font-medium">
                  Unsaved changes
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={saving}
                className="btn-ghost !py-2.5 px-5 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetForm}
                disabled={saving || !hasChanges}
                className="btn-ghost !py-2.5 px-5 text-sm"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={saving}
                className="btn-primary !py-2.5 px-8 text-sm font-semibold flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <span className="spinner !w-4 !h-4 !border-2" />
                    Saving Changes...
                  </>
                ) : (
                  'Save Profile'
                )}
              </button>
            </div>
          </div>
        ) : null}
      </form>
    </div>
  )
}

export default ProfilePage
