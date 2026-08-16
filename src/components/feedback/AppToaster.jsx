import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AppToaster = () => (
  <ToastContainer
    position="top-right"
    autoClose={4000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover
    draggable={false}
    theme="light"
    className="ds-toaster"
  />
)

export default AppToaster
