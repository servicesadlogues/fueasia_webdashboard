import MemberListPage from './MemberListPage'

const SunPharmaPage = () => (
  <MemberListPage
    title="Sun Pharma members"
    subtitle="Members identified by Sun Pharma member type or a SUNPHARMA coupon."
    group="sunpharma"
    showType={false}
    exportName="fue-global-sunpharma.csv"
  />
)

export default SunPharmaPage
