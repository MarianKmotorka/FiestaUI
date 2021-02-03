import { useState } from 'react'
import Link from 'next/link'

import api from '../app/api/HttpClient'
import { Button } from '@material-ui/core'
import DefaultLayout from '@layouts/DefaultLayout'

const HomePage = () => {
  const [data, setData] = useState<any>()
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(false)

  const handleFetch = async () => {
    try {
      setLoading(true)
      setError(undefined)
      const res = await api.get('/users/me')
      setData(res.data)
    } catch (err) {
      setError(err.response)
    }
    setLoading(false)
  }

  return (
    <DefaultLayout>
      <Link href='/about'>About</Link>
      <Link href='/authed-route'>Authed</Link>

      <Button onClick={handleFetch} variant='contained'>
        Fetch
      </Button>

      <div>
        <h2>{data?.email}</h2>
        <h2>{data?.now}</h2>
      </div>

      {loading && <h1>LOAINDG</h1>}
      {error && <h1>{JSON.stringify(error, null, 2)}</h1>}
    </DefaultLayout>
  )
}

export default HomePage
