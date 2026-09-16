import { ADLOGUES_URL } from '../../constants/brand'

export const COPYRIGHT_OWNER = 'FUE Global'

export const copyrightNotice = (year = new Date().getFullYear()) =>
  `© ${year} ${COPYRIGHT_OWNER}. All rights reserved.`

export const ADLOGUES_CREDIT_LABEL = 'Design and Developed by Adlogues'

export const AdloguesCreditLink = ({ className = 'ds-footer-credit' }) => (
  <a
    className={className}
    href={ADLOGUES_URL}
    target="_blank"
    rel="noopener noreferrer"
  >
    {ADLOGUES_CREDIT_LABEL}
  </a>
)
