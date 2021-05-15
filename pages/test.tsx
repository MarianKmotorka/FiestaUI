import DefaultLayout from '@layouts/DefaultLayout'
import { createContext, FC, useContext, useState } from 'react'

const context = createContext<{ value: number; setValue: (x: number) => void }>(null!)

const Provider: FC = ({ children }) => {
  const [value, setValue] = useState(0)
  return <context.Provider value={{ value, setValue }}>{children}</context.Provider>
}

const Test = () => {
  return (
    <Provider>
      <DefaultLayout title='test'>
        <Child />
      </DefaultLayout>
    </Provider>
  )
}

const Child = () => {
  console.log('child rendered')

  return (
    <div>
      child
      <GrandChild />
    </div>
  )
}

const GrandChild = () => {
  const { value, setValue } = useContext(context)
  console.log('grand child rendered')

  return <h4 onClick={() => setValue(value + 1)}>{value}</h4>
}

export default Test
