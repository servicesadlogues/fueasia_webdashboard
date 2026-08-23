import { createContext, useContext } from 'react'

export const AdminStatsContext = createContext(null)

export const useAdminStatsContext = () => {
  const ctx = useContext(AdminStatsContext)
  if (!ctx) throw new Error('useAdminStatsContext must be used inside AdminStatsProvider')
  return ctx
}
