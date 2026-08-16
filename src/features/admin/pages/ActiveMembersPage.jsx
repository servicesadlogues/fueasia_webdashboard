import MemberListPage from './MemberListPage'

const ActiveMembersPage = () => (
  <MemberListPage
    title="Active members"
    subtitle="Members marked active whose expiry date is still in the future."
    group="active"
    exportName="fue-global-active-members.csv"
  />
)

export default ActiveMembersPage
