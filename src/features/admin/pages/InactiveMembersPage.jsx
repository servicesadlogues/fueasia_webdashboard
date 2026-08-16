import MemberListPage from './MemberListPage'

const InactiveMembersPage = () => (
  <MemberListPage
    title="Inactive members"
    subtitle="Inactive flags and expired memberships. Open a record to send an inactive or expiry email."
    group="inactive"
    exportName="fue-global-inactive-members.csv"
  />
)

export default InactiveMembersPage
