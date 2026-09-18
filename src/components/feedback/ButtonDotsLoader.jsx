import { ThreeDots } from 'react-loader-spinner'

const ButtonDotsLoader = ({ ariaLabel = 'Loading' }) => (
  <span className="ds-btn-loader" aria-hidden="true">
    <ThreeDots
      visible
      height="20"
      width="56"
      color="#ffffff"
      radius="9"
      ariaLabel={ariaLabel}
    />
  </span>
)

export default ButtonDotsLoader
