import { formatDate } from '../../../utils/formatDate'
import PageHeader from '../../../components/ui/PageHeader'
import { useDashboard } from '../dashboardContext'
import { displayValue, specialityLabel } from '../utils/labels'
import InfoGrid from '../components/InfoGrid'

const ProfilePage = () => {
  const { profile } = useDashboard()

  return (
    <div>
      <PageHeader
        title="Profile"
        subtitle="Information submitted during membership registration."
      />

      <div className="section-card">
        <div className="section-header">Personal information</div>
        <div className="section-body">
          <InfoGrid
            items={[
              { label: 'Full name', value: profile.name },
              { label: 'Gender', value: displayValue(profile.gender) },
              { label: 'Date of birth', value: formatDate(profile.dob) },
              { label: 'Email', value: profile.email },
              { label: 'Mobile', value: [profile.mobileCountryCode, profile.mobile].filter(Boolean).join(' ') },
              { label: 'Alternate number', value: displayValue(profile.alternateNumber) },
              { label: 'Address', value: displayValue(profile.address) },
              { label: 'City', value: displayValue(profile.city) },
            ]}
          />
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">Professional information</div>
        <div className="section-body">
          <InfoGrid
            items={[
              { label: 'Institute', value: displayValue(profile.institute) },
              { label: 'Designation', value: displayValue(profile.designation) },
              { label: 'Medical number', value: profile.medicalNumber },
              { label: 'Country', value: profile.country },
              { label: 'Issuing authority', value: profile.issuingAuthority },
            ]}
          />
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">Speciality</div>
        <div className="section-body">
          <InfoGrid
            items={[
              { label: 'Speciality', value: specialityLabel(profile) },
              { label: 'Other associations', value: displayValue(profile.otherAssociations) },
              { label: 'Reference no.', value: displayValue(profile.refNo) },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
