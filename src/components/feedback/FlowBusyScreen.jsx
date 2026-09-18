import ScreenLoader from './ScreenLoader'

const FlowBusyScreen = ({ title, message }) => (
  <ScreenLoader title={title} message={message} blocking />
)

export default FlowBusyScreen
