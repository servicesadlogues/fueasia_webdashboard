import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { notify } from '../../../utils/notify'
import {
  getAdminMember,
  getAdminMemberDocuments,
  notifyAdminMember,
  updateAdminMemberStatus,
} from '../../../services/adminApi'
import { formatDate } from '../../../utils/formatDate'
import PageHeader from '../../../components/ui/PageHeader'
import { displayValue, formatMoney, membershipTypeLabel, specialityLabel } from '../../dashboard/utils/labels'
import InfoGrid from '../../dashboard/components/InfoGrid'
import { MembershipStatusBadge, PaymentStatusBadge } from '../../dashboard/components/StatusBadge'

const MemberDetailPage = () => {
  const { membershipId } = useParams()
  const [member, setMember] = useState(null)
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const [memberRes, docsRes] = await Promise.all([
        getAdminMember(membershipId),
        getAdminMemberDocuments(membershipId).catch(() => ({ documents: { items: [] } })),
      ])
      setMember(memberRes.member)
      setDocuments(docsRes.documents?.items || [])
    } catch {
      /* interceptor toasts API errors */
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [membershipId])

  const setActive = async (membershipIsActive) => {
    setBusy(true)
    try {
      const res = await updateAdminMemberStatus(membershipId, {
        membershipIsActive,
        sendEmail: !membershipIsActive,
      })
      setMember(res.member)
      notify.success(membershipIsActive ? 'Member marked active.' : 'Member marked inactive. Notification emailed if possible.')
    } catch {
      /* interceptor toasts API errors */
    } finally {
      setBusy(false)
    }
  }

  const sendMail = async (type) => {
    setBusy(true)
    try {
      const res = await notifyAdminMember(membershipId, type)
      notify.success(res.message)
    } catch {
      /* interceptor toasts API errors */
    } finally {
      setBusy(false)
    }
  }

  if (loading) return null
  if (!member) {
    return <p className="ds-muted">Member not found. <Link to="/admin/home/members" className="ds-link">Back</Link></p>
  }

  return (
    <div>
      <PageHeader
        kicker={<Link to="/admin/home/members" className="ds-link">Back to members</Link>}
        title={member.name}
        subtitle={member.membershipId}
        actions={(
          <>
            <MembershipStatusBadge status={member.membershipStatus} />
            <PaymentStatusBadge status={member.paymentStatus} />
          </>
        )}
      />

      <div className="section-card">
        <div className="section-header">Manage</div>
        <div className="section-body flex flex-wrap gap-2">
          <button type="button" className="btn-primary" disabled={busy} onClick={() => setActive(true)}>Mark active</button>
          <button type="button" className="btn-ghost" disabled={busy} onClick={() => setActive(false)}>Mark inactive</button>
          <button type="button" className="btn-outline" disabled={busy} onClick={() => sendMail('expiry')}>Send expiry reminder</button>
          <button type="button" className="btn-outline" disabled={busy} onClick={() => sendMail('inactive')}>Send inactive alert</button>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">Profile</div>
        <div className="section-body">
          <InfoGrid
            items={[
              { label: 'Email', value: member.email },
              { label: 'Mobile', value: member.mobile },
              { label: 'Gender', value: displayValue(member.gender) },
              { label: 'Date of birth', value: formatDate(member.dob) },
              { label: 'Address', value: displayValue(member.address) },
              { label: 'City', value: displayValue(member.city) },
              { label: 'Institute', value: displayValue(member.institute) },
              { label: 'Designation', value: displayValue(member.designation) },
              { label: 'Medical number', value: member.medicalNumber },
              { label: 'Country', value: member.country },
              { label: 'Issuing authority', value: member.issuingAuthority },
              { label: 'Speciality', value: specialityLabel(member) },
              { label: 'Member type', value: membershipTypeLabel(member.memberType) },
              { label: 'Coupon', value: displayValue(member.couponApplied) },
              { label: 'Amount paid', value: formatMoney(member.amountPaid, member.currency) },
              { label: 'Valid from', value: formatDate(member.membershipStartDate) },
              { label: 'Valid until', value: formatDate(member.membershipExpiryDate) },
            ]}
          />
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">Documents</div>
        {documents.length === 0 ? (
          <div className="ds-empty">No documents on file.</div>
        ) : (
          <div className="section-body flex flex-col gap-3">
            {documents.map((item) => (
              <div key={item.key} className="ds-file-row">
                <div className="flex flex-1 items-center justify-between gap-4 px-4 py-3">
                  <div>
                    <p className="ds-label">{item.label}</p>
                    <p className="ds-caption">{item.fileName}</p>
                  </div>
                  <a className="btn-outline !py-2" href={item.url} target="_blank" rel="noreferrer">Open</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MemberDetailPage
