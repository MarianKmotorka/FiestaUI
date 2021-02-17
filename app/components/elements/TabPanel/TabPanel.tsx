interface ITabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
  className?: string
}

const TabPanel = ({ children, value, index, className }: ITabPanelProps) => {
  if (value !== index) return null

  return (
    <div role='tabpanel' className={className}>
      {value === index && children}
    </div>
  )
}

export default TabPanel
