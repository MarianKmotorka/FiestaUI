import axios, { AxiosResponse } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

//Note: This api route is like a proxy for local development, so we can use app on mobiles as well

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const endpoint = `https://localhost:5001${req.url}`

  let response: AxiosResponse = null!

  try {
    if (req.method === 'GET') {
      response = await axios.get(endpoint, { headers: req.headers })
    } else if (req.method === 'DELETE') {
      response = await axios.delete(endpoint, { headers: req.headers })
    } else {
      const method = (req.method?.toLowerCase() || 'post') as 'post' | 'put' | 'patch'
      response = await axios[method](endpoint, req.body, { headers: req.headers })
    }

    res.status(response.status).json(response.data)
  } catch (e) {
    console.error(e.code)
    const response = e.response
    res.status(response?.status).json(response?.data)
  }
}
