import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  if (method !== 'POST') {
    res.status(404).end()
  }

  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/1')

    // const { data, headers: returnedHeaders } = await axios.post(loginEndpoint, body, { headers })
    // Object.keys(returnedHeaders).forEach(key => res.setHeader(key, returnedHeaders[key]))
    res.status(200).json(data)
  } catch (e) {
    console.error('COMPLETE ERRROR', e.toJSON())
    const response = e.response
    res.status(response?.status).json(response?.data)
  }
}
