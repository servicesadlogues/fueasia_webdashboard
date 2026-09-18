import { RotatingLines } from 'react-loader-spinner'

const RotatingLinesLoader = ({ ariaLabel = 'Loading' }) => (
  <RotatingLines
    visible
    height="96"
    width="96"
    color="#F07800"
    strokeWidth="5"
    animationDuration="0.75"
    ariaLabel={ariaLabel}
  />
)

export default RotatingLinesLoader
