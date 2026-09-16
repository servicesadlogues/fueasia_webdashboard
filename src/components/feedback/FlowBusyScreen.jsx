const FlowBusyScreen = ({ title, message }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4">
    <div className="spinner mb-6" />
    <h3 className="text-navy font-semibold text-xl mb-2">{title}</h3>
    <p className="text-gray-500 text-sm text-center">{message}</p>
  </div>
)

export default FlowBusyScreen
