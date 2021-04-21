import useObserver from '@hooks/useObserver'

interface IObserverProps {
  callback: () => void
  disabled?: boolean
}

const Observer = ({ disabled, callback }: IObserverProps) => {
  const observe = useObserver(callback, !disabled)

  return <div ref={node => node && observe(node)} />
}

export default Observer
